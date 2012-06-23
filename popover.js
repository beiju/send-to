// Replaces all manner of incorrect quotes (-straight single-, smart single, smart double) with "
// No sexuality/intellicence/romantic status puns intended
safari.extension.settings.addEventListener("change",settingsChange,false);
safari.self.addEventListener("message", handleMessage, false)

var bookmarklets = JSON.parse(safari.extension.settings.bookmarklets.replace(/[\u201C\u201D\u201E\u201F\u2033\u2036\u2018\u2019\u201A\u201B\u2032\u2035]/gi, '"')),
		shortcuts = {};


function createBkm(name, url, shortcut, num) {
	var li = document.createElement('li');
	li.id = name;
	li.innerHTML = '<a href="'+url+'"><img src="icons/'+name+'.png" height="57", width="57"><p>'+shortcut+' &middot; '+num+'</p></a>';
	bkmlist.appendChild(li)
}

_.each(bookmarklets, function(bkm, i) {
	createBkm(bkm.name, bkm.url, bkm.shortcut, i+1);
	shortcuts[bkm.shortcut] = i;
});
safari.self.width = 87*bookmarklets.length + 16;

document.addEventListener('keypress', function(event) {
	var key = String.fromCharCode(event.charCode), i;
	if (key.match(/[1-9]/g)) {
		i = parseInt(key, 10) - 1;
	} else if (_.has(shortcuts, key)) {
		i = shortcuts[key];
	} else {
		return false;
	}
	
	var elem = document.getElementById(bookmarklets[i].name).getElementsByTagName('a')[0];
	trigger(elem);	
	event.preventDefault();
}, false);

_.each(document.getElementsByTagName('a'),  function(a) {
	a.addEventListener('click', function(event) {
		trigger(this);
		event.preventDefault();
	}, false)
});

function settingsChange() {
	window.location.reload()
}

function handleMessage(message) {
	alert(message.name);
}

function trigger(elem) {
	elem.classList.add('triggered');
	setTimeout(function() { _.each(document.getElementsByClassName('triggered'), function(item) { item.classList.remove('triggered')});}, 3000);
	
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("save", elem.href);
	safari.self.hide();
}