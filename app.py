from flask import Flask, request
# from flask_react import React
from flask_cors import CORS
# from source.Utils import *

app = Flask(__name__)
CORS(app)

corn = False
soybean = False

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


@app.route('/upload', methods=['POST'])
def upload_file():
    print("/upload is called")
    if 'file' not in request.files:
        return 'No file uploaded', 400

    file = request.files['file']
    # file.save('uploads/' + file.filename)
    print(file)
    # print(predict(file, "corn")) ## CHANGE CORN TO VARIABLE

    return 'File saved', 200


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


if __name__ == "__main__":
    app.run(debug=True)
