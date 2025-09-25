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
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  ArrowBack, 
  CloudUpload, 
  CheckCircle, 
  Error,
  Warning,
  HealthAndSafety,
  LocalHospital,
  Eco
} from '@mui/icons-material';

interface DiseaseDetectionResult {
  hasDisease: boolean;
  diseases: Array<{
    name: string;
    confidence: number;
    description: string;
    symptoms: string[];
    treatment: string[];
    prevention: string[];
  }>;
  overallHealth: 'healthy' | 'warning' | 'critical';
  recommendations: string[];
}

export function DiseaseDetection({ onBack }: { onBack: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
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
      
      // Call our API endpoint for disease detection
      const response = await fetch('/api/ai/disease-detection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas analizy choroby');
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

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getHealthIcon = (health: string) => {
    switch (health) {
      case 'healthy': return <Eco />;
      case 'warning': return <Warning />;
      case 'critical': return <LocalHospital />;
      default: return <HealthAndSafety />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mb: 2 }}
        >
          Powrót do narzędzi AI
        </Button>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          🏥 Wykrywanie Chorób
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Prześlij zdjęcie rośliny, a nasze AI zdiagnozuje potencjalne choroby i problemy zdrowotne.
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
            Analizuję zdjęcie pod kątem chorób...
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
        <Box sx={{ mt: 3 }}>
          {/* Overall Health Status */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getHealthIcon(result.overallHealth)}
                <Typography variant="h5" component="h2" sx={{ ml: 1 }}>
                  Stan zdrowia rośliny
                </Typography>
              </Box>
              <Chip 
                label={result.overallHealth === 'healthy' ? 'Zdrowa' : 
                       result.overallHealth === 'warning' ? 'Wymaga uwagi' : 'Krytyczny stan'}
                color={getHealthColor(result.overallHealth)}
                sx={{ mb: 2 }}
              />
              {result.overallHealth === 'healthy' ? (
                <Alert severity="success">
                  Twoja roślina wygląda na zdrową! Nie wykryto żadnych oznak chorób.
                </Alert>
              ) : (
                <Alert severity={result.overallHealth === 'warning' ? 'warning' : 'error'}>
                  Wykryto potencjalne problemy zdrowotne. Sprawdź szczegóły poniżej.
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Disease Details */}
          {result.diseases.length > 0 && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Wykryte choroby/problemy:
                </Typography>
                {result.diseases.map((disease, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ mr: 2 }}>
                        {disease.name}
                      </Typography>
                      <Chip 
                        label={`${Math.round(disease.confidence * 100)}% pewności`}
                        color={disease.confidence > 0.8 ? 'error' : 'warning'}
                        size="small"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {disease.description}
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom>
                          Objawy:
                        </Typography>
                        <List dense>
                          {disease.symptoms.map((symptom, i) => (
                            <ListItem key={i} sx={{ py: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <Warning fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={symptom} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom>
                          Leczenie:
                        </Typography>
                        <List dense>
                          {disease.treatment.map((treatment, i) => (
                            <ListItem key={i} sx={{ py: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <LocalHospital fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={treatment} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Typography variant="subtitle2" gutterBottom>
                          Zapobieganie:
                        </Typography>
                        <List dense>
                          {disease.prevention.map((prevention, i) => (
                            <ListItem key={i} sx={{ py: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <HealthAndSafety fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={prevention} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    </Grid>

                    {index < result.diseases.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💡 Zalecenia ogólne:
                </Typography>
                <List>
                  {result.recommendations.map((recommendation, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={recommendation} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      <Alert severity="warning" sx={{ mt: 3 }}>
        <Warning sx={{ mr: 1 }} />
        Ta analiza ma charakter informacyjny. W przypadku poważnych problemów zdrowotnych rośliny 
        skonsultuj się z ekspertem ogrodnictwa lub fitopatologiem.
      </Alert>
    </Container>
  );
}


