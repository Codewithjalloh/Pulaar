document.addEventListener('DOMContentLoaded', function () {
  // Translate button functionality
  document
    .getElementById('translateButton')
    .addEventListener('click', function () {
      const englishWord = document.getElementById('englishText').value;
      fetch('/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: englishWord }),
      })
        .then((response) => response.json())
        .then((data) => {
          const translationResult =
            document.getElementById('translationResult');
          translationResult.textContent = data.translation;

          // Add the English word and its translation to the history list if valid
          if (
            data.translation &&
            data.translation !== 'Translation not found'
          ) {
            const translationsList =
              document.getElementById('translationsList');
            const newListItem = document.createElement('li');
            newListItem.textContent = englishWord + ' - ' + data.translation;
            translationsList.insertBefore(
              newListItem,
              translationsList.firstChild
            );
          }
        })
        .catch((error) => console.error('Error:', error));
    });

  // Clear button functionality
  document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('englishText').value = '';
    document.getElementById('translationResult').textContent = '';
  });

  document.getElementById('speakButton').addEventListener('click', function () {
    const text = document.getElementById('translationResult').textContent;
    if (text) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
  });

  // Voice Record button functionality (Speech-to-Text)
  document
    .getElementById('voiceRecordButton')
    .addEventListener('click', function () {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = function (event) {
        document.getElementById('englishText').value =
          event.results[0][0].transcript;
      };
      recognition.start();
    });
});

// CONTACT US FORM

document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('contactForm')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Here you would typically send this data to a server
      // For demonstration, we'll just display a confirmation message

      document.getElementById('formOutput').innerHTML =
        'Thank you, ' +
        name +
        '. Your message has been received. We will contact you at ' +
        email +
        ' if a response is necessary.';

      // Clear the form fields
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
