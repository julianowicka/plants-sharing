#!/usr/bin/env python3
"""
Direct conversion using TensorFlow.js Python API
"""

import tensorflow as tf
import tensorflowjs as tfjs
import os

def convert_direct():
    """Convert model directly using TensorFlow.js Python API"""
    
    model_path = "hybrid_houseplant_model"
    output_path = "hybrid_houseplant_model_web"
    
    if not os.path.exists(model_path):
        print(f"❌ Model not found: {model_path}")
        return False
    
    print("🔄 Converting model using TensorFlow.js Python API...")
    print(f"📁 Input: {model_path}")
    print(f"📁 Output: {output_path}")
    
    try:
        # Load the SavedModel
        model = tf.saved_model.load(model_path)
        print("✅ Model loaded successfully")
        
        # Convert to TensorFlow.js format
        tfjs.converters.tf_saved_model_conversion_v2.convert_tf_saved_model(
            model_path,
            output_path,
            skip_op_check=True,
            strip_debug_ops=True
        )
        
        print("✅ Model converted successfully!")
        
        # List files in output directory
        if os.path.exists(output_path):
            files = os.listdir(output_path)
            print(f"📄 Generated files: {files}")
            return True
        else:
            print("❌ Output directory not created")
            return False
            
    except Exception as e:
        print(f"❌ Error during conversion: {e}")
        return False

def main():
    print("🌱 Direct TensorFlow.js Conversion")
    print("=" * 40)
    
    success = convert_direct()
    
    if success:
        print("\n🎉 Conversion completed!")
        print("📋 Next step: Copy model to Next.js public directory")
    else:
        print("\n❌ Conversion failed. Please check the errors above.")

if __name__ == "__main__":
    main()
