var mongoose = require('mongoose');
var now = require('mout/time/now');

function ACCobra() {
    this.DATABASE='AddressCache3';
    mongoose.connect('localhost', this.DATABASE);

    this.findMatch = function (data, callback){
        var m = mongoose.model(this.DATABASE, this.userSchema);
        //console.log('search for: [' + data.query.address + ']');

        var query=m.findOne({ 'address': data.query.address }, function(err, result) {
	    if ( null == result){
	        console.log("findOne NULL result.");
	        result = {};
            }	
	    else{
	        console.log("findOne SUCCESS result: %s", result);
	    }
	    // result.addresss=data.query.address;
	    // console.log("findOne: [" + result + "]");
	});
	query.exec(callback);
    } // END findMatch

    this.userSchema = new mongoose.Schema({
       address: { type: String },
       lat: { type: Number },
       lng: { type: Number }
    }); // END userSchema

    this.cacheAddress = function (query){
    	var m = mongoose.model(this.DATABASE, this.userSchema);
    	var Customer = new m ({
            address: query.address
            , lat: query.lat
            , lng: query.lng
          });  // END Buyer

          Customer.save(function(err) {
	      console.log("saving");
	      if (!err) {
	          console.log('[%s] saved.', query.lat );
	      }
	      else {
                  console.log(err);
	      }
          }); // END save()
    } // END cacheAddress()
} // END ACValidator
module.exports = ACCobra;
