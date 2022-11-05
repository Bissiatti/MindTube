import sys
from youtube_transcript_api import YouTubeTranscriptApi

x = sys.argv[1]

def generate_transcript(id):
	transcript = YouTubeTranscriptApi.get_transcript(id,languages=['en'])
	script = ""

	for text in transcript:
		t = text["text"]
		if t != '[Music]':
			script += t + " "
		
	return script, len(script.split())


transcript, no_of_words = generate_transcript(x)
print(transcript[0:100])