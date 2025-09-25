# Plant Disease Detection - ML Pipeline

This directory contains the machine learning pipeline for plant disease detection using the PlantVillage dataset.

## 🚀 Quick Start

### 1. Setup Environment

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Train Model

```bash
python train_disease_model.py
```

This will:
- Download PlantVillage dataset (first run only)
- Train a MobileNetV2-based model with transfer learning
- Save the model to `plant_disease_model/`
- Generate training history plots

### 3. Convert to TensorFlow.js

```bash
python convert_to_tfjs.py
```

This converts the trained model to TensorFlow.js format for use in the web application.

## 📊 Model Details

- **Base Model**: MobileNetV2 (pre-trained on ImageNet)
- **Input Size**: 224x224x3
- **Classes**: 38 plant disease categories from PlantVillage dataset
- **Training**: Transfer learning with frozen base layers
- **Optimization**: Adam optimizer with learning rate 0.001

## 📁 Output Files

After training and conversion:

```
ml/
├── plant_disease_model/          # TensorFlow SavedModel format
│   ├── saved_model.pb
│   ├── variables/
│   └── class_names.txt
├── plant_disease_model_web/      # TensorFlow.js format
│   ├── model.json
│   └── *.bin files
└── training_history.png          # Training metrics plot
```

## 🔧 Customization

### Modify Training Parameters

Edit `train_disease_model.py`:

```python
IMG_SIZE = 224        # Image resolution
BATCH_SIZE = 32       # Batch size
EPOCHS = 10          # Number of training epochs
LEARNING_RATE = 0.001 # Learning rate
```

### Add Data Augmentation

```python
def augment_image(image, label):
    image = tf.image.random_flip_left_right(image)
    image = tf.image.random_brightness(image, 0.2)
    image = tf.image.random_contrast(image, 0.8, 1.2)
    return image, label

ds_train = ds_train.map(augment_image)
```

## 🎯 Performance Tips

1. **GPU Training**: Install TensorFlow with GPU support for faster training
2. **Data Augmentation**: Add more augmentation for better generalization
3. **Fine-tuning**: Unfreeze base model layers for final epochs
4. **Hyperparameter Tuning**: Experiment with learning rates and batch sizes

## 📈 Expected Results

- **Training Accuracy**: ~95-98%
- **Validation Accuracy**: ~85-90%
- **Model Size**: ~10-15MB (TensorFlow.js format)
- **Inference Time**: ~100-200ms (CPU), ~20-50ms (GPU)

## 🚨 Troubleshooting

### Common Issues

1. **Out of Memory**: Reduce batch size or image size
2. **Slow Training**: Use GPU or reduce dataset size
3. **Poor Accuracy**: Increase epochs or add data augmentation
4. **Conversion Errors**: Ensure tensorflowjs is installed

### Memory Requirements

- **Training**: 8GB+ RAM recommended
- **Dataset**: ~1GB download (first time)
- **Model Storage**: ~50MB total

## 🔗 Integration

The converted model integrates with the Next.js application via:

1. **API Route**: `/api/ai/disease-detection`
2. **Frontend**: AI Tools page with drag-and-drop upload
3. **Backend**: TensorFlow.js Node.js runtime

See the main application README for integration details.

