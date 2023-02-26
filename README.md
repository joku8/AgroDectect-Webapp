# AgroDetect - A Web Application for Detecting and Tracking Crop Disease and Pests

AgroDetect is a web application designed to assist farmers in identifying diseases and pests, and track their spread over time using AL and machine learning. It allows users to upload images of crop damage, and provides a likely cause of the damage along with a short description of what the predicted cause of damage is. The application can also collect location data from users to help monitor the spread of diseases and pests, and to alert farmers of the prevalence of pests in nearby areas.

## Dependencies
To deploy the AgroDetect web application, the following dependencies are required:

- Flask
- Flask-Cors
- NumPy
- TensorFlow
- Matplotlib
- Node.js
- npm
- python-Levenshtein
- MongoDB
- Mongoose

These dependencies can be installed using the requirements.txt file included in the project.

## Installation and Deployment
To install and deploy AgroDetect, follow these steps:

1. Clone the repository: `git clone https://github.com/Ky-Lee-375/AgroDetect.git`
2. Install the required dependencies using `npm install` and `pip install -r requirements.txt`
3. Run the commands in Additional.txt
3. Start the web application using `npm start` and `python app.py`
4. Start the backend server by using `brew services start mongodb-community@6.0` and `node server.js`

## Usage
To use AgroDetect, follow these steps:

1. Upload an image of crop damage to the web application.
2. The application will identify the likely cause of the damage and provide a short description of the problem.
3. Optionally, share your location data to help monitor the spread of diseases and pests. Also, find out the number of reports in your nearby area

## Technologies Used
AgroDetect is powered by the following technologies:

- TensorFlow: Used to train ML models to detect the type of crop damage.
- Python: Used to develop the backend of the application.
- HTML/CSS/JavaScript: Used to develop the frontend of the application.
- MongoDB: Used to store report data and retrieve location data from the web application.
- Mongoose: Used to interact with the MongoDB database in the application.

## Contributors
- Claudia Lee (kl35@illinois.edu)
- Joe Ku (jsku2@illinois.edu)
