;(function() {
	if (window!=window.top) return; // Don't load in an iframe -- it makes the save thing trigger once per frame
	
	safari.self.addEventListener("message", function(message) {
		if (message.name === "save") {
			document.location.href = message.message;
		}
	}, false);
	
})()