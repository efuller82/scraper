var path = require("path");
var mongojs = require('mongojs');

// Database configuration
var databaseUrl = 'sentinelScraper';
var collections = ['scrapedData', 'note'];


// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on('error', function (error) {
    console.log('Database Error:', error);
});


module.exports = function (app) {
    app.get('/all', function (req, res) {
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
            console.log(found);
        });
    });

};

