#!/usr/bin/env python3
"""
Plant Disease Detection Model Training
Uses PlantVillage dataset with transfer learning for houseplant disease detection
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow_datasets as tfds
import numpy as np
import matplotlib.pyplot as plt
import os

# Set random seeds for reproducibility
tf.random.set_seed(42)
np.random.seed(42)

# Configuration
IMG_SIZE = 224  # Standard size for transfer learning
BATCH_SIZE = 32
EPOCHS = 10
LEARNING_RATE = 0.001

def format_image(image, label):
    """Preprocess images for training"""
    image = tf.image.resize(image, (IMG_SIZE, IMG_SIZE))
    image = tf.cast(image, tf.float32) / 255.0
    return image, label

def create_model(num_classes):
    """Create model with transfer learning from MobileNetV2"""
    # Load pre-trained MobileNetV2
    base_model = keras.applications.MobileNetV2(
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
        include_top=False,
        weights="imagenet"
    )
    
    # Freeze base model layers
    base_model.trainable = False
    
    # Add custom classification head
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.2),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

def plot_training_history(history):
    """Plot training and validation metrics"""
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
    
    # Plot accuracy
    ax1.plot(history.history['accuracy'], label='Training Accuracy')
    ax1.plot(history.history['val_accuracy'], label='Validation Accuracy')
    ax1.set_title('Model Accuracy')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    
    # Plot loss
    ax2.plot(history.history['loss'], label='Training Loss')
    ax2.plot(history.history['val_loss'], label='Validation Loss')
    ax2.set_title('Model Loss')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Loss')
    ax2.legend()
    
    plt.tight_layout()
    plt.savefig('training_history.png')
    plt.show()

def main():
    print("🌱 Starting Plant Disease Detection Model Training")
    print("=" * 50)
    
    # Load PlantVillage dataset
    print("📥 Loading PlantVillage dataset...")
    try:
        (ds_train, ds_test), ds_info = tfds.load(
            'plant_village',
            split=['train[:80%]', 'train[80%:]'],
            shuffle_files=True,
            as_supervised=True,
            with_info=True
        )
        print(f"✅ Dataset loaded successfully!")
        print(f"📊 Number of classes: {ds_info.features['label'].num_classes}")
        print(f"📊 Training samples: {len(ds_train)}")
        print(f"📊 Test samples: {len(ds_test)}")
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")
        return
    
    # Get class names
    class_names = ds_info.features['label'].names
    print(f"🌿 Sample classes: {class_names[:10]}...")
    
    # Preprocess datasets
    print("🔄 Preprocessing datasets...")
    ds_train = ds_train.map(format_image).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
    ds_test = ds_test.map(format_image).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
    
    # Create model
    print("🧠 Creating model with transfer learning...")
    model = create_model(ds_info.features['label'].num_classes)
    
    # Compile model
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    
    # Print model summary
    print("📋 Model Summary:")
    model.summary()
    
    # Train model
    print(f"🚀 Starting training for {EPOCHS} epochs...")
    history = model.fit(
        ds_train,
        epochs=EPOCHS,
        validation_data=ds_test,
        verbose=1
    )
    
    # Evaluate model
    print("📊 Evaluating model...")
    test_loss, test_accuracy = model.evaluate(ds_test, verbose=0)
    print(f"✅ Test Accuracy: {test_accuracy:.4f}")
    print(f"✅ Test Loss: {test_loss:.4f}")
    
    # Plot training history
    print("📈 Plotting training history...")
    plot_training_history(history)
    
    # Save model
    model_dir = "plant_disease_model"
    print(f"💾 Saving model to {model_dir}...")
    model.save(model_dir)
    
    # Save class names for later use
    with open(f"{model_dir}/class_names.txt", "w") as f:
        for class_name in class_names:
            f.write(f"{class_name}\n")
    
    print("🎉 Training completed successfully!")
    print(f"📁 Model saved in: {model_dir}")
    print(f"📁 Class names saved in: {model_dir}/class_names.txt")
    print("\n🔄 Next step: Convert to TensorFlow.js format")
    print("Run: tensorflowjs_converter --input_format=tf_saved_model plant_disease_model ./plant_disease_model_web")

if __name__ == "__main__":
    main()

