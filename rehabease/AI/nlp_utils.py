from transformers import pipeline

def summarize_description(text):
    summarizer = pipeline('summarization', model="facebook/bart-large-cnn")
    summary = summarizer(text, max_length=50, min_length=10, do_sample=False)
    return summary[0]['summary_text']
