var path = require("path");
var mongojs = require('mongojs');
var models = require('../models');
var mongoose = require('mongoose');

var express = require('express');

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

    app.get('/notes', function (req, res) {
        models.Note.find({}, function (error, found) {
            if (error) {
                console.log(error);
            }
            else {
                res.json(found);
            }
            console.log(found);
        });
    });
    app.post('/submit', function (req, res) {
        models.Note.create(req.body)
            .then(function (dbNote) {
                return models.Article.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle)
            })
            .catch(function (err) {
                res.json(err);
            });
    });
};

