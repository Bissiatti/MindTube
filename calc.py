import sys
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
from calc_aux import *

is_noun = lambda word: pos_tag(word_tokenize(word))[0][1] == 'NN'
is_adj = lambda word: pos_tag(word_tokenize(word))[0][1] == 'JJ'

#sys args
iden = sys.argv[1]
title = sys.argv[2]

#get transcript
def generate_transcript(iden):
	transcript = YouTubeTranscriptApi.get_transcript(iden,languages=['en'])
	script = ""

	for text in transcript:
		t = text["text"]
		if t != '[Music]':
			script += t + " "
		
	return script

transcript = generate_transcript(iden)

transcript2 = YouTubeTranscriptApi.get_transcript(iden,languages=['en'])

# dicionário do momento de cada fala
legend_dict = {}
for text in transcript2:
    legend_dict[text['start']] = text['text']

text = transcript

text_cleaned = pre_processing(text)
matrix, vocab = co_occurrence(text_cleaned)
structure_network = structure_text_network(matrix, vocab)

#GambiaRank and stuff
text_network = nx.DiGraph()
text_network = nx.from_pandas_edgelist(structure_network, 'target', 'source', ['weight'])
for i in text_network.nodes:
    for j in text_network.nodes:
        if i != j and i.lower() == j.lower():
            text_network = nx.contracted_nodes(text_network,i, j)

centrality = calc_centrality(text_network, title)

cen_dict = {}
max_cen = 0
for x in centrality:
    cen_dict[x[0]] = x[1]
    if max_cen < x[1]:
        max_cen = x[1]

# Visualização do Grafo
# lista dos nós
name_lst = [x[0] for x in centrality]

# lista de nós a serem removidos, estamos mantendo os 25 maiores
rmv_lst = name_lst[:-30]

# exibição do nome dos nós para a visualização
for i in text_network.nodes:
    text_network.nodes[i]['label'] = i

# redução do grafo
for i in rmv_lst:
    text_network.remove_node(i)
    
name_lst = list(text_network.nodes)

# remoção de stopwords
for i in name_lst:
    if not (is_noun(i) or is_adj(i)):
        merge_node = False
        maxi = 0
        for j in text_network.neighbors(i):
            w = name_lst.index(j)
            if (is_noun(j) or is_adj(i)) and maxi<w:
                maxi = w
                merge_node = j
        if merge_node:
                if not (j == merge_node or (j in text_network.neighbors(merge_node))):
                    text_network.add_edge(merge_node, j, weight=text_network[i][j]['weight']/2)
        text_network.remove_node(i)
     
dict_moments = {}
episilon = 45

for i in text_network.nodes:
    dict_moments[i] = []
    
for i in list(legend_dict.keys()):
    phrase = pre_processing(legend_dict[i])
    
    for j in text_network.nodes:
        if j in phrase.split() and (len(dict_moments[j]) == 0 or  dict_moments[j][-1]+episilon<i):
            dict_moments[j].append((i>1)*(int(i)-1))

nt = Network('800px', '1000px', bgcolor='#ffffff', notebook=False)
nt.from_nx(text_network)
nt.force_atlas_2based(gravity = -200)

nt.set_edge_smooth('continuous')

for edg in nt.edges:
    # espessura e física das arestas
    #edg['width'] = text_network[i][j]['weight']**4
    #if edg['weight'] < 1:
    
    if edg['from'] == edg['to']:
        edg['hidden'] = True
    edg['physics'] = False
    edg['color'] = '#cf888f'

for n in nt.nodes:
    # tamanho dos nós
    n['shape'] = 'ellipse'
    size = 40*(cen_dict[n['label']]/max_cen)**0.4
    n['font'] = str(int(size))+'px arial white'
    if is_noun(n['label']):
        n['color'] = '#7f333f'
    else:
        n['color'] = '#636b6f'
    n['labelHighlightBold'] = True

def time_to_min(time):
    return str(time//60)+":"+"0"*(time%60<10)+str(time%60)

for n in nt.nodes:
    # links nos nós
    '''
    link_list = ["<a href='https://www.youtube.com/watch?v="+str(iden)+
                 "&t="+str(time)+"s' target='_blank' rel='noopener noreferrer'>"+time_to_min(time)+"<br>" for time in dict_moments[n['label']]]
    '''

    link_list = ["<a href='https://www.youtube.com/watch?v="+str(iden)+
                 "&t="+str(time)+"s' target='_blank' rel='noopener noreferrer'>"+time_to_min(time)+"<br>" for time in dict_moments[n['label']]]


    #link_list = ['<button type="button">'+str(time) +'</button>' for time in dict_moments[n["label"]]]

    soma = ''
    for k in link_list:
        soma += k
    n['title'] = soma
    
nt.save_graph("text_network.html")

print("done")
