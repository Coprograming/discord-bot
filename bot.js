var Discord = require('discord.js'),
    stackexchange = require('stackexchange'),
    VerEx = require('verbal-expressions'),
    search = require('youtube-search'),
    // The HTTP module
    http = require('http'),
    // to make https request e.g get,post,put,delete
    request = require('request'),
    functionHelper = require('./functionHelpers.js');

// bot client You can now use the bots features
const bot = new Discord.Client();
var prefix = '!';

// This will run whenever the bot get a message. / whenever a message is sent to a server that it is in
bot.on('message', function(message) {
    var input = message.content.toUpperCase();
    var msgContent = message.content;

    //prevent the bot from issuing commands
    if (message.author.bot) {
        return;
    }

    //This part is where we define the conditions
    var kickstarterCondition1 = (input.includes("KICKSTARTER BACKER") && input.includes("COURSE"));
    var kickstarterCondition2 = (input.includes("KICKSTARTER") && input.includes("COURSE"));
    var kickstarterCondition3 = (input.includes("BACKER") && input.includes("COURSE"));
    var lateEvent = (input.includes("LATE") && input.includes("PLEDGE"));
    var macApp = (input.includes("MAC") && ("APP") && input.includes("DEVSLOPE"));
    var tvApp = (input.includes("TV") && input.includes("APP") && input.includes("DEVSLOPE"));
    var devStickers = (input.includes("DEVSLOPE") && input.includes("STICKERS"));
    var devBook = (input.includes("DEVSLOPE") && input.includes("BOOK"));
    var loveBot = (input.includes("LOVING") || input.includes("LIKE") || input.includes("LOVE") && input.includes("BOT"));
    var whosBot = (input.includes("BOT WHO ARE YOU"));
    var iAmPretty = (input.includes("I AM PRETTY"));

    // Google Search Function
    if ((msgContent).startsWith("!G")) {
        console.log("input: " + input);
        functionHelper.googleSearch(functionHelper.removeThatPhrase(message.content, "!G", ' '), message);
    }

    // stackoverflow API
    if ((msgContent).startsWith('!S')) {
        console.log("llego al ? ");
        if (input.includes(prefix)) {
            console.log("llego al ! excalamcion");
            functionHelper.stackOverflowApiResults(functionHelper.removeThatPhrase(message.content, '!S', ' '), message);
        }
    }

    // YouTube API
    if ((msgContent).startsWith('!Y')) {
        functionHelper.youtubeApiResults((functionHelper.removeThatPhrase(input, '!Y', '')), message);
    }

    //Conditional responses
    functionHelper.checkConditions([iAmPretty], message, "Yes. You are always pretty. Keep smiling.");
    functionHelper.checkConditions([loveBot], message, "Thank you. You are way cooler than me.");
    functionHelper.checkConditions([whosBot], message, "I'm here to help you to become a better developer. I am a work in progress.");
    functionHelper.checkConditions([
        kickstarterCondition1, kickstarterCondition2, kickstarterCondition3
    ], message, "Kickstarter backers who pledged above $60 get lifetime access for FREE to any and all courses that Devslopes will ever release.");
    functionHelper.checkConditions([lateEvent], message, "Email jason@devslope.com for more info.");
    functionHelper.checkConditions([macApp], message, "The Mac and Apple TV app will be out by the end of the year.");
    functionHelper.checkConditions([tvApp], message, "The Mac and Apple TV app will be out by the end of the year.");
    functionHelper.checkConditions([devStickers], message, "https://itunes.apple.com/us/app/hacker-pack-coding-nerd-stickers/id1154247796?mt=8");
    functionHelper.checkConditions([devBook], message, "The Devslopes Book should be out Nov 30th for digital copy, physcical copies shortly after.");

    //Unconditional responses
    functionHelper.response(message);

    // This function check for !Course and !help and !Coupon
    functionHelper.messageAuthor(message, prefix);

});

//Welcomes new members
bot.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.sendMessage("Hello " + member.user + " Welcome to the Devslopes community! Use '!help' for more commands.")
});

//Login to Discord using oauth
bot.login('MjQ1MzkwMDg0NDgyOTI0NTQ2.CwQefg.p2rkiB8vIb5WHjbCyfCE3K1DA4s');

//*************  Node Js Server  ************************//
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
    console.log("Server listening on: http://localhost:%s", process.env.npm_package_config_port);
});
