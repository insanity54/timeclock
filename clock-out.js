#!/usr/bin/env node


var program = require('commander');
var Clock = require('./lib/clock');


var clock = new Clock();



program
    .option('-e, --employee <employee>', 'Employee ID')
    .parse(process.argv);




if (typeof program.employee === 'undefined')
    program.outputHelp()
else
    clock.clockOut(program.employee);
