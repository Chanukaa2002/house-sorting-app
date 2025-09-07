# House Sorting Flask Backend

This Flask backend integrates with the house sorting machine learning model to predict Hogwarts houses based on user answers.

## Setup

1. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Make sure the model file `house_sorting_model.pkl` exists in the parent directory

3. Run the Flask application:
   ```bash
   python main.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### GET `/`

Health check endpoint that returns API status and required features.

### GET `/questions`

Returns the list of questions that should be asked to users for house sorting.

Response example:

```json
{
  "questions": [
    {
      "id": "bravery",
      "question": "How brave are you in facing danger or difficult situations?",
      "description": "Rate your courage and willingness to face challenges",
      "scale": "0 (Very Cowardly) - 10 (Extremely Brave)"
    },
    ...
  ],
  "total_questions": 8
}
```

### POST `/predict`

Predicts the Hogwarts house based on user answers.

Request body:

```json
{
  "bravery": 8,
  "intelligence": 7,
  "loyalty": 6,
  "ambition": 5,
  "dark_arts_knowledge": 2,
  "quidditch_skills": 7,
  "dueling_skills": 6,
  "creativity": 8
}
```

Response:

```json
{
  "predicted_house": "Gryffindor",
  "probabilities": {
    "Gryffindor": 65.5,
    "Hufflepuff": 20.2,
    "Ravenclaw": 10.1,
    "Slytherin": 4.2
  },
  "input_features": {
    "Bravery": 8,
    "Intelligence": 7,
    ...
  }
}
```

### GET `/houses`

Returns information about all Hogwarts houses including traits, colors, and symbols.

## Testing

Run the test script to verify the API is working:

```bash
python test_api.py
```

## Integration with Frontend

The frontend should:

1. Call `/questions` to get the list of questions
2. Present questions to users and collect answers (0-10 scale)
3. Send answers to `/predict` endpoint
4. Display the predicted house and probabilities
5. Optionally use `/houses` to show house information

## Required Features

All 8 features are required for prediction:

- `bravery` (0-10)
- `intelligence` (0-10)
- `loyalty` (0-10)
- `ambition` (0-10)
- `dark_arts_knowledge` (0-10)
- `quidditch_skills` (0-10)
- `dueling_skills` (0-10)
- `creativity` (0-10)
