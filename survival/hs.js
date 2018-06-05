var hsUserId = new Uint8Array([0x53,0x43,0x4f,0x52,0x53,0x54,0x4f,0x52]);
var HS = {
    SETNAME: -1,
    KILLUP:  0,
    WINUP:   1,
    RESET:   2,
    GETSZ:   3,
    GETLIST: 4,
    SESSION: 5
};

// Setup Relay
var hsws;
var beginConnect = function() {
    hsws=new Relay('ws://re.gl.ax', 'EROCSIH');
    AssignHandlers();
};

function AssignHandlers() {
    hsws.SetMessageHandler(re.BINARY, HS.GETSZ, function(userid, msg) {
        // Since msg is Uint8 we have to recast
        var pl_count = (new DataView(msg.buffer.slice(9))).getUint32(0, true);
        //postMessage({op: 3, data: pl_count[0]});
        game.state.player_count = pl_count;
        document.querySelector("#plcnt").textContent = "Players Online: "+game.state.player_count;
    });

    hsws.SetMessageHandler(re.BINARY, HS.GETLIST, function(userid, msg) {
        // Highscore list should contain object in format {name: string, wins: number, kills: number}
        var highscores = [];

        // Since msg is Uint8 we have to recast
        var dv = new DataView(msg.buffer, 9);
        var off = 0;
        while(off<dv.byteLength) {
            var name = '';
            var name_length = dv.getUint8(off++);
            for(var i = 0; i<name_length; i++) {
                name+=String.fromCharCode(dv.getUint8(off++));
            }
            var wins = dv.getUint32(off, true); off+=4;
            var kills = dv.getUint32(off, true); off+=4;
            highscores.push({name: name, wins: wins, kills: kills});		
        }
        //postMessage({op: 4, data: highscores}, [highscores]);
        game.state.highscores = highscores;

        // Update highscore UI
        
        // Clear old
        var trs = document.querySelectorAll(".hstbl tr");
        for(var i = trs.length-1; i; i--) {
            trs[i].remove();
        }

        var table = document.querySelector(".hstbl tbody");
        var place = 1;
        for(var v in game.state.highscores) {
            var score = game.state.highscores[v];
            var tr = document.createElement('tr');
            tr.appendChild(document.createElement('td')).textContent = place++;
            tr.appendChild(document.createElement('td')).textContent = score.name;
            tr.appendChild(document.createElement('td')).textContent = score.kills;
            tr.appendChild(document.createElement('td')).textContent = score.wins;
            table.appendChild(tr);
        }
    });

    hsws.onSubscription = function() {
        var token;
        if(!localStorage.getItem('token')) {
            localStorage.setItem('token', hsws.userId);
            token = hsws.userId;
        } else {
            token = new Uint8Array(localStorage.getItem('token').split(','));
        }
        hsws.bSendTo(hsUserId, HS.SESSION, token);

        if(game.player.name && game.player.name.length>0) {
            _hsName();
        }

        // Request highscore lists
        hsws.bSendTo(hsUserId, HS.GETSZ);
        hsws.bSendTo(hsUserId, HS.GETLIST);
        setInterval(function() {
            hsws.bSendTo(hsUserId, HS.GETLIST);
        }, 5000);
        setInterval(function() {
            hsws.bSendTo(hsUserId, HS.GETSZ);
        }, 3000);
    }

    hsws.ws.onclose = function(e) {
        // Attempt reconnect after 3 seconds
        setTimeout(beginConnect, 3000);
    }
}
//beginConnect();

function _hsName(){
    hsws.bSendTo(hsUserId, HS.SETNAME, UInt8Str(game.player.name));
}

function _hsW() {
    hsws.bSendTo(hsUserId, HS.WINUP);
    game.state.self.wins++;
    game.state.self.total_wins++;
}

function _hsK(){
    hsws.bSendTo(hsUserId, HS.KILLUP);
    game.state.self.kills++;
    game.state.self.total_kills++;
}

function _hsR(){
    hsws.bSendTo(hsUserId, HS.RESET);
    game.state.self.kills=0;
    game.state.self.wins=0;
}
