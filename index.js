var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var now = require('mout/time/now');

var ACValidater = require('./js/acvalidater.js');
var validate = new ACValidater();

var ACViper = require('./js/acviper.js');
var viper = new ACViper();

app.use(express.static(__dirname + '/public'));

function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
            if (typeof(obj[id]) == "function") {
                result.push(id + ": " + obj[id].toString());
            }
        }
        catch (err) {
            result.push(id + ": inaccessible");
        }
    }
    return result;
}

function transact(data){
    console.log("trans: [" + data.request + "]");
    console.log("plate number: [" + data.price + "]");
}

io.on('connection', function (socket) {
    console.log("Connection!!");
    //socket.emit('news', { hello: 'world' });
    
    socket.on('transaction', function (data) {
	transact(data);
        return;
    });

    socket.on('failed', function (data) {
        //console.log("failed");
    });
});

app.get('/buy*', function(req, res) {
    req["transaction"] = "buy";
    //console.log("trans: [%s]", req.transaction);
    viper.logRequest(req);
    //console.log("buy");
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
    //console.log("trans: [%s]", req.transaction);
    if (validate.phoneNumber(req.query.phone_number)){
    	//console.log("phone success");
    }
    else{
    	//console.log("phone fail");
    }
    viper.logRequest(req);
    match=viper.findMatch(req, "buy", sellerSearchCB);

    res.redirect('/?status=validating');

}); // app.get('/sell*')

/* Searcher is seller 
 * which means they searched for a "buy" match. */
function sellerSearchCB(err, result){
    if ( null != result ){
    	app.sendfile("public/success.html");
    }
    else{
    	//app.send("public/fail.html");
        
        io.sockets.emit('failed', { error: 'failed to validate' });
        //console.log("emitting Fail");
        return;
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

server.listen(process.env.PORT || 3000);
