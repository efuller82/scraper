var express = require('express');
var mongojs = require('mongojs');

var cheerio = require('cheerio');
var axios = require('axios');

// Initialize express
var app = express();

// Database configuration
var databaseUrl = 'sentinelScraper';
var collections = ['scrapedData'];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function (error) {
    console.log('Database Error:', error);
});

// Main route 
app.get('/', function (req, res) {
    // ! confused about this
    res.send('yoyo');
});

// Retrieve data from the db
app.get('all', function (req, res) {
    //Find all results from the scrapedData collection in the db
    db.scrapedData.find({}, function (error, found) {
        // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
});

// Scrape data from one site and place it into the mongo db
app.get('/scrape', function (req, res) {
    // Make a request via axios for the news section of The Daily Sentinel
    axios.get('https://www.dailysentinel.com').then(function (response) {
        // Load the html body from axios into cheerio
        var $ = cheerio.load(response.data);
        // For each p element with tnt-summary class
        $('h3.tnt-headline').each(function (i, element) {
            // Save the text and href of each link enclosed in the current element
            var title = $(element).text();
            var link = $(element).children('a').attr('href');

            // If this found element had both a title and a link 
            if (title && link) {
                // Insert the data in the scrapedData db
                db.scrapedData.insert({
                    title: title,
                    link: link
                },
                    function (err, inserted) {
                        if (err) {
                            // Log the error if one is encountered during the query
                            console.log(err);
                        }
                        else {
                            // Otherwise, log the inserted data
                            console.log(inserted);
                        }
                    });
            }
        });
    });
    // Send a "Scrape Complete" message to the browser
    res.send('Scrape Complete')
});

// Listen on port 3000
app.listen(3000, function () {
    console.log('App running on port 3000!')
});
