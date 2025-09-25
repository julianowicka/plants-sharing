#!/usr/bin/env python3
"""
Convert trained TensorFlow model to TensorFlow.js format
"""

import os
import subprocess
import sys

def convert_model_to_tfjs():
    """Convert the saved model to TensorFlow.js format"""
    
    model_dir = "plant_disease_model"
    output_dir = "plant_disease_model_web"
    
    # Check if model exists
    if not os.path.exists(model_dir):
        print(f"❌ Model directory {model_dir} not found!")
        print("Please run train_disease_model.py first.")
        return False
    
    print("🔄 Converting model to TensorFlow.js format...")
    print(f"📁 Input: {model_dir}")
    print(f"📁 Output: {output_dir}")
    
    try:
        # Run tensorflowjs_converter
        cmd = [
            "tensorflowjs_converter",
            "--input_format=tf_saved_model",
            "--output_format=tfjs_graph_model",
            "--quantize_float16",
            model_dir,
            output_dir
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Model converted successfully!")
            print(f"📁 TensorFlow.js model saved in: {output_dir}")
            
            # List files in output directory
            if os.path.exists(output_dir):
                files = os.listdir(output_dir)
                print(f"📄 Generated files: {files}")
            
            return True
        else:
            print(f"❌ Conversion failed: {result.stderr}")
            return False
            
    except FileNotFoundError:
        print("❌ tensorflowjs_converter not found!")
        print("Please install it with: pip install tensorflowjs")
        return False
    except Exception as e:
        print(f"❌ Error during conversion: {e}")
        return False

def main():
    print("🌱 Plant Disease Model - TensorFlow.js Converter")
    print("=" * 50)
    
    success = convert_model_to_tfjs()
    
    if success:
        print("\n🎉 Conversion completed!")
        print("📋 Next steps:")
        print("1. Copy the model files to your Next.js public directory")
        print("2. Install @tensorflow/tfjs-node in your Next.js project")
        print("3. Create API route for disease detection")
    else:
        print("\n❌ Conversion failed. Please check the errors above.")

if __name__ == "__main__":
    main()

