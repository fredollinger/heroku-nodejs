var express = require('express');
var app = express();
var wait = require("wait.for");

var ACCobra = require('../js/accobra.js');
var viper = new ACCobra();

// STUB
function lookupAddress(data){
    console.log("address: [" + data.address + "]");
    data.lat=-34.397;
    data.lng=150.644;
    return data;
}

function queryResults(err, results){
    if ( null == results ){
        console.log("no match");
    }
    else{
        console.log("query Results: [%s]", results);
    }
} // END queryResults()

function test(){
    req={};
    req.query = {
        address: "3777 Ruffin Road San Diego, CA"
    };
    
    console.log(req.query.address);
    match=viper.findMatch(req, queryResults);

    if ( null == match ){
        console.log("match is NULL");
	match = { address : req.query.address };
	match=lookupAddress(match);
        viper.cacheAddress(match);
    }
    else{
        console.log("match is NOT NULL");
    }
    console.log("address: [" + match.address + "] lat: [" + match.lat + "] [" + match.lng + "]");
    
    console.log("cacheaddy END");
} // test()

wait.launchFiber(test);


