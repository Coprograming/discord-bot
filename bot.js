var Discord = require('discord.js');

var stackexchange = require('stackexchange');
var keyword_extractor = require("keyword-extractor");

var http = require('http');
var bodyParser = require('body-parser');
// to make https request e.g get,post,put,delete
var request = require('request');

//Use Body parser
//app.use(bodyParser.json());

// Get method with the tittle of the variable question

var StackOverflowSearchUrl = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=' + tags + '&nottagged=' + nontagged + '&intitle=' + question + '&site=stackoverflow';

// search by tittle in the question
// this check the titlle of the question. Any tittle that have the breakpoint string will show in the response as an posible answer to the question. The bot will response the link of three of the best voted answer.
var question = "breakpoint";
// search the question with this tag
var tags = "swift";
// dont search a question with this tag
var nontagged = "objective%20c"


const bot = new Discord.Client();


 // TODO Parse JSON From StackOverflowSearchUrl
request(StackOverflowSearchUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("Parse Json Here");
    //  console.log(body) // Show the HTML for the Google homepage.
    // var info = JSON.parse(body);
    // console.log(info.items[0])

  }
});


var checkConditions = function(conditions, message, str) {
  for (var i in conditions) {
    if (conditions[i]) {
      message.reply(str); 
      return;
    }
  }
}


bot.on('message', function(message){
  let prefix = '!';
  // Convert the message to UpperCase because is Case sensitive
  var input = message.content.toUpperCase();


  //          //
  //CONDITIONS//
  ///        ///
  
  var condition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE") && input.includes("FREE");
  var condition2 = input.includes("KICKSTARTER BACKER") && input.includes("FREE");

  var condition3 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
  var condition4 = input.includes("KICKSTARTER") && input.includes("COURSE");
  var condition5 = input.includes("BACKER") && input.includes("COURSE");

  var lateEvent = input.includes("LATE") && input.includes("PLEDGE");


  //prevent the bot from issuing commands
  if(message.author.bot) return;  
  
  
  checkConditions([condition5, condition3, condition4], message, "yes it's free for Kickstarter backer who pledge above $100");  
  checkConditions([lateEvent], message, "yeah email jason@devslope.com for more info");
  checkConditions([input.includes("LOVING"), input.includes("LIKE") && input.includes("BOT")], message, "Thank you. You are way cooler than me");
  checkConditions([input === "BOT WHO ARE YOU"], message, "I'm here to help you to become a better developer. I am a work in progress");
  
  
  var responseObject = {
  "i am pretty": "Yes. You are always Pretty. Keep Smiling.",
  "wat": "Say what?",
  "lol": "roflmaotntpmp"
  };

  var msg = message.content.toLowerCase();
  if(responseObject[msg]) {
    message.channel.sendMessage(responseObject[msg]);
  }


  if (input.includes("Hello")) {}
    // TODO: Search a Question in Google
  if (input.includes("Question")) {}


  //             // 
  ///* COMMANDS *///
  //             //
  
  //safety check so bot doesn't accidentally reply to non commands
  if(!message.content.startsWith(prefix)) return;

  
  //!help displays all available commands
  let help = [ "courses",
    "coupon"
  ];
  
  if (message.content.startsWith(prefix + 'help')) {
    message.author.sendMessage("Here is a list of available commands:");
    
    for (var i in help) {
      message.author.sendMessage(prefix + help[i]);
    }
  }

  //!courses lists all courses in a message
  if (message.content.startsWith(prefix + 'courses')) {
      message.author.sendMessage("Here is a list of Devslopes courses:");
      message.author.sendMessage("https://www.udemy.com/devslopes-ios10/");
      message.author.sendMessage("https://www.udemy.com/sketch-design/");
      message.author.sendMessage("https://www.udemy.com/objectivec/");
      message.author.sendMessage("https://www.udemy.com/intermediate-ios/");
      message.author.sendMessage("https://www.udemy.com/learn-android/");
      message.author.sendMessage("https://www.udemy.com/apple-tv/");
      message.author.sendMessage("https://www.udemy.com/ios9-swift/");
  }

  //!coupon to display coupon for courses
  if (message.content.startsWith(prefix + 'coupon')) {
      message.author.sendMessage("iOS: http://bit.ly/2eu6XGC");
      message.author.sendMessage("Android: http://bit.ly/2flDQFk");
  }
  
  
  //making a call to stackoverflow
  //
  if (input.indexOf('?') > -1) {
      var sentence = message.content;
      if (sentence != "?") {
          var channelTags = [];
          var extraction_result = keyword_extractor.extract(sentence, {
              language: "english",
              remove_digits: true,
              return_changed_case: false,
              return_chained_words: false,
              remove_duplicates: true
          });
          if (channelId = 245393630624350209) { //DEVBOT CHANNEL245373360215818240
              channelTags = extraction_result.concat("bot", "node.js", "javascript", "discord");
          } else if (channelId = 207559045530255360) { //iOS 10 course CHANNEL
              channelTags = extraction_result.concat("iOS", "swift", "xcode", "iOS10");
          }
          console.log(channelTags);
          var options = {
              version: 2.2
          };
          var context = new stackexchange(options);

          var filter = {
              key: 'lSCrDdqvXp3Bru)3satyHw((', //PUT THE KEY TO STACKEXCHANGE HERE!!!!!!!!!!
              pagesize: 50,
              tagged: extraction_result,
              sort: 'activity',
              order: 'asc'
          };

          // Get all the questions (http://api.stackexchange.com/docs/questions)
          context.search.search(filter, function(err, results) {
              if (results) {
                  if (results.items) {

                      if (results.items[0].link) {
                          message.reply('Checkout this link ' + (results.items[0].link));
                      }
                      console.log(results.items);

                  }
                  //message.reply('Checkout this link ' + (results.items[1].link));
                  if (results.has_more) {
                      console.log('The bot will say please do some research on your own there are alot of articles on this subject');
                  }
              }
          });
      }
  }
  //Making call to Stackexchange

    // TODO Event that store in a file when people give a new Suggestion that they want the bot to have. e.g condition = Bot it will be nice if you have -- some function--. Proccess - Store the function in a file for future implementation to the bot.

    // TODO Condition = Hi I can still get the -devslope- -iOS- -Kickstarter- book  . where I can buy the -devslope- book. Response = "Yes you can buy the book email jason@devslope.com"

    //TODO Create a void method to separate the code from here

    // TODO Condition = How to use the boot. Response = Step by step on how to use the bot

    // TODO Condition = What the bot can do. Create a Response for this

    //TODO Condition = I can get all the course that I paid in Udmey within the Desvlope app. Proccess = str.includes("COURSE") && str.includes("UDEMY") && str.includes("DEVSLOPE APP"). Response = No --Custom Response--

    //TODO Make a Grahical User Interface to add condition and Response an validate the input instead of adding each condition and Response in code.

    //TODO condition = when the --mac app-- --devslope mac app-- will be ready. response = the mac app will be ready in december 31

});


bot.login('TOKEN_KEY');

//*************  Node Js Server  ************************//

//Lets define a port we want to listen to
//const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {

    //Lets define a port we want to listen to
    const PORT = 8080;

    //We need a function which handles requests and send response
    function handleRequest(request, response) {
        response.end('It Works!! Path Hit: ' + request.url);
    }

    //Create a server
    var server = http.createServer(handleRequest);

    //Lets start our server
    server.listen(PORT, function() {
        //Callback triggered when server is successfully listening. Hurray!
        console.log("Server listening on: http://localhost:%s", PORT);
    });
}
