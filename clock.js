#!/usr/bin/env node



var Clock = require('./lib/clock');
var program = require('commander');
var version = require('./package.json').version;




var clock = new Clock();



program
    .version(version)
    .command('in', 'Clock in the employee')
    .command('out', 'Clock out the employee')
    .command('report', 'Generate a report')






program
    .parse(process.argv);





