# Import necessary modules from Flask and standard library
from flask import Flask, render_template, request, jsonify
import json
from fuzzywuzzy import process

# Create an instance of the Flask class. This instance will be the WSGI application.
app = Flask(__name__)

# Load the JSON data for translations at the start of the application
with open('complete_english_fula.json', 'r', encoding='utf-8') as file:
    translations = json.load(file)  # Load and parse the JSON file into a Python dictionary

# Route for the main (index) page
@app.route('/', endpoint='home')
def home():
    return render_template('index.html')  # Render and return the index.html template

# Route for the 'About' page
@app.route('/about', endpoint='about')
def about():
    return render_template('about.html')  # Render and return the about.html template

# Route for the 'Fulani History' page
@app.route('/fulani_history', endpoint='fulani_history')
def fulani_history():
    return render_template('fulani_history.html')  # Render and return the fulani_history.html template

# Route for the 'Shop' page
@app.route('/shop', endpoint='shop')
def shop():
    return render_template('shop.html')  # Render and return the shop.html template

# Route for the 'Blog' page
@app.route('/blog', endpoint='blog')
def blog():
    return render_template('blog.html')  # Render and return the blog.html template

# Route for the 'Contact Us' page
@app.route('/contact_us', endpoint='contact_us')
def contact_us():
    return render_template('contact_us.html')  # Render and return the contact_us.html template

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    english_word = data['word'].lower()

    # Construct a dictionary with English words as keys and Pulaar translations as values
    eng_to_pulaar_dict = {item['english'].lower(): item['pulaar'] for item in translations}

    # Using fuzzywuzzy to find the closest match from the keys of the dictionary
    match, score = process.extractOne(english_word, eng_to_pulaar_dict.keys())

    # Setting a threshold for matching (e.g., 60)
    if score >= 60:  # Adjust the threshold as needed
        # Fetch the translation from the dictionary using the matched key
        translation = eng_to_pulaar_dict[match]
    else:
        translation = "Translation not found"

    return jsonify(translation=translation)




# Check if this script is the main program and not being imported as a module
if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask application with debug mode on
