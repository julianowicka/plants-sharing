import { test, expect } from '@playwright/test';

test.describe('AI Tools Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the AI tools page
    // Note: In a real test, you'd need to handle authentication
    await page.goto('/ai-tools');
  });

  test('should display AI tools main page', async ({ page }) => {
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: '🤖 AI Narzędzia' })).toBeVisible();
    
    // Check if all three tool cards are present
    await expect(page.getByText('Identyfikacja Roślin')).toBeVisible();
    await expect(page.getByText('Asystent Opieki')).toBeVisible();
    await expect(page.getByText('Wykrywanie Chorób')).toBeVisible();
    
    // Check if all tool cards have "Uruchom" buttons
    const runButtons = page.getByRole('button', { name: 'Uruchom' });
    await expect(runButtons).toHaveCount(3);
  });

  test('should navigate to plant identification tool', async ({ page }) => {
    // Click on the plant identification tool
    await page.getByRole('button', { name: 'Uruchom' }).first().click();
    
    // Check if we're on the plant identification page
    await expect(page.getByRole('heading', { name: '🔍 Identyfikacja Roślin' })).toBeVisible();
    
    // Check if the back button is present
    await expect(page.getByRole('button', { name: 'Powrót do narzędzi AI' })).toBeVisible();
    
    // Check if the upload area is present
    await expect(page.getByText('Przeciągnij i upuść zdjęcie lub kliknij, aby wybrać')).toBeVisible();
  });

  test('should navigate to AI care assistant', async ({ page }) => {
    // Click on the AI care assistant tool (second button)
    await page.getByRole('button', { name: 'Uruchom' }).nth(1).click();
    
    // Check if we're on the AI care assistant page
    await expect(page.getByRole('heading', { name: '🤖 Asystent Opieki AI' })).toBeVisible();
    
    // Check if the chat interface is present
    await expect(page.getByPlaceholder('Zadaj pytanie o pielęgnację roślin...')).toBeVisible();
    
    // Check if quick questions are present
    await expect(page.getByText('Szybkie pytania:')).toBeVisible();
  });

  test('should navigate to disease detection tool', async ({ page }) => {
    // Click on the disease detection tool (third button)
    await page.getByRole('button', { name: 'Uruchom' }).nth(2).click();
    
    // Check if we're on the disease detection page
    await expect(page.getByRole('heading', { name: '🏥 Wykrywanie Chorób' })).toBeVisible();
    
    // Check if the upload area is present
    await expect(page.getByText('Przeciągnij i upuść zdjęcie lub kliknij, aby wybrać')).toBeVisible();
  });

  test('should allow navigation back from tools to main page', async ({ page }) => {
    // Navigate to plant identification
    await page.getByRole('button', { name: 'Uruchom' }).first().click();
    await expect(page.getByRole('heading', { name: '🔍 Identyfikacja Roślin' })).toBeVisible();
    
    // Click back button
    await page.getByRole('button', { name: 'Powrót do narzędzi AI' }).click();
    
    // Check if we're back on the main AI tools page
    await expect(page.getByRole('heading', { name: '🤖 AI Narzędzia' })).toBeVisible();
  });

  test('should display tool features and descriptions', async ({ page }) => {
    // Check if tool descriptions are visible
    await expect(page.getByText('Zidentyfikuj gatunek rośliny na podstawie zdjęcia')).toBeVisible();
    await expect(page.getByText('AI chatbot do porad dotyczących pielęgnacji roślin')).toBeVisible();
    await expect(page.getByText('Automatyczna diagnoza chorób i problemów roślin')).toBeVisible();
    
    // Check if feature chips are present
    await expect(page.getByText('TensorFlow.js')).toBeVisible();
    await expect(page.getByText('OpenAI GPT')).toBeVisible();
    await expect(page.getByText('Analiza obrazu')).toBeVisible();
  });
});

test.describe('AI Tools API Endpoints', () => {
  test('plant identification API should handle requests', async ({ request }) => {
    // Mock image data (base64 encoded 1x1 pixel PNG)
    const mockImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const response = await request.post('/api/ai/plant-identification', {
      data: { image: mockImage }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('species');
    expect(data).toHaveProperty('confidence');
    expect(data).toHaveProperty('description');
    expect(data).toHaveProperty('careTips');
  });

  test('disease detection API should handle requests', async ({ request }) => {
    // Mock image data
    const mockImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
    
    const response = await request.post('/api/ai/disease-detection', {
      data: { image: mockImage }
    });
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('hasDisease');
    expect(data).toHaveProperty('diseases');
    expect(data).toHaveProperty('overallHealth');
    expect(data).toHaveProperty('recommendations');
  });

  test('chat API should handle requests', async ({ request }) => {
    const response = await request.post('/api/ai/chat', {
      data: { 
        messages: [
          { role: 'user', content: 'Jak często podlewać monstera?' }
        ]
      }
    });
    
    // The chat API returns a stream, so we just check if it responds
    expect(response.status()).toBe(200);
  });
});


