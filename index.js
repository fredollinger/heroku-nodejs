var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var now = require('mout/time/now');

var ACValidater = require('./js/acvalidater.js');
var validator = new ACValidater();

var ACViper = require('./js/acviper.js');
var viper = new ACViper();

app.use(express.static(__dirname + '/public'));

function transact(data){
    console.log("trans: [" + data.request + "]");
    console.log("plate number: [" + data.price + "]");
    viper.logRequest(data);
    if ( "buy" == data.request){
        viper.findMatch(data, "sell", buyerSearchCB);
    }
    if ( "sell" == data.request){
        viper.findMatch(data, "buy", sellerSearchCB);
    }
} // END transact()

function validate(data){
    var result = {
        success: true,
	address: "valid",
	phone_number: "valid",
	plate_number: "valid",
	price: "valid"
    };
    if (!validator.phoneNumber(data.phone_number)){
        result.success=false;
        result.phone_number="invalid";
    }
    if (!validator.isNumber(data.price)){
        result.success=false;
        result.price="invalid";
    }

    //if (!validator.isAlphaNumber(data.address)){
    if (!validator.isAddress("Hillcrest", data.address)){
        result.success=false;
        result.address="invalid";
    }

    if (!validator.isAlphaNumber(data.plate_number)){
        result.success=false;
        result.plate_number="invalid";
    }

    return result;
} // END validate()


io.on('connection', function (socket) {
    console.log("Connection!!");
    //socket.emit('news', { hello: 'world' });
    
    socket.on('transaction', function (data) {
	valid=validate(data);
        if ( ! valid.success ){
    	    console.log("Validation FAIL.");
            io.sockets.emit('fail',  valid );
	    return;
        } 
	transact(data);
        return;
    }); // END socket.on('transaction');

    //socket.on('failed', function (data) {
    //});
}); // END io.on()

/* Searcher is seller 
 * which means they searched for a "buy" match. */
function sellerSearchCB(err, result){
    if ( null != result ){
	console.log("Success: [" + result.address + "]");
        result.lat=32.749393;
        result.lng=-117.162453;
        console.log("lat: " + result.lat + " lng: " + result.lng);
        io.sockets.emit('success',  result );
    }
    else{
	console.log("Fail.");
        io.sockets.emit('failed',  result );
        return;
    }
    
} // END sellerSearchCB()

function buyerSearchCB(err, result){
     if ( null != result ){
	console.log("Success: [" + result.address + "]");
        result.lat=32.749393;
        result.lng=-117.162453;
        console.log("lat: " + result.lat + " lng: " + result.lng);
        io.sockets.emit('success',  result );
    }
    else{
	console.log("Fail.");
        io.sockets.emit('failed',  result );
        return;
    }
} // END buyerSerachCB()

console.log("Autocrest Started");

server.listen(process.env.PORT || 3000);
