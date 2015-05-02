
function HashController(filterFunction) {
	var self = this;
	this.test = filterFunction; //function(hash, oldHash, skip(), reject())
	this.disable = function() {
		HashController.collection = HashController.collection.filter(function(obj) { return obj !== this; });
	};
	this.set = function(newHash, fireEvent) {
		if (!fireEvent)
			HashController.hash = newHash; // so we don't suprised
		history.pushState(null, null, '#' + newHash);
	}
	HashController.collection.push(this);
	return this;
}
HashController.hash = null;
HashController.collection = [];
HashController.changeHandler = function(event) {
	if (location.hash == lastHash) return;
	var lastHash = HashController.hash;
	HashController.hash = location.hash.substring(1);
	var keepGoing = true;
	var reject = false;
	var index = 0;
	while (keepGoing && index < HashController.collection.length) {
		keepGoing = false;
		var controller = HashController.collection[index];
		controller.test(HashController.hash, lastHash,
		/*skip*/ function() {
			keepGoing = true;
		},
		/*reject*/ function() {
			keepGoing = false;
			reject = true;
		});
		index++;
	}
	if (reject || keepGoing) {
		if (event) {
			if (event.preventDefault)
				event.preventDefault();
			event.defaultPrevented = true;
		}
		if (reject) {
			if (lastHash && lastHash != null)
				history.pushState(null, null, '#' + lastHash);
			else
				history.pushState(null, null, '');
		}
		return false;
	}
};

window.onhashchange = HashController.changeHandler;
if ($ && location.hash != "" && location.hash != "#") {
	$(document).ready(function() {
		HashController.changeHandler(); // for initial
	});
}

