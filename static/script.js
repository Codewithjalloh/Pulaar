// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
  // Attach an event listener to the translate button for click events
  document
    .getElementById('translateButton')
    .addEventListener('click', function () {
      // Get the value of the English text input field
      const englishWord = document.getElementById('englishText').value;
      // Send a POST request to the server with the English word for translation
      fetch('/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: englishWord }),
      })
        .then((response) => response.json()) // Parse the JSON response from the server
        .then((data) => {
          // Get the element where the translation result will be displayed
          const translationResult =
            document.getElementById('translationResult');
          // Set the text content of the translation result element to the translation received
          translationResult.textContent = data.translation;

          // Check if the translation is valid and not a 'Translation not found' message
          if (
            data.translation &&
            data.translation !== 'Translation not found'
          ) {
            // Get the element that contains the list of previous translations
            const translationsList =
              document.getElementById('translationsList');
            // Create a new list item element
            const newListItem = document.createElement('li');
            // Set the text content of the list item to include both English word and its translation
            newListItem.textContent = englishWord + ' - ' + data.translation;
            // Insert the new list item as the first child of the translations list
            translationsList.insertBefore(
              newListItem,
              translationsList.firstChild
            );
          }
        })
        .catch((error) => console.error('Error:', error)); // Log errors to the console
    });

  // Clear button functionality
  // Attach an event listener to the clear button for click events
  document.getElementById('clearButton').addEventListener('click', function () {
    // Clear the English text input field
    document.getElementById('englishText').value = '';
    // Clear the translation result display
    document.getElementById('translationResult').textContent = '';
  });

  // Speak button functionality (Text-to-Speech)
  // Attach an event listener to the speak button for click events
  document.getElementById('speakButton').addEventListener('click', function () {
    // Get the text content from the translation result element
    const text = document.getElementById('translationResult').textContent;
    // Check if there is text to speak
    if (text) {
      // Create a new speech synthesis utterance with the text
      const speech = new SpeechSynthesisUtterance(text);
      // Use the speech synthesis API to speak the text
      window.speechSynthesis.speak(speech);
    }
  });

  // Voice Record button functionality (Speech-to-Text)
  // Attach an event listener to the voice record button for click events
  document
    .getElementById('voiceRecordButton')
    .addEventListener('click', function () {
      // Create a new speech recognition instance
      const recognition = new webkitSpeechRecognition();
      // Set the language for recognition
      recognition.lang = 'en-US';
      // Define what happens when the recognition has a result
      recognition.onresult = function (event) {
        // Set the value of the English text input field to the transcribed text
        document.getElementById('englishText').value =
          event.results[0][0].transcript;
      };
      // Start the speech recognition
      recognition.start();
    });
});

// Contact form functionality
// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  // Attach an event listener to the contact form for submit events
  document
    .getElementById('contactForm')
    .addEventListener('submit', function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the values from the form input fields
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Display a confirmation message (In a real scenario, send this data to a server)
      document.getElementById('formOutput').innerHTML =
        'Thank you, ' +
        name +
        '. Your message has been received. We will contact you at ' +
        email +
        ' if a response is necessary.';

      // Clear the form fields after submission
      document.getElementById('contactForm').reset();
    });
});
// PRODUCT CARD LINK

document.addEventListener('DOMContentLoaded', function () {
  // Attach the click event listener to the entire document
  document.addEventListener('click', function (event) {
    // Check if the clicked element is a buy-button
    if (event.target && event.target.matches('.buy-button')) {
      // Retrieve the URL from the data-url attribute
      const productUrl = event.target.getAttribute('data-url');
      // Open the URL in a new tab
      window.open(productUrl, '_blank');
    }
  });
});


// Blog
document.addEventListener('DOMContentLoaded', function () {
  const readMoreButtons = document.querySelectorAll('.read-more-btn');

  readMoreButtons.forEach((button) => {
    button.addEventListener('click', function () {
      alert('More post content will be loaded!');
      // Here you might load more content dynamically
    });
  });
});
