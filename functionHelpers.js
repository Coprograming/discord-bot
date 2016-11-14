var bot = require("./bot.js"),
    VerEx = require('verbal-expressions'),
    stackexchange = require('stackexchange'),
    search = require('youtube-search'),
    google = require("./google.js");

//this is use in the line 44 of this code - do not remove
// is an object that contains one function
fun = {
    replyToMessageWith: function(replyMessage, message) {
        message.reply(replyMessage);
    }
}

//Call this function if you want to remove something from a sentence
// Sentence: is the sentence you want to edit
// PHRASETOREPLACE: is the part of the sentence you want to change
// REPLACEPHRASEWITH: is what you want to replace the phrase with!
exports.removeThatPhrase = function(sentence, phraseToReplace, replacePhraseWith) {
    var phrase = sentence;
    var newSentence = VerEx().find(phraseToReplace).replace(sentence, replacePhraseWith);
    console.log(newSentence);
    return newSentence
}

//Create conditional responses for specified queries
exports.checkConditions = function(conditions, message, str) {
    for (var i in conditions) {
        if (conditions[i]) {
            message.reply(str);
            return;
        }
    }
}

//Creat undconditional responses
exports.response = function(message) {
    var responseObject = {
        "how to use bot": "If you want to search stackoverflow.com for your question type !S in the beginning of your question and dont forget the question mark at the end.",
        "wat": "Say what?",
        "lol": "roflmaotntpmp"
    };

    var msg = message.content.toLowerCase();
    if (responseObject[msg]) {
        message.channel.sendMessage(responseObject[msg]);
    }
}

//Use this function to reply to a message! Just put your reply in as the variable;)
exports.replyToMessageWith = function(replyMessage, message) {
    message.reply(replyMessage);
}

//////////////**************Message Author function ***************/////////////////
// Move this function to is own file
exports.messageAuthor = function(message, prefix) {
    if (!message.content.startsWith(prefix))
        return;

    //!help displays all available commands
    let help = ["courses", "coupon"];

    if (message.content.startsWith(prefix + 'help')) {
        message.author.sendMessage("If you want to search stackoverflow.com for your question put a '!S' in the beginning of your question and dont forget the question mark at the end.");
        message.author.sendMessage("If you want to search google.com for your question put a '!G' in the beginning.");
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
        message.author.sendMessage("https://www.udemy.com/react-flux/");
        message.author.sendMessage("https://www.udemy.com/devslopes-unity3d/");
        message.author.sendMessage("https://www.udemy.com/mobile-design/");
        message.author.sendMessage("https://www.udemy.com/api-development/");
        message.author.sendMessage("https://www.udemy.com/angular2/");
    }

    //!coupon to display coupon for courses
    if (message.content.startsWith(prefix + 'coupon')) {
        message.author.sendMessage("iOS: http://bit.ly/2eu6XGC");
        message.author.sendMessage("Android: http://bit.ly/2flDQFk");
    }

} ////////// end Message Author function

//////////// ************* STACKOVERFLOW *************/////////////////////
// Move this function to is own file
// This Functions do the search on stackoverflow
exports.stackOverflowApiResults = function(question, message) {
    var options = {
        version: 2.2
    };
    var context = new stackexchange(options);
    var filter = {
        key: 'lSCrDdqvXp3Bru)3satyHw((', //PUT THE KEY TO STACKEXCHANGE HERE!!!!!!!!!!
        sort: 'relevance',
        answers: '1',
        q: question,
        order: 'asc'
    };
    context.search.advanced(filter, function(err, results) {
        if (results) {
            if (results.items[0].link) {
                fun.replyToMessageWith(' Checkout these Links I found for you. If it is not what You are looking for ask me the same question in a different way, or add more detail(ex: !S How do I shuffle an array in Swift?)' + (results.items[0].link) + ' ' + (results.items[1].link), message);
            }
        }
    });
} ////////// End StackOverFlow function ////////////

/////////////********Google Search Function ****************//////////////

exports.googleSearch = function(searchQuery, message) {

    google.resultsPerPage = 3
    var counter = 0
    google(searchQuery, function(err, res) {
        if (err)
            console.error(err)
        var link = res.links[counter];
        fun.replyToMessageWith(link.title + ' - ' + link.href, message);
        // Uncoment this line if you want the description of the web page
        //  fun.replyToMessageWith(link.description + "\n",message);
        counter += 1
        if (counter <= 2) {
            // run the function again aka do the search again
            res.next()
        } else {
            // else if counter if greater than 2 return. I dont want more google results
            return;
        }

    });

}

/////////////********END Google Search Function ****************//////////////

////// Making Search to YouTube Here \\\\\\\\\
exports.youtubeApiResults = function(question, message) {
var opts = {
    maxResults: 2,
    key: 'AIzaSyDtpC45vtUlejr99F2Cy3NwO2-jp389uoQ'
};
search(question, opts, function(err, results) {
    if (results[0].link) {
        if (results[1].link) {
            fun.replyToMessageWith(results[0].link + ' ' + results[1].link, message);
        } else {
            fun.replyToMessageWith(results[0].link, message);
        }
    }
});
}
////// END Search to YouTube Here \\\\\\\\\
