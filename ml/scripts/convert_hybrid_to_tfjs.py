#!/usr/bin/env python3
"""
Convert hybrid houseplant model to TensorFlow.js format
"""

import os
import subprocess
import sys
import json

def convert_hybrid_model_to_tfjs():
    """Convert the hybrid houseplant model to TensorFlow.js format"""
    
    model_dir = "hybrid_houseplant_model"
    output_dir = "hybrid_houseplant_model_web"
    
    # Check if model exists
    if not os.path.exists(model_dir):
        print(f"❌ Model directory {model_dir} not found!")
        print("Please run hybrid_houseplant_model.py first.")
        return False
    
    print("🔄 Converting hybrid houseplant model to TensorFlow.js format...")
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
            print("✅ Hybrid model converted successfully!")
            print(f"📁 TensorFlow.js model saved in: {output_dir}")
            
            # List files in output directory
            if os.path.exists(output_dir):
                files = os.listdir(output_dir)
                print(f"📄 Generated files: {files}")
            
            # Copy additional files
            copy_additional_files(model_dir, output_dir)
            
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

def copy_additional_files(source_dir, target_dir):
    """Copy class names and care tips to the web model directory"""
    try:
        # Copy class names
        class_names_file = os.path.join(source_dir, "class_names.txt")
        if os.path.exists(class_names_file):
            import shutil
            shutil.copy2(class_names_file, target_dir)
            print("✅ Class names copied to web model directory")
        
        # Copy care tips
        care_tips_file = os.path.join(source_dir, "care_tips.json")
        if os.path.exists(care_tips_file):
            import shutil
            shutil.copy2(care_tips_file, target_dir)
            print("✅ Care tips copied to web model directory")
            
    except Exception as e:
        print(f"⚠️  Warning: Could not copy additional files: {e}")

def main():
    print("🌱 Hybrid Houseplant Model - TensorFlow.js Converter")
    print("=" * 60)
    
    success = convert_hybrid_model_to_tfjs()
    
    if success:
        print("\n🎉 Conversion completed!")
        print("📋 Next steps:")
        print("1. Copy the model files to your Next.js public directory")
        print("2. Update the API route to use the new model")
        print("3. Test the houseplant disease detection")
        print("\n📁 Files to copy:")
        print("   - hybrid_houseplant_model_web/model.json")
        print("   - hybrid_houseplant_model_web/*.bin files")
        print("   - hybrid_houseplant_model_web/class_names.txt")
        print("   - hybrid_houseplant_model_web/care_tips.json")
    else:
        print("\n❌ Conversion failed. Please check the errors above.")

if __name__ == "__main__":
    main()

