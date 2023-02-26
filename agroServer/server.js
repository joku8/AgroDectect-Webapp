SERVER_ADDRESS = '127.0.0.1'

const { json } = require('express');
const express = require('express');
// const { MongoParseError, ReturnDocument } = require('mongodb');
const mongoose = require('mongoose');
// const { stringify } = require('querystring');
var app = express();

var Data = require('./schema');

mongoose.connect('mongodb://localhost/mydb')

mongoose.connection.once('open', () => {

    console.log('Connection has been made!!!');

}).on('error', (error) => {

    console.log('Connection error: ' + error);

})

var server = app.listen(8081, SERVER_ADDRESS, () => {
    console.log('Server running at http://' + SERVER_ADDRESS + ':8081');
})

// CREATE A PEST REPORT
// POST request
app.post("/report", (req, res) => {
    var report = new PestReport({
        damage_cause: req.query.damage_cause,
        longitude: parseFloat(req.query.longitude),
        latitude: parseFloat(req.query.latitude),
    });

    report.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Pest report created successfully',
                createdPestReport: {
                    _id: result._id,
                    damage_cause: result.damage_cause,
                    longitude: result.longitude,
                    latitude: result.latitude,
                    reported_at: result.reported_at,
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

// FETCH PEST REPORTS
// GET request
app.get('/fetch', (req, res) => {
    console.log('Fetching pest reports');
    PestReport.find({}).then((DBitems) => {
        res.send(DBitems);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// CLEAR ALL PEST REPORTS
// POST request
app.post('/clear', (req, res) => {
    console.log('Deleting all pest reports');
    PestReport.deleteMany({}, (err) => {
        if (err) {
            console.log("FAILED: " + err);
            res.status(500).json({
                error: err
            });
        } else {
            res.status(200).json({
                message: 'All pest reports deleted'
            });
        }
    })
});