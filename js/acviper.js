var mongoose = require('mongoose');
var now = require('mout/time/now');
var util = require('util');

function ACViper() {
    this.model="Customer3";
    mongoose.connect('localhost', this.model);

    this.findMatch = function (data, request, callback){
        var m = mongoose.model(this.model, this.userSchema);
        console.log('search for: [%s] ', request);

        var query=m.findOne({ 'request': request }, {
	    phone_number: 1,
	    plate_number: 1,
	    address: 1,
	    request: 1,
	    price: 1,
	    lat: 1,
	    lng: 1,
	    _id: 0
	});
	query.exec(callback);
    } // END findMatch

    this.userSchema = new mongoose.Schema({
       address: { type: String },
       plate_number: { type: String },
       phone_number: { type: String },
       price: { type: Number, min: 0 },
       date: { type: Number, min: 0 },
       lat: { type: Number },
       lng: { type: Number },
       request: { type: String } // "buy" or "sell"
    }); // END userSchema

    this.logRequest = function (query){
    	var m = mongoose.model(this.model, this.userSchema);
    	var Customer = new m ({
            address: query.address,
            plate_number: query.plate_number,
            phone_number: query.phone_number,
            price: query.price,
	    lat: query.lat,
	    lng: query.lng,
    	    date: now(),
            request: query.request
          });  // END Buyer

          util.puts("log request: [" + JSON.stringify(query) + "]");

          Customer.save(function(err) {
	      if (!err) {
	          console.log('[%s] saved.', query.request );
	      }
	      else
                  console.log(err);
           }); // END SAVE

        } // END logRequest()
} // END ACValidator
module.exports = ACViper;
