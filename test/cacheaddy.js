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
        console.log("query Results: [%s]", results.address);
    }
} // END queryResults()

function test(){
    //query = {
    req={};
    //req.query = {
    req.query = {
        //address: "Bob"
        address: "Urban Moe's San Diego, CA"
        , lat: -34.397
        , lng: 150.644
    };

    query = {
        address: "Urban Moe's San Diego, CA"
    }
    
    //console.log(req.query.address);
    viper.cacheAddress(query);
    match=viper.findMatch(req, queryResults);
    
    
    console.log("cacheaddy END");
} // test()

wait.launchFiber(test);
