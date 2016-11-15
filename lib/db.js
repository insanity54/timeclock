var nedb = require('nedb');
var assert = require('chai').assert;
var path = require('path');
var os = require('os');
var Promise = require('bluebird');



var Db = function Db(dbFile) {
    var self = this;
    
    if (typeof dbFile === 'undefined') dbFile = path.join(os.homedir(), '.insanity54.timeclock', 'timeclock.db')
    this._db = new nedb({ filename: dbFile, autoload: true });
}




/**
 * @param {object} options
 * @param {string} options.eventType
 * @param {string} options.employeeID
 * @param {string} [options.departmentCode]
 */
Db.prototype.saveEvent = function saveEvent(options) {
    var self = this;
    
    assert.isObject(options, 'no options object passed as parameter! check code which calls Db.saveEvent()');
    assert.isString(options.eventType);
    assert.isNumber(options.employeeID);
    assert.isNumber(options.date);

    
    if (options.eventType === 'clockIn') {
	assert.isNumber(options.departmentCode);
	self._db.insert({
	    'eventType': options.eventType,
	    'employeeID': options.employeeID,
	    'departmentCode': options.departmentCode,
	    'date': options.date
	});
    }

    else if (options.eventType === 'clockOut') {
	self._db.insert({
	    'eventType': options.eventType, 
	    'employeeID': options.employeeID,
	    'date': options.date
	});
    }
    
    else {
	throw new Error('Invalid eventType: '+eventType)
    }
}




/**
 * @param {Object} options
 * @param {Number} options.start - Epoch of report start
 * @param {Number} options.end - Epoch of report end
 * @param {Number} options.employeeID - Employee ID number
 */
Db.prototype.findEvents = function findEvents(options) {
    var self = this;

    assert.isObject(options, 'no options object was passed as parameter to Db.findEvents(). Check code.');
    assert.isNumber(options.start);
    assert.isNumber(options.end);
    assert.isNumber(options.employeeID);


    return new Promise(function(resolve, reject) {
	self._db.find({
	    'employeeID': options.employeeID,
	    'date': { $lt: options.end, $gt: options.start }
	}, function(err, docs) {
	    if (err) reject(err);
	    resolve(docs);
	})
    })
}








module.exports = Db;

