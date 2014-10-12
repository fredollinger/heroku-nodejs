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
    req.query = {
        address: "3777 Ruffin Road"
        , plate_number: "S3V3N"
        , phone_number: "619-123-6969"
        , price: "5.00"
        , request: "buy"
    };
    
    console.log(req.query.address);
    viper.logRequest(req);
    //wait.for(viper.logRequest, req);
    
    viper.findMatch(req, "buy", queryResults);

    //while (!match){
        //console.log("match: [%s]", match);
        //console.log("match failed");
    	//match=viper.findMatch(req, "buy");
    //}

    
    console.log("dbtest END");
} // wait()


wait.launchFiber(test);


