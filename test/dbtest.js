var express = require('express');
var app = express();

var ACViper = require('../js/acviper.js');
var viper = new ACViper();

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

console.log("dbtest END");



