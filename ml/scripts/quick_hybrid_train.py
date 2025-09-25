#!/usr/bin/env python3
"""
Quick hybrid training without plotting - saves model immediately
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

# Configuration
IMG_SIZE = 224
BATCH_SIZE = 32
EPOCHS = 3  # Fewer epochs for quick training
LEARNING_RATE = 0.001

# Custom houseplant classes
HOUSEPLANT_CLASSES = [
    'Houseplant_Healthy',
    'Houseplant_Overwatered', 
    'Houseplant_Underwatered',
    'Houseplant_LowLight',
    'Houseplant_TooMuchLight',
    'Houseplant_NutrientDeficiency'
]

def format_image(image, label):
    """Preprocess images for training"""
    image = tf.image.resize(image, (IMG_SIZE, IMG_SIZE))
    image = tf.cast(image, tf.float32) / 255.0
    return image, label

def augment_image(image, label):
    """Data augmentation for better generalization"""
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_brightness(image, 0.2)
    image = tf.image.random_contrast(image, 0.8, 1.2)
    return image, label

def create_hybrid_model(num_houseplant_classes):
    """Create hybrid model with MobileNetV2 base"""
    
    # Load pre-trained MobileNetV2
    base_model = keras.applications.MobileNetV2(
        input_shape=(IMG_SIZE, IMG_SIZE, 3),
        include_top=False,
        weights="imagenet"
    )
    
    # Freeze most layers initially
    base_model.trainable = False
    
    # Create hybrid model
    model = keras.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.3),
        layers.Dense(256, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(num_houseplant_classes, activation='softmax', name='houseplant_output')
    ])
    
    return model

def create_synthetic_data(base_dataset, class_names, num_samples=300):
    """Create synthetic houseplant data"""
    
    synthetic_data = []
    synthetic_labels = []
    
    # Map PlantVillage classes to houseplant issues
    class_mapping = {
        'healthy': 0,
        'scab': 1, 'rot': 1,      # Overwatered
        'blight': 2, 'spot': 2,   # Underwatered
        'mildew': 3,              # LowLight
        'rust': 4,                # TooMuchLight
        'mosaic': 5,              # NutrientDeficiency
    }
    
    print("🔄 Creating synthetic houseplant data...")
    
    for image, label in base_dataset.take(num_samples):
        class_name = class_names[label.numpy()]
        
        # Determine houseplant class
        houseplant_class = 0  # Default to healthy
        for pattern, target_class in class_mapping.items():
            if pattern in class_name.lower():
                houseplant_class = target_class
                break
        
        # Apply transformations
        transformed_image = image
        if houseplant_class == 1:  # Overwatered
            transformed_image = tf.image.adjust_hue(transformed_image, 0.1)
        elif houseplant_class == 2:  # Underwatered
            transformed_image = tf.image.adjust_brightness(transformed_image, -0.1)
        elif houseplant_class == 3:  # LowLight
            transformed_image = tf.image.adjust_brightness(transformed_image, -0.2)
        elif houseplant_class == 4:  # TooMuchLight
            transformed_image = tf.image.adjust_brightness(transformed_image, 0.3)
        elif houseplant_class == 5:  # NutrientDeficiency
            transformed_image = tf.image.adjust_hue(transformed_image, 0.2)
        
        synthetic_data.append(transformed_image)
        synthetic_labels.append(houseplant_class)
    
    return synthetic_data, synthetic_labels

def main():
    print("🌱 Quick Hybrid Houseplant Model Training")
    print("=" * 50)
    
    # Load PlantVillage dataset
    print("📥 Loading PlantVillage dataset...")
    try:
        (ds_train, ds_test), ds_info = tfds.load(
            'plant_village',
            split=['train[:1000]', 'train[1000:1200]'],
            shuffle_files=True,
            as_supervised=True,
            with_info=True
        )
        print(f"✅ Dataset loaded successfully!")
        print(f"📊 Training samples: {len(ds_train)}")
        print(f"📊 Test samples: {len(ds_test)}")
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")
        return
    
    # Get class names
    class_names = ds_info.features['label'].names
    print(f"🌿 Sample classes: {class_names[:3]}...")
    
    # Create synthetic data
    print("🔄 Creating synthetic houseplant dataset...")
    synthetic_train_data, synthetic_train_labels = create_synthetic_data(ds_train, class_names, 200)
    synthetic_test_data, synthetic_test_labels = create_synthetic_data(ds_test, class_names, 50)
    
    # Convert to TensorFlow datasets
    train_dataset = tf.data.Dataset.from_tensor_slices((synthetic_train_data, synthetic_train_labels))
    test_dataset = tf.data.Dataset.from_tensor_slices((synthetic_test_data, synthetic_test_labels))
    
    # Preprocess datasets
    print("🔄 Preprocessing datasets...")
    train_dataset = train_dataset.map(format_image).map(augment_image).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
    test_dataset = test_dataset.map(format_image).batch(BATCH_SIZE).prefetch(tf.data.AUTOTUNE)
    
    # Create model
    print("🧠 Creating hybrid model...")
    model = create_hybrid_model(len(HOUSEPLANT_CLASSES))
    
    # Compile model
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=LEARNING_RATE),
        loss="sparse_categorical_crossentropy",
        metrics=["accuracy"]
    )
    
    # Train model
    print(f"🚀 Starting quick training for {EPOCHS} epochs...")
    history = model.fit(
        train_dataset,
        epochs=EPOCHS,
        validation_data=test_dataset,
        verbose=1
    )
    
    # Evaluate model
    print("📊 Evaluating model...")
    test_loss, test_accuracy = model.evaluate(test_dataset, verbose=0)
    print(f"✅ Test Accuracy: {test_accuracy:.4f}")
    print(f"✅ Test Loss: {test_loss:.4f}")
    
    # Save model
    model_dir = "hybrid_houseplant_model"
    print(f"💾 Saving model to {model_dir}...")
    model.save(f"{model_dir}.keras")
    
    # Create directory for additional files
    os.makedirs(model_dir, exist_ok=True)
    
    # Save class names
    with open(f"{model_dir}/class_names.txt", "w") as f:
        for class_name in HOUSEPLANT_CLASSES:
            f.write(f"{class_name}\n")
    
    # Save care recommendations
    care_tips = {
        'Houseplant_Healthy': 'Continue regular care routine. Monitor for any changes.',
        'Houseplant_Overwatered': 'Reduce watering frequency. Check drainage. Let soil dry between waterings.',
        'Houseplant_Underwatered': 'Increase watering frequency. Check soil moisture regularly.',
        'Houseplant_LowLight': 'Move to brighter location. Consider grow lights for indoor plants.',
        'Houseplant_TooMuchLight': 'Move to shadier location. Protect from direct sunlight.',
        'Houseplant_NutrientDeficiency': 'Fertilize with balanced plant food. Check soil pH.'
    }
    
    import json
    with open(f"{model_dir}/care_tips.json", "w") as f:
        json.dump(care_tips, f, indent=2)
    
    print("🎉 Quick training completed successfully!")
    print(f"📁 Model saved in: {model_dir}")
    print(f"📁 Class names saved in: {model_dir}/class_names.txt")
    print(f"📁 Care tips saved in: {model_dir}/care_tips.json")
    print("\n🔄 Next step: Convert to TensorFlow.js format")
    print("Run: python convert_hybrid_to_tfjs.py")

if __name__ == "__main__":
    main()
