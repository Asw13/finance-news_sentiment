# Finance-news_sentiment
# 📰 News Sentiment Analyzer using DistilBERT and Node.js

This project is a hybrid pipeline that scrapes news articles, analyzes their sentiment using a fine-tuned DistilBERT model in TensorFlow/Keras, and visualizes sentiment trends over time.

---

## 📌 Features

- 🔍 **News Scraping**: Node.js script to scrape headlines using `scrapeNews.js`
- 🤖 **BERT-based Sentiment Analysis**: Uses a custom TensorFlow model built on `DistilBERT` to classify sentiment as Positive, Neutral, or Negative
- 📅 **Temporal Grouping**: Aggregates sentiment based on logical weekday groupings (e.g., weekends grouped into Monday)
- 📊 **Visualization**: Generates a clear grouped bar chart showing sentiment trends over time

---

## 🛠️ Tech Stack

- 🧠 **Model**: DistilBERT (via HuggingFace Transformers)
- 🔤 **Tokenizer**: `DistilBertTokenizer`
- 🐍 **Backend & Analysis**: Python, TensorFlow, Pandas, Matplotlib
- 🌐 **Web Scraping**: Node.js

---

## 🧾 Dependencies

Make sure to install the following packages before running the scripts:

### Python
```bash
pip install tensorflow pandas matplotlib transformers
