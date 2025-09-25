import { NextRequest, NextResponse } from 'next/server';
// import * as tf from '@tensorflow/tfjs-node';
import sharp from 'sharp';

// Global model cache
// let model: tf.LayersModel | null = null;
let classNames: string[] = [];

// Disease care recommendations mapping for houseplants
const diseaseCareTips: Record<string, string> = {
  'Houseplant_Healthy': 'Kontynuuj regularną pielęgnację. Obserwuj roślinę pod kątem zmian.',
  'Houseplant_Overwatered': 'Zmniejsz częstotliwość podlewania. Sprawdź drenaż. Pozwól glebie wyschnąć między podlewaniem.',
  'Houseplant_Underwatered': 'Zwiększ częstotliwość podlewania. Regularnie sprawdzaj wilgotność gleby.',
  'Houseplant_LowLight': 'Przenieś w jaśniejsze miejsce. Rozważ lampy do uprawy dla roślin domowych.',
  'Houseplant_TooMuchLight': 'Przenieś w bardziej zacienione miejsce. Chroń przed bezpośrednim słońcem.',
  'Houseplant_NutrientDeficiency': 'Nawoź zbilansowanym nawozem. Sprawdź pH gleby.'
};

async function loadModel() {
  if (classNames.length > 0) {
    return { classNames };
  }

  try {
    console.log('Loading mock model...');
    
    // For now, return mock data since model doesn't exist yet
    // TODO: Implement actual model loading when model is trained
    classNames = [
      'Houseplant_Healthy',
      'Houseplant_Overwatered', 
      'Houseplant_Underwatered',
      'Houseplant_LowLight',
      'Houseplant_TooMuchLight',
      'Houseplant_NutrientDeficiency'
    ];
    
    console.log(`Mock model loaded with ${classNames.length} classes`);
    return { classNames };
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load disease detection model');
  }
}

async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  try {
    // Resize and normalize image using Sharp
    const processedBuffer = await sharp(imageBuffer)
      .resize(224, 224)
      .removeAlpha()
      .jpeg()
      .toBuffer();
    
    return processedBuffer;
  } catch (error) {
    console.error('Error preprocessing image:', error);
    throw new Error('Failed to preprocess image');
  }
}

function formatDiseaseName(diseaseName: string): string {
  const diseaseTranslations: Record<string, string> = {
    'Houseplant_Healthy': 'Zdrowa roślina',
    'Houseplant_Overwatered': 'Przelana',
    'Houseplant_Underwatered': 'Przesuszona',
    'Houseplant_LowLight': 'Za mało światła',
    'Houseplant_TooMuchLight': 'Za dużo światła',
    'Houseplant_NutrientDeficiency': 'Brak składników odżywczych'
  };
  
  return diseaseTranslations[diseaseName] || diseaseName
    .replace('Houseplant_', '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nie podano pliku obrazu' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Plik musi być obrazem' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Rozmiar pliku musi być mniejszy niż 10MB' },
        { status: 400 }
      );
    }

    // Load model
    const { classNames } = await loadModel();

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Preprocess image (for future use)
    await preprocessImage(imageBuffer);

    // For now, return mock predictions since model doesn't exist yet
    // TODO: Implement actual prediction when model is trained
    const mockPredictions = [
      { className: 'Houseplant_Healthy', confidence: 0.85 },
      { className: 'Houseplant_Overwatered', confidence: 0.10 },
      { className: 'Houseplant_Underwatered', confidence: 0.05 }
    ];
    
    const topPredictions = mockPredictions.map(p => ({
      className: p.className,
      confidence: p.confidence,
      formattedName: formatDiseaseName(p.className)
    }));

    // Get care tips for top prediction
    const topPrediction = topPredictions[0];
    const careTips = diseaseCareTips[topPrediction.className] || 'Obserwuj roślinę i skonsultuj się z ekspertem od roślin w celu uzyskania konkretnych porad pielęgnacyjnych.';

    // Determine if plant is healthy
    const isHealthy = topPrediction.className.includes('healthy');
    const confidence = Math.round(topPrediction.confidence * 100);

    return NextResponse.json({
      success: true,
      prediction: {
        disease: topPrediction.formattedName,
        confidence: confidence,
        isHealthy: isHealthy,
        careTips: careTips
      },
      alternatives: topPredictions.slice(1).map(p => ({
        disease: p.formattedName,
        confidence: Math.round(p.confidence * 100)
      }))
    });

  } catch (error) {
    console.error('Disease detection error:', error);
    return NextResponse.json(
      { 
        error: 'Nie udało się przeanalizować choroby rośliny',
        details: error instanceof Error ? error.message : 'Nieznany błąd'
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  try {
    const { classNames } = await loadModel();
    return NextResponse.json({
      status: 'healthy',
      modelLoaded: false, // Mock model
      classesCount: classNames.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error',
        error: error instanceof Error ? error.message : 'Nieznany błąd'
      },
      { status: 500 }
    );
  }
}