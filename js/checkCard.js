self.addEventListener("message", function(e) {
	var val = 0;
	
	var isValid = !!e.data;
	
	var timeout = function () {
		setTimeout(function () {
			self.postMessage(val);
			val ++;
			if (val > 100) {
				self.postMessage(100);
				setTimeout(function () {
					self.postMessage(isValid ? "VALID" : "INVALID");
				}, 1000);
				
				return;
			}
			timeout();
		}, 50);
	}
	
	timeout();
}, false);