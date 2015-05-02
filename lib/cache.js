// In memory cache for node.js
// GPL, 2015.05.01, Furkan Mustafa
var Promise = require('bluebird');
var _ = require('underscore');

var unixtime = function() { return Date.now() / 1000 | 0; };

function Cache(options, generator) {
	var self = this;
	options = options || {};
	this.name = options.name;
	this.generator = options.promise || Promise.promisify(options.generator || generator);
	this.eager = options.eager || false;
	this.ttl = options.ttl || 60;
	this.callbackQueue = [];

	this.store = function(data) {
		this.updatedAt = unixtime();
		this.error = null;
		this.data = data;
	};

	this.schedule = function() {
		if (this.eager === true) { // initiate next run
			setTimeout(function() {
				self.run();
			}, this.ttl * 950);
		}
	};

	this.running = false;
	this.error = null;
	this.data = null;

	this.run = function() {
		if (this.running) return false;
		this.running = true;
		return this.generator()
			.then(function(data) {
				self.store(data);
				self.running = false;
				self.respond();
				self.schedule();
			})
			.catch(function(error) {
				self.error = error;
				self.running = false;
				self.respond();
				self.schedule();
			});
	};

	this.respond = function() {
		while (cb = this.callbackQueue.shift()) {
			cb(this.error, _.clone(this.data));
		}
	};

	this.get = function(callback) {
		// already fetching
		if (this.running) {
			this.callbackQueue.push(callback);
			return;
		}
		// check if the data is expired
		if (!this.updatedAt || this.updatedAt + this.ttl < unixtime()) {
			this.run();
			this.callbackQueue.push(callback);
			return;
		}
		// return the existing data
		callback(this.error, _.clone(this.data));
	};
	this.promise = Promise.promisify(this.get);

	this.schedule();

	return this;
};

module.exports = Cache;
