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
    console.log("query Results: [%s]", results);
    if ( null == results ){
        console.log("no match");
    }
    else{
        console.log("query Results: [%s]", results.lat);
    }
} // END queryResults()

function test(){
    //query = {
    req={};
    address = "308 University Avenue, San Diego, CA 92103";

    query = {
	address: address
        , lat: -34.397
        , lng: 150.644
    };

    req.query = {
	address: address
    }
    
    viper.cacheAddress(query);
    match=viper.findMatch(req, queryResults);
    
    
    console.log("cacheaddy END");
} // test()

wait.launchFiber(test);
