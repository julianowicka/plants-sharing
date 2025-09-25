#!/usr/bin/env python3
"""
Test script to verify TensorFlow and dataset loading works
"""

import tensorflow as tf
import tensorflow_datasets as tfds
import numpy as np

def test_environment():
    print("🧪 Testing ML Environment")
    print("=" * 40)
    
    # Test TensorFlow
    print(f"✅ TensorFlow version: {tf.__version__}")
    print(f"✅ NumPy version: {np.__version__}")
    
    # Test GPU availability
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        print(f"✅ GPU available: {len(gpus)} device(s)")
    else:
        print("ℹ️  No GPU detected, using CPU")
    
    # Test dataset loading (small subset)
    print("\n📥 Testing PlantVillage dataset loading...")
    try:
        # Load a small subset to test
        (ds_train, ds_test), ds_info = tfds.load(
            'plant_village',
            split=['train[:10]', 'train[10:15]'],  # Very small subset
            shuffle_files=True,
            as_supervised=True,
            with_info=True
        )
        
        print(f"✅ Dataset loaded successfully!")
        print(f"📊 Number of classes: {ds_info.features['label'].num_classes}")
        print(f"📊 Training samples (subset): {len(ds_train)}")
        print(f"📊 Test samples (subset): {len(ds_test)}")
        
        # Show sample class names
        class_names = ds_info.features['label'].names
        print(f"🌿 Sample classes: {class_names[:5]}...")
        
        # Test data preprocessing
        print("\n🔄 Testing data preprocessing...")
        def format_image(image, label):
            image = tf.image.resize(image, (224, 224))
            image = tf.cast(image, tf.float32) / 255.0
            return image, label
        
        ds_train = ds_train.map(format_image).batch(2)
        
        # Test one batch
        for images, labels in ds_train.take(1):
            print(f"✅ Batch shape: {images.shape}")
            print(f"✅ Labels shape: {labels.shape}")
            break
            
        print("\n🎉 All tests passed! Environment is ready for training.")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    success = test_environment()
    if success:
        print("\n🚀 Ready to run: python train_disease_model.py")
    else:
        print("\n❌ Please fix the issues above before training.")


