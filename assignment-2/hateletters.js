/*
	file: 	hateletters.js
	desc: 	simple script that generates a (skeleton) hate letter
			based on Christopher Stratchey's Love Letter as
			analysed by Noah Wardrip-Fruin in "Digital Media Archeology"
	author: Wietske Dotinga
	date: 	15/11/16
*/

// import chance (http://chancejs.com)
var chance = require('chance').Chance();

// import word-wrap (https://www.npmjs.com/package/word-wrap)
var wrap = require('word-wrap');

// import 'commander' (https://www.npmjs.com/package/commander)
var program = require('commander');

// initialise program (aka commander)
program
  .version('0.1')
  // add options for command line input to search the database
  .option('-w, --words [code]', 'input width of sentences', 'empty')
  .option('-s, --sentence [code]', 'input amount of sentences', 'empty')
  .parse(process.argv);

// vocabulary database with "negative" words
const first = ['HELLO', 'DEAR', 'HI', 'TO'];

const second = ['ASSHOLE', 'TWAT', 'BITCH', 'CUNT'];

const adjectives = ['AWFUL', 'DESPICABLE', 'DISGUSTING', 'DISTURBING',
  'HEARTLESS', 'INADEQUATE', 'REPULSIVE', 'UNWORTHY', 'UNSATISFIED', 'UNCARING',
  'UNFORGIVING', 'OUTRAGEOUS', 'PETTY', 'SHALLOW', 'WICKED', 'UNTRUSTWORTHY',
  'INCONSISTENT', 'PREJUDICED', 'IMPATIENT', 'PESSIMISTIC', 'FRUSTRATING',
  'DISAPPOINTING', 'INDIFFERENT', 'RUSHED', 'IRRELEVANT', 'USELESS',
  'INEXPERIENCED', 'UNSYMPATHETIC', 'LIMITED', 'DISINTERESTED', 'MEDIOCRE'];

const nouns = ['PAIN', 'FEAR', 'DEATH', 'REVENGE', 'DISEASE', 'INJURY',
  'OCCUPATION', 'AWKWARDNESS', 'AWFULNESS', 'BACKWARDNESS', 'BREAKDOWN',
  'BRUISE', 'BULLY', 'COMPLAINT', 'CONFESSION', 'HEART', 'HUNGER',
  'CONFRONTATION', 'CRASH', 'CRUELTY', 'CRISIS', 'DUNGEON', 'EMERGENCY',
  'RAPTURE', 'MANIPULATION', 'MISCALUCATION', 'MISJUDGEMENT', 'MISTAKE',
  'PROBLEM'];

const adverbs = ['BADLY', 'ANXIOUSLY', 'LAZILY', 'SELFISHLY', 'SELDOM',
  'MORTALLY', 'MADLY', 'RUDELY', 'SLOWLY', 'ANGRILY', 'BOLDLY', 'ACCIDENTALLY',
  'ALWAYS', 'IMPATIENTLY', 'STERNLY', 'POORLY', 'RARELY', 'WILDLY',
  'OBNOXIOUSLY', 'FOOLISHLY', 'DOUBTFULLY'];

const verbs = ['ATTACKS', 'AVOIDS', 'BATTLES', 'ANNOYS', 'ALERTS', 'CRAWLS',
  'DAMAGES', 'DESTROYS', 'DOUBTS', 'DELAYS', 'ESCAPES', 'DRAINS', 'FRAMES',
  'FOOLS', 'IRRITATES', 'KICKS', 'JUDGES', 'MURDERS', 'PREVENTS', 'OBJECTS',
  'SHOCKS', 'STRAPS', 'SUSPECTS', 'USES', 'SUSPENDS'];

const determiners = ['MY', 'YOUR', 'THEIR'];

const end = ['WITH HATE', 'TALK TO YOU NEVER', 'SINCERELY', 'RELUCTANTLY'];

const person = ['YOUR ENEMY', 'YOUR NEMESIS'];

const object = ['ME', 'YOU', 'HIM', 'HER', 'THEM'];

const time = ['TODAY', 'RIGHT NOW', 'EVERY TIME', 'EVERY DAY'];

// store input of command line in variables
var sentence_amount = program.sentence;
var character_amount = program.words;

/**
*	Picks a random element from an array
*	@param {Array} array
*	@return {Object} choice
*/
function choice(array) {
  var index = chance.natural({'min': 0, 'max': array.length - 1});
  return array[index];
}

/**
*	Randomly picks or not a random element from an array
*	@param {Array} array
*	@return {Object} choice
* 	@return {String} empty string
*/
function maybe(array) {
  if(chance.bool()) {
    return choice(array);
  }
  else {
    return '';
  }
}

/**
*	Generates a short greeting phrase consisting of a randomly chosen
*	greeting and word adressing someone
*	@return {String} phrase
*/
function greeting() {
  return choice(first) + ' ' + choice(second) + ',';
}

/**
*	Generates a short ending phrase consisting of a randomly chosen
*	ending and word adressing yourself
*	@return {String} phrase
*/
function ending() {
  return choice(end) + ',\n' + choice(person);
}

/**
*	Generates different sentence structures composed of randomly chosen words
*	@return {String} sentence
*/
function long() {
  // randomly picks one of two sentence structures
  if(chance.bool()) {
    // determiner-adjective-noun-adverb-verb-determiner-adjective-noun structure
    return choice(determiners) + ' ' + maybe(adjectives) + ' ' + choice(nouns) +
      ' ' + maybe(adverbs) + ' ' + choice(verbs) + ' ' + choice(determiners) +
      ' ' + maybe(adjectives) + ' ' + choice(nouns) + '. ';
  }
  // time-determiner-noun-verb-object structure
  else {
    return choice(time) + ' ' + choice(determiners) + ' ' + choice(nouns) +
      ' ' + choice(verbs) + ' ' + choice(object) + '. ';
  }
}

// format the output with a header of 5 new lines
console.log("\n\n\n\n\n");

// create string to save sentences created
var text = '';

// add generated greeting to text
text += greeting() + "\n";

// loop to generate the amount of sentences from the command line input
for(var i = 0; i < sentence_amount; i++) {
  // add generated string long to text
  text += long();
}

// add generated ending to text
text += "\n" + ending();

// wrap the text to the lenght of the characters from the command line input
console.log(wrap(text, {'width': character_amount}));

// format the output with a footer of 5 new lines
console.log("\n\n\n\n\n\n");
