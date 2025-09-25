#!/usr/bin/env python3
"""
Convert Keras model to SavedModel format for TensorFlow.js conversion
"""

import tensorflow as tf
import os

def convert_keras_to_savedmodel():
    """Convert .keras model to SavedModel format"""
    
    keras_model_path = "hybrid_houseplant_model.keras"
    savedmodel_path = "hybrid_houseplant_model"
    
    if not os.path.exists(keras_model_path):
        print(f"❌ Keras model not found: {keras_model_path}")
        return False
    
    print("🔄 Converting Keras model to SavedModel format...")
    print(f"📁 Input: {keras_model_path}")
    print(f"📁 Output: {savedmodel_path}")
    
    try:
        # Load Keras model
        model = tf.keras.models.load_model(keras_model_path)
        print("✅ Keras model loaded successfully")
        
        # Save as SavedModel using export method
        model.export(savedmodel_path)
        print("✅ Model saved in SavedModel format")
        
        # Verify the conversion
        if os.path.exists(savedmodel_path):
            files = os.listdir(savedmodel_path)
            print(f"📄 SavedModel files: {files}")
            return True
        else:
            print("❌ SavedModel directory not created")
            return False
            
    except Exception as e:
        print(f"❌ Error during conversion: {e}")
        return False

def main():
    print("🌱 Keras to SavedModel Converter")
    print("=" * 40)
    
    success = convert_keras_to_savedmodel()
    
    if success:
        print("\n🎉 Conversion completed!")
        print("📋 Next step: Convert to TensorFlow.js format")
        print("Run: python convert_hybrid_to_tfjs.py")
    else:
        print("\n❌ Conversion failed. Please check the errors above.")

if __name__ == "__main__":
    main()
