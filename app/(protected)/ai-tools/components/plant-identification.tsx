'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  CircularProgress,
  Alert,
  Chip,
  Grid,
  Paper
} from '@mui/material';
import { 
  ArrowBack, 
  CloudUpload, 
  CheckCircle, 
  Error,
  PhotoCamera
} from '@mui/icons-material';

interface PlantIdentificationResult {
  species: string;
  confidence: number;
  description: string;
  careTips: string[];
}

export function PlantIdentification({ onBack }: { onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PlantIdentificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Create image preview
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);

      // Convert file to base64 for API call
      const base64 = await fileToBase64(file);
      
      // Call our API endpoint for plant identification
      const response = await fetch('/api/ai/plant-identification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas identyfikacji rośliny');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
    } finally {
      setIsLoading(false);
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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Remove data:image/...;base64, prefix
      };
      reader.onerror = error => reject(error);
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mb: 2 }}
        >
          Powrót do narzędzi AI
        </Button>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          🔍 Identyfikacja Roślin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Prześlij zdjęcie rośliny, a nasze AI zidentyfikuje gatunek i udzieli porad dotyczących pielęgnacji.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prześlij zdjęcie
              </Typography>
              <Paper
                {...getRootProps()}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.300',
                  backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                <input {...getInputProps()} />
                <CloudUpload sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
                {isDragActive ? (
                  <Typography>Upuść zdjęcie tutaj...</Typography>
                ) : (
                  <Box>
                    <Typography variant="body1" gutterBottom>
                      Przeciągnij i upuść zdjęcie lub kliknij, aby wybrać
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Obsługiwane formaty: JPG, PNG, WebP (max 10MB)
                    </Typography>
                  </Box>
                )}
              </Paper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          {uploadedImage && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Podgląd zdjęcia
                </Typography>
                <Box
                  component="img"
                  src={uploadedImage}
                  alt="Uploaded plant"
                  sx={{
                    width: '100%',
                    height: 200,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ ml: 2, alignSelf: 'center' }}>
            Analizuję zdjęcie...
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          <Error sx={{ mr: 1 }} />
          {error}
        </Alert>
      )}

      {result && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
              <Typography variant="h5" component="h2">
                Wynik identyfikacji
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                {result.species}
              </Typography>
              <Chip 
                label={`${Math.round(result.confidence * 100)}% pewności`}
                color={result.confidence > 0.8 ? 'success' : result.confidence > 0.6 ? 'warning' : 'error'}
                sx={{ mb: 2 }}
              />
              <Typography variant="body1" color="text.secondary">
                {result.description}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              💡 Porady dotyczące pielęgnacji:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {result.careTips.map((tip, index) => (
                <Typography key={index} component="li" variant="body2" sx={{ mb: 1 }}>
                  {tip}
                </Typography>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
