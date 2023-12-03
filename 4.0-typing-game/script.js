const quotes = [
    'When you have eliminated',
    'There is nothing',
    'I ought to know',
    'I never make exceptions',
    'What one man can invent',
    'Nothing clears up a case',
    'Education never ends',
];

// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// Score array
let scoresList = [];
let quotesList = [];
// High score
let high;
// page elements
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const dialogElement = document.getElementById('dialog-message');
const typedValueElement = document.getElementById('typed-value');
const closeButton = document.getElementById('close-message');
const scoreElm = document.getElementById('scores');
const highScoreElm = document.getElementById('high-score');

getHighScore();

document.getElementById('start').addEventListener('click', () => {
	typedValueElement.addEventListener('input', inputHandler);
	typedValueElement.className = '';
	typedValueElement.value = "";
    typedValueElement.removeAttribute("readonly");
	// get a quote
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    // Put the quote into an array of words
    words = quote.split(' ');
    // reset the word index for tracking
    wordIndex = 0;
  
    // UI updates
    // Create an array of span elements so we can set a class
    const spanWords = words.map(function(word) { return `<span>${word} </span>`});
    // Convert into string and set as innerHTML on quote display
    quoteElement.innerHTML = spanWords.join('');
    // Highlight the first word
    quoteElement.childNodes[0].className = 'highlight';
    // Clear any prior messages
    messageElement.innerText = '';
  
    // Setup the textbox
    // Clear the textbox
    typedValueElement.value = '';
    // set focus
    typedValueElement.focus();
    // set the event handler
  
    // Start the timer
    startTime = new Date().getTime();
  });
  
function inputHandler() {
  // Get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  let elapsedTime = 0;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end of sentence
    // Display success
    elapsedTime = new Date().getTime() - startTime;
    saveScore(elapsedTime / 1000);
    showHighScore();
    showScores();
    showDialog(elapsedTime);
    typedValueElement.setAttribute("readonly", "");
    typedValueElement.value = '';

  } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = '';
    // move to the next word
    wordIndex++;
    // reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = '';
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = 'highlight';
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = '';
  } else {
    // error state
	typedValueElement.removeEventListener('input', inputHandler);
    typedValueElement.className = 'error';
  }
};

closeButton.addEventListener('click', () => {
  dialogElement.close();
});

function showDialog(time) {
  const message = `CONGRATULATIONS! You finished in ${time / 1000} seconds.`;
  messageElement.innerText = message;

  dialogElement.showModal();
  openCheck(dialogElement);
}

function openCheck(dialog) {
  if (dialog.open) {
      console.log("Dialogo abierto");
  } else {
      console.log("Dialogo cerrado");
  }
}

function saveScore(score) {
  scoresList.push(score);
  quotesList.push(words.join(' '));
}

function showScores() {
  scoreElm.innerHTML = '';
  let registro = '';

  for (let i = 0; i < scoresList.length; i++) {
      registro += scoresList[i] + ' -> ' + quotesList[i] + '<br/>';
  }

  scoreElm.innerHTML = registro;
}

function showHighScore() {
  let temp = scoresList[0];

  for (let i = 1; i < scoresList.length; i++) {
    if (temp > scoresList[i]) {  // the highest score is the shortest time.
      temp = scoresList[i];
    }
  }

  if (temp < high) {
    high = temp;
  }

  highScoreElm.innerText = high;

  saveHighScoreInLocal();

}

function getHighScore() {
  high = localStorage.getItem('high-score');

  if (!high) {
    highScoreElm.innerText = "No hay registro anterior."
    high = 9999.99;
  } else {
    highScoreElm.innerText = high;
  }

}

function saveHighScoreInLocal() {
  localStorage.setItem('high-score', high);
  // console.log(highScoreElm.innerText);
}