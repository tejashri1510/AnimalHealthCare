from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load model and vectorizer
model = pickle.load(open('model.pkl', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

precautions_dict = {
    'Flu': 'Keep warm and hydrated',
    'Dehydration': 'Give ORS and consult vet',
    'Skin Infection': 'Use vet-approved ointment',
    'Cold': 'Keep warm and avoid dust',
    'Paw Injury': 'Keep area clean and use bandage'
}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    symptoms = data.get('symptoms')  # Expecting a list like ["fever", "cough"]

    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400

    input_text = ' '.join(symptoms)
    input_vector = vectorizer.transform([input_text])
    prediction = model.predict(input_vector)[0]
    precautions = precautions_dict.get(prediction, "Consult vet immediately")

    return jsonify({
        'disease': prediction,
        'precautions': precautions
    })

if __name__ == '__main__':
    app.run(port=5001)
