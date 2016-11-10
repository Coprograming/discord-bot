var Discord = require ('discord.js');
var http = require('http');
var bodyParser = require('body-parser');
// to make https request e.g get,post,put,delete
var request = require('request');

//Use Body parser
//app.use(bodyParser.json());

// Get method with the tittle of the variable question
var StackOverflowSearchUrl = 'https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged='+ tags +'&nottagged='+ nontagged + '&intitle='+ question + '&site=stackoverflow';

// search by tittle in the question
// this check the titlle of the question. Any tittle that have the breakpoint string will show in the response as an posible answer to the question. The bot will response the link of three of the best voted answer.
var question = "breakpoint";
// search the question with this tag
var tags = "swift";
// dont search a question with this tag
var nontagged = "objective%20c";

// bot client
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

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message){
  let prefix = '!';
  // Convert the message to UpperCase because is Case sensitive
  var input = message.content.toUpperCase();
  

  //** TODO Change this code to a Method that pass input via a Parameter
  var condition1 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE") && input.includes("FREE");
  var condition2 = input.includes("KICKSTARTER BACKER") && input.includes("FREE");

  var condition3 = input.includes("KICKSTARTER BACKER") && input.includes("COURSE");
  var condition4 = input.includes("KICKSTARTER")&& input.includes("COURSE");
  var condition5 = input.includes("BACKER") && input.includes("COURSE");

  var lateEvent = input.includes("LATE") && input.includes("PLEDGE");


  //prevent the bot from issuing commands
  if(message.author.bot) return;  
  
  
  checkConditions([condition5, condition3, condition4], message, "yes it's free for Kickstarter backer who pledge above $100");  
  checkConditions([lateEvent], message, "yeah email jason@devslope.com for more info");
  checkConditions([input.includes("LOVING"), input.includes("LIKE") && input.includes("BOT")], message, "Thank you. You are way cooler than me");
  
  
  var responseObject = {
  "i am pretty": "Yes. You are always Pretty. Keep Smiling.",
  "wat": "Say what?",
  "lol": "roflmaotntpmp"
  };

  var msg = message.content.toLowerCase();
  if(responseObject[msg]) {
    message.channel.sendMessage(responseObject[msg]);
  }

  if (input.includes("Hello")) {

   }

  // TODO: Search a Question in Google
  if(input.includes("Question")){
    console.log('there was a question');
  }


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


  // TODO Event that store in a file when people give a new Suggestion that they want the bot to have. e.g condition = Bot it will be nice if you have -- some function--. Proccess - Store the function in a file for future implementation to the bot.

  // TODO Condition = Hi I can still get the -devslope- -iOS- -Kickstarter- book  . where I can buy the -devslope- book. Response = "Yes you can buy the book email jason@devslope.com"

  //TODO Create a void method to separate the code from here

  // TODO Condition = How to use the boot. Response = Step by step on how to use the bot

  // TODO Condition = What the bot can do. Create a Response for this

  //TODO Condition = I can get all the course that I paid in Udmey within the Desvlope app. Proccess = str.includes("COURSE") && str.includes("UDEMY") && str.includes("DEVSLOPE APP"). Response = No --Custom Response--

  //TODO Make a Grahical User Interface to add condition and Response an validate the input instead of adding each condition and Response in code.

  //TODO condition = when the --mac app-- --devslope mac app-- will be ready. response = the mac app will be ready in december 31

});


//Login to Discord using oauth
bot.login('MjQ1NjQxNjYxOTQ4ODg3MDQw.CwPDLg.wSCikqeTltFdZ9PobjHqAp9zTsY');



//*************  Node Js Server  ************************//

//Lets define a port we want to listen to
const PORT=8080;

//We need a function which handles requests and send response
function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
