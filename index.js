var express = require('express');
var app = express();
var mongoose = require('mongoose');
var now = require('mout/time/now');

var ACValidater = require('./js/acvalidater.js');
var validate = new ACValidater();

mongoose.connect('mongodb://localhost/db');

var userSchema = new mongoose.Schema({
    address: { type: String },
    plate_number: { type: String },
    phone_number: { type: String },
    price: { type: Number, min: 0 },
    date: { type: Number, min: 0 },
    request: { type: String } // "buy" or "sell"
}); // END userSchema

app.use(express.static(__dirname + '/public'));

function findMatch(req, request) {
    var m = mongoose.model('Customers', userSchema);
    console.log('search for: [%s] ', request);
    m.findOne({ 'request': request }, 'phone_number', function (err, result){
        if (err) return handleError(err);
	//if ( null == object ) return res
        console.log('Object type: [%s] ', Object.prototype.toString.call(result));
        //console.log('Person: [%s] ', result.number) // Space Ghost is a talk show host.
	return result;
    });
} // END findMatch

function logRequest(req) {
    var m = mongoose.model('Buyers', userSchema);
    var Customer = new m ({
        address: req.query.address,
        plate_number: req.query.plate_number,
        phone_number: req.query.phone_number,
        price: req.query.price,
	date: now(),
        request: req.transaction
    });  // END Buyer

    Customer.save(function(err) {
	    console.log("saving");
	    if (!err) {
	        console.log('[%s] saved.', req.transaction );
	    }
	    else
                console.log(err);
    }); // END SAVE

} // END logRequest()

app.get('/buy*', function(req, res) {
    req["transaction"] = "buy";
    console.log("trans: [%s]", req.transaction);
    logRequest(req);
    console.log("buy");
    match=findMatch(req, "sell");
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
    logRequest(req);
    match=findMatch(req, "buy");
    if ( null != match ){
    	res.sendfile("public/success.html");
    }
    else{
    	res.sendfile("public/fail.html");
    }
}); // app.get('/sell*')

app.listen(process.env.PORT || 3000);
