from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

def recommend_exercises(df, user_symptoms):
    # Vectorize symptoms data
    vectorizer = TfidfVectorizer(max_features=500)
    tfidf_matrix = vectorizer.fit_transform(df['Cleaned_Symptoms'])
    user_vector = vectorizer.transform([user_symptoms])
    
    # Calculate cosine similarity
    similarity_scores = cosine_similarity(user_vector, tfidf_matrix).flatten()
    
    # Get top 5 most similar exercises
    top_indices = similarity_scores.argsort()[-5:][::-1]
    
    # Return Name, Description, Video, Sets, and Reps
    return df.iloc[top_indices][['Name', 'Description', 'Video', 'Sets', 'Reps']]

# Example usage:
# user_input = "Shoulder pain, stiffness"
# recommendations = recommend_exercises(data, user_input)
