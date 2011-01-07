safari.application.addEventListener("command", perform, false);
safari.application.addEventListener("validate", validate, false);

var showbar = safari.extension.settings.getItem("showbar");
if(showbar == true){
	getExtensionBar().show();
}

function validate(event){
	if(event.userInfo === "" || !event.userInfo || event.userInfo === undefined || event.userInfo == null){
			event.target.disabled = true;
	}
}

var searchTerm;

function perform(event){
	var url = "";
	var type = "";
	searchTerm = event.userInfo;

	
	if(event.command === "spotify-track"){
		type = "track";
		url = "http://ws.spotify.com/search/1/"+type;
		redirect(getURI(url, type));
	}else if(event.command === "spotify-artist"){
		type = "artist";
		url = "http://ws.spotify.com/search/1/"+type;
		redirect(getURI(url, type));
	}
	
	console.log("userInfo: "+event.userInfo);

}

function redirect(uri){
	if(uri){
		safari.application.activeBrowserWindow.activeTab.url = uri;
	}else{
		alert("Couldn't find your selected track or artist in Spotify");
	}
}

var spotifyURI = "";

function getURI(url, type){
	
	var xml = $.ajax({
		url: url,
		dataType: "xml",
		async: false,
		data: "q="+searchTerm
	}).responseText;
	
	var item = $(xml).children(type).first();
	
	if(type == "track"){
		if(item.attr("href") == undefined)
			return false;
		else
			spotifyURI = item.attr("href");

	}else if(type == "artist"){
		if(item.attr("href") == undefined)
			return false;
		else
			spotifyURI = item.attr("href");
	}
	
	return spotifyURI;
		
}


function getExtensionBar(){
	var bars = safari.extension.bars;
	for(var i = 0; i < bars.length; i++){
		var bar = bars[i];
		if(bar.browserWindow === safari.application.activeBrowserWindow && bar.identifier === "bar"){
			return bar;
		}
	}
}

function showLookup(){
	$(getExtensionBar().contentWindow.document.getElementById("wrapper")).removeClass("scrolled");
}



