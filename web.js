var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');
var userSchema = new mongoose.Schema({
    address: { type: String },
    number: { type: String },
    price: { type: Number, min: 0 },
    date: { type: Number, min: 0 },
    request: { type: String } // "buy" or "sell"
}); // END userSchema

app.use(express.static(__dirname + '/public'));

function findMatch(req) {
    m.findOne({ 'location': 'Brazil' }, 'number', function (err, result){
        if (err) return handleError(err);
        console.log('Person: [%s] ', result.number) // Space Ghost is a talk show host.
    });
} // END findMatch

function logRequest(req) {
    var m = mongoose.model('Buyers', userSchema);
    var Customer = new m ({
        address: req.query.address,
        number: req.query.number,
        price: 5.00,
	date: 1000,
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
    res.send(req.query.numba);
}); // app.get()

app.get('/sell*', function(req, res) {
    req["transaction"] = "sell";
    logRequest(req);
    console.log("sell");
    res.send(req.query.numba);

    // res.send(req.query.numba);
}); // app.get('/sell*')

app.listen(process.env.PORT || 3000);
