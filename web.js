var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/db');
var userSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    price: { type: Number, min: 0 }
}); // END userSchema

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
    console.log(req.query.numba);
    res.send(req.query.color);
});

app.listen(process.env.PORT || 3000);
