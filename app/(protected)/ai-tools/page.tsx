"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  Leaf, 
  AlertTriangle, 
  CheckCircle, 
  Loader2,
  Camera,
  FileImage,
  Sparkles
} from 'lucide-react';

interface DiseasePrediction {
  disease: string;
  confidence: number;
  isHealthy: boolean;
  careTips: string;
}

interface AlternativePrediction {
  disease: string;
  confidence: number;
}

interface PredictionResponse {
  success: boolean;
  prediction: DiseasePrediction;
  alternatives: AlternativePrediction[];
}

export default function AIToolsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setPrediction(null);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setUploadedImage(previewUrl);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/ai/disease-detection', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze image');
      }

      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const resetAnalysis = () => {
    setPrediction(null);
    setError(null);
    setUploadedImage(null);
    if (uploadedImage) {
      URL.revokeObjectURL(uploadedImage);
    }
  };

  return (
    <div className="m-0 p-1 sm:p-10 pt-10 w-[100%]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-800">AI Doktor Roślin</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Wrzuć zdjęcie liści swojej rośliny i otrzymaj natychmiastową diagnozę chorób 
            z analizą AI i spersonalizowanymi zaleceniami pielęgnacji.
          </p>
        </div>

        {/* Upload Area */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200
              ${isDragActive 
                ? 'border-green-400 bg-green-50' 
                : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }
              ${isAnalyzing ? 'pointer-events-none opacity-50' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            {isAnalyzing ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Analizuję Twoją roślinę...
                  </h3>
                  <p className="text-gray-600">
                    Nasze AI bada obraz w poszukiwaniu oznak chorób
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-green-100 rounded-full">
                  <Camera className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {isDragActive ? 'Upuść zdjęcie tutaj' : 'Wrzuć zdjęcie rośliny'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Przeciągnij i upuść lub kliknij, aby wybrać zdjęcie liści rośliny
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <FileImage className="w-4 h-4" />
                    <span>Obsługuje: JPG, PNG, WebP (max 10MB)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {uploadedImage && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Preview */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-green-600" />
                  Wrzucone zdjęcie
                </h3>
              </div>
              <div className="p-6">
                <img
                  src={uploadedImage}
                  alt="Wrzucona roślina"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <button
                  onClick={resetAnalysis}
                  className="mt-4 w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Wrzuć nowe zdjęcie
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="bg-white rounded-2xl shadow-xl">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {prediction?.prediction.isHealthy ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  )}
                  Wyniki analizy
                </h3>
              </div>
              <div className="p-6">
                {error ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Analiza nie powiodła się
                    </h4>
                    <p className="text-gray-600">{error}</p>
                  </div>
                ) : prediction ? (
                  <div className="space-y-6">
                    {/* Main Prediction */}
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-3 ${
                        prediction.prediction.isHealthy 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {prediction.prediction.isHealthy ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        {prediction.prediction.isHealthy ? 'Zdrowa roślina' : 'Wykryto chorobę'}
                      </div>
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">
                        {prediction.prediction.disease}
                      </h4>
                      <div className="text-2xl font-bold text-green-600">
                        {prediction.prediction.confidence}% pewności
                      </div>
                    </div>

                    {/* Care Tips */}
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-2">Zalecenia pielęgnacji:</h5>
                      <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                        {prediction.prediction.careTips}
                      </p>
                    </div>

                    {/* Alternative Predictions */}
                    {prediction.alternatives.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Inne możliwości:</h5>
                        <div className="space-y-2">
                          {prediction.alternatives.map((alt, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <span className="text-gray-700">{alt.disease}</span>
                              <span className="text-sm text-gray-500">{alt.confidence}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Jak to działa
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">1. Wrzuć zdjęcie</h4>
              <p className="text-gray-600 text-sm">
                Zrób wyraźne zdjęcie liści rośliny pokazujące ewentualne objawy
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">2. Analiza AI</h4>
              <p className="text-gray-600 text-sm">
                Nasz wytrenowany model analizuje obraz używając computer vision
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">3. Otrzymaj wyniki</h4>
              <p className="text-gray-600 text-sm">
                Otrzymaj diagnozę, poziom pewności i zalecenia pielęgnacji
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}