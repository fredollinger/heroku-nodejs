#!/usr/bin/rhino

load("test/common.js");
load("js/acvalidater.js");

vali = new ACValidator();
number="619-867-5309"
//console.log(getMethods(vali));
vali.validatePhoneNumber(number);
//vali.bob();
