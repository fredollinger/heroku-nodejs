var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var now = require('mout/time/now');
var gm = require('googlemaps');
var util = require('util');

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

    /*
    if (!validator.isAddress("Hillcrest", data.address)){
        result.success=false;
        result.address="invalid";
    }
    */

    if (!validator.isAlphaNumber(data.plate_number)){
        result.success=false;
        result.plate_number="invalid";
    }

    return result;
} // END validate()


function startProcessing(data){
    gm.geocode(data.address, function(err, addy){
	console.log("error: [%s]", err);
	if (! null == err){
    	    console.log("addy lookup fail");
            io.sockets.emit('fail',  valid );
	    return;
	}
	console.log("data: [%s]", addy);
        util.puts(JSON.stringify(addy));
	data.neighborhood=JSON.stringify(addy.results[0].address_components[2].long_name).replace(/"/g, ""); 
	data.location=JSON.stringify(addy.results[0].geometry.location);
	console.log("neighborhood: [%s]", data.neighborhood);
	console.log("location: [%s]", data.location);
	valid=validate(data);
	if ( ! valid.success ){
    	    console.log("Validation FAIL.");
            io.sockets.emit('fail',  valid );
	    return;
        } 
	transact(data);
    });
} // END startProcessing()
	// TODO: ADD lat and lng here...
/*	
	if (validate.inNeighborhood("Hillcrest", addy)) {
	    console.log("in neighborhood");
	    transact(data);
	}
        else{
	    console.log("NOT in neighborhood");
            io.sockets.emit('fail',  valid );
	}
*/


io.on('connection', function (socket) {
    console.log("Connection!!");
    
    socket.on('transaction', function (data) {
	startProcessing(data);
        return;
    }); // END socket.on('transaction');
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
