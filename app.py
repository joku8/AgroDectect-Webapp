from flask import Flask, request
# from flask_react import React
from flask_cors import CORS
from source.Utils import *

app = Flask(__name__)
CORS(app)


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
    print(predict(file, "corn"))

    return 'File saved', 200


if __name__ == "__main__":
    app.run(debug=True)
