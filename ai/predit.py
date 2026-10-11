import sys
import pickle
import json
import os

BASE_DIR = os.path.dirname(
    os.path.abspath(__file__)
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model.pkl"
)

with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

text = " ".join(sys.argv[1:])

if not text:
    print(json.dumps({
        "category": "Other",
        "department": "General Department"
    }))
    sys.exit()

category = model.predict([text])[0]

department_map = {
    "Garbage": "Sanitation",
    "Street Light": "Electricity",
    "Pothole": "Roads",
    "Water": "Water Department",
    "Drainage": "Drainage Department",
    "Public Property": "Municipal",
    "Traffic": "Traffic Department"
}

department = department_map.get(
    category,
    "General Department"
)

print(json.dumps({
    "category": category,
    "department": department
}))