import requests
import json
# from scopus import SCOPUS_API_KEY

select_from = ["blight", "common rust", "gray leaf spot", "caterpillar", "diabrotica"]

tmpdict = {}

def pubag_query(dict) :
    
    return 0

def scrape_pubag(query) :
    return 0

dict = {"crop": "corn",
        "disease/pest": "common_rust"
        }
q = pubag_query(dict)
print(q)

# def output_scopus_research(dict):
#     SCOPUS_API_KEY = '703bd47e7ca98e41db2463dd5b4e6bbe'
#     SCOPUS_ENDPOINT = 'https://api.elsevier.com/content/search/scopus/'

#     # http://api.elsevier.com/content/search/scopus?query=[query]
#     #?query=[query]

#     tmpdict = dict
#     query = "&query=(SRCTITLE(\"Journal of Plant Pathology\") OR SRCTITLE(\"Plant Disease\") OR SRCTITLE(\"Crop Protection\")) AND KEY(" + tmpdict['crop'] + "," + tmpdict["disease/pest"] + ")&field=dc:title,prism:doi,prism:publicationName"
#     key = '?apikey='
#     API_QUERY = SCOPUS_ENDPOINT + key + SCOPUS_API_KEY + query + '&sort=Relevance' 

#     print(API_QUERY)
#     response = requests.get(API_QUERY)
#     print(response.text)

#     json_data = response.json()

#     # entries = json_data['search-results']

#     # for i in range(5) :
#     #     print(entries[str(i)]['link']['dc:title'])

#     return "Default", 200

# # dict = {"crop": "corn",
# #         "disease/pest": "common_rust"
# #         }
# # output_scopus_research(dict)

# # Accepts a dictionary containing the keys, "crop" and "disease/pest"
# def output_pubag_research(dict):
#     API_ENDPOINT = 'https://api.nal.usda.gov/pubag/rest/search/'
#     API_KEY = 'DEMO_KEY'

#     tmpdict = dict
#     # query = "?query=" + tmpdict['crop'] + ',' + tmpdict['disease/pest'] + "&api_key=PC3ooOQmdd9uVlHiF0PIL8wLFgFXb5V6kiAH5GEP"

#     # API_QUERY = API_ENDPOINT + query

#     base_url = "https://api.nal.usda.gov/pubag/rest/search/"
#     # Construct the query string using the search terms and API key
#     query_string = "?query=" + tmpdict['crop'] + ',' + tmpdict['disease/pest'] + "&api_key=PC3ooOQmdd9uVlHiF0PIL8wLFgFXb5V6kiAH5GEP"
#     # Construct the full URL for the API call
#     full_url = base_url + query_string
#     # Send the API request and get the response
#     response = requests.get(full_url)

#     # print(API_QUERY)

#     # response = requests.get(API_QUERY)

#     print(response.status_code)
#     print(response.text)

# dict = {"crop": "corn",
#         "disease/pest": "common_rust"
#         }
# articles = output_pubag_research(dict)