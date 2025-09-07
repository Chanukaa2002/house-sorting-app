from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# Enable CORS manually if needed
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Load the trained model
try:
    with open('../house_sorting_model.pkl', 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully!")
except FileNotFoundError:
    print("Model file not found. Please ensure 'house_sorting_model.pkl' exists in the parent directory.")
    model = None

# Define the feature names in the correct order (as they were in training)
FEATURE_NAMES = [
    'Bravery', 'Intelligence', 'Loyalty', 'Ambition', 
    'Dark Arts Knowledge', 'Quidditch Skills', 'Dueling Skills', 'Creativity'
]

@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        'message': 'House Sorting Hat API is running!',
        'model_loaded': model is not None,
        'features_required': FEATURE_NAMES
    })

@app.route('/predict', methods=['POST'])
def predict_house():
    """
    Predict Hogwarts house based on user answers to indirect questions
    Expected JSON format:
    {
        "q1": 8, "q2": 7, "q3": 9,  // bravery questions
        "q4": 6, "q5": 8, "q6": 7,  // intelligence questions
        ... // all 24 questions (q1-q24)
    }
    """
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        data = request.json
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
        
        # Map questions to traits (3 questions per trait)
        trait_mapping = {
            'bravery': ['q1', 'q2', 'q3'],
            'intelligence': ['q4', 'q5', 'q6'],
            'loyalty': ['q7', 'q8', 'q9'],
            'ambition': ['q10', 'q11', 'q12'],
            'dark_arts_knowledge': ['q13', 'q14', 'q15'],
            'quidditch_skills': ['q16', 'q17', 'q18'],
            'dueling_skills': ['q19', 'q20', 'q21'],
            'creativity': ['q22', 'q23', 'q24']
        }
        
        # Validate all questions are answered
        expected_questions = [f'q{i}' for i in range(1, 25)]
        missing_questions = []
        invalid_questions = []
        
        for q_id in expected_questions:
            if q_id not in data:
                missing_questions.append(q_id)
            else:
                value = data[q_id]
                if not isinstance(value, (int, float)) or value < 0 or value > 10:
                    invalid_questions.append(q_id)
        
        if missing_questions:
            return jsonify({
                'error': 'Missing required questions',
                'missing': missing_questions,
                'total_required': 24
            }), 400
            
        if invalid_questions:
            return jsonify({
                'error': 'Invalid values provided (must be 0-10)',
                'invalid_questions': invalid_questions
            }), 400
        
        # Calculate average scores for each trait
        trait_scores = {}
        features = []
        
        for trait, question_ids in trait_mapping.items():
            scores = [data[q_id] for q_id in question_ids]
            average_score = sum(scores) / len(scores)
            trait_scores[trait] = round(average_score, 2)
            features.append(average_score)
        
        # Convert to numpy array and reshape for prediction
        features_array = np.array(features).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(features_array)[0]
        
        # Get prediction probabilities for all houses
        prediction_proba = model.predict_proba(features_array)[0]
        house_names = model.classes_
        
        # Create probability dictionary
        probabilities = {}
        for i, house in enumerate(house_names):
            probabilities[house] = round(float(prediction_proba[i]) * 100, 2)
        
        return jsonify({
            'predicted_house': prediction,
            'probabilities': probabilities,
            'trait_scores': trait_scores,
            'input_questions': len([q for q in data.keys() if q.startswith('q')])
        })
    
    except Exception as e:
        return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

