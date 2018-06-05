"use strict";
// Get the canvas element
var canvas = document.getElementById('canvas');

function isInFullScreen() {
	return (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);
}

// Enter fullscreen
function fullscreen(element){
    if(element.RequestFullScreen){
        element.RequestFullScreen();
    }else if(element.webkitRequestFullScreen){
        element.webkitRequestFullScreen();
    }else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
    }else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
    }else{
        alert("This browser doesn't support fullscreen");
    }
}

// Exit fullscreen
function exitfullscreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

window.fsrequested = false;
window.addEventListener('touchend', function(){
	if(!isInFullScreen() && !window.fsrequested) { 
		fullscreen(document.documentElement);
		renderer.view.style.height = "100%";
		renderer.view.style.width  = "100%";
	}
	window.fsrequested = true;
});


document.addEventListener("DOMContentLoaded", function(){
	// Initialize Lobby Stuff
	document.getElementById('name').value = localStorage.getItem('last_name') || "Anonymous";

	// LOBBY SYSTEM
	function JoinGameChannel() {
		// Set game specific variables, try to keep game specifics out of glax.js (which is engine code)
		game.ended = false; // signal game not ended
		game.player.score  = 0;
		game.player.winning = false; // keeps track of this real-time to prevent calculating at end as states are being cleaned up
		game.game_clock = 90;
		game.player.userId = UInt8UserIdToBase64(lobby.userId);
		game.clients[UInt8UserIdToBase64(lobby.userId)] = game.player;

		window.CreatePlayer = function() {
			// If game is over, do nothing (this event may be called by a timer)
			if (game.ended) return;

			// Otherwise signal entity spawn
			let startx = 640*(Math.random()-.5);
			let starty = 360*(Math.random()-.5);
			let my_guid = GUID();
			let my_ent = StartPlayer(my_guid, true, startx, starty);
			my_ent.clientId = UInt8UserIdToBase64(lobby.userId);
			FireEvent('player_join', {name: game.player.name, guid: my_guid, userId: UInt8UserIdToBase64(lobby.userId)});
			game.player.pl_guid = my_guid;
			CreateIdentifier(game.ents[game.player.pl_guid], game.player.name, 0xEAEAEA);
			lobby.tSendTo(re.TEXT_BROADCAST, {
				op: 'JOIN',
				name: game.player.name,
				pl_guid: game.player.pl_guid,
				x: startx,
				y: starty
			});
		}

		document.body.style.display = 'none';
		renderer.view.style.display = '';
		//document.body.style.zIndex = -1;
	}


	function JoinSPGame() {
		let my_guid = GUID();
		game.player.pl_guid = my_guid;
		let my_ent = StartPlayer(game.player.pl_guid, true, 640*(Math.random()-.5), 360*(Math.random()-.5));

		document.body.style.display = 'none';
		renderer.view.style.display = '';
	} 
	JoinSPGame();

	renderer.view.addEventListener("mousedown", renderer.view.requestPointerLock);


	if(game.mobile) {
		document.querySelector('#all').style.transform = "scale(.70, .70)";
	} else {
		document.querySelector('#all').style.width = "100%";
	}

});