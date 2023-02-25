import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

# Load the model
model = tf.keras.models.load_model('model_s.h5')

# Load test image
test_image = load_img('images/definetelyNOTcommon_rust.jpeg', target_size=(150, 150))

# Convert to numpy array
test_array = img_to_array(test_image)

# Reshape the array to match the input shape of the model
test_array = test_array.reshape((1,) + test_array.shape)

# Make prediction
probabilities = model.predict(test_array)[0]
class_index = np.argmax(probabilities)
class_label = ['Blight', 'Common Rust', 'Healthy', 'Gray Leaf Spot'][class_index]
confidence = probabilities[class_index]

print(f"Class: {class_label}, Confidence: {confidence:.2f}")