@app.route('/questions', methods=['GET'])
def get_questions():
    """
    Return indirect questions that measure traits without revealing the connection to houses
    3 questions per trait (24 total) to calculate averages and prevent gaming
    """
    questions = [
        # Bravery Questions (bravery_1, bravery_2, bravery_3)
        {
            "id": "q1",
            "question": "You're walking alone at night and hear strange noises in a dark alley. What do you do?",
            "scale": "0 (Avoid completely) - 10 (Investigate immediately)",
            "trait": "bravery"
        },
        {
            "id": "q2", 
            "question": "Your friend is being bullied by a group of older students. How likely are you to step in?",
            "scale": "0 (Not at all) - 10 (Definitely step in)",
            "trait": "bravery"
        },
        {
            "id": "q3",
            "question": "You have to give a presentation to 200 people. How do you feel?",
            "scale": "0 (Terrified) - 10 (Excited and confident)",
            "trait": "bravery"
        },
        
        # Intelligence Questions (intelligence_1, intelligence_2, intelligence_3)
        {
            "id": "q4",
            "question": "How often do you enjoy solving complex puzzles or riddles?",
            "scale": "0 (Never) - 10 (All the time)",
            "trait": "intelligence"
        },
        {
            "id": "q5",
            "question": "When learning something new, you prefer:",
            "scale": "0 (Simple explanations) - 10 (Deep, detailed analysis)",
            "trait": "intelligence"
        },
        {
            "id": "q6",
            "question": "How often do others come to you for advice on difficult problems?",
            "scale": "0 (Never) - 10 (Very frequently)",
            "trait": "intelligence"
        },
        
        # Loyalty Questions (loyalty_1, loyalty_2, loyalty_3)
        {
            "id": "q7",
            "question": "Your best friend asks you to keep a secret that could get them in trouble. You:",
            "scale": "0 (Would tell) - 10 (Keep it no matter what)",
            "trait": "loyalty"
        },
        {
            "id": "q8",
            "question": "How important is it to you to maintain long-term friendships?",
            "scale": "0 (Not important) - 10 (Extremely important)",
            "trait": "loyalty"
        },
        {
            "id": "q9",
            "question": "When a friend succeeds at something you wanted, you feel:",
            "scale": "0 (Jealous) - 10 (Genuinely happy for them)",
            "trait": "loyalty"
        },
        
        # Ambition Questions (ambition_1, ambition_2, ambition_3)
        {
            "id": "q10",
            "question": "How important is it for you to be the best at what you do?",
            "scale": "0 (Not important) - 10 (Extremely important)",
            "trait": "ambition"
        },
        {
            "id": "q11",
            "question": "When you see someone in a position of power, you think:",
            "scale": "0 (I don't want that responsibility) - 10 (I could do that better)",
            "trait": "ambition"
        },
        {
            "id": "q12",
            "question": "How often do you set challenging goals for yourself?",
            "scale": "0 (Rarely) - 10 (Constantly)",
            "trait": "ambition"
        },
        
        # Dark Arts Knowledge Questions (dark_arts_1, dark_arts_2, dark_arts_3)
        {
            "id": "q13",
            "question": "How interested are you in learning about forbidden or taboo subjects?",
            "scale": "0 (Not interested) - 10 (Very interested)",
            "trait": "dark_arts_knowledge"
        },
        {
            "id": "q14",
            "question": "If you could access any restricted section of a library, would you?",
            "scale": "0 (No, rules exist for a reason) - 10 (Absolutely, knowledge is power)",
            "trait": "dark_arts_knowledge"
        },
        {
            "id": "q15",
            "question": "How comfortable are you with using morally questionable methods to achieve good results?",
            "scale": "0 (Very uncomfortable) - 10 (Completely comfortable)",
            "trait": "dark_arts_knowledge"
        },
        
        # Quidditch Skills Questions (quidditch_1, quidditch_2, quidditch_3)
        {
            "id": "q16",
            "question": "How much do you enjoy competitive sports and physical activities?",
            "scale": "0 (Not at all) - 10 (Love them)",
            "trait": "quidditch_skills"
        },
        {
            "id": "q17",
            "question": "How good is your hand-eye coordination?",
            "scale": "0 (Poor) - 10 (Excellent)",
            "trait": "quidditch_skills"
        },
        {
            "id": "q18",
            "question": "How comfortable are you with heights and fast-moving activities?",
            "scale": "0 (Very uncomfortable) - 10 (Love the thrill)",
            "trait": "quidditch_skills"
        },
        
        # Dueling Skills Questions (dueling_1, dueling_2, dueling_3)
        {
            "id": "q19",
            "question": "When facing a conflict, you prefer to:",
            "scale": "0 (Avoid confrontation) - 10 (Face it head-on)",
            "trait": "dueling_skills"
        },
        {
            "id": "q20",
            "question": "How quickly can you react to unexpected situations?",
            "scale": "0 (Very slowly) - 10 (Lightning fast)",
            "trait": "dueling_skills"
        },
        {
            "id": "q21",
            "question": "How competitive are you when it comes to winning?",
            "scale": "0 (Don't care about winning) - 10 (Must win)",
            "trait": "dueling_skills"
        },
        
        # Creativity Questions (creativity_1, creativity_2, creativity_3)
        {
            "id": "q22",
            "question": "How often do you come up with unique solutions to problems?",
            "scale": "0 (Rarely) - 10 (All the time)",
            "trait": "creativity"
        },
        {
            "id": "q23",
            "question": "How much do you enjoy artistic or creative activities?",
            "scale": "0 (Not at all) - 10 (Love them)",
            "trait": "creativity"
        },
        {
            "id": "q24",
            "question": "When given rules, you tend to:",
            "scale": "0 (Follow them exactly) - 10 (Find creative ways around them)",
            "trait": "creativity"
        }
    ]
    
    return jsonify({
        'questions': questions,
        'total_questions': len(questions),
        'instructions': 'Answer all questions honestly. Each question is rated on a scale of 0-10.'
    })

@app.route('/houses', methods=['GET'])
def get_houses():
    """
    Return information about Hogwarts houses
    """
    houses_info = {
        'Gryffindor': {
            'traits': ['Brave', 'Daring', 'Chivalrous', 'Courageous'],
            'colors': ['Red', 'Gold'],
            'element': 'Fire',
            'animal': 'Lion'
        },
        'Hufflepuff': {
            'traits': ['Loyal', 'Patient', 'Fair', 'Hard-working'],
            'colors': ['Yellow', 'Black'],
            'element': 'Earth',
            'animal': 'Badger'
        },
        'Ravenclaw': {
            'traits': ['Intelligent', 'Wise', 'Creative', 'Witty'],
            'colors': ['Blue', 'Bronze'],
            'element': 'Air',
            'animal': 'Eagle'
        },
        'Slytherin': {
            'traits': ['Ambitious', 'Cunning', 'Resourceful', 'Determined'],
            'colors': ['Green', 'Silver'],
            'element': 'Water',
            'animal': 'Serpent'
        }
    }
    
    return jsonify({'houses': houses_info})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
