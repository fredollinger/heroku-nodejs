#!/usr/bin/rhino

load("test/common.js");
load("js/acvalidater.js");

vali = new ACValidator();
number="619-867-5309"

if (vali.validatePhoneNumber(number)){
    console.log("phone number test 1 passed");
}
else{
    console.log("failed to validate phone number");
}

number="1619-867-5309"

if (!vali.validatePhoneNumber(number)){
    console.log("phone number test 2 passed");
}
else{
    console.log("failed to invalidate a purposefully invalid phone number");
}
