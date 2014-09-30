function ACValidator() {
    console.log('acvalid init');
    // this.type = type;
    // this.color = "red";
    this.validatePhoneNumber = function (p){
        var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
        var digits = p.replace(/\D/g, "");
        return (digits.match(phoneRe) !== null);
    }
} // END ACValidator
