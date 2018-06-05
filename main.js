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

		// Delay JOIN packet for 1 second in case of random mobile JS delay
		setTimeout(function() {
			CreatePlayer();
		}, 150);

		lobby.SetMessageHandler(re.TEXT, 'JOIN', function(sender, obj) {
			lobby.tSendTo(sender, {op:'JOINACK'});
			game.clients[sender] = game.clients[sender] || {};
			game.clients[sender].name    = game.clients[sender].name || obj.name;
			game.clients[sender].pl_guid = obj.pl_guid;
			game.clients[sender].score   = game.clients[sender].score || 0;
			let player_ent = StartPlayer(obj.pl_guid, false, obj.x, obj.y);
			player_ent.clientId = sender;
			FireEvent('player_join', {name: obj.name, guid: obj.pl_guid, userId: sender});
			CreateIdentifier(game.ents[obj.pl_guid], obj.name, 0xAAAAAA);
			//console.log(obj.name + ' has joined the game!');
		});

		lobby.SetMessageHandler(re.TEXT, 'PTICK', function(sender, obj) {
			if(game.ents[obj.guid]) {
				let ent = game.ents[obj.guid];

				if(ent.update) {
					// Correct any divergent extrapolation (PLAYER)
					if(Math.abs(ent.playerBody.position[0]-obj.pbody.pos[0])>5){
						ent.playerBody.position[0] = obj.pbody.pos[0];
					}
					if(Math.abs(ent.playerBody.position[1]-obj.pbody.pos[1])>5){
						ent.playerBody.position[1] = obj.pbody.pos[1];
					}
					if(Math.abs(ent.playerBody.angle-obj.pbody.ang)>0.0174533){ // If delta is over 1°
						ent.playerBody.angle = obj.pbody.ang;
					}

					if(Math.abs(ent.playerBody.velocity[0]-obj.pbody.vel[0])>1){
						ent.playerBody.velocity[0] = obj.pbody.vel[0];
					}
					if(Math.abs(ent.playerBody.velocity[1]-obj.pbody.vel[1])>1){
						ent.playerBody.velocity[1] = obj.pbody.vel[1];
					}
					if(Math.abs(ent.playerBody.angularVelocity-obj.pbody.avel)>0.0174533){
						ent.playerBody.angularVelocity = obj.pbody.avel;
					}

					/*
					if(Math.abs(ent.swordBody.position[0]-obj.sbody.pos[0])>5){
						ent.swordBody.position[0] = obj.sbody.pos[0];
					}
					if(Math.abs(ent.swordBody.position[1]-obj.sbody.pos[1])>5){
						ent.swordBody.position[1] = obj.sbody.pos[1];
					}
					if(Math.abs(ent.swordBody.angle-obj.sbody.ang)>0.0174533){ 
						ent.swordBody.angle = obj.sbody.ang;
					}
					*/
					
					if(Math.abs(ent.swordBody.velocity[0]-obj.sbody.vel[0])>1){
						ent.swordBody.velocity[0] = obj.sbody.vel[0];
					}
					if(Math.abs(ent.swordBody.velocity[1]-obj.sbody.vel[1])>1){
						ent.swordBody.velocity[1] = obj.sbody.vel[1];
					}
					if(Math.abs(ent.swordBody.angularVelocity-obj.sbody.avel)>0.0174533){
						ent.swordBody.angularVelocity = obj.sbody.avel;
					}

					/*
					ent.playerBody.position[0] = obj.pbody.pos[0];
					ent.playerBody.position[1] = obj.pbody.pos[1];
					ent.playerBody.angle = obj.pbody.ang;

					ent.swordBody.position[0] = obj.sbody.pos[0];
					ent.swordBody.position[1] = obj.sbody.pos[1];
					ent.swordBody.angle = obj.sbody.ang;
					
					ent.playerBody.velocity[0] = obj.pbody.vel[0];
					ent.playerBody.velocity[1] = obj.pbody.vel[1];
					ent.playerBody.angularVelocity = obj.pbody.avel;

					ent.swordBody.velocity[0] = obj.sbody.vel[0];
					ent.swordBody.velocity[1] = obj.sbody.vel[1];
					ent.swordBody.angularVelocity = obj.sbody.avel;
					*/
				}
			}
		});

		lobby.SetMessageHandler(re.TEXT, 'EVENT', function(sender, obj) {
			FireEvent(obj.event, obj.vars);
		});

		lobby.SetMessageHandler(re.TEXT, 'HIT', function(sender, obj) {
			lobby.tSendTo(sender, {op:'REG'});
		});

		lobby.SetMessageHandler(re.TEXT, 'REG', function(sender, obj) {
			if(game.ents[game.clients[sender].pl_guid]) {
				game.ents[game.clients[sender].pl_guid].update = true;
			}
		});

		// Process special relay disconnect message
		lobby.onClientDisconnect = function(userId) {
			let clid = UInt8UserIdToBase64(userId);
			if(clid in game.clients) {
				let playerEntity = game.ents[game.clients[clid].pl_guid];
				if(playerEntity) {
					playerEntity.remove();
				}
				delete game.clients[clid];
				FireEvent('player_leave',{userId: userId});
			}
		};

		document.body.style.display = 'none';
		renderer.view.style.display = '';
		//document.body.style.zIndex = -1;
	}

	document.querySelector('#name').focus();
	// Setup some match finding vars
	var mmuserId = new Uint8Array([0x13,0x37,0xFF,0xFF,0xFF,0xFF,0x13,0x37]);
	re.FIND_MATCH = 200;

	function FindBattle() {
		game.player.name = document.getElementById('name').value;
		localStorage.setItem('last_name', game.player.name);
		_hsName(); // tell name to highscore server

		// Change interface values
		document.querySelector('#startui').style.display = 'none'; 
		document.querySelector("#highui").style.display = 'none'; 
		document.querySelector("#mainui").style.display = 'none'; 
		document.querySelector('#waitui').style.display = ''; 
		document.querySelector('#player1').textContent = game.player.name;
		document.querySelector('#player2').textContent = 'Searching...';
		document.querySelector("#waitstatus").textContent = "Waiting for Opponent";
		document.querySelector("#waitstatus").style.color = 'limegreen';

		// Define matchfinding functions
		var getRoom;
		var roomId;
		var retryObj;

		var JoinLobby = function(name) {
			// Match found and confirmed, join that shit
			clearTimeout(retryObj);
			//console.log("OPPONENT LOCATED");
			document.querySelector('#player2').textContent = name;
			document.querySelector("#waitstatus").textContent = "Match Beginning...";
			document.querySelector("#waitstatus").style.color = 'red';
			window.lobby = getRoom;
			game.player.channel = roomId;
			setTimeout(function(){
				JoinGameChannel();
			},1000);
		};

		var handleMatchId = function(userId, msg) {
			if(roomId===AsciiStr(msg)) {
				// If the new ID we requested is the same as the last one
				// Then request another one to ensure a fresh lobby
				requestMatchId();
			} else {
				//console.log("Got LobbyId: "+AsciiStr(msg));
				roomId = AsciiStr(msg);
				getRoom.ws.close();
				getRoom = new Relay('ws://re.gl.ax', roomId);
				getRoom.SetMessageHandler(re.TEXT, 'hi', function(userId, obj){
					getRoom.tSendTo(re.TEXT_BROADCAST, {op:'hiback', name:game.player.name});
					JoinLobby(obj.name);
				});
				getRoom.SetMessageHandler(re.TEXT, 'hiback', function(userId, obj){
					JoinLobby(obj.name);
				});
				getRoom.onSubscription = function() { 
					getRoom.tSendTo(re.TEXT_BROADCAST, {op:'hi', name:game.player.name}); 
					//console.log('Greeting Lobby.');
				};
				// If somebody doesnt ping in ~5 seconds, request another ID (use random to create some timer overlap)
				retryObj = setTimeout(function(){
					getRoom.ws.close();	
					findMatch();
				},Math.random()*2000+3000);
			}
		};

		var requestMatchId = function(e) {
			//console.log("Requesting Lobby");
			getRoom.bSendTo(mmuserId, re.FIND_MATCH);
		};

		var findMatch = function() {
			getRoom = new Relay('ws://re.gl.ax', 'matchfind');
			getRoom.SetMessageHandler(re.BINARY, re.FIND_MATCH, handleMatchId);
			getRoom.onSubscription = requestMatchId; 
		};
		
		findMatch();
	};


	// Start-screen FindBattle button
	document.querySelector('#createChannel').addEventListener('click', function(e) {
		if(game.mobile && !isInFullScreen()) { 
			fullscreen(renderer.view);
			renderer.view.style.height = "100%";
			renderer.view.style.width  = "100%";
		}
		FindBattle();
	});

	
	// MainUI FindBattle button
	document.querySelector('#createChannel2').addEventListener('click', function(e) {
		if(game.mobile && !isInFullScreen()) { 
			fullscreen(renderer.view);
			renderer.view.style.height = "100%";
			renderer.view.style.width  = "100%";
		}
		FindBattle();
	});

	if(game.mobile) {
		document.querySelector('#all').style.transform = "scale(.70, .70)";
	} else {
		document.querySelector('#all').style.width = "100%";
	}

});