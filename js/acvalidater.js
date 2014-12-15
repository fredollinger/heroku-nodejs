var gm = require('googlemaps');
var util = require('util');
wait=require('wait.for');

function ACValidator() {
    this.inNeighborhood = function (hood, data){
        daHood=JSON.stringify(data.results[0].address_components[2].long_name).replace(/"/g, ""); 
	if ( hood == daHood){
    	    console.log("%s is IN %s", daHood, hood);
            return true;
        }
        else{
    	    console.log("%s is NOT in %s", daHood, hood);
            return false;
        }
    } // END inNeighborhood()

	/*
    this.isAddress = function (hood, address){
	var data = wait.forMethod(gm, "geocode", address);
        console.log("In Data: [" + data + "]");
        if ( undefined ==  data) {
	    return false;
        }

        daHood=JSON.stringify(data.results[0].address_components[2].long_name).replace(/"/g, ""); 
        if ( hood == daHood){
    	    console.log("%s is IN %s", daHood, hood);
            return true;
        }
        else{
    	    console.log("%s is NOT in %s", daHood, hood);
            return false;
        }

	return true;
    } // END isAddress()
	*/

    this.validateAll = function (res){
        return false;
    }

    this.isAlphaNumber = function (variable) {
        if ( variable === undefined || variable === null || "" == variable ) {
	    return false;
        }
	return true;
    }

    this.isNumber = function (o) {
	console.log("testing: [" + o + "]");
        return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
    }

    this.phoneNumber = function (p){
        if (!p) return false;
        var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var digits = p.replace(/\D/g, "");
        return (digits.match(phoneRe) !== null);
    }
    this.isNumber = function (n){ return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
} // END ACValidator
module.exports = ACValidator;
