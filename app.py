from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load the JSON data for translations
with open('complete_english_fula.json', 'r', encoding='utf-8') as file:
    translations = json.load(file)

# Route for the main page
@app.route('/', endpoint='home')
def home():
    return render_template('index.html')


@app.route('/about', endpoint='about')
def about():
    return render_template('about.html')

@app.route('/fulani_history', endpoint='fulani_history')
def fulani_history():
    return render_template('fulani_history.html')

@app.route('/shop', endpoint='shop')
def shop():
    return render_template('shop.html')

@app.route('/blog', endpoint='blog')
def blog():
    return render_template('blog.html')
    
@app.route('/contact_us', endpoint='contact_us')
def contact_us():
    return render_template('contact_us.html')

# Route for handling translation requests
@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    english_word = data['word'].lower()
    translation = next((item['pulaar'] for item in translations if item['english'].lower() == english_word), "Translation not found")
    return jsonify(translation=translation)

if __name__ == '__main__':
    app.run(debug=True)
