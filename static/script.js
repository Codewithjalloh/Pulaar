document.addEventListener('DOMContentLoaded', function () {
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
          document.getElementById('translationResult').textContent =
            data.translation;
        })
        .catch((error) => console.error('Error:', error));
    });
});
