# ml_model.py
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Load dataset
df = pd.read_csv('animal_symptoms.csv')

# Vectorize symptoms
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df['symptoms'])
y = df['disease']

# Train model
model = MultinomialNB()
model.fit(X, y)

# Save model and vectorizer
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

print("Model trained and saved successfully.")
