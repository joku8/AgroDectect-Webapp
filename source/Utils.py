import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import io

CORN_LABELS = ['Blight', 'Common Rust', 'Healthy', 'Gray Leaf Spot']
SOYBEAN_LABELS = []

# Takes an image and returns a result array where index 0 is the class and index 1 is the confidence
def predict(image, crop):
    if crop == "corn":
        labels = CORN_LABELS

    if crop == "soybean":
        labels = SOYBEAN_LABELS

    # Load the model
    model = tf.keras.models.load_model('source/ml_models/model_' + crop + '.h5')

    # Load test image
    test_image = image.read()  # convert FileStorage to BytesIO
    test_image = load_img(io.BytesIO(test_image), target_size=(150, 150))  # load image from BytesIO

    # Convert to numpy array
    test_array = img_to_array(test_image)

    # Reshape the array to match the input shape of the model
    test_array = test_array.reshape((1,) + test_array.shape)

    # Make prediction
    probabilities = model.predict(test_array)[0]
    class_index = np.argmax(probabilities)
    class_label = (labels)[class_index]
    confidence = probabilities[class_index]

    result = [class_label, confidence]
    return result
