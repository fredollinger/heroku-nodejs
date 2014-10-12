var mongoose = require('mongoose');
var now = require('mout/time/now');

function ACViper() {
    console.log('viper init');
    mongoose.connect('mongodb://localhost/db');

    this.userSchema = new mongoose.Schema({
       address: { type: String },
       plate_number: { type: String },
       phone_number: { type: String },
       price: { type: Number, min: 0 },
       date: { type: Number, min: 0 },
       request: { type: String } // "buy" or "sell"
    }); // END userSchema

    this.logRequest = function (req){
    	var m = mongoose.model('Buyers', this.userSchema);
    	var Customer = new m ({
            address: req.query.address,
            plate_number: req.query.plate_number,
            phone_number: req.query.phone_number,
            price: req.query.price,
    	    date: now(),
            request: req.query.request
    });  // END Buyer

    console.log('[%s] saved.', req.query.request );

    Customer.save(function(err) {
	    console.log("saving");
	    if (!err) {
	        //console.log('[%s] saved.', req.request );
	    }
	    else
                console.log(err);
    }); // END SAVE

} // END logRequest()
} // END ACValidator
module.exports = ACViper;
