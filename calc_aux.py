import sys
import numpy as np
import pandas as pd
from youtube_transcript_api import YouTubeTranscriptApi
import re
import itertools
from nltk import FreqDist, bigrams, pos_tag, word_tokenize
import networkx as nx
from pyvis.network import Network
from collections import Counter
from nltk.tokenize.toktok import ToktokTokenizer
from nltk.corpus import stopwords
from youtube_transcript_api import YouTubeTranscriptApi
from gensim.models import KeyedVectors
from nltk import download as nltkdownload

toktok = ToktokTokenizer()
stpwrd = stopwords.words('english')
stop_list = (['uh', 'also', 'oh', 'um', 'yeah', 'use', 'lot', 'put', 'get', 'would', 'gonna', 'really', 'much', 'actually', 'another'])
stpwrd.extend(stop_list)


modelo = KeyedVectors.load("./data/modelo_word_vec.kv")

def getSimilar(string, N):
    similarList = modelo.most_similar(positive=[string])[0:N]
    wordList = []
    for word in similarList:
        wordList.append(word)
    return wordList

def sort_list(list1, list2):
     
    list3 = []
    for entry in list2:
        list3.append(entry[1])
    zipped_pairs = zip(list3, list1)
 
    z = [x for _, x in sorted(zipped_pairs, reverse = True)]
 
    return z

def banStopword(lista, n):
    SUSwords = []
    similarWords = []
    for word in lista:
        similares = getSimilar(word,n)
        mostSimilar = 0
        similarWord = ''
        SUSWord = ''
        for palavra in similares:
            sentinel = 0
            if palavra[0] in stpwrd and palavra[1] > mostSimilar:
                mostSimilar = palavra[1]
                similarWord = palavra
                SUSWord = word
                sentinel = 1
            if sentinel == 1:  
                SUSwords.append(word)
                similarWords.append(palavra)
    
    return SUSwords, similarWords

def ejectStopword(string, n):
    State = False
    try:
        similares = getSimilar(string.lower(),n)
        for palavra in similares:
            if palavra[0] in stpwrd:
                    State = True
    except KeyError:
        pass
    
    return State

def filtered_sentence(example_sent):
    word_tokens = toktok.tokenize(example_sent)
    filtered_sentence = [w for w in word_tokens if not w.lower() in stpwrd]
    return " ".join(filtered_sentence)

def remove_stopwords(text):
    doc = filtered_sentence(text)
    return " ".join([token.text for token in doc if token.is_stop == False])

def pre_processing(text):
    text = filtered_sentence(text)
    text = re.sub(r'[^\w\s]', '', text) #remove punctuation
    text = re.sub(r"\s{2,}", " ", text)
    return text

def co_occurrence(text):
    corpus = list(itertools.chain.from_iterable([text.split(' ')]))
    vocab = list(set(corpus))
    vocab_index = {word: i for i, word in enumerate(vocab)}
    bi_grams = list(bigrams(corpus))
    bigram_freq = FreqDist(bi_grams).most_common(len(bi_grams)) 
    co_occurrence_matrix = np.zeros((len(vocab), len(vocab)))

    #bigram = ((word n, word n+1), num_occurrences)
    for bigram in bigram_freq:
        current = bigram[0][1] #word n+1
        previous = bigram[0][0] #word n
        count = bigram[1] #num_occurrences
        pos_current = vocab_index[current] #obtain id for word n+1 
        pos_previous = vocab_index[previous] #obtain id for word n 
        co_occurrence_matrix[pos_current][pos_previous] = count
        
    return co_occurrence_matrix, vocab_index

def structure_text_network(matrix, vocab_index):
    data_matrix = pd.DataFrame(matrix, index=vocab_index, columns=vocab_index)
    data_stack = data_matrix.stack()
    structure = data_stack[data_stack >= 1].rename_axis(('source', 'target')).reset_index(name='weight')
    return structure[(structure.source != " ") & (structure.target != " ")]

def calc_centrality(G, title):
    title_words = pre_processing(title).split()
    centrality =  nx.pagerank(G)
    
    def mean_simi(word,title):
        m = 0
        for i in title:
            try:
                m += modelo.similarity(word, i)
            except KeyError:
                m += 0

        return m/len(title)
    
    centrality = {x[0]:(x[1])*
                  ((mean_simi(x[0],title_words)/(mean_simi(x[0],stpwrd)+0.000001)))
                  for x in centrality.items()}
    
    return sorted(centrality.items(), key=lambda x: x[1], reverse=False)
