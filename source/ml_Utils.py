import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

def create_model(crop, val_dir=None):
    # Set the data directories
    train_dir = 'datasets/' + crop + '/train'
    test_dir = 'datasets/' + crop + '/test'
    val_dir = 'datasets/' + crop + '/val' if val_dir else None

    # Load the data
    train_datagen = ImageDataGenerator(rescale=1./255)
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(150, 150),
        batch_size=32,
        class_mode='categorical')
    
    classes = list(train_generator.class_indices.keys())
    num_classes = len(classes)

    test_datagen = ImageDataGenerator(rescale=1./255)
    test_generator = test_datagen.flow_from_directory(
        test_dir,
        target_size=(150, 150),
        batch_size=32,
        class_mode='categorical',
        shuffle=False)

    if val_dir:
        val_datagen = ImageDataGenerator(rescale=1./255)
        val_generator = val_datagen.flow_from_directory(
            val_dir,
            target_size=(150, 150),
            batch_size=32,
            class_mode='categorical')
    else:
        val_generator = None

    # Build the model
    model = tf.keras.models.Sequential([
        tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(150, 150, 3)),
        tf.keras.layers.MaxPooling2D(2, 2),
        tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Conv2D(128, (3,3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Conv2D(128, (3,3), activation='relu'),
        tf.keras.layers.MaxPooling2D(2,2),
        tf.keras.layers.Flatten(),
        tf.keras.layers.Dense(512, activation='relu'),
        tf.keras.layers.Dense(num_classes, activation='softmax') # change the output layer to 4 classes ********
    ])
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

    # Train the model
    if val_generator:
        model.fit(
            train_generator,
            steps_per_epoch=100,
            epochs=10,
            validation_data=val_generator,
            validation_steps=50
        )
    else:
        model.fit(
            train_generator,
            steps_per_epoch=100,
            epochs=10
        )

    # Evaluate the model
    model.evaluate(test_generator)

    # Save the model
    model.save('ml_models/model_' + crop + '.h5')

    classes = list(train_generator.class_indices.keys())
    num_classes = len(classes)

    return classes