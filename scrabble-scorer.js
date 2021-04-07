// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
  word = String(word);
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
  
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

 function transform(oldPointStructure) {
  let newStructure = {};
  for (let item in oldPointStructure){
    let letters = oldPointStructure[item];
    for (let i = 0; i < letters.length; i++) {
      newStructure[letters[i].toLowerCase()] = Number(item);
    }
  }
  return newStructure;
};

let newPointStructure = transform(oldPointStructure);

function scrabbleScore (word) {
  word = String(word);
  word = word.toLowerCase();
  let totalPoints = 0;
  for (let i = 0; i < word.length; i++){
    totalPoints += newPointStructure[word[i]];
  }
  return totalPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  let word = input.question("Let's play some scrabble! Enter a word: ");
  return word;
};

let simpleScore = function(word) {
  word = String(word);
  return word.length;
};

let vowelBonusScore = function(word){
  let score = 0;
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  word = String(word);
  word = word.toUpperCase();
  for (let i=0; i < word.length; i++){
    if (vowels.includes(word[i])){
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

const scoringAlgorithms = [
  {
    name: 'Simple Score',
    description: 'Each letter is worth one point.',
    scoringFunction: simpleScore
  },
  {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoringFunction: vowelBonusScore
  },
  {
    name: 'Scrabble',
    description: 'The traditional scoring algorithm.',
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt(word) {
  let options = ['0', '1', '2'];
  for (let i = 0; i < 3; i++){
    console.log(`${i}: ${scoringAlgorithms[i].name} - ${scoringAlgorithms[i].description}`)
  }
  let selection = input.question("Which scoring system would you like to use? (Option 0, 1, or 2): ")
  if (options.includes(selection)){
    console.log(`${scoringAlgorithms[selection].name} - Your score for ${word}:\n${scoringAlgorithms[selection].scoringFunction(word)}`)
  } else {
    scorerPrompt(word);
  }
}


function runProgram() {
   word = initialPrompt();
   scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

