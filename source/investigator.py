import requests
import json

#Accepts a dictionary containing the keys, "crop" and "disease/pest"
def output_pubag_research(dict):
    API_ENDPOINT = 'https://api.nal.usda.gov/pubag/rest/search/'
    API_KEY = 'DEMO_KEY'

    query = "?query=" + dict['crop'] + "&api_key=DEMO_KEY"

    API_QUERY = API_ENDPOINT + query

    print(API_QUERY)

    response = requests.get(API_QUERY)

    print(response.status_code)
    print(response.text)

    data = json.loads(response.text)
    articles = []
    for item in data['items']:
        article = {
            'title': item['title'],
            'author': ', '.join(item['author']),
            'publication': item['pubName'] + ' ' + item['pubDate']
        }
        articles.append(article)

    return articles

# articles = output_pubag_research('crop rotation')
# for article in articles:
#     print(article['title'])
#     print(article['author'])
#     print(article['publication'])
#     print()