var express = require('express');
var app = express();
//var mongoose = require('mongoose');
var now = require('mout/time/now');

var ACValidater = require('./js/acvalidater.js');
var validate = new ACValidater();

var ACViper = require('./js/acviper.js');
var viper = new ACViper();

app.use(express.static(__dirname + '/public'));

app.get('/buy*', function(req, res) {
    req["transaction"] = "buy";
    console.log("trans: [%s]", req.transaction);
    viper.logRequest(req);
    console.log("buy");
    match=viper.findMatch(req, "sell", buyerSearchCB);
    if ( null != match ){
    	res.sendfile("public/success.html");
    }
    else{
    	res.sendfile("public/fail.html");
    }
}); // app.get()

app.get('/sell*', function(req, res) {
    req["transaction"] = "sell";
    console.log("trans: [%s]", req.transaction);
    if (validate.phoneNumber(req.query.phone_number)){
    	console.log("phone success");
    }
    else{
    	console.log("phone fail");
    }
    viper.logRequest(req);
    match=viper.findMatch(req, "buy", sellerSearchCB);

}); // app.get('/sell*')

/* Searcher is seller 
 * which means they searched for a "buy" match. */
function sellerSearchCB(err, result){
    if ( null != result ){
    	app.sendfile("public/success.html");
    }
    else{
    	app.sendfile("public/fail.html");
    }
}

function buyerSearchCB(err, result){
    if ( null != result ){
    	app.sendfile("public/success.html");
    }
    else{
    	app.sendfile("public/fail.html");
    }
}

app.listen(process.env.PORT || 3000);
