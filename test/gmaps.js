/*
 * dbdelete.js
 *
 * Test code to take the date and delete by a certain amount of time
 */

//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

var express = require('express');
var app = express();
var wait = require("wait.for");

var ACViper = require('../js/acviper.js');
var viper = new ACViper();

function queryResults(err, results){
    console.log("query Results: [%s]", results);
}

function test(){
    req={};

/*
    req.query = {
          address: "3777 Ruffin Road"
        , plate_number: "S3V3N"
        , phone_number: "619-123-6969"
        , price: "5.00"
        , request: "buy"
    };
*/

    console.log(req.query.address);
    console.log("dbdelete END");
} // test()


wait.launchFiber(test);


