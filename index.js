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
        viper.findMatch(data, "sell", sellerSearchCB);
    }
} // END transact()

function validate(data){
    var result = {
        success: true,
	phone_number: "valid"
    };
    console.log("validating: [" + data.phone_number + "]");
    if (!validator.phoneNumber(data.phone_number)){
        result.success=false;
        result.phone_number="invalid";
    }
    return result;
}


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

/*
app.get('/buy*', function(req, res) {
    req["transaction"] = "buy";
    viper.logRequest(req);
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
*/

/* Searcher is seller 
 * which means they searched for a "buy" match. */
function sellerSearchCB(err, result){
    if ( null != result ){
        io.sockets.emit('success',  result );
    }
    else{
        io.sockets.emit('failed',  result );
        return;
    }
}

function buyerSearchCB(err, result){
    console.log("FAIL");
    io.sockets.emit('fail',  result );
    /*
    if ( null != result ){
        console.log("buyer success");
        io.sockets.emit('success',  result );
    }
    else{
        console.log("buyer fail");
        io.sockets.emit('fail',  result );
    }
    */
} // END buyerSerachCB()

console.log("Autocrest Started");

server.listen(process.env.PORT || 3000);
