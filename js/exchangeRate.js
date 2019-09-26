function EventSource(stream) {
	that = this;
	this._stream = stream;
	this.readyState = 1;
	this.badStream = false;
	
	if ((stream !== "/exchange/stream") &&
			(stream !== stream !== "/exchange/stream/")) {
		console.error("Wrong Stream");
		this.badStream = true;
	}
	
	this._fnMap = {};
	
	this.addEventListener = function (messageType, fn) {
		if (!this.badStream) {
			that._fnMap[messageType] = that._fnMap[messageType] || [];

			that._fnMap[messageType].push(fn);
		} else {
			console.error("can't listen to bad stream");
		}
	}
	
	setInterval(function () {
		Object.keys(that._fnMap || []).forEach(function (key) {
			var value;
			
			if (!rates[key]) {
				console.log("No such currency " + key);
				return;
			}
			
			value = rates[key]();
			
			
			(that._fnMap[key]).forEach(function (fn) {
				fn({data: value});
			});
		});
	}, 4000);
	
	this.close = function() {
		this._fnMap = {};
		this.readyState = 2;
	}
}

var rates  = {
	shekel: function () {
		return 3.5 + Math.random();
	},	
	euro: function () {
		return 0.9 + (Math.random() / 5);
	}
}