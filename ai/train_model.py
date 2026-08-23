import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
import joblib

# Load dataset
data = pd.read_csv("dataset.csv")

# Check dataset
print("Dataset columns:", data.columns.tolist())
print("Number of complaints:", len(data))

# Input
X = data["text"]

# We will predict the department
y = data["department"]

# Create ML pipeline
model = Pipeline([
    ("tfidf", TfidfVectorizer(
        lowercase=True,
        stop_words="english"
    )),
    ("classifier", LogisticRegression(max_iter=1000))
])

# Train model
model.fit(X, y)

# Save model
joblib.dump(model, "model.pkl")

print("AI model trained successfully!")
print("Model saved as model.pkl")