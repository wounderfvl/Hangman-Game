var programming_langs = [
    "python",
	"javascript",
	"mongodb",
	"json",
	"java",
	"html",
	"css",
	"c",
	"csharp",
	"golang",
	"kotlin",
	"php",
	"sql",
	"ruby"
]

// Here's my thought process
// 1. User guesses a letter by clicking a letter on the keyboard
// 2. If the letter that the user has clicked is correct, then it'll fill the corresponding dashes. If incorrect, update the hangman picture
// 3. Disable the button after it is clicked

// Generate a random answer from the 'programming_langs' array
function randomword() {
    answer = programming_langs[Math.floor(Math.random() * programming_langs.length)];
}

// Call the function here because, why not?
randomword(startTimer());

// Generate the keyboard by splitting the string in 'abcdKeys', and creating a button element for each letter
// Assign 'btnKey' as their class name and an ID which corresonds to their letter
let abcdKeys = 'abcdefghijklmnopqrstuvwxyz'
function generateKeys() {
    let keyboard = document.getElementById('keyboard')
    let fragment = document.createDocumentFragment()
    abcdKeys.split('').forEach(letter => {
        let buttonKeys = document.createElement('button')
        buttonKeys.className = 'btnKey'
        buttonKeys.id = letter
        buttonKeys.textContent = letter
        fragment.appendChild(buttonKeys)
    });
    keyboard.appendChild(fragment)
}

// Calling said funtion
generateKeys();

// Assigning all the keyboard button a function when it is clicked using the 'addEventListener'
let keys = document.querySelectorAll('.btnKey')

keys.forEach(key => {
    key.addEventListener('click', handleGuess)
})

// Function to generate the answer in blank
function blankWord() {
    wordStatus = answer.split('').map(letter => (letter = ' _ '));
    document.getElementById('wordSpotlight').innerHTML = wordStatus.join('');
}

// Calling said function
blankWord();

function toggle(){
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    var popup = document.getElementById('popup');
    popup.classList.toggle('active')
}

// Checking if the player had won by getting the text from the 'wordSpotlight' ID
// Then turning it from, for example, 'S Q L' to 'sql'
// Then compare that to the actual answer
function checkWin() {
    check = document.getElementById('wordSpotlight').innerHTML
    // Just look this up if you don't understanf what it does, it is called 'Regex'
    if (check.replaceAll(/ /g, '').toLowerCase() === answer) {
        toggle(document.getElementById('msg').innerHTML = "You Won!");
    }
}

let attempt = 0;

// Checking if the player has lost by looking at the 'attempt' variable and comparing to the number 6
// Increment it by one every time the user guesses wrong
function checkLose() {
    attempt++
    document.getElementById('hangmanPic').src='hangman-game-images/images/hangman-'+ attempt +'.svg';
    document.getElementById('mistakes').innerHTML = attempt;
    if (attempt === 6){
        toggle(document.getElementById('msg').innerHTML = "You Lost.");
    }
}

let index = [];

// 1. Check if the key (chosenLetter) that we just pressed is in the variable 'answer'
// 2. If true, we will then turn the 'answer' into an array by using 'split('')' and iterate through every letter in said array
// 3. If the 'letter' from the 'answer' array is === to the letter that we chose 'chosenLetter', then we'll push the index (i) into an empty array that we declared
// 4. at this point 'wordStatus' = '[_,_,_]' (using the word 'sql' as an example), so now we call from the 'index' array to modify the 'wordStatus' array at a specific index where 'letter === chosenLetter'
function handleGuess() { 
    let chosenLetter = this.textContent;
    if (answer.includes(chosenLetter)) {
        answer.split('').forEach(function (letter, i) {
            if (letter === chosenLetter){
                index.push(i)
                wordStatus[i] = ' '+ letter.toLocaleUpperCase() + ' '
            }
            document.getElementById('wordSpotlight').innerHTML = wordStatus.join('');
        })
        checkWin();
    } else {
        checkLose();
    }
    document.getElementById(chosenLetter).setAttribute('disabled', true);
}
// When the user clicks on a letter button, the handleGuess function is called to check if the guessed letter is in the answer array. 
// If it is, the wordStatus array is updated with the guessed letter at the correct index, and the wordSpotlight element is updated with the new wordStatus array.
// And if not then the checkLose function is called


let audio = document.querySelector('#bgm')
audio.play()
// Audio will play after player clicks on a keyboard 


// Create a function to clear the interval set by setInterval
function myStopFunction() {
  clearInterval(startTimer);
}

// Create a var to initialize the time for countdown
// Set an interval that'll execute a function every 1000ms
// Interval will be executed repeatedly until interval is cleared
function startTimer(){
    var timeleft = 60;
    this.startTimer = setInterval(function(){
        if(timeleft <= 0){
            myStopFunction(0);
            toggle(document.getElementById('msg').innerHTML = "Time's Up!");
        } else {
            timeleft -= 1;
            document.getElementById("countdown").innerHTML = "You have " + timeleft + " seconds remaining";
        }
        }, 1000);

}
