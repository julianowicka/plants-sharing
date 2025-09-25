# ML scripts (short overview)

Zbiór pomocniczych skryptów treningowych i konwersyjnych (Python):

- `convert_direct.py` – konwersja SavedModel → TFJS (API `tfjs.converters...`).
- `convert_hybrid_to_tfjs.py` – pipeline do konwersji modelu hybrydowego do formatu web.
- `convert_keras_to_savedmodel.py` – zapis modelu Keras do SavedModel.
- `hybrid_houseplant_model.py` – definicja modelu hybrydowego (CNN + cechy).
- `quick_hybrid_train.py` / `quick_train.py` – skrócone treningi demo.
- `test_model.py` – szybka weryfikacja wczytania i predykcji.

Uwaga: duże artefakty (np. `weights*.bin`) są ignorowane w repo. Do inferencji web używaj `public/models/...` z `model.json` i `class_names.txt`.
