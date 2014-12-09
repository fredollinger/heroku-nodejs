var express = require('express');
var app = express();
var wait = require("wait.for");
var mongoose = require('mongoose');

var ACViper = require('../js/acviper.js');
var viper = new ACViper();

function queryResults(err, results){
    console.log("query Results: [%s]", results);
}

function handleError(err){
    console.log("error: [" + err + "]");
}

function test(){
    this.userSchema = new mongoose.Schema({
       address: { type: String },
       plate_number: { type: String },
       phone_number: { type: String },
       price: { type: Number, min: 0 },
       date: { type: Number, min: 0 },
       request: { type: String } // "buy" or "sell"
    }); // END userSchema
    var m = mongoose.model('Customers', this.userSchema);
    var query = m.findOne({ 
        'request': 'buy' 
    });

    query.select('date');

    query.exec(function (err, person) {
        if (err) return handleError(err);
        console.log('[%s]', person.date );
    })

    console.log("dbtest END");
} // test()

function createWebpage (req, res) {
  // Let's find all the documents
    PUser.find({}).exec(function(err, result) {
        if (!err) {
            res.write(html1 + JSON.stringify(result, undefined, 2) +  html2 + result.length + html3);
        } else {
            res.end('Error in first query. ' + err)
        };
    });
}

wait.launchFiber(test);


