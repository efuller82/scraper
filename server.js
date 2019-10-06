var express = require('express');
var mongojs = require('mongojs');
var path = require('path');

//! Require all models
var Models = require('./models/index');

var cheerio = require('cheerio');
var axios = require('axios');

var mongoose = require('mongoose');

// Initialize express
var app = express();

// Database configuration
var databaseUrl = 'sentinelScraper';
var collections = ['scrapedData', 'note'];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function (error) {
    console.log('Database Error:', error);
});
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || 3000;

mongoose.connect(MONGODB_URI);

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
                    link: link,
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


app.use(express.static(path.join(__dirname, '/public')));
require("./routes/html-routes.js")(app);

require('./routes/api-routes.js')(app);

// Listen on port 3000
app.listen(3000, function () {
    console.log('App running on port 3000!')
});
