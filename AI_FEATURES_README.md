# AI funkcje w Plant Discovery (skrót)

Zwięzłe podsumowanie funkcji AI w aplikacji oraz jak z nich korzystać.

## Funkcje

- **Identyfikacja roślin**: przesyłasz zdjęcie → gatunek + pewność. Endpoint: `/api/ai/plant-identification`.
- **Asystent opieki**: chatbot z poradami pielęgnacyjnymi. Endpoint: `/api/ai/chat`.
- **Wykrywanie chorób**: analiza liści pod kątem problemów zdrowotnych. Endpoint: `/api/ai/disease-detection`.

## Szybki start

1) Zależności:
```bash
pnpm install
```

2) Zmienne środowiskowe (`.env.local`):
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<tajny_klucz>"
OPENAI_API_KEY="<opcjonalnie>"
GOOGLE_CLOUD_VISION_API_KEY="<opcjonalnie>"
TENSORFLOW_PLANT_ID_MODEL_URL="<opcjonalnie>"
TENSORFLOW_DISEASE_MODEL_URL="<opcjonalnie>"
```

3) Uruchomienie:
```bash
pnpm dev
```

## Testy E2E

```bash
npx playwright install
pnpm test
```

## Uwaga produkcyjna

- Aktualnie detekcja chorób działa na mockach. Docelowo dodamy załadowanie modelu TFJS i preprocessing obrazów po stronie API.
- Duże pliki wag TFJS (weights*.bin) są ignorowane w repo; trzymamy `model.json` i `class_names.txt`.

## Struktura (skrót)

```
app/(protected)/ai-tools/
app/api/ai/{plant-identification,chat,disease-detection}/route.ts
tests/ai-tools.spec.ts
```

