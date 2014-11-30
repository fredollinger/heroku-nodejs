var mongoose = require('mongoose');
var now = require('mout/time/now');

function ACViper() {
    mongoose.connect('localhost', 'Customers');

    this.findMatch = function (data, request, callback){
        var m = mongoose.model('Customers', this.userSchema);
        console.log('search for: [%s] ', request);

        var query=m.findOne({ 'request': request }, {
	    phone_number: 1,
	    plate_number: 1,
	    address: 1,
	    request: 1,
	    price: 1,
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
       request: { type: String } // "buy" or "sell"
    }); // END userSchema

    this.logRequest = function (query){
    	var m = mongoose.model('Customers', this.userSchema);
    	var Customer = new m ({
            address: query.address,
            plate_number: query.plate_number,
            phone_number: query.phone_number,
            price: query.price,
    	    date: now(),
            request: query.request
          });  // END Buyer

          Customer.save(function(err) {
	      console.log("saving");
	      if (!err) {
	          console.log('[%s] saved.', query.request );
	      }
	      else
                  console.log(err);
           }); // END SAVE

        } // END logRequest()
} // END ACValidator
module.exports = ACViper;
