// global variable
const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.getElementsByClassName("btn__reset")[0];
const overlay = document.getElementById("overlay");
const reset = document.createElement("button");
const letters = document.getElementsByClassName("letter");
const show = document.getElementsByClassName("show");
reset.textContent = "Reload Game";
reset.className = "btn__reset";

let missed = 0;
// phrases
let phrases = [
  "Watching Tv",
  "Driving a car",
  "Banana peel",
  "Harry Potter",
  "Fight club",
];

const getRandomPhraseAsArray = (arr) => {
  let myPhrase = Math.floor(Math.random() * phrases.length);
  let phrase = arr[myPhrase].toUpperCase();
  let characters = phrase.split("");
  return characters;
};
const phraseArray = getRandomPhraseAsArray(phrases);

const addPhraseToDisplay = (arr) => {
  for (i = 0; i < phraseArray.length; i++) {
    let letter = phraseArray[i];
    let li = document.createElement("li");
    li.className = "";
    li.textContent = letter;
    phrase.appendChild(li);

    if (letter != " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
};
addPhraseToDisplay(phraseArray);

const checkLetter = (button) => {
  let match = "";
  for (i = 0; i < letters.length; i++) {
    if (button.textContent === letters[i].textContent.toLowerCase()) {
      match = letters[i].classList.add("show");
    } else {
      null;
    }
  }
  return match;
};

const checkWin = () => {
  if (letters.length === show.length) {
    overlay.classList.add("win");
    overlay.innerHTML = "<h2>congratulations you won!</h2>";
    overlay.style.display = "flex";
    overlay.appendChild(reset); 
  } else if (missed > 4) {
    overlay.classList.add("lose");
    overlay.innerHTML = "<h2>Sorry you lose!</h2>";
    overlay.style.display = "flex";
    overlay.appendChild(reset);
  }
};

startButton.addEventListener("click", () => {
  overlay.style.display = "none";
});

qwerty.addEventListener("click", (e) => {
  const btn = event.target;
  if (btn.tagName === "BUTTON") {
    btn.classList.add("chosen");
  }
  if (btn.className === "chosen") {
    btn.disabled = true;
  }
  if (btn.className === "keyrow") {
    btn = false;
  }

  const letterFound = checkLetter(btn);
  let png = document.querySelector(".tries img[src= 'images/liveHeart.png']");

  if (btn.buttons !== letterFound) {
    png.setAttribute("src", "images/lostHeart.png");
    missed++;
  }

  checkWin();
});

// event listener for the reset button
reset.addEventListener("click", () => {
  location.reload();
});
