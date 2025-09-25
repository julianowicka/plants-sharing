'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField,
  CircularProgress,
  Alert,
  Avatar,
  Paper,
  Divider
} from '@mui/material';
import { 
  ArrowBack, 
  Send, 
  Psychology,
  SmartToy
} from '@mui/icons-material';
import { useChat } from 'ai/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AICareAssistant({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, input: chatInput, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Cześć! Jestem Twoim asystentem AI do opieki nad roślinami. Mogę pomóc Ci z identyfikacją problemów, udzielić porad dotyczących pielęgnacji, czy odpowiedzieć na pytania o konkretne gatunki roślin. O czym chciałbyś porozmawiać?'
      }
    ]
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
      setInput('');
    }
  };

  const quickQuestions = [
    "Jak często podlewać monstera?",
    "Dlaczego moja roślina ma żółte liście?",
    "Jakie nawozy polecasz?",
    "Jak przesadzić roślinę?",
    "Jakie rośliny są łatwe w pielęgnacji?"
  ];

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
          🤖 Asystent Opieki AI
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Zadaj pytanie dotyczące pielęgnacji roślin i otrzymaj inteligentne porady.
        </Typography>
      </Box>

      <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Box sx={{ mb: 2 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    maxWidth: '80%',
                    flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main',
                      mx: 1,
                      width: 32,
                      height: 32,
                    }}
                  >
                    {message.role === 'user' ? 'U' : <SmartToy />}
                  </Avatar>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: message.role === 'user' ? 'primary.light' : 'grey.100',
                      color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                      borderRadius: 2,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    <Typography variant="body2">
                      {message.content}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            ))}
            
            {isLoading && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mx: 1, width: 32, height: 32 }}>
                  <SmartToy />
                </Avatar>
                <Paper sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={16} sx={{ mr: 1 }} />
                    <Typography variant="body2">Asystent pisze...</Typography>
                  </Box>
                </Paper>
              </Box>
            )}
            
            <div ref={messagesEndRef} />
          </Box>
        </CardContent>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Szybkie pytania:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => setInput(question)}
                  sx={{ fontSize: '0.75rem' }}
                >
                  {question}
                </Button>
              ))}
            </Box>
          </Box>

          <Box component="form" onSubmit={handleFormSubmit} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Zadaj pytanie o pielęgnację roślin..."
              variant="outlined"
              size="small"
              disabled={isLoading}
              multiline
              maxRows={3}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!input.trim() || isLoading}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <Send />
            </Button>
          </Box>
        </Box>
      </Card>

      <Alert severity="info" sx={{ mt: 2 }}>
        <Psychology sx={{ mr: 1 }} />
        Asystent AI wykorzystuje wiedzę o roślinach z naszej bazy danych oraz zaawansowane modele językowe 
        do udzielania spersonalizowanych porad. Pamiętaj, że to tylko sugestie - w przypadku poważnych 
        problemów skonsultuj się z ekspertem.
      </Alert>
    </Container>
  );
}



