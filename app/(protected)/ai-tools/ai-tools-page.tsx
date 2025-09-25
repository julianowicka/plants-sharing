'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button,
  Chip,
  Divider
} from '@mui/material';
import { 
  CameraAlt, 
  Psychology, 
  HealthAndSafety,
  Upload,
  Chat,
  BugReport
} from '@mui/icons-material';
import { PlantIdentification } from './components/plant-identification';
import { AICareAssistant } from './components/ai-care-assistant';
import { DiseaseDetection } from './components/disease-detection';

type ActiveTool = 'plant-id' | 'care-assistant' | 'disease-detection' | null;

export function AIToolsPage() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  const tools = [
    {
      id: 'plant-id' as const,
      title: 'Identyfikacja Roślin',
      description: 'Zidentyfikuj gatunek rośliny na podstawie zdjęcia',
      icon: <CameraAlt sx={{ fontSize: 40 }} />,
      color: '#4CAF50',
      features: ['TensorFlow.js', 'Wysoka dokładność', 'Szybka analiza']
    },
    {
      id: 'care-assistant' as const,
      title: 'Asystent Opieki',
      description: 'AI chatbot do porad dotyczących pielęgnacji roślin',
      icon: <Psychology sx={{ fontSize: 40 }} />,
      color: '#2196F3',
      features: ['OpenAI GPT', 'Personalizowane porady', 'Czat w czasie rzeczywistym']
    },
    {
      id: 'disease-detection' as const,
      title: 'Wykrywanie Chorób',
      description: 'Automatyczna diagnoza chorób i problemów roślin',
      icon: <HealthAndSafety sx={{ fontSize: 40 }} />,
      color: '#FF9800',
      features: ['Analiza obrazu', 'Diagnoza chorób', 'Zalecenia leczenia']
    }
  ];

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'plant-id':
        return <PlantIdentification onBack={() => setActiveTool(null)} />;
      case 'care-assistant':
        return <AICareAssistant onBack={() => setActiveTool(null)} />;
      case 'disease-detection':
        return <DiseaseDetection onBack={() => setActiveTool(null)} />;
      default:
        return null;
    }
  };

  if (activeTool) {
    return renderActiveTool();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          🤖 AI Narzędzia
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          Zaawansowane narzędzia sztucznej inteligencji do opieki nad roślinami
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>

      <Grid container spacing={3}>
        {tools.map((tool) => (
          <Grid item xs={12} md={4} key={tool.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 3 }}>
                <Box 
                  sx={{ 
                    color: tool.color, 
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  {tool.icon}
                </Box>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {tool.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {tool.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                  {tool.features.map((feature) => (
                    <Chip 
                      key={feature} 
                      label={feature} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setActiveTool(tool.id)}
                  sx={{
                    backgroundColor: tool.color,
                    '&:hover': {
                      backgroundColor: tool.color,
                      opacity: 0.9,
                    },
                    px: 4,
                    py: 1.5
                  }}
                  startIcon={tool.id === 'plant-id' ? <Upload /> : 
                           tool.id === 'care-assistant' ? <Chat /> : 
                           <BugReport />}
                >
                  Uruchom
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          💡 Jak to działa?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nasze narzędzia AI wykorzystują najnowsze technologie uczenia maszynowego do analizy zdjęć roślin 
          i udzielania inteligentnych porad. Wszystkie obliczenia są wykonywane bezpiecznie, a Twoje dane 
          są chronione zgodnie z najwyższymi standardami bezpieczeństwa.
        </Typography>
      </Box>
    </Container>
  );
}



