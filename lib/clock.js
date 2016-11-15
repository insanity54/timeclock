var moment = require('moment');
var Database = require('./db');
var assert = require('chai').assert;
var _ = require('lodash');



var Clock = function Clock(options) {
    if (typeof options === 'undefined') options = {};
    this._db = new Database(options.dbFile);
}



Clock.prototype.clockIn = function clockIn(employeeID, departmentCode) {
    var self = this;
    assert.isDefined(employeeID);
    assert.isDefined(departmentCode);
    employeeID = parseInt(employeeID);
    departmentCode = parseInt(departmentCode);
    self._db.saveEvent({
	'eventType': 'clockIn', 
	'employeeID': employeeID,
	'departmentCode': departmentCode,
	'date': moment().valueOf()
    });
}


Clock.prototype.clockOut = function clockOut(employeeID) {
    var self = this;
    assert.isDefined(employeeID);
    employeeID = parseInt(employeeID);
    self._db.saveEvent({
	'eventType': 'clockOut',
	'employeeID': employeeID,
	'date': moment().valueOf()
    });
}


/*
 * calculate the time worked between period
 *
 * @param {Number} start - the epoch of the start of the time period
 * @param {Number} end - the epoch of the end of the time period
 */
Clock.prototype.calculateTimeWorked = function calculateTimeWorked(employeeID, start, end) {
    var self = this;
    
    assert.isDefined(employeeID, 'employeeID was not passed to calculateTimeWorked as first param');
    assert.isDefined(start, 'start date was not passed to calculateTimeWorked as second param');
    assert.isDefined(end, 'end date was not passed to calculateTimeWorked as third param');
    
    employeeID = parseInt(employeeID);
    start = parseInt(start);
    end = parseInt(end);
    
    self._db.findEvents({
	'start': start,
	'end': end,
	'employeeID': employeeID
    })
	.then(function(events) {
	    events = _.chain(events)
	        .sort('date')
	        .value()
	    console.log(events);
	})
}



module.exports = Clock;











