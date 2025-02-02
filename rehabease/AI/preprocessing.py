import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords')

def load_data():
    return pd.read_csv("rehabease\\AI\\exercises.csv")

def clean_text(text):
    stop_words = set(stopwords.words('english'))
    words = [word for word in text.split() if word.lower() not in stop_words]
    return ' '.join(words)

def preprocess_data(df):
    df['Cleaned_Description'] = df['Description'].apply(clean_text)
    df['Cleaned_Symptoms'] = df['Symptoms'].apply(clean_text)
    return df
