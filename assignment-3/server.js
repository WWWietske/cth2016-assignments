/*
  file:   server.js
  desc:   script that configures a HTTP server that listens to incoming client connections.
          Clients are expected to send chat-like messages (see index.html) which are replied
          to depending if certain patterns are recognised in the message (or not). The idea
          is to create a simple artificial conversation between the a human subject and the
          script. The work is inspired by Alan Turing's Imitation Game and Joseph Weizenbaum's
          ELIZA.
  author: Wietske Dotinga
  date:   22/11/2016
*/

// import express ()
var express = require('express');		// npm install --save express
var app = express();

// import node.js http
var server = require('http').Server(app);

// import socket.io
var io = require('socket.io')(server);	// npm install --save socket.io

// import chance (http://chancejs.com)
var chance = require('chance').Chance(); // npm install --save chance

/* ---------------------
  Answers & Responses
------------------------*/

// the patterns which the script looks for when
// receiving message from the client

const pattern_1 = ['How do you do?', 'Wazzup?'];
const pattern_2 = ['Why?', 'No', "ok"];
const pattern_3 = ['What should I eat for dinner?', "I don't know what to eat",
  'Do you have any food suggestions?', 'dinner', 'food'];
const pattern_4 = ['Do you know any animals?', 'What are cool animals?',
  'animals'];
const pattern_5 = ['Why are you so mean?', "Please don't be mean",
  "I don't like you", 'You are rude', 'mean', 'rude'];

// arrays of words for the responses
const ponctuation = ['.', '!', '...'];
const dishes = ['pasta', 'noodles', 'rice', 'pizza', 'sushi'];
const vegetables = ['tomatoes', 'broccoli', 'carrots', 'spinach'];
const animals = ['whales', 'tigers', 'axolotl', 'elephants'];

/**
* Iterates through and array of clauses or words and
* search them inside a given sentence (msg). Returns
* true if the search is successful and false otherwise.
* @param {Array of strings} array_of_patterns
* @param {String} msg
* @return {boolean}
*/
function matches(msg, array_of_patterns) {

  var msg_lower = msg.toLowerCase();

  for(var i = 0; i < array_of_patterns.length; i++) {

    var pattern_lower = array_of_patterns[i].toLowerCase();

    if(msg_lower.search(pattern_lower) > -1) {

      return true;

    }
  }
  return false;
}

/**
* Picks a random element from an array
* @param {Array} array
* @return {Object} choice
*/
function choice(array) {

  var index = chance.natural({'min': 0, 'max': array.length - 1});

  return array[index];
}

/**
* Randomly picks or not a random element from an array
* @param {Array} array
* @return {Object} choice
* @return {String} empty string
*/
function maybe(word, array) {

  if( chance.bool() ) {

    return word + choice(array);

  } else {

    return '';

  }
}

/**
* Constructs a single randomly generate answer
* @return {String}
*/
function patter_1_answer() {
  return choice(['Hmmm', 'Ah!', '...']) + ' ' + 'I am ' + choice(['feeling', 'doing']) + ' '
    + choice(['great', 'fabulous', 'cat-like', 'miserable', 'fine', 'confused']) + ' '
    + choice(ponctuation);
}

/**
* Constructs a randomly generate answer out of three random possibilities
* @return {String}
*/
function patter_2_answer() {

  switch(choice([1, 2, 3]))
  {
    case 1:
      return choice(['Please', 'Hmmm', 'Ok']) + " don't be "
        + maybe(['avidly', 'impatiently', 'eagerly', 'anxiously']) + ' '
        + choice(['superficial', 'mean', 'joyful', 'negative', 'pickled', 'angry'])
        + choice(ponctuation);
    case 2:
      return choice(['I am sorry', 'Excuse me', 'Eh...']) + ' I do ' + choice(['not', 'indeed']) + ' '
        + choice(['understand', 'share the same worldview as', 'empathise with']) + ' you'
        + choice(ponctuation);
    case 3:
      return choice(['YES', 'Ok', 'Zzzzz']) + choice(ponctuation) + choice(ponctuation) + choice(ponctuation);
  }
}

/**
* Constructs a randomly generate answer out of two random possibilities
* @return {String}
*/
function patter_3_answer() {

  switch(choice([1, 2])){
    case 1:
      return choice(['Maybe ', 'Do you like ']) + choice(dishes) +
        maybe(' with ', vegetables) + choice(ponctuation);
    case 2:
      return choice(['How would I know?', "Don't ask me!",
        "I don't want to answer your stupid questions."]);
  }
}

/**
* Constructs a randomly generate answer out of three random possibilities
* @return {String}
*/
function patter_4_answer() {

  switch(choice([1, 2])){
    case 1:
      return choice(['I like ', 'I love ', 'These animals are cool ']) +
        choice(animals) + maybe(' and ', animals) + maybe(' and ', animals) +
        maybe(' and ', animals) + choice(ponctuation);
    case 2:
      return choice(['How would I know?', "Don't ask me!",
        "I don't want to answer your stupid questions."]);
    case 3:
      return choice(["I don't like ", "I'm not a big fan of "]) +
      choice(andimals) + "and" + choice(animals) + choice(ponctuation);
  }
}

/**
* Returns a random apology
* @return {String}
*/
function patter_5_answer() {

  return choice(["I'm sorry", "I didn't intend to hurt you",
    "I don't want to be mean"]) + choice(ponctuation);
}

/**
* Constructs a single randomly generate answer
* @return {String}
*/
function default_answer() {

  return choice(['Sorry, come again.', 'I do not understand.', 'Can you repeat.',
                  'No comprendo...', 'Ne me quitte pas!']);
}

/**
* Matches a message to the above two patterns (pattern_1, pattern_2)
* and calls their respective answers (functions patter_1_answer and patter_2_answer )
* @return {String}
*/
function answer(msg) {

  if(matches(msg, pattern_1)) {

    return patter_1_answer();

  } else if(matches(msg, pattern_3)) {

    return patter_3_answer();

  } else if (matches(msg, pattern_4)) {

    return patter_4_answer();

  } else if(matches(msg, pattern_5)) {

    return patter_5_answer();

  } else if(matches(msg, pattern_2)) {

    return patter_2_answer();

  } else {

    return default_answer();

  }

}


/* ----------------------------------
	Server and Socket Configuration
--------------------------------------*/

// tell express to server our index.html file
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// configure socket.io
// (1) when there is a connection
io.on('connection', function(socket) {

  console.log('got a connection');
  //io.emit('message from robot', 'Hi! my name is Reihtuag!'); // greetings

  // (2) configure the connected socket to receive custom messages ('message from human')
  // and call the function answer to produce a response
  socket.on('message from human', function(msg) {

    console.log('got a human message: ' + msg);

    var response = answer(msg);  	                  /// <--- call of the function answer defined above

  	io.emit('message from robot', response);

  });

  socket.on('disconnet', function() {

  	console.log('got a disconnection');

  });

});

/* -------------------
	Start the server
----------------------*/

// listen to connection on port 8088 --> http://localhost:8088
server.listen(8088, function () {
	console.log('listening on port: ' + 8088);
});
