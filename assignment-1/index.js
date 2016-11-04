// simplest tri-lingual program

var program = require('commander');

program
  .version('0.1')
  .option('-l, --language [code]', 'Language', /^(en|nl|fr)$/i)
  .parse(process.argv);

switch(program.language)
{
    case('en'):
        console.log('Hello!');
        break;
    case('nl'):
        console.log('Dag!');
        break;
    case('fr'):
        console.log('Allô!');
        break;
    default:
        console.log('...');
        break;
}
