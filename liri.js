var fs = require('fs');
var Twitter = require('twitter');
var spotify = require('spotify');
//var omdb = require('omdb');
var request = require('request');
var input1 = process.argv[2];
var input2 = process.argv.splice(3).join(" ");

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: 'df22be70ca4b4198bba6522779184564',
    secret: 'e916f15b17924888a5c05d0f18104580'
});


var keys = require('./keys.js');
// console.log(keys.twitterKeys);

var client = new Twitter(keys.twitterKeys);

var params = {
    screen_name: 'SkylarP0wers',
    count: 20
};

run();

function run() {

    if (input1 === "my-tweets") {

        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                console.log('');
                console.log('My Last 20 Tweets: ');
                console.log('--------------------------');
                tweets.forEach(function(individualTweet) {
                    console.log('Time Posted: ' + individualTweet.created_at);
                    console.log('Tweet: ' + individualTweet.text);
                    console.log('--------------------------');


                });

            } else {
                console.log(error);
            };
        });

        //log();

    } else if (input1 === "spotify-this-song") {

        if (input2.length < 1) {

            input2 = "'The Sign' By:Ace of Base";
        };

        spotify.search({ type: 'track', query: input2 }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {

                console.log('');
                console.log('Spotify Song Information Results: ');
                console.log('--------------------------');
                console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
                console.log("Track Title: " + data.tracks.items[0].name);
                console.log("Link to Song: " + data.tracks.items[0].preview_url);
                console.log("Album Title: " + data.tracks.items[0].album.name);
                console.log('--------------------------');
            }
        });

        //log();

    } else if (input1 === "movie-this") {

        if (input2.length < 1) {

            input2 = "Mr. Nobody";
        };

        request("http://www.omdbapi.com/?t=" + input2 + "&y=&plot=short&r=json&tomatoes=true&apikey=40e9cece", function(error, response, body) {

            if (!error && response.statusCode === 200) {
                console.log('');
                console.log('OMDB Movie Information: ');
                console.log('--------------------------');
                console.log("Movie Title: " + JSON.parse(body).Title);
                console.log("Year of Release: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                console.log("Countries produced in: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Movie Plot: " + JSON.parse(body).Plot);
                console.log("Actor(s): " + JSON.parse(body).Actors);
                console.log('--------------------------');
            } else {

                console.log(error);

            }

        });

        //log();

    } else if (input1 === "do-what-it-says") {

        //log();

        fs.readFile('random.txt', 'utf8', function(err, data) {
            if (err) throw err;

            var arr = data.split(',');

            //input1 = arr[0].trim();
            //input2 = arr[1].trim();
            run();

        });

    }
};