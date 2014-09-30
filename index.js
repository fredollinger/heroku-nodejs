var express = require('express');
var app = express();
var mongoose = require('mongoose');
var now = require('mout/time/now');

mongoose.connect('mongodb://localhost/db');
var userSchema = new mongoose.Schema({
    address: { type: String },
    plate_number: { type: String },
    number: { type: String },
    price: { type: Number, min: 0 },
    date: { type: Number, min: 0 },
    request: { type: String } // "buy" or "sell"
}); // END userSchema

app.use(express.static(__dirname + '/public'));

function findMatch(req) {
    var m = mongoose.model('Customers', userSchema);
    m.findOne({ 'location': 'Brazil' }, 'number', function (err, result){
        if (err) return handleError(err);
        console.log('Person: [%s] ', result.number) // Space Ghost is a talk show host.
	return result;
    });
} // END findMatch

function logRequest(req) {
    var m = mongoose.model('Buyers', userSchema);
    var Customer = new m ({
        address: req.query.address,
        plate_number: req.query.plate_number,
        number: req.query.number,
        price: req.query.price,
	date: now(),
        request: "sell"
    });  // END Buyer

    Customer.save(function(err) {
	    console.log("saving");
	    if (!err) {
	        console.log('todoItem saved.');
	    }
	    else
                console.log(err);
    }); // END SAVE

} // END logRequest()

app.get('/buy*', function(req, res) {
    req["transaction"] = "buy";
    logRequest(req);
    console.log("buy");
    res.sendfile("public/success.html");
}); // app.get()

app.get('/sell*', function(req, res) {
    req["transaction"] = "sell";
    logRequest(req);
    console.log("sell");
    res.send(req.query.numba);
}); // app.get('/sell*')

app.listen(process.env.PORT || 3000);
