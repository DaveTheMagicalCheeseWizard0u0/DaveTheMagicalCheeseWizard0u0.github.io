//initialiser tout les variables du début
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

const dialog = document.getElementById('dialog');
const boutonFermer = document.getElementById('fermerDialog');
const validationFermer = document.getElementById('checbocDialog');
let valeur1 = 0;
const boutonCacher = document.getElementById('bouttoncacher');

/** cette fonctiont crée 26 bouton different avec chacun une lettre de lalphabet
 * 
 * @returns buttonsHTML
 */
//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

/** cette fonction permet de savoir sur quelle bouton on a cliquer
 * 
 * @param {object} event 
 * @returns rien
 */
function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//liste de catégorie
const question = [
  "La catégorie choisi est les couleurs",
  "La catégorie choisi est films",
  "La catégorie choisi est lettres sur le clavier"
];
// listes des nom a deviner
const categories = [
  [ "bleu", "blanc","rouge","noir","chartreuse","pas-bleu","encore-blanc"],

  ["alien", "deadpool-un", "deadpool-deux", "deadpool-trois", "star-wars"],

  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
];
// listes d'indices
const hints = [
  [
    "ciel",
    "neige",
    "100",
    "nuit",
    "j'ai pas d'indice",
    "pas ciel",
    "encore neige"
  ],
  [
    "pas sur terre",
    "gentil méchant un",
    "gentil méchant deux",
    "gentil méchant trois",
    "guerre ******"
  ],
  [
    "La réponse fait partie d'une des 26 lettres de l'alphabet",
    "lA réponse fait partie d'une des 26 lettres de l'alphabet",
    "la Réponse fait partie d'une des 26 lettres de l'alphabet",
    "la rÉponse fait partie d'une des 26 lettres de l'alphabet",
    "la réDonse fait partie d'une des 26 lettres de l'alphabet",
    "la répOnse fait partie d'une des 26 lettres de l'alphabet",
    "la répoFse fait partie d'une des 26 lettres de l'alphabet",
    "la réponSe fait partie d'une des 26 lettres de l'alphabet",
    "la réponsE fait partie d'une des 26 lettres de l'alphabet",
    "la réponse Fait partie d'une des 26 lettres de l'alphabet",
    "la réponse fAit partie d'une des 26 lettres de l'alphabet",
    "la réponse faIt partie d'une des 26 lettres de l'alphabet",
    "la réponse faiT partie d'une des 26 lettres de l'alphabet",
    "la réponse fait Partie d'une des 26 lettres de l'alphabet",
    "la réponse fait pArtie d'une des 26 lettres de l'alphabet",
    "la réponse fait paRtie d'une des 26 lettres de l'alphabet",
    "la réponse fait parTie d'une des 26 lettres de l'alphabet",
    "la réponse fait partIe d'une des 26 lettres de l'alphabet",
    "la réponse fait partiE d'une des 26 lettres de l'alphabet",
    "la réponse fait partie D'une des 26 lettres de l'alphabet",
    "la réponse fait partie d'Une des 26 lettres de l'alphabet",
    "la réponse fait partie d'uNe des 26 lettres de l'alphabet",
    "la réponse fait partie d'unE des 26 lettres de l'alphabet",
    "la réponse fait partie d'une Des 26 lettres de l'alphabet",
    "la réponse fait partie d'une des 26 Lettres de l'alphabet",
    "la réponse fait partie d'une des 26 lEttres de l'alphabet"

  ]
];


//set question,answer and hint
 /**
  * cette fonction permet de determiner de facon aleatoir la categorie la reponse et l'indice
  */
function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

/** cette fonction crée le mot cacher avec des "_" et "-"
 * 
 * @param {entre un mot en parametre} word 
 * @returns retoure un suite de caractere égale aux nombre de lettre du mots choisis
 */
function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

/**
 * permet de faire apparaitre un indice si on click sur le bouton "indice"
 */
function showHint() {
  containerHint.innerHTML = `indice - ${hint}`;
}
/**
 * dès que bouttonHint est cliquer sa lance la fonction showhint
 */
buttonHint.addEventListener("click", showHint);


/**
 * cette fonction remet le jeux a 0
 */
function init() {
if (valeur1 == 0){
  if(localStorage.getItem("dialog") != "false"){
    dialog.showModal();
  }

  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu a ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
  valeur1 = 1;
}
else{
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `Indice -`;
  livesDisplay.innerHTML = `Tu a ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}
}
/**
 * dès que la page est rénitialisé sa lance la fonction init
 */
window.onload = init();

//permet de faire une nouvelle partie
buttonReset.addEventListener("click", init);

//guess click
/**
 * cette fonction est resposable de vérifier si le bouton qu'on click si il est dans le mot cacher
 * @param {event} event 
 * @returns rien
 */
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `Tu a gagné!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `Tu a ${life} vies!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `Tu a ${life} vie!`;
      }else if(life == 9){
        livesDisplay.innerHTML = `Tu a ${life} vie comme un petit chat MIAOUUUUUUUUUUUUUUUU!`;   
      }else {
        livesDisplay.innerHTML = `Partie fini!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `Tu a gagné!`;
      return;
    }
  }
}
//chaque clique sur container lance la fonction guess
container.addEventListener("click", guess);

// les fonction suivante permette de dessiner le bonhomme pendu
// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000"; //couleur du stick man
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];

const modalFermer = localStorage.getItem('modalClosed')
// fin des fonction qui dessine le bonhomme pendu

/**
 * cette fonction permet de fermer le dialogue
 */
function dialogFermer(){
  if(validationFermer.checked){
    localStorage.setItem('dialog', "false");
  }
  dialog.close(); 

}
function deviner(){
  const mot = prompt("Vous pouvez deviner ATTENTION !!! vous avez une seul chance");

  if(mot == answer){
    livesDisplay.innerHTML = `Tu a gagné!`;
  }
  else{
    livesDisplay.innerHTML = `Partie fini!`;
  }

}
