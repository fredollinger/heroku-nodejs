var express = require('express');
var app = express();
var wait = require("wait.for");

var ACCobra = require('../js/accobra.js');
var viper = new ACCobra();

function queryResults(err, results){
    console.log("query Results: [%s]", results);
}

function test(){
    req={};
    req.query = {
        address: "3777 Ruffin Road San Diego, CA"
    };
    
    console.log(req.query.address);
    match=viper.findMatch(req, queryResults);
    //viper.cacheAddress(req);
    //wait.for(viper.logRequest, req);
    
    //viper.findMatch(req, "buy", queryResults);
    //console.log("match [" + match + "]");

    console.log("cacheaddy END");
} // wait()


wait.launchFiber(test);


