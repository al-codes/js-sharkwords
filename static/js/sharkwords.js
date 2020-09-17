
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


// Loop over the chars in `word` and create divs.
//
const createDivsForChars = (word) => {
  for (const char of word) {
    $('#word-container').append(`<div class="letter-box ${char}"></div>`);
  }
};

  //   VJS -->
  //   const div = document.createElement('div');
  //   div.classList.add('letter-box');
  //   div.classList.add(letter);
  //   document.querySelector('#word-container').append(div);


// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  for (const char of ALPHABET) {
    $('#letter-buttons').append(`<button>${char}</button>`);
  }
};

    // VJS -->
    // const btn = document.createElement('button');
    // btn.innerHTML = char;
    // document.querySelector('#letter-buttons').append(btn);



// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  const button = $(buttonEl); 
  $('button').attr('disabled', true); //change from disabled to true
};
  
  //VJS -->
  // buttonEl.setAttribute('disabled', true);



// Return `true` if `letter` is in the word.
//
const isLetterInWord = (letter) => {
  return $(`div.${letter}`)[0] !== undefined; //checking if guessed letter returns tru  
};
  // VJS -->
  // document.querySelector(`div.${letter}`) !== undefined;


// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter) => {
  $(`div.${letter}`).html(letter);  //if isLetterInWord is true --> runs this fcn
};
  // VJS -->    
  // document.querySelector(`div.${letter}`).innerHTML = letter;


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  if (numWrong === 5) {
    $('#play-again').css('display', '');  //Display? 

  } else {
      numWrong += 1 
      ('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);
  }
};
  // VJS -->
  // document.querySelector('#play-again').style.display = '';
  // document.querySelector('#shark-img img').setAttribute('src',`images/guess${numWrong}.png`);




// Reset game state. Called before restarting the game.
//
const resetGame = () => {
  numWrong = 0;

  ('#shark-img img').attr('src', `/static/images/guess0.png`);

  $('#play-again').css('display', 'none'); 

  for (const el of $('#word-container').children()) {
    el.remove();
  }
  for (const el of $('#letter-buttons').children()) {
    el.remove();
  }
};
  // also could use this to remove children:
  // $('section#word-container').empty();
  // $('section#letter-buttons').empty();
  // VJS -->
  // document.querySelector('#shark-img img').setAttribute('src',`/static/images/guess0.png`);
  // document.querySelector('#play-again').style.display = 'none';
  // 


// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = evt.target;
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html(); //throwing a TypeError here

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
