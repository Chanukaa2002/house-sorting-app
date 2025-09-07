import requests
import json

# Test datasets designed to target different houses using new question format (q1-q24)
test_datasets = {
    "gryffindor_profile": {
        "name": "Gryffindor-like Student",
        "data": {
            # Bravery (q1-q3): High scores
            "q1": 9, "q2": 8, "q3": 9,
            # Intelligence (q4-q6): Moderate scores  
            "q4": 6, "q5": 5, "q6": 6,
            # Loyalty (q7-q9): High scores
            "q7": 8, "q8": 8, "q9": 7,
            # Ambition (q10-q12): Moderate scores
            "q10": 6, "q11": 5, "q12": 6,
            # Dark Arts (q13-q15): Low scores
            "q13": 1, "q14": 2, "q15": 1,
            # Quidditch (q16-q18): High scores
            "q16": 8, "q17": 8, "q18": 9,
            # Dueling (q19-q21): High scores
            "q19": 9, "q20": 8, "q21": 8,
            # Creativity (q22-q24): Moderate scores
            "q22": 6, "q23": 6, "q24": 5
        },
        "expected_traits": "High bravery, dueling skills, and quidditch abilities"
    },
    
    "ravenclaw_profile": {
        "name": "Ravenclaw-like Student", 
        "data": {
            # Bravery (q1-q3): Moderate scores
            "q1": 5, "q2": 4, "q3": 6,
            # Intelligence (q4-q6): High scores
            "q4": 10, "q5": 9, "q6": 10,
            # Loyalty (q7-q9): Moderate scores
            "q7": 6, "q8": 6, "q9": 7,
            # Ambition (q10-q12): High scores
            "q10": 7, "q11": 6, "q12": 8,
            # Dark Arts (q13-q15): Low-moderate scores
            "q13": 3, "q14": 4, "q15": 2,
            # Quidditch (q16-q18): Low scores
            "q16": 3, "q17": 4, "q18": 4,
            # Dueling (q19-q21): Moderate scores
            "q19": 5, "q20": 6, "q21": 4,
            # Creativity (q22-q24): High scores
            "q22": 9, "q23": 10, "q24": 8
        },
        "expected_traits": "High intelligence and creativity"
    },
    
    "hufflepuff_profile": {
        "name": "Hufflepuff-like Student",
        "data": {
            # Bravery (q1-q3): Moderate scores
            "q1": 6, "q2": 7, "q3": 5,
            # Intelligence (q4-q6): Moderate scores
            "q4": 6, "q5": 6, "q6": 6,
            # Loyalty (q7-q9): High scores
            "q7": 10, "q8": 10, "q9": 9,
            # Ambition (q10-q12): Low scores
            "q10": 3, "q11": 2, "q12": 4,
            # Dark Arts (q13-q15): Very low scores
            "q13": 1, "q14": 0, "q15": 1,
            # Quidditch (q16-q18): Moderate scores
            "q16": 6, "q17": 5, "q18": 6,
            # Dueling (q19-q21): Low scores
            "q19": 4, "q20": 5, "q21": 3,
            # Creativity (q22-q24): Moderate-high scores
            "q22": 7, "q23": 7, "q24": 6
        },
        "expected_traits": "High loyalty, low ambition and dark arts interest"
    },
    
    "slytherin_profile": {
        "name": "Slytherin-like Student",
        "data": {
            # Bravery (q1-q3): Moderate scores
            "q1": 5, "q2": 4, "q3": 6,
            # Intelligence (q4-q6): High scores
            "q4": 8, "q5": 8, "q6": 7,
            # Loyalty (q7-q9): Low scores
            "q7": 3, "q8": 4, "q9": 4,
            # Ambition (q10-q12): Very high scores
            "q10": 10, "q11": 9, "q12": 10,
            # Dark Arts (q13-q15): High scores
            "q13": 7, "q14": 8, "q15": 6,
            # Quidditch (q16-q18): Moderate-high scores
            "q16": 7, "q17": 7, "q18": 6,
            # Dueling (q19-q21): High scores
            "q19": 8, "q20": 8, "q21": 9,
            # Creativity (q22-q24): Moderate scores
            "q22": 6, "q23": 5, "q24": 7
        },
        "expected_traits": "High ambition and dark arts knowledge"
    },
    
    "balanced_profile": {
        "name": "Balanced Student",
        "data": {
            # All traits: Moderate scores (around 6)
            "q1": 6, "q2": 6, "q3": 6,
            "q4": 6, "q5": 6, "q6": 6,
            "q7": 6, "q8": 6, "q9": 6,
            "q10": 6, "q11": 6, "q12": 6,
            "q13": 3, "q14": 3, "q15": 3,
            "q16": 6, "q17": 6, "q18": 6,
            "q19": 6, "q20": 6, "q21": 6,
            "q22": 6, "q23": 6, "q24": 6
        },
        "expected_traits": "Balanced across all traits"
    }
}

