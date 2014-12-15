var express = require('express');
var app = express();
var wait = require("wait.for");
var gm = require('googlemaps');
var util = require('util');

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

function inNeighborhood(hood, data){
    daHood=JSON.stringify(data.results[0].address_components[2].long_name).replace(/"/g, "");
    if ( hood == daHood){
        return true;
    }
    else{
	console.log("%s is NOT in %s", daHood, hood);
        return false;
    }
}

function test(){
    apikey="AIzaSyBvvMm5j7hlVOs20mb0qjmKcGV3nj53I9o";
    //query = {
    req={};
    address = "308 University Avenue, San Diego, CA 92103";
    lat=-34.397;
    lng=150.644;
    latLng=lat+","+lng;

    query = {
	address: address
        , lat: lat
        , lng: lng
    };

    req.query = {
	address: address
    }

    /*
    gm.reverseGeocode(latLng, function(err, data){
	      util.puts(JSON.stringify(data));
    });
    */

    gm.geocode(address, function(err, data){
        util.puts(JSON.stringify(data.results[0].address_components[2].long_name));
	hood=inNeighborhood("Hillcrest", data);
	console.log("In Hillcrest: [" + hood + "]");
    });

    //viper.cacheAddress(query);
    //match=viper.findMatch(req, queryResults);
    /*
    var plusAddress = address.replace(/\s/g, "+");
    mapRequest="https://maps.googleapis.com/maps/api/geocode/json?address="+plusAddress+"&key="+apikey;
    console.log("[%s]", mapRequest);
    */

//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
    
    
    console.log("cacheaddy END");
} // test()

wait.launchFiber(test);
