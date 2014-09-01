var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');
var userSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    price: { type: Number, min: 0 },
    date: { type: Number, min: 0 },
    request: { type: String } // "buy" or "sell"
}); // END userSchema

app.use(express.static(__dirname + '/public'));

function logRequest(type) {
    console.log(type);
    return;
}

app.get('/buy*', function(req, res) {
    logRequest("buy");
    //console.log("buy");
    res.send(req.query.numba);

    var Customer = mongoose.model('Buyers', userSchema);

    var Buyer = new Customer ({
        name: 'John Doe', 
        address: '1313 Crooken Lane',
        price: 5.00,
	date: "Tue, 26 Aug 2014 19:34:17 -0700",
        request: "buy"
    });  // END Buyer
}); // app.get()

app.get('/sell*', function(req, res) {
    logRequest("sell");
    //console.log("sell");
    res.send(req.query.numba);
}); // app.get('/sell*')

app.listen(process.env.PORT || 3000);
