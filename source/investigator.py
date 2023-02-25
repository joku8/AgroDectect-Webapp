import requests
import json
# from scopus import SCOPUS_API_KEY

tmpdict = {}

SCOPUS_API_KEY = '703bd47e7ca98e41db2463dd5b4e6bbe'
SCOPUS_ENDPOINT = 'https://api.elsevier.com/content/search/scopus/'

# http://api.elsevier.com/content/search/scopus?query=[query]

def output_scopus_research(dict):
    #?query=[query]
    tmpdict = dict
    query = "&query=" + tmpdict['crop']
    key = '?apikey='
    API_QUERY = SCOPUS_ENDPOINT + key + SCOPUS_API_KEY + query 

    print(API_QUERY)
    response = requests.get(API_QUERY)

    # print(response.status_code)
    # print(response.text)

    return "Default", 200


#Accepts a dictionary containing the keys, "crop" and "disease/pest"
# def output_pubag_research(dict):
    # API_ENDPOINT = 'https://api.nal.usda.gov/pubag/rest/search/'
    # API_KEY = 'DEMO_KEY'

    # tmpdict = dict
    # query = "?query=" + tmpdict['crop'] + "&api_key=PC3ooOQmdd9uVlHiF0PIL8wLFgFXb5V6kiAH5GEP"

    # API_QUERY = API_ENDPOINT + query

    # print(API_QUERY)

    # response = requests.get(API_QUERY)

    # print(response.status_code)
    # print(response.text)

    # data = json.loads(response.text)
    # articles = []
    # for item in data['items']:
    #     article = {
    #         'title': item['title'],
    #         'author': ', '.join(item['author']),
    #         'publication': item['pubName'] + ' ' + item['pubDate']
    #     }
    #     articles.append(article)

    # return articles

# articles = output_pubag_research('crop rotation')
# for article in articles:
#     print(article['title'])
#     print(article['author'])
#     print(article['publication'])
#     print()