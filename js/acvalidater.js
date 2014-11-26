function ACValidator() {
    this.validateAll = function (res){
        return false;
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
