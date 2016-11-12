var chance = require('chance').Chance();

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

// determiner + adjective + noun + adverb + verb + determiner + adjective + noun
const first = ['DARLING', 'DEAR', 'HONEY', 'JEWEL'];

const second = ['DUCK', 'LOVE', 'MOPPET', 'SWEETHEART'];

const adjectives = ['ADORABLE', 'AFFECTIONATE', 'AMOROUS', 'ANXIOUS', 'ARDENT', 'AVID', 'BREATHLESS', 'BURNING', 'COVETOUS', 'CRAVING', 'CURIOUS', 'DARLING', 'DEAR', 'DEVOTED', 'EAGER', 'EROTIC', 'FERVENT', 'FOND', 'IMPATIENT', 'KEEN', 'LITTLE', 'LOVEABLE', 'LOVESICK', 'LOVING', 'PASSIONATE', 'PRECIOUS', 'SWEET', 'SYMPATHETIC', 'TENDER', 'UNSATISFIED', 'WISTFUL'];

const nouns = ['ADORATION', 'AFFECTION', 'AMBITION', 'APPETITE', 'ARDOUR', 'CHARM', 'DESIRE', 'DEVOTION', 'EAGERNESS', 'ENCHANTMENT', 'ENTHUSIASM', 'FANCY', 'FELLOW FEELING', 'FERVOUR', 'FONDNESS', 'HEART', 'HUNGER', 'INFATUATION', 'LIKING', 'LONGING', 'LOVE', 'LUST', 'PASSION', 'RAPTURE', 'SYMPATHY', 'TENDERNESS', 'THIRST', 'WISH', 'YEARNING'];

const adverbs = ['AFFECTIONATELY', 'ANXIOUSLY', 'ARDENTLY', 'AVIDLY', 'BEAUTIFULLY', 'BREATHLESSLY', 'BURNINGLY', 'COVETOUSLY', 'CURIOUSLY', 'DEVOTEDLY', 'EAGERLY', 'FERVENTLY', 'FONDLY', 'IMPATIENTLY', 'KEENLY', 'LOVINGLY', 'PASSIONATELY', 'SEDUCTIVELY', 'TENDERLY', 'WINNINGLY', 'WISTFULLY'];

const verbs = ['ADORES', 'ATTRACTS', 'CARES FOR', 'CHERISHES', 'CLINGS TO', 'DESIRES','HOLDS DEAR', 'HOPES FOR', 'HUNGERS FOR', 'IS WEDDED TO', 'LIKES', 'LONGS FOR', 'LOVES', 'LUSTS AFTER', 'PANTS FOR', 'PINES FOR', 'PRIZES', 'SIGHS FOR', 'TEMPTS', 'THIRSTS FOR', 'TREASURES', 'WANTS', 'WISHES', 'WOOS', 'YEARNS FOR'];

const determiners = ['MY', 'YOUR', 'THEIR'];

var sentence_amount = program.sentence;
var words_amount = program.words;

function choice(array) {
  var index = chance.natural({'min': 0, 'max': array.length});
  return array[index];
}

function maybe(array) {
  if(chance.bool()) {
    return choice(array);
  }
  else {
    return '';
  }
}

function short() {
  return choice(adjectives) + ' ' + choice(nouns) + '.';
}

function long() {
  return 'MY ' + maybe(adjectives) + ' ' + choice(nouns) + ' ' + maybe(adverbs)
  + ' ' + choice(verbs) + ' ' + 'YOUR' + ' ' + maybe(adjectives) + ' ' + choice(nouns) + '.';
}

console.log("\n\n\n\n\n\n");

for(var i = 0; i < sentence_amount; i++) {
  console.log(long());
}

console.log("\n\n\n\n\n\n");
