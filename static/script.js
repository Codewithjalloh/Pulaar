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
