import pandas as pd
from sklearn.model_selection import train_test_split
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import torch

from transformers import AutoTokenizer, AutoModel

# Load the tokenizer and model from Hugging Face
tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")

# Load the exercise dataset (update the path)
df = pd.read_csv("exercise_data.csv")

# Combine 'symptoms', 'name', and 'description' into a combined text for each exercise
df['combined_text'] = df['symptoms'] + " " + df['name'] + " " + df['description']

# Split into train and test sets (optional)
X_train, X_test, y_train, y_test = train_test_split(df['combined_text'], df['name'], test_size=0.2, random_state=42)

# Function to encode text using Hugging Face model
def encode_text(texts, tokenizer, model):
    # Tokenize the input texts
    inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt", max_length=512)
    
    # Get the embeddings from the model (use the last hidden state)
    with torch.no_grad():
        outputs = model(**inputs)
        embeddings = outputs.last_hidden_state.mean(dim=1)  # Take mean of token embeddings as sentence embeddings
    
    return embeddings

# Encode the combined text for training and testing
train_embeddings = encode_text(X_train.tolist(), tokenizer, model)
test_embeddings = encode_text(X_test.tolist(), tokenizer, model)

def recommend_exercises(patient_input, exercise_data, tokenizer, model):
    # Convert patient input into an embedding (vector representation)
    patient_embedding = encode_text([patient_input], tokenizer, model)
    
    # Calculate cosine similarity between patient input and exercise descriptions
    similarities = cosine_similarity(patient_embedding, exercise_data)
    
    # Get the index of the most similar exercise description
    recommended_idx = similarities.argmax()
    
    # Fetch the recommended exercise name, description
    recommended_exercise = df.iloc[recommended_idx]
    return {
        'name': recommended_exercise['name'],
        'description': recommended_exercise['description'],
        'video_link': recommended_exercise.get('video', 'No video available')
    }

# Example: Test recommendation
patient_input = "Shoulder pain and back pain"
recommended_exercise = recommend_exercises(patient_input, train_embeddings, tokenizer, model)
print(recommended_exercise)

from sklearn.metrics import mean_squared_error

def evaluate_model(test_data, test_labels, tokenizer, model, exercise_data):
    # Encode test data
    test_embeddings = encode_text(test_data.tolist(), tokenizer, model)
    
    # Compute cosine similarities between test data and stored exercise data
    similarities = cosine_similarity(test_embeddings, exercise_data)
    
    # Get the index of the most similar exercise for each test case
    predicted_indices = similarities.argmax(axis=1)
    
    # Calculate the Mean Cosine Similarity
    similarity_scores = similarities[np.arange(len(test_labels)), predicted_indices]
    mean_similarity = np.mean(similarity_scores)
    
    return mean_similarity

# Evaluate the model's accuracy
mean_similarity = evaluate_model(X_test, y_test, tokenizer, model, train_embeddings)
print(f"Mean Cosine Similarity: {mean_similarity}")
