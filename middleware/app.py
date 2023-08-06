from flask import Flask, request, jsonify
# from flask_react import React
from flask_cors import CORS
from source.Utils import *
import requests
import base64
import json

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST', 'OPTIONS'])
def upload():
    try:
        if request.method == 'POST':
            if 'image' in request.files and 'crop' in request.form:
                image_file = request.files['image']
                crop = json.loads(request.form['crop'])['crop']
                prediction = predict(image_file, crop)
                print(image_file)
                print(prediction)
                description = get_description(prediction[0])
                return jsonify({
                    "status": "success",
                    "prediction": str(prediction[0]),
                    "description": str(description[1])
                }), 200
            else :
                return jsonify({'status': 'error', 'message': 'Data not found'}), 400
        return jsonify({'status': 'success', 'message': 'Image uploaded successfully!'}), 200

    except Exception as e:
        print(str(e))
        return jsonify({'status': 'error', 'message': 'An error occurred.'}), 500

if __name__ == "__main__":
    app.run(debug=True)