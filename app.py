from flask import Flask, request, jsonify
# from flask_react import React
from flask_cors import CORS
# from source.Utils import *

app = Flask(__name__)
CORS(app)

corn = False
soybean = False

Latitude = 0
Longitude = 0 
diseaseName = ''

@app.route("/")
def index():
    # Render the React page
    return {
      'resultStatus': 'SUCCESS',
      'message': "app.py default"
      }

@app.route("/get", methods=['GET'])
def Defaultget():
    # Render the React page
    return {
      'resultStatus': 'GET SUCCESS',
      'message': "app.py default"
      }


# @app.route('/upload', methods=['POST'])
# def upload_file():
#     global diseaseName
#     print("/upload is called")
#     if 'file' not in request.files:
#         return 'No file uploaded', 400

#     file = request.files['file']
#     # file.save('uploads/' + file.filename)
#     print(file)
#     if corn :
#         result = predict(file, "corn")
#         get_des = get_description(result[0])
#         # print(result)
#         diseaseName = get_des[0]
#         return {'status': 'success', 'prediction': get_des[0], 'description' : get_des[1]}, 200
#     if soybean :
#         result = predict(file, "soybean")
#         get_des = get_description(result[0])
#         diseaseName = get_des[0]
#         # print(result)
#         return {'status': 'success', 'prediction': get_des[0], 'description' : get_des[1]}, 200


    return 'could not recognize crop, select one', 404


@app.route('/crop', methods=['POST'])
def crop():
    global corn
    global soybean

    data = request.get_json()
    corn = data.get('corn')
    soybean = data.get('soybean')
    # print(corn)
    # print(soybean)
    return 'Crop data received'

@app.route('/location', methods=['POST'])
def location():
    global Latitude 
    global Longitude 
    global diseaseName

    data = request.get_json()

    radius = 25
    latitude = data.get('Latitude')
    longitude = data.get('Longitude')

    print(latitude)
    print(longitude)

    dbDict = {"radius": radius,  "latitude": latitude, "longitude": longitude}

    return dbDict, 200

if __name__ == "__main__":
    app.run(debug=True)
