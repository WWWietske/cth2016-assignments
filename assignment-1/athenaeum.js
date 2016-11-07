// Command line interface for a "fake" bookstore
// Wietske Dotinga - 10781889
// Coding the Humanities
// 8 November 2016

var program = require('commander');

// information of the five books and the output message for each book
var book1_title = "Why Grow Up";
var book1_author = "Susan Neiman";
var book1_price = "16,95";
var book1_kind = "Paperback";
var book1_output = 'Title: Why Grow Up?' + '\n' + 'Author: Susan Neiman' +
  '\n' + 'Price: 16,95' + '\n' + 'Kind: Paperback';

var book2_title = "Psychologie voor de praktijk";
var book2_author = "Jakop Rigter";
var book2_price = "29,50";
var book2_kind = "Paperback";
var book2_output = 'Title: Psychologie voor de praktijk' + '\n' +
  'Author: Jakop Rigter' + '\n' + 'Price: 29,50' + '\n' + 'Kind: Paperback';

var book3_title = "Controle is goed vertrouwen nog beter";
var book3_author = "Kees Cools";
var book3_price = "29,95";
var book3_kind = "Paperback";
var book3_output = 'Title: Controle is goed vertrouwen nog beter' + '\n' +
  'Author: Kees Cools' + '\n' + 'Price: 29,95' + '\n' + 'Kind: Paperback';

var book4_title = "De Nederlandse Revolutie";
var book4_author = "19,90";
var book4_price = "Joost Rosendaal";
var book4_kind = "Paperback";
var book4_output = 'Title: De Nederlandse revolutie' + '\n' +
  'Author: Joost Rosendaal' + '\n' + 'Price: 19,90' + '\n' +
  'Kind: Paperback';

var book5_title = "Vonk";
var book5_author = "Harry Mulisch";
var book5_price = "10,00";
var book5_kind = "Paperback";
var book5_output = 'Title: Vonk' + '\n' + 'Author: Harry Mulisch' +
  '\n' + 'Price: 10,00' + '\n' + 'Kind: Paperback';

program
  .version('0.1')
  // options for command line input to search the database
  .option('-title, --title [code]', 'search by title of a book', 'empty')
  .option('-author, --author [code]', 'search by author name', 'empty')
  .option('-price, --price [code]', 'search by price of a book', 'empty')
  .option('-kind, --kind [code]', 'search by kind of book, paperback or hardcover',
    /^(Paperback|Hardcover)$/i)
  .parse(process.argv);

// this switch function enables search by title of a book
switch(program.title)
{
    case book1_title:
        console.log(book1_output);
        break;
    case book2_title:
        console.log(book2_output);
        break;
    case book3_title:
        console.log(book3_output);
        break;
    case book4_title:
        console.log(book4_output);
        break;
    case book5_title:
        console.log(book5_output);
        break;
}

// this switch function enables search by author of a book
switch(program.author)
{
    case book1_author:
        console.log(book1_output);
        break;
    case book2_author:
        console.log(book2_output);
        break;
    case book3_author:
        console.log(book3_output);
        break;
    case book4_author:
        console.log(book4_output);
        break;
    case book5_author:
        console.log(book5_output);
        break;
}

// this switch function enables search by price of a book
switch(program.price)
{
    case book1_price:
        console.log(book1_output);
        break;
    case book2_price:
        console.log(book2_output);
        break;
    case book3_price:
        console.log(book3_output);
        break;
    case book4_price:
        console.log(book4_output);
        break;
    case book5_price:
        console.log(book5_output);
        break;
}

// this switch function enables search by kind of a book
switch(program.kind)
{
    case ('Paperback'):
        console.log(book1_output + '\n' + book2_output + '\n' + book3_output
          + '\n' + book4_output + '\n' + book5_output);
        break;
    // no hardcover books in current database so output this message instead
    case ('Hardcover'):
        console.log('Currently no hardcover books in the database');
        break;
}
