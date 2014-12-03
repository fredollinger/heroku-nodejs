var mongoose = require('mongoose');
var now = require('mout/time/now');

function ACCobra() {
    this.DATABASE='AddressCache';
    mongoose.connect('localhost', this.DATABASE);

    this.findMatch = function (data, request, callback){
        var m = mongoose.model(this.DATABASE, this.userSchema);
        console.log('search for: [%s] ', request);

        var query=m.findOne({ 'request': request }, {
	        address: address,
	    });
	    query.exec(callback);
    } // END findMatch

    this.userSchema = new mongoose.Schema({
       address: { type: String },
       x: { type: Number, min: 0 },
       y: { type: Number, min: 0 }
    }); // END userSchema

    this.cacheAddress = function (query){
    /*
    	var m = mongoose.model(this.DATABASE, this.userSchema);
    	var Customer = new m ({
            address: query.address,
            x: query.x,
            y: query.y
          });  // END Buyer

          Customer.save(function(err) {
	      console.log("saving");
	      if (!err) {
	          console.log('[%s] saved.', query.request );
	      }
	      else
                  console.log(err);
           }); // END SAVE
    */
    } // END cacheAddress()
} // END ACValidator
module.exports = ACCobra;
