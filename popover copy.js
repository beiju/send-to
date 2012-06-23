bookmarklets = [
	{	'id': 1340430963384,
		'name': 'Instapaper',
		'url': '#instapaper'
	}, {'id': 1340431046945,
		'name': 'Pinboard',
		'url': '#pinboard'
	}
]

edit.addEventListener('click', toggleEdit, true);
addNew.addEventListener('click', addBkm, true);
_.each(document.getElementsByClassName('del'), function(button) {
	button.addEventListener('click', deleteBkm, true);
});
_.each(document.getElementsByClassName('url'), function(button) {
	button.addEventListener('click', editURL, true);
});
_.each(document.getElementsByClassName('name'), function(item) {
	item.addEventListener('click', function(event) {
		if (!document.body.className.match(/edit/)) return;
		event.target.contentEditable = true;
	}, false);
	item.addEventListener('blur', finishEditingName, false)
})
_.each(document.getElementsByClassName('name'), function(item) {
	item.addEventListener('click', function(event) {
		if (document.body.className.match(/edit/)) event.preventDefault();
	}, false)
});

function toggleEdit() {
	if (!document.body.className.match(/edit/)) {
		edit.getElementsByTagName('a')[0].innerText = "Done";
		_.each(document.getElementsByTagName('li'), function(li) {
			li.classList.add('edit');
		});
		_.each(document.getElementsByClassName('block'), function(link) {
			link.removeAttribute('href');
		});
		document.body.classList.add('edit');
		
	} else {
		edit.getElementsByTagName('a')[0].innerText = "Edit";
		_.each(document.getElementsByTagName('li'), function(li) {
			li.classList.remove('edit');
		});
		_.each(document.getElementsByClassName('block'), function(link) {
			link.href = link.dataset.href;
		});
		document.body.classList.remove('edit')
	}
}

function finishEditingName(event) {
	if (!document.body.className.match(/edit/)) return;
	event.target.contentEditable = false;
	//! Don't permit nonzero
	//! Save name change
}

function deleteBkm(event) {
	var delNode = event.target.parentNode.parentNode;
	delNode.parentNode.removeChild(delNode);
}

function editURL(event) {
	var url = event.target.parentNode.dataset.href,
		newURL = prompt('Enter URL:', url);
	event.target.parentNode.dataset.href = newURL;
}

function addBkm(event) {
	createBkm(Date.now(), prompt('Enter URL:', ''));
	return false;
}

function createBkm(id, url, name) {
	var li = document.createElement('li');
	li.id = id;
	li.className = 'edit';
	li.innerHTML = '<a  data-href="'+url+'" class="block"><span class="name">'+(name||'New Bookmarklet')+'</span><button class="del" class="delete">&times;</button><button class="url">&bull;</button></a>';
	addNew.parentNode.insertBefore(li, addNew)
	if (name) return;
	//! save the data
}

toggleEdit();
_.each(bookmarklets, function(bkm) {
	createBkm(bkm.id, bkm.url, bkm.name);
});
toggleEdit();