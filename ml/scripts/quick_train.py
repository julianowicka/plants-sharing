#!/usr/bin/env python3
"""
Quick training script for testing - uses small dataset and few epochs
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import tensorflow_datasets as tfds
import numpy as np
import os

# Set random seeds for reproducibility
tf.random.set_seed(42)
np.random.seed(42)

# Configuration for quick training
IMG_SIZE = 224
BATCH_SIZE = 16
EPOCHS = 2  # Very few epochs for testing
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

def main():
    print("🌱 Quick Plant Disease Model Training")
    print("=" * 50)
    
    # Load PlantVillage dataset (small subset for testing)
    print("📥 Loading PlantVillage dataset (small subset)...")
    try:
        (ds_train, ds_test), ds_info = tfds.load(
            'plant_village',
            split=['train[:1000]', 'train[1000:1200]'],  # Small subset
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
    print(f"🌿 Sample classes: {class_names[:5]}...")
    
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
    print(f"🚀 Starting quick training for {EPOCHS} epochs...")
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
    
    # Save model
    model_dir = "plant_disease_model_quick"
    print(f"💾 Saving model to {model_dir}...")
    model.save(model_dir)
    
    # Save class names for later use
    with open(f"{model_dir}/class_names.txt", "w") as f:
        for class_name in class_names:
            f.write(f"{class_name}\n")
    
    print("🎉 Quick training completed successfully!")
    print(f"📁 Model saved in: {model_dir}")
    print(f"📁 Class names saved in: {model_dir}/class_names.txt")
    print("\n🔄 Next step: Convert to TensorFlow.js format")
    print("Run: python convert_to_tfjs.py")

if __name__ == "__main__":
    main()

