/*
 * gmaps.js
 *
 * Test Map Code
 */

//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY

var express = require('express');
var app = express();
var wait = require("wait.for");
var ACValidater = require('../js/acvalidater.js');
var validate = new ACValidater();
var gm = require('googlemaps');
var util = require('util');
//var geocoderProvider = 'google';
//var httpAdapter = 'https';

var ACViper = require('../js/acviper.js');
var viper = new ACViper();

function test(){

    address = "308 University Avenue, San Diego, CA 92103";

    gm.geocode(address, function(err, data){
        util.puts(JSON.stringify(data));
        //daHood=JSON.stringify(data.results[0].address_components[2].long_name).replace(/"/g, ""); 
        location=JSON.stringify(data.results[0].geometry.location);
        console.log("lat: [%s]", location);
    });

    console.log("maps test END");

} // test()


wait.launchFiber(test);


