#!/usr/bin/env node


var program = require('commander');
var Clock = require('./lib/clock');


var clock = new Clock();


program
    .option('-e, --employee <employee>', 'Employee ID')
    .option('-d, --department <department>', 'Department Code')
    .parse(process.argv);


if (typeof program.employee === 'undefined' || typeof program.department === 'undefined')
    program.outputHelp();
else
    clock.clockIn(program.employee, program.department);
