#!/usr/bin/env node


var program = require('commander');
var Clock = require('./lib/clock');


var clock = new Clock();



program
    .option('-e, --employee <employee>', 'Employee ID')
    .option('-s, --start <start>', 'Start date of report')
    .option('-z, --end <end>', 'End date of report')
    .parse(process.argv);




if (typeof program.employee  === 'undefined' || typeof program.start === 'undefined' || typeof program.end === 'undefined')
    program.outputHelp()
else
    clock.calculateTimeWorked(program.employee, program.start, program.end);
