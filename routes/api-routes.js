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

    // ! trying to make get route for note
    app.get('/allnotes', function (req, res) {
        db.note.find({}, function (error, found) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(found);
            }
            console.log(found);
        });
    });

    //! begin to create route for notes;
    app.post('/allnotes', function (req, res) {
        var note = req.body;
        db.note.save(note, function (error, saved) {
            if (error) {
                console.log(error);
            }
            else {
                res.send(saved);
            }
        });
    });

};

