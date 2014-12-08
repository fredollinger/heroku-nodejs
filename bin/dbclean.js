var express = require('express');
var app = express();
var wait = require("wait.for");

function dbclean(){
    var mongoose = require('mongoose');
    //DATABASE='AddressCache';
    DATABASE='Customers';
    mongoose.connect('localhost', DATABASE);
    mongoose.connection.db.dropDatabase();
    console.log("Deleted: [" + DATABASE + "]");
}

wait.launchFiber(dbclean);
