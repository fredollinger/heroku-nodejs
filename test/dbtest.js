var express = require('express');
var app = express();
var wait = require("wait.for");
var mongoose = require('mongoose');
var now = require('mout/time/now');
var util = require('util');

var ACViper = require('../js/acviper.js');
var viper = new ACViper();

function queryResults(err, results){
    console.log("query Results: [%s]", results);
}

function handleError(err){
    console.log("error: [" + err + "]");
}

function test(){
    console.log("Current time: [%s]", now());
    hours=1;
    olderDate=now() - (60*60*hours); 

    this.userSchema = new mongoose.Schema({
       address: { type: String },
       plate_number: { type: String },
       phone_number: { type: String },
       price: { type: Number, min: 0 },
       date: { type: Number, min: 0 },
       location: {
           lat: Number,
           lng: Number
       },
       request: { type: String } // "buy" or "sell"
    }); // END userSchema
    var m = mongoose.model('Customers2', this.userSchema);

    var location = {lat: 32, lng: -117};

    var query = {
            address: "308 University, San Diego",
            plate_number: "S3V3N",
            phone_number: "619-321-13131",
            price: 1,
    	    date: now(),
	    location: location,
            request: "buy"
    }

    util.puts(JSON.stringify(query));

    var Customer = new m ({
        address: query.address,
        plate_number: query.plate_number,
        phone_number: query.phone_number,
        price: query.price,
        date: now(),
        location: query.location,
        request: query.request
     }); 

     Customer.save(function(err) {
         console.log("saving");
	 if (!err) {
	     console.log('[%s] saved.', query.request );
         }
	 else
             console.log(err);
    }); 

    console.log("dbtest END");
} // test()

wait.launchFiber(test);