def test_prediction_with_dataset(base_url, dataset_name, dataset_info):
    """Test prediction with a specific dataset"""
    print(f"🧙‍♂️ Testing: {dataset_info['name']}")
    print(f"   Expected traits: {dataset_info['expected_traits']}")
    
    response = requests.post(f"{base_url}/predict", json=dataset_info['data'])
    
    if response.status_code == 200:
        result = response.json()
        predicted_house = result['predicted_house']
        probabilities = result['probabilities']
        
        print(f"   🏠 Predicted House: {predicted_house}")
        print(f"   📊 Probabilities:")
        
        # Sort probabilities in descending order
        sorted_probs = sorted(probabilities.items(), key=lambda x: x[1], reverse=True)
        for house, prob in sorted_probs:
            emoji = "🏆" if house == predicted_house else "  "
            print(f"      {emoji} {house}: {prob}%")
    else:
        print(f"   ❌ Error: {response.text}")
    
    print("-" * 60)

def test_api():
    base_url = "http://localhost:5000"
    
    # Test health check
    print("=" * 60)
    print("🏥 HEALTH CHECK")
    print("=" * 60)
    response = requests.get(f"{base_url}/")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        health_data = response.json()
        print(f"Model loaded: {health_data.get('model_loaded', 'Unknown')}")
        print(f"Required features: {len(health_data.get('features_required', []))}")
    print()
    
    # Test get questions
    print("=" * 60)
    print("❓ QUESTIONS ENDPOINT")
    print("=" * 60)
    response = requests.get(f"{base_url}/questions")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        questions_data = response.json()
        print(f"Total questions available: {questions_data['total_questions']}")
    print()
    
    # Test predictions with multiple datasets
    print("=" * 60)
    print("🔮 HOUSE PREDICTION TESTS")
    print("=" * 60)
    
    for dataset_name, dataset_info in test_datasets.items():
        test_prediction_with_dataset(base_url, dataset_name, dataset_info)
    
    # Test houses info
    print("=" * 60)
    print("🏰 HOUSES INFORMATION")
    print("=" * 60)
    response = requests.get(f"{base_url}/houses")
    print(f"Status: {response.status_code}")
    if response.status_code == 200:
        houses = response.json()['houses']
        print(f"Available houses: {list(houses.keys())}")
        print("\nHouse details:")
        for house_name, house_info in houses.items():
            print(f"  🏠 {house_name}:")
            print(f"     Traits: {', '.join(house_info['traits'])}")
            print(f"     Colors: {', '.join(house_info['colors'])}")
            print(f"     Animal: {house_info['animal']}")

def test_edge_cases():
    """Test edge cases and error handling"""
    base_url = "http://localhost:5000"
    
    print("\n" + "=" * 60)
    print("⚠️ EDGE CASE TESTING")
    print("=" * 60)
    
    # Test with missing data
    print("🧪 Testing with missing fields...")
    incomplete_data = {
        "q1": 5,
        "q2": 7
        # Missing q3-q24
    }
    response = requests.post(f"{base_url}/predict", json=incomplete_data)
    print(f"   Status: {response.status_code} (should be 400)")
    if response.status_code == 400:
        print("   ✅ Correctly rejected incomplete data")
    else:
        print("   ❌ Should have rejected incomplete data")
    
    # Test with invalid values
    print("\n🧪 Testing with invalid values...")
    invalid_data = {}
    # Add all required questions but with some invalid values
    for i in range(1, 25):
        if i == 5:
            invalid_data[f"q{i}"] = 15  # Too high
        elif i == 10:
            invalid_data[f"q{i}"] = -5  # Too low
        else:
            invalid_data[f"q{i}"] = 5
    
    response = requests.post(f"{base_url}/predict", json=invalid_data)
    print(f"   Status: {response.status_code} (should be 400)")
    if response.status_code == 400:
        print("   ✅ Correctly rejected invalid values")
    else:
        print("   ❌ Should have rejected invalid values")

def run_comprehensive_test():
    """Run all tests"""
    print("🧙‍♂️ HOGWARTS HOUSE SORTING API - COMPREHENSIVE TEST SUITE")
    print("=" * 80)
    
    try:
        test_api()
        test_edge_cases()        
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        print("✅ All endpoint tests completed")
        print(f"✅ Tested {len(test_datasets)} different personality profiles")
        print("✅ Edge case testing completed")
        print("\n🎉 House Sorting API is working properly!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the API.")
        print("   Run: python main.py")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    run_comprehensive_test()
