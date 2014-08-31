var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/*', function(req, res) {
    console.log("got a request");
    res.send(req.query.color);
});

app.listen(process.env.PORT || 3000);
