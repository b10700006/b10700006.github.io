var isOnline = true;														// Can be used to check if device is in offline/online mode
var isWebAPK = window.matchMedia('(display-mode: standalone)').matches;		// Can be used to check if browser or webapk currently running
console.log("[*] The app is running as a "+(isWebAPK?"WebAPK":"Browser-Page"));

function checkOnlineStatus(){
	isOnline = navigator.onLine;
	console.log("[*] Connection status: "+(isOnline?"online":"offline"));
	if (isOnline){
		$("#connection abbr").html("&#128246;");
		$("#connection abbr").attr("title","You are online!");
	}
	else {
		$("#connection abbr").html("&#9888;");
		$("#connection abbr").attr("title","You are offline!");
	}
}

function init(){
	// Register service worker
	if ('serviceWorker' in navigator) {
		console.log("[*] Register serviceWorker ...");
		navigator.serviceWorker.register('/serviceWorker.js').then(function(registration) {
			// Registration was successful
			console.log('[*] ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed :(
			console.log('[*] ServiceWorker registration failed: ', err);
		});
	}
	else console.log("[*] ServiceWorker not supported by your browser!");
	
	// Trigger install prompt for WebAPK
	window.addEventListener("beforeinstallprompt",function(event){
		console.log("[*] WebAPK install event fired!");
		// var btn = $("<button>install</button>");
		// var btn = $("<div class=\"container\"><div class=\"row\"><div class=\"col-sm-3\"><br><button id='install' type=\"button\" class=\"btn btn-block\">Install</button></div></div></div>");
		// $("body").append(btn);
		var btn = $("#install");
		document.querySelector('#install').classList.remove("disabled");
		document.querySelector('#install').classList.add("btn-primary");
		btn.click(function(e){
			event.prompt();
			// btn.remove();
			// document.querySelector('#install').classList.add("disabled");
			document.querySelector('#install').classList.remove("btn-primary");
		});
	});
	
	// Initialize online/offline detection
	checkOnlineStatus();
	window.addEventListener("online",checkOnlineStatus);
	window.addEventListener("offline",checkOnlineStatus);
}

init();
