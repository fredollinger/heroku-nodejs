function ACValidator() {
    console.log('acvalid init');

    this.validateAll = function (res){
        return false;
    }

    this.phoneNumber = function (p){
        if (!p) return false;
        var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var digits = p.replace(/\D/g, "");
        return (digits.match(phoneRe) !== null);
    }
} // END ACValidator
module.exports = ACValidator;
