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

var ACViper = require('../js/acviper.js');
var viper = new ACViper();

function test(){

    address = "308 University Avenue, San Diego, CA 92103";
    if (validate.isAddress("Hillcrest", address)){
        console.log("isAddresss() test 1 passed");
    }
    else{
        console.log("isAddress() failed to validate address");
    }

    address = "";
    if (!validate.isAddress("Hillcrest", address)){
        console.log("isAddresss() test 2 passed");
    }
    else{
        console.log("isAddress() failed to invalidate address");
    }

    console.log("maps test END");

} // test()


wait.launchFiber(test);


