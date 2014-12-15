#!/usr/bin/rhino

load("test/common.js");
load("js/acvalidater.js");

vali = new ACValidator();

number="6";
if (vali.isNumber(number)){
    console.log("isNumber() test 1 passed");
}
else{
    console.log("FAIL: validate isNumber()");
}

number="";
if (!vali.isNumber(number)){
    console.log("isNumber() test 2 passed");
}
else{
    console.log("isNumber() failed to invalidate blank");
}

address = "308 University Avenue, San Diego, CA 92103";

if (!vali.isAddress("Hillcrest", address)){
    console.log("isAddresss() test 2 passed");
}
else{
    console.log("isNumber() failed to invalidate blank");
}



/*
number="1619-867-5309"

if (!vali.phoneNumber(number)){
    console.log("phone number test 2 passed");
}
else{
    console.log("failed to invalidate a purposefully invalid phone number");
}

number="10"

if (vali.isNumber(number)){
    console.log("price number test 3 passed");
}
else{
    console.log("failed to validate a valid price number");
}


number="bob"

if (!vali.isNumber(number)){
    console.log("price number test 4 passed");
}
else{
    console.log("failed to invalidate a purposefully invalid price number");
}
*/
