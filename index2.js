// simplest tri-lingual program

var program = require('commander');

var person1_name = "James";
var person1_age = 25;
var person1_lan = "english";

var person2_name = "Rita";
var person2_age = 7;
var person2_lan = "danish";

var person3_name = "Geert";
var person3_age = 51;
var person3_lan = "dutch";

program
  .version('0.1')
  .option('-l, --language [code]', 'Language', /^(en|nl|fr)$/i)
  .parse(process.argv);

switch(program.name)
{
    case person1_name:
        console.log(person1_name);
        console.log(person1_age);
        console.log(person1_lan);
        break;

    case person2_name:
        console.log(person2_name);
        console.log(person2_age);
        console.log(person2_lan);
        break;

    case person3_name:
        console.log(person3_name);
        console.log(person3_age);
        console.log(person3_lan);
        break;
}
