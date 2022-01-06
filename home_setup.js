function setCategoryHeights() {
	var pages = document.getElementsByClassName("page-ref");
	for (page of pages) {
		var img = page.getElementsByTagName("img")[0];
		var img_height = img.clientHeight;
		page.style.height = img_height.toString().concat("px");
	}
}

function unpack_config(data) {
	var intro_text = document.getElementsByClassName("intro")[0].getElementsByTagName("p")[0];

	numcats = data.length;
	for (i=0; i < numcats; i++) {
		if (data[i]["category"] == "intro") {
			intro_text.innerHTML = data[i]["text"];
		} else {
			var page = document.getElementById(data[i]["category"]);
			var box = page.getElementsByClassName("box")[0];
			var title = box.getElementsByTagName("h2")[0];
			var text = box.getElementsByTagName("p")[0];
			title.innerHTML = data[i]["title"];
			text.innerHTML = data[i]["text"];
		}
	}
}

function home_setup(path) {
	setCategoryHeights();
	loadCSV(path).then(function(data) {
		unpack_config(data);
	});
}

// hacky way to make this work but whatevs
window.onresize = setCategoryHeights;