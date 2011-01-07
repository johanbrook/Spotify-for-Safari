/*
safari.self.addEventListener("message", handleMessage, false);

function handleMessage(event){
	if(event.name === "createElement"){
		$("<div />", {text: event.message, "id": "spotify-results"}).prependTo("body").slideDown("fast");
	}
}
*/
/*
$(document).mousedown(function(event){
	if(event.which === 3){
		safari.self.tab.setContextMenuEventUserInfo(event, window.getSelection());
		//alert(window.getSelection());
	}
});
*/


document.oncontextmenu = sendSelection;

function sendSelection(e){
	var sel = document.getSelection().toString().trim();
//	if(sel.length >= 1){
		safari.self.tab.setContextMenuEventUserInfo(e, sel );
		console.log("userInfo set: "+sel);
//	}
}


/*
document.addEventListener("contextmenu", menuHandler, true);
function menuHandler(e){
	var the_e = e;
	safari.self.tab.setContextMenuEventUserInfo(the_e, window.getSelection());
	alert(window.getSelection());
}
*/