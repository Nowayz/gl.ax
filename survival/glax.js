"use strict";
//	-------------------------------------------------
//	<BEGIN> GLAX : CORE_JAVASCRIPT_OPTIMIZATIONS
//  > Also contains all early-required core-functions
//	-------------------------------------------------
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
let _GSEED = (0xDEADC0DE*Math.random())|0;
Math.random = function() {
	var g_seed = new Uint32Array([_GSEED]);
	Math.random = function() {
		g_seed[0]^=g_seed[0]<<13;
		g_seed[0]^=g_seed[0]>>17
		g_seed[0]^=g_seed[0]<<5;
		return g_seed[0]/0xFFFFFFFF;
	};
	return Math.random();
}
function mobileAndTabletcheck() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
function SpawnWorker(func, ...rep) {
    func = '(' + func + ')();';
    for (var i = 1; i < (rep.length + 1); i++)
    func = func.split('$' + i).join(JSON.stringify(rep[i - 1]));
    var wrkr_blob = new Blob([func], {
        type: 'octet/stream'
    });
    var wrkr_url = URL.createObjectURL(wrkr_blob);
    var wrkr = new Worker(wrkr_url);
    wrkr.blob = wrkr_blob;
    wrkr.url = wrkr_url;
    wrkr.kill = function() {
        wrkr.terminate();
        URL.revokeObjectURL(wrkr.url);
        delete wrkr.blob;
        delete wrkr.url;
    }
    return wrkr;
}
//	------------------------------------------
//	<END> GLAX : CORE_JAVASCRIPT_OPTIMIZATIONS
//	------------------------------------------


document.addEventListener("DOMContentLoaded", function(){
   /////////////////////////////////////////////////
  // Game: Initialize Renderer                   //
 //  Create renderer and insert it into the DOM //
/////////////////////////////////////////////////
window.renderer = new PIXI.WebGLRenderer(1280, 720, {'antialias':true});
window.stage = new PIXI.Container();
document.documentElement.appendChild(renderer.view);
renderer.view.style.display = 'none';


  ///////////////////////
 // Game: World State //
///////////////////////

/*
	::How to read game.keys table::

   |                      BIT FIELDS (offset from right)                  |
   ________________________________________________________________________
	Bit 1 =  Current Key State (Set bit meaning KeyDown)
	Bit 2 =  Asynchronous: Key been pressed since last tick
	Bit 3 =  Asynchronous: Key has completed double-press since last tick
	Bit 4 =  Asynchronous: Key released since last tick
	Bit 5->15  = Reserved
	Bit 16->32 = Number of ticks key has been held; or if key not pressed, 
	             this is the # of ticks it was held before being released
*/

window.game = {
	// Active World Entities
	ents: {},

	// InputKey State Map
	keys: {},
	lastKeys: [], // Last 10 keys-down with timestamps: [key, time]
	
	// Mouse Events/Flags
	m_lastpos : [0,0],
	m_curpos  : [0,0],
	m_dx      : 0,
	m_dy      : 0,
	
	// Renderer Resolution
	height: 720,
	width : 1280,

	// Device Information
	mobile   : mobileAndTabletcheck(),
	mobiscale: window.devicePixelRatio>1.0?(window.innerWidth*window.devicePixelRatio)/960:1,

	// Game Paused (not in focus)
	paused: false,

	// Game is over (Should be true if game is in menus)
	ended: true,

	// DEFINE SHORTCUTS (Initialized by resize dispatcher)
	win : {
		'tl': [0,0],
		'bl': [0,0],
		'tr': [0,0],
		'br': [0,0],
		'mid':[0,0]
	},

	// Player
	player : {
		name    : "",
		channel : "",
		userId : "" // Session UserId
	},
	
	// Shared game-state variables
	state : {
		self: {
			kills: 0,
			wins: 0,
			total_kills: 0,
			total_wins: 0
		}
	},

	// Known Clients, by userId
	clients : {},

	// Physics
	phys: {},

	// Sounds
	snd: {},

	// Textures
	textures: {},  // Store re-used textures, or sets of textures

	// Global Sprites (Used for effects or optimization)
	sprites: {},

	// Bitmap Font Cache
	fonts: {},

	// Miscellaneous Engine Properties
	time: Date.now(), // Updated every tick
	blur_time: 0,     // Record storing when browser goes out of focus
	tick: 0,
	deviceHz: 0,

	// Game Variables
	var: {},

	// Game Events
	events: {},

	// Scheduled Asynchronous Calls
	async: {}
};


  ////////////////////////////
 // Glax Library Functions //
////////////////////////////
window.GUID = function() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

// > Schedule(func, delayTicks)
//     Schedule a function to be called on a later tick
//     Funtion can be called multiple times by passing array of delays for delayTicks 
// ----------------------------------------
window.Schedule = function(func, delayTicks) {
	if(delayTicks instanceof Object) {
		for(var v of delayTicks) {
			v = v>=0?v:0;
			if (v===0) {
				func();
			} else {
				game.async[game.tick+v] = game.async[game.tick+v] || [];
				let len = game.async[game.tick+v].push(func);
			}
		}
	}
	else {
		delayTicks = delayTicks>=0?delayTicks:0;
		if (delayTicks===0) {
			func();
		} else {
			game.async[game.tick+delayTicks] = game.async[game.tick+delayTicks] || [];
			let len = game.async[game.tick+delayTicks].push(func);
		}
	}
};

window.AddEntity = function(obj, guid) {
	if (typeof guid !== 'undefined') {
		game.ents[guid] = obj;
		game.ents[guid].guid = guid;
		return guid;
	}
	else {
		let newGuid = GUID();
		game.ents[newGuid] = obj;
		game.ents[newGuid].guid = newGuid;
		return newGuid;
	}
};

window.AddEventHook = function(event, func) {
	if(!game.events[event]) 
		game.events[event] = [];
	for(var i=0; i<game.events[event].length; i++) {
		if(!game.events[event][i]) {
			func._event = event;
			func._index = i;
			game.events[event][i] = func;
			return;
		}
	}
	func._event = event;
	func._index = game.events[event].push(func)-1;
};

window.RemoveEventHook = function(func) {
	game.events[func._event][func._index] = undefined;
};

window.FireEvent = function(event, obj, network) {
	if(network) {
		lobby.tSendTo(re.TEXT_BROADCAST, {
			op: 'EVENT',
			event: event,
			vars: obj
		});
	}
	if(game.events[event]) {
		for(var i=0; i<game.events[event].length; i++) {
			if(game.events[event][i]) {
				game.events[event][i](obj);
			}
		}
	}
};

// > rgb_to_hsv(uint32 color)
//     RGB to HSV Conversion Algorithm 
// ----------------------------------------
// (Red|Green|Blue -> Hue|Saturation|Value)
Math.PI2 = Math.PI*2;
window.rgb_to_hsv = function(color) {
	var r = (color>>>16)&0xFF,
		g = (color>>>8) &0xFF,
		b = color&0xFF;
	var M = Math.max(r,g,b),
		m = Math.min(r,g,b);
	var h = Math.acos((r-g*.5-b*.5)/Math.sqrt(r*r+g*g+b*b-r*g-r*b-g*b)),
		s = Math.round(M>0?(1-m/M)*255:0),
		v = M;
	h = Math.round(((b>g?Math.PI2-h:h)/Math.PI2)*255);
	return (h<<16)|(s<<8)|v;
};

// > hsv_to_rgb(uint32 color)
//     HSV to RGB Conversion Algorithm 
// Note: [Potential future change]: May be able to optimize by calculating without scaling...
// ----------------------------------------
// (Hue|Saturation|Value -> Red|Green|Blue)
window.hsv_to_rgb = function(color) {
	var h = ((color>>>16)&0xFF)/255,
		s = ((color>>>8)&0xFF)/255,
		v = (color&0xFF)/255;
	h = h / (60/360);
	var i = h|0;
	var f = h-i;
	var p = v*(1-s);
	var q = v*(1-s*f);
	var t = v*(1-s*(1-f));
	var r,g,b;
	switch (i) {
		case 0:  r = v; g = t; b = p; break;
		case 1:  r = q; g = v; b = p; break;
		case 2:  r = p; g = v; b = t; break;
		case 3:  r = p; g = q; b = v; break;
		case 4:  r = t; g = p; b = v; break;case 5: 
		default: r = v; g = p; b = q; break;
    }
	r = Math.round(r*255);
	g = Math.round(g*255);
	b = Math.round(b*255);
	return (r<<16)|(g<<8)|b;
};

// Fast RGB[UINT32] arithmetic
window.rgb_add = function(color, dr, dg, db) {
	var r = (color>>>16)&0xFF,
		g = (color>>>8)&0xFF,
		b = color&0xFF;
	return (((r+dr)&0xFF)<<16)|(((g+dg)&0xFF)<<8)|((b+db)&0xFF);
};

// Fast RGB[UINT32] multiply
// Note : Adding .5 for accurate rounding (bit-ops truncate float values)
window.rgb_mul = function(color, dr, dg, db) {
	var r = (color>>>16)&0xFF,
		g = (color>>>8)&0xFF,
		b = color&0xFF;
	return (((r*dr+.5)&0xFF)<<16)|(((g*dg+.5)&0xFF)<<8)|((b*db+.5)&0xFF);
};

// Fast HSV[UINT32] arithmetic 
//  Notice : 'color' MUST BE RGB[UINT32]
// Returns : RGB format color UINT32
window.hsv_add = function(color, dh, ds, dv) {
	color = rgb_to_hsv(color);
	var h = (color>>>16)&0xFF,
		s = (color>>>8)&0xFF,
		v = color&0xFF;
	return hsv_to_rgb((((h+dh)&0xFF)<<16)|(((s+ds)&0xFF)<<8)|((v+dv)&0xFF));
};

// Fast HSV[UINT32] multiply 
// Note : Adding .5 for accurate rounding (bit-ops truncate float values)
// --------------------------------------
// Notice  : 'color' MUST BE RGB[UINT32]
// Returns : RGB format color UINT32
window.hsv_mul = function(color, dh, ds, dv) {
	color = rgb_to_hsv(color);
	var h = (color>>>16)&0xFF,
		s = (color>>>8)&0xFF,
		v = color&0xFF;
	return hsv_to_rgb((((h*dh+.5)&0xFF)<<16)|(((s*ds+.5)&0xFF)<<8)|((v*dv+.5)&0xFF));
};

// Easily convert between UINT32 color and RGB object
window.rgb = function(color) {
	if(color instanceof Object)
		return (color.r<<16)|(color.g<<8)|color.b;
	else
		return {r:(color>>>16)&0xFF,g:(color>>>8)&0xFF,b:color&0xFF};
};

function rndcolor() {
	var r = (Math.round(Math.random()* 127) + 120);
	var g = (Math.round(Math.random()* 127) + 120);
	var b = (Math.round(Math.random()* 127) + 120);
	return rgb_add(0, r, g, b);
};

function LoadFont(fontname, path) {
	game.fonts[fontname] = {};
	game.fonts[fontname].texture = PIXI.Texture.fromImage(location.href+path+'.png');
	game.fonts[fontname].glyph = {};
	let xml = new XMLHttpRequest();
	xml.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			// Setup glyph textures
			let tags = this.responseXML.getElementsByTagName('char');
			for(let char of tags) {
				let id = char.id|0;
				game.fonts[fontname].glyph[id] = {};
				game.fonts[fontname].glyph[id].width  = char.attributes.width.value|0;
				game.fonts[fontname].glyph[id].height = char.attributes.height.value|0;
				game.fonts[fontname].glyph[id].xoff = char.attributes.xoffset.value|0;
				game.fonts[fontname].glyph[id].yoff = char.attributes.yoffset.value|0;
				game.fonts[fontname].glyph[id].xadd = char.attributes.xadvance.value|0;
				game.fonts[fontname].glyph[id].tex  = new PIXI.Texture(game.fonts[fontname].texture.baseTexture, {
					x:char.attributes.x.value|0, 
					y:char.attributes.y.value|0, 
					width:char.attributes.width.value|0, 
					height:char.attributes.height.value|0
				});
			}
			game.fonts[fontname].glyphs = [];
			for(var glyph in game.fonts[fontname].glyph) {
				game.fonts[fontname].glyphs.push(glyph|0);
			}
			// Misc: Set line-height
			let common = this.responseXML.getElementsByTagName('common');
			for(let ele of common) {
				game.fonts[fontname].lineHeight = ele.attributes.lineHeight.value|0;
			}
			// Set loaded flag
			game.fonts[fontname].loaded = true;
		}
	};
	xml.responseType = 'document';
	xml.open('GET', location.href+path+'.xml', true);
	xml.send();
	return game.fonts[fontname];
}


  //////////////////////////////////
 // Game: Browser Event Handlers //
//////////////////////////////////

/* Keyboard Events */
game.AdjustInputFlags = function(){
	for(var key in game.keys) {
		if (game.keys[key]&1) {
			// If key currently down, update ticks-held
			var ticksHeld = (game.keys[key]>>>16) + 1;
			game.keys[key] = (ticksHeld<<16)|(game.keys[key]&0b01);
		} else {
			// If key is released, clear event flags
			game.keys[key] &= 0xFFFF0000;
		}
	}
	game.m_dx = 0;
	game.m_dy = 0;
}

// Handle key-up events
window.addEventListener('keyup', function(e) {
	game.keys[e.key] |= 0x8;        // Set key-release bit
	game.keys[e.key] &= 0xFFFFFFFE; // Unset key-down bit
});

// Initialize game.lastKeys to prevent repetitive calls to .length on lookups
for(var i=0;i<10;i++) {game.lastKeys.push(['',0]);};

function handleKeyEvent(e, mouse) {
	var keyCode = mouse ? 'm'+e.button : e.key;
	if ((game.keys[keyCode]&1) === 0) {
		// Set key status using bitops to avoid prematurely clearing double-press flag
		game.keys[keyCode] &= 0x0000FFFF;
		game.keys[keyCode] |= 0b11;

		// Populate key-press history
		game.lastKeys.shift();
		game.lastKeys.push([keyCode,Date.now()]);

		// Detect double-tap event (Supports multiple doubletaps at once)
		var lastKey  = game.lastKeys[9][0];
		var lastTime = game.lastKeys[9][1];
		for(var i=8;i>0;i--) {
			if(lastKey===game.lastKeys[i][0]) {
				var timeSpan = lastTime - game.lastKeys[i][1];
				if(timeSpan<200) {
					game.keys[keyCode] = 0b111;
					break;
				}
			}
		}
	}
}

// Handle key-down events
window.addEventListener('keydown', function(e) {
	handleKeyEvent(e, false);
});

if (!game.mobile) {
	/* Mouse Events */
	window.addEventListener('mousemove', function(e) {
		// Simulate cursor position when PointerLock is enabled
		if(document.pointerLockElement) {
			game.m_curpos = [game.m_curpos[0]+e.movementX, game.m_curpos[1]-e.movementY];
		} else {
			let bounds = renderer.view.getBoundingClientRect();
			game.m_curpos  = [e.clientX-bounds.left-(game.width>>>1), -(e.clientY-bounds.top-(game.height>>>1))];
		}
	});

	/*    - Mouse Buttons -
	Left Mouse   : game.keys.m0
	Middle Mouse : game.keys.m1
	Right Mouse  : game.keys.m2  */
	window.addEventListener('mouseup', function(e) {
		var keyCode = 'm'+e.button;
		game.keys[keyCode] |= 0x8;        // Set key-release bit
		game.keys[keyCode] &= 0xFFFFFFFE; // Unset key-down bit
	});
	window.addEventListener('mousedown', function(e) {
		handleKeyEvent(e, true);
	});
}

// Add touches to engine events
window.addEventListener('touchstart', function(e) {
	e.button=0;
	handleKeyEvent(e, true);
	// Update cursor pos on touch start
	let bounds = renderer.view.getBoundingClientRect();
	game.m_curpos  = [(game.width/window.innerWidth)*e.touches[0].clientX-(game.width>>>1), -((game.height/window.innerHeight)*e.touches[0].clientY-(game.height>>>1))];
});
window.addEventListener('touchend', function(e) {
	game.keys.m0 |= 0x8;
	game.keys.m0 &= 0xFFFFFFFE;
});
window.addEventListener('touchmove', function(e) {
	let bounds = renderer.view.getBoundingClientRect();
	game.m_curpos  = [(game.width/window.innerWidth)*e.touches[0].clientX-(game.width>>>1), -((game.height/window.innerHeight)*e.touches[0].clientY-(game.height>>>1))];
});


/* Viewport Events */
window.onresize = (function(e) {
	//game.width  = window.innerWidth*window.devicePixelRatio;
	//game.height = window.innerHeight*window.devicePixelRatio;
	game.win = {
		'tl': [-(game.width>>>1),game.height>>>1],
		'bl': [-(game.width>>>1),-(game.height>>>1)],
		'tr': [game.width>>>1,game.height>>>1],
		'br': [game.width>>>1,-(game.height>>>1)],
		'mid':[0,0]
	};
	renderer.resize(game.width, game.height);
	
	// (NEW) Dispatch Resize Calls
	for(var i in game.ents) {
        var ent = game.ents[i];
		if (ent.onViewResize) {
       		ent.onViewResize();
		}
    }
})();
document.oncontextmenu = function(e) {e.preventDefault();};



  /////////////////////////
 //  Entities Factories //
/////////////////////////

/*         Skeleton Entity        */
function SkeletonEntity() {
	var obj = {};
	
	obj.onThink = (function() {
		// Run each tick
	}).bind(obj);
	
	obj.onViewResize = (function() {
		// Run when canvas is resized
	}).bind(obj);
	return obj;
}

function CreateOutlinedRect(obj, x, y, w, h, color, alpha) {
	obj.beginFill(color, alpha);
	obj.drawRect(x, y, 1, h+1);
	obj.drawRect(x+w, y, 1, h+1);
	obj.drawRect(x, y, w+1, 1);
	obj.drawRect(x, y+h, w+1, 1);
	obj.endFill();
}

function QuadPointsFromRectWH(x, y, w, h) {
	// [TopLeft, BottomLeft, BottomRight, TopRight]
	return [[x,y], [x,y+h], [x+w,y+h], [x+w,y]];
}

window.Create_Text = (function(){
	var pcon = new PIXI.Container();
	var init = false;
	return function(font, x, y, color, alpha) {
		if(!init){
			stage.addChild(pcon);
			init = true;
		}
		var obj = {
			_x: x,
			_y: y,
			font : font,
			color: typeof color==='undefined'?0xFFFFFF:color,
			alpha: typeof alpha==='undefined'?1:alpha,
			sprites: []
		};
		Object.defineProperty(obj, 'x', {
			set: function(value) {
				let diff = value - obj._x;
				obj._x=value;
				for(var spr of obj.sprites) {
					spr.x += diff;
				}
			},
			configurable: true
		});
		Object.defineProperty(obj, 'y', {
			set: function(value) {
				let diff = value - obj._y;
				obj._y=value;
				for(var spr of obj.sprites) {
					spr.y += diff;
				}
			},
			configurable: true
		});
		Object.defineProperty(obj, 'text', {
			set: function(newtxt) {
				if(newtxt!==obj._text) { 
					obj.xpos = 0;
					obj.ypos = 0;
					obj._text = newtxt;
					obj.updateText();
				}
			},
			configurable: true
		});
		obj.updateText = function() {
			var i;
			while(i=obj.sprites.pop()) {
				pcon.removeChild(i);
			}
			for(i = 0; i<obj._text.length; i++) {
				var chr = obj._text.charCodeAt(i);
				if (chr===10) {  // handle newline
					obj.xpos = 0;
					obj.ypos += (obj.lineHeight||obj.font.lineHeight);
				} else if ((chr===32)&&obj.font.glyph[chr]) { // skip rendering spaces
					var glyph = obj.font.glyph[chr];
					obj.xpos+=glyph.xadd;
				} else if (obj.font.glyph[chr]) { // everything else
					var glyph = obj.font.glyph[chr];
					var spr = PIXI.Sprite.from(glyph.tex);
					spr.tint = obj.color;
					spr.alpha = obj.alpha;
					spr.x = obj._x+glyph.xoff+obj.xpos-1;
					spr.y = obj._y+glyph.yoff+obj.ypos;
					obj.sprites.push(spr);
					pcon.addChild(spr);
					obj.xpos+=glyph.xadd;
				}
			}
			pcon.setTransform(0, 0, 1, -1);
		};
		obj.remove = function() {
			var spr;
			while(spr=obj.sprites.pop()) {
				pcon.removeChild(spr);
			}
		}
		return obj;
	}
})();


// Attempt to clean up temporary entities
// Also clean up all players first
function Cleanup_Entities() {
	for(var k in game.ents) {
		if(game.ents[k].remove) {
			// Entity should clean up its own game.ents index when remove is called

			// It's important not to forcably remove from game.ents in case 
			// to do a cleanup for some reason after its removal is signaled
			game.ents[k].remove();
		}
	}
	// Remove player data structures
	for(var k in game.clients) {
		delete game.clients[k];
		FireEvent('player_leave',{userId: k});
	}
	game.async = {};
}

function Create_Edges() {
		// Create an infinite plane for boundaries
		let bottom = new p2.Body({
			position:[0,-(game.height>>>1)+12],
			mass: 0 // Setting mass to 0 makes it static
		});
		var botShape = new p2.Plane();
		bottom.addShape(botShape);
		bottom.classname = "world";
		game.phys.world.addBody(bottom);

		let top = new p2.Body({
			position:[0,(game.height>>>1)-12],
			mass: 0,
			angle: Math.PI
		});
		var topShape = new p2.Plane();
		top.addShape(topShape);
		top.classname = "world";
		game.phys.world.addBody(top);

		
		let left = new p2.Body({
			position:[-(game.width>>>1),0],
			mass: 0,
			angle: (Math.PI/2)*3
		});
		var leftShape = new p2.Plane();
		left.addShape(leftShape);
		left.classname = "world";
		game.phys.world.addBody(left);

		
		let right = new p2.Body({
			position:[(game.width>>>1),0],
			mass: 0,
			angle: Math.PI/2
		});
		var rightShape = new p2.Plane();
		right.addShape(rightShape);
		right.classname = "world";
		game.phys.world.addBody(right);

		let walls = new PIXI.Container();
		for(let i = 0; i<20; i++) {
			let wall = PIXI.Sprite.fromImage('resources/textures/misc/gray_cobble_bricks.png');
			wall.setTransform(0,0,1,-1);
			wall.position.y = (game.height>>>1)+48;
			wall.position.x = -(game.width>>>1)+64*i;
			wall.rotation = Math.PI*2;
			walls.addChild(wall);
		}

		for(let i = 0; i<20; i++) {
			let wall = PIXI.Sprite.fromImage('resources/textures/misc/gray_cobble_bricks.png');
			wall.setTransform(0,0,1,-1);
			wall.position.y = -(game.height>>>1)+12;
			wall.position.x = -(game.width>>>1)+64*i;
			wall.rotation = Math.PI*2;
			walls.addChild(wall);
		}
		stage.addChild(walls);
}

function Create_Background() {
	{
		let obj = {};
		obj.gfx = new PIXI.Graphics();
		obj.gfx.beginFill(0x2d3e52, 1);
		obj.gfx.drawRect(game.win.bl[0],game.win.bl[1],game.width,game.height);

		let grid = PIXI.Texture.fromImage('resources/textures/misc/grid.png');
		var tilingSprite = new PIXI.extras.TilingSprite(grid, 1280, 720);
		tilingSprite.alpha = .7;
		tilingSprite.position.x = game.win.bl[0]-1;
		tilingSprite.position.y = game.win.bl[1];

		stage.addChild(obj.gfx);
		stage.addChild(tilingSprite);		
	}
}

function Create_CollisionHandler() {
	game.phys.world.on('beginContact', function(e) {
		// World bumped
		if(e.bodyA.classname==="world") {
			var interp_frames = 7;
			var velx = e.bodyB.velocity[0], vely = e.bodyB.velocity[1];
			var bumpx = (velx/175)*e.bodyB.mass;
			var bumpy = (vely/175)*e.bodyB.mass;
			stage.position.x += bumpx;
			stage.position.y -= bumpy;
			Schedule(function() {
					stage.position.x -= bumpx/interp_frames;
					stage.position.y += bumpy/interp_frames;
			},[2,3,4,5,6,7,8]);
		} 
		// Call collision handlers
		if(e.bodyA.onCollide) e.bodyA.onCollide(e.bodyB, e);
		if(e.bodyB.onCollide) e.bodyB.onCollide(e.bodyA, e);
	});
}

window.StartPlayer = function(guid, local, x , y) {
	var obj = {};
	obj.type = "player";
	obj.sprites = {};
	obj.hp = 3;
	obj.no_sword = false;
	obj.vec = new Float32Array(2);

	// flag indicating whether to accept location packets
	// an experiment to reduce noticable latency by ignoring 'wrong position updates' until opponent acknowledges the hit
	obj.update = true; 

	// Create 'Player' Sprite (Circle representing the player)
	obj.gfx = new PIXI.Graphics();
	obj.gfx.beginFill(0x000000, 1);
	obj.gfx.drawCircle(0, 0, 17);
	obj.gfx.beginFill(0xCCCCCC, 1);
	obj.gfx.drawCircle(0, 0, 16);
	obj.gfx.endFill();
	obj.gfx.lineStyle(2, 0xFF0000, 1);
	obj.gfx.moveTo(0, 0);
	obj.gfx.lineTo(0,15);
	stage.addChild(obj.gfx);

	// Add 'Player' physics object
	let playerBodyShape = new p2.Circle({ radius:16 });
	obj.playerBody = new p2.Body({
		mass:5,
		position:[x+(0),y+(-54)],
	});
	obj.playerBody.classname = 'ent_player';
	obj.playerBody.parent = obj;
	game.ply_obj = obj.playerBody;
	obj.playerBody.onCollide = function(ent, vars) {
		// Sheild is up, blast enemy away
		if(obj.sprites.dash_shield.visible) {
			// Do shield hit logic

		}
		else if((ent.classname==="ent_bug")&&!obj.invuln) {
			if ("vibrate" in navigator) {
				navigator.vibrate(50);
			}
			obj.invuln = true;
			Schedule(function(){obj.invuln = false;}, 30);
			game.snd.player_hit._volume = .6;
			game.snd.player_hit.play();
			if(obj.hp) obj.hp--;
			else {
				game.snd.death.play();
				SparkRing(obj.playerBody.position[0], obj.playerBody.position[1]);
				obj.remove();
				game.var.game_over_text = Create_Text(game.fonts.fr48, -78, -24, 0x000000);
				game.var.game_over_text.text = "Game Over";
			}
		}
		else if(ent.classname==="ent_sword" && obj.no_sword) {
			obj.swordBody.angle = obj.playerBody.angle;
			obj.playerBody.toWorldFrame(obj.vec, [-.5,0]);
			obj.swordBody.position = obj.vec;
			game.phys.world.addConstraint(obj.swordAttach);
			obj.no_sword = false;
			obj.firetrail.remove();
		}
	};

	obj.playerBody.addShape(playerBodyShape);
	game.phys.world.addBody(obj.playerBody);

	// Create sword physics object
	let swordShape = new p2.Box({ width: 6, height: 102 });
	obj.swordBody = new p2.Body({
		mass:1,
		position:[x+(-.5),y+(0)],
	});
	obj.swordBody.addShape(swordShape);
	obj.swordBody.classname = "ent_sword";
	obj.swordBody.parent = obj;
	game.phys.world.addBody(obj.swordBody);

	//Attach sword to player
	obj.swordAttach = new p2.LockConstraint(obj.playerBody, obj.swordBody, {collideConnected : false});
	obj.swordAttach.setRelaxation(1);
	game.phys.world.addConstraint(obj.swordAttach);
	
	// Create sword sprite and container to normalize location to match physics coordinates
	game.textures.swordtex._frame = new PIXI.Rectangle(0, 0, 29, 157);
	let swordspr = PIXI.Sprite.from(game.textures.swordtex);
	swordspr.setTransform(-9, 51, .65, -.65);
	obj.sword = new PIXI.Container();
	obj.sword.addChild(swordspr);
	stage.addChild(obj.sword);

	obj.sprites.hp = PIXI.Sprite.from(game.textures.hp[3]);
	obj.sprites.hp.alpha = .75;
	obj.lasthp = 3;
	obj.sprites.hp.setTransform(0, 0, 1, -1);
	stage.addChild(obj.sprites.hp);

	// Dash shield sprite
	obj.sprites.dash_shield = PIXI.Sprite.from(game.textures.gradient);
	stage.addChild(obj.sprites.dash_shield);

	// Space for fire location
	obj.firepos  = new Float32Array(2)
	
	// Update location and take input
	obj.onThink = (function() {
		obj.swordBody.toWorldFrame(obj.firepos, [0,-42]);
		if(obj.firetrail) {
			obj.firetrail.x = obj.firepos[0];
			obj.firetrail.y = obj.firepos[1];
		}
		
		obj.sprites.dash_shield.tint = ((game.tick&1)*0x2F3AF3F);

		if(obj.hp!=obj.lasthp) {
			stage.removeChild(obj.sprites.hp);
			obj.sprites.hp.texture = game.textures.hp[obj.hp];
			stage.addChild(obj.sprites.hp);
			obj.lasthp = obj.hp;
		}

		obj.sprites.hp.position.x = obj.playerBody.position[0]-28;
		obj.sprites.hp.position.y = obj.playerBody.position[1]+28;

		obj.sprites.dash_shield.x = obj.playerBody.position[0]-33;
		obj.sprites.dash_shield.y = obj.playerBody.position[1]-33;

		obj.sword.position.x = obj.swordBody.position[0];
		obj.sword.position.y = obj.swordBody.position[1];
		obj.sword.rotation = obj.swordBody.angle;


		obj.gfx.rotation = obj.playerBody.angle;
		obj.gfx.position.x = obj.playerBody.position[0];
		obj.gfx.position.y = obj.playerBody.position[1];
		
		if(local) {
			var wasd_down = game.keys.w&1 || game.keys.a&1 || game.keys.s&1 || game.keys.d&1;
			if(wasd_down||((game.keys.m0&1) && !(game.keys.m0&2)) ) {
				// Don't register on first tick after mouse press to avoid input jumps from touch screen devices
				if(game.m_dy||game.m_dx||wasd_down) {
					var IN_SPEED  = 350; // Max input speed
					var IN_MAX_SPEED = 350 + 200*obj.no_sword;
					var TOP_POWER_DISTANCE = 65; // How far cursor must move for inputFactor of 1
					
					var inputAngle  = Math.atan2(game.m_dy, game.m_dx);
					var inputFactor = Math.min(Math.sqrt(game.m_dx*game.m_dx + game.m_dy*game.m_dy)/TOP_POWER_DISTANCE, 1);

					var xIn = (IN_SPEED*Math.cos(inputAngle)) * inputFactor; 
					var yIn = (IN_SPEED*Math.sin(inputAngle)) * inputFactor;

					var xNew = obj.playerBody.velocity[0] + xIn;
					var yNew = obj.playerBody.velocity[1] + yIn;
					var newSpeed = Math.sqrt(xNew*xNew + yNew*yNew);
					
					if(newSpeed>IN_MAX_SPEED) {
						var slowFactor = IN_MAX_SPEED/newSpeed;

						obj.playerBody.velocity[0] = xNew*slowFactor;
						obj.playerBody.velocity[1] = yNew*slowFactor;
					} else {
						obj.playerBody.velocity[0] = xNew;
						obj.playerBody.velocity[1] = yNew;
					}
				}
			}
			if(game.keys.m0===7 && !obj.no_sword) {
				game.phys.world.removeConstraint(obj.swordAttach);
				Schedule(function(){obj.no_sword = true;}, 4);
				obj.firetrail = FireParticle(obj.swordBody.position[0], obj.swordBody.position[1], .85);
			}
		}
		var MAX_SPEED = 650;
		var curSpeed  = Math.sqrt(obj.playerBody.velocity[0]*obj.playerBody.velocity[0]+obj.playerBody.velocity[1]*obj.playerBody.velocity[1]);
		if(curSpeed > MAX_SPEED) {
			var slowFactor = MAX_SPEED/curSpeed;
			obj.playerBody.velocity[0] *= slowFactor;
			obj.playerBody.velocity[1] *= slowFactor;
		}
		if((curSpeed > 360)&&!obj.no_sword) {
			obj.sprites.dash_shield.visible = true;
		} else {
			obj.sprites.dash_shield.visible = false;
		}

	});

	// Player destructor (free everything)
	obj.remove = function() {
		delete game.ents[obj.guid];
		obj.gfx.destroy();
		obj.sword.destroy({children:true});
		obj.sprites.hp.destroy();
		game.phys.world.removeConstraint(obj.swordAttach);
		game.phys.world.removeBody(obj.playerBody);
		game.phys.world.removeBody(obj.swordBody);
	}

	AddEntity(obj, guid);
	return obj;
}


window.CreateBug = (function(){
var cont = new PIXI.ParticleContainer(15000, {position: true, scale:true, uvs: true}, 15000);
var init = false;
return function(x, y, mode) {
	game.var.bug_spawns++;
	/*
		BUG AI NOTES:
		  * Bug AI will have multiple modes defined by a numerical value
			The modes are listed as follows and define the behavior of the entity at any given time.
			Special modes may also be defined for boss-type entities or enchanted enemies who have picked up an upgrade
		
		Normal Modes:
		0 - AI does nothing
		1 - AI is attracted to the player's approximate position
		2 - AI is attracted to a randomly chosen destination, and after arriving, picks another
		3 - AI is not attracted to anything and moves randomly
		4 - AI has survival instincts and avoids player, is slightly more agile than other modes
		5 - AI is attracted to the approximate position of another bug or entity, but not the player

		Mode Ideas:
		106 - Inverse distance/velocity relationship; seeking player.  Getting close creates very fast seekers
	*/ 
	if(!init) {
		stage.addChild(cont);
		init = true;
	}
	var obj = {
		type: 'bug',
		sprites: {},
		seq: ((Math.random()*2)|0),
		mode: mode,
		hp: 2,
		color_offset: 0,
		vec: new Float32Array(2), // to prevent repeat allocs
		dest: new Float32Array(2),
		healer: (((game.var.bug_spawns%30)===0)&&game.var.bug_spawns)>0
	};
	obj.scale = 1.25+Math.random()*.5;
	if (obj.healer) {
		obj.color_offset = 6;
		obj.hp = 1;
		obj.mode = 4;
	}
	
	let bugShape = new p2.Box({ width: 13*obj.scale, height: 8*obj.scale });
	obj.bugBody = new p2.Body({
		mass: .05*obj.scale,
		position:[x,y],
		fixedRotation: true
	});
	obj.bugBody.addShape(bugShape);
	obj.bugBody.classname = 'ent_bug';
	obj.bugBody.parent = obj;
	obj.bugBody.onCollide = function(ent, vars) {
		if(ent.classname === "ent_sword") {		
			if(obj.healer) {
				game.snd.heal._volume = .7;
				game.snd.heal.play();
				Schedule(function(){obj.remove()}, 1);
				ent.parent.hp = 3;
			}
			else if(obj&&!obj.invuln) {
				obj.invuln = true;
				// Invincibile for 15 ticks after being damaged
				Schedule(function(){obj.invuln = false;}, 15);
				if(obj.hp===2) {
					// Stunned after hit
					game.snd.ouch.play();
					obj.color_offset = 4;
					obj.mode = 0;

					Schedule(function(){
						// If no kill in 3 seconds of first hit, switch to mode 1
						obj.color_offset = 2;
						obj.mode = 1;
					},60*3);
				}
				else if(obj.hp===1) {
					game.snd.bug_pop._volume = .4;
					game.snd.bug_pop.play();
					if(ent===vars.bodyA) ent.getVelocityAtPoint(obj.vec, vars.contactEquations[0].contactPointA);
					else if(ent===vars.bodyB) ent.getVelocityAtPoint(obj.vec, vars.contactEquations[0].contactPointB);
					Fragments(obj.bugBody.position[0], obj.bugBody.position[1], obj.vec, obj.scale);
					Schedule(function(){obj.remove()}, 1);
				}
				obj.hp--;
			}
		}
	}
	game.phys.world.addBody(obj.bugBody);

	obj.sprites.bug = PIXI.Sprite.from(game.textures.bugs[0]);
	cont.addChild(obj.sprites.bug);
	obj.sprites.bug.setTransform((-13/2)*obj.scale-3+obj.bugBody.position[0], (-8/2)*obj.scale-3+obj.bugBody.position[1], obj.scale, obj.scale);

	if(obj.mode===2) {
		obj.dest[0] = (Math.random()-.5)*(game.width>>>1);
		obj.dest[1] = (Math.random()-.5)*(game.height>>>1);
	} 
	else if (obj.mode===5) {
		for(let ent of Object.values(game.ents)) {
			if((ent.type==="bug")&&(ent!=obj)) {
				obj.dest[0] = ent.bugBody.position[0];
				obj.dest[1] = ent.bugBody.position[1];
				break;
			}
		}
	}
	
	obj.onThink = function() {
		// Animate
		if(!(game.tick%3)) obj.seq = (obj.seq+1)%2;
		obj.sprites.bug.texture = game.textures.bugs[obj.color_offset+obj.seq];
		
		// Update texture position
		obj.sprites.bug.position.x = (-13/2)*obj.scale-3+obj.bugBody.position[0];
		obj.sprites.bug.position.y = (-8/2)*obj.scale-3+obj.bugBody.position[1];

		// Setup some physics vars
		let plpos    = game.ents[game.player.pl_guid]?game.ents[game.player.pl_guid].playerBody.position:[0,0];
		let bugpos   = obj.bugBody.position; 
		let bugspeed = Math.sqrt(obj.bugBody.velocity[0]*obj.bugBody.velocity[0]+obj.bugBody.velocity[1]*obj.bugBody.velocity[1]);

		// Perform actions
		if(obj.mode===1) {
			// Add some some deviation to the route
			obj.vec[0] = (Math.random()-.5)*1500+plpos[0]-bugpos[0];
			obj.vec[1] = (Math.random()-.5)*1500+plpos[1]-bugpos[1];
			let mag = Math.sqrt(obj.vec[0]*obj.vec[0]+obj.vec[1]*obj.vec[1]);
			obj.vec[0]/=mag;
			obj.vec[1]/=mag;

			let isDecelerating = obj.last_speed>bugspeed;
			if(isDecelerating) {
				obj.vec[0]*=500;
				obj.vec[1]*=500;
			} else {
				obj.vec[0]*=125;
				obj.vec[1]*=125;
			}
			obj.bugBody.applyForce(obj.vec);
		}
		else if (obj.mode===2) {
			obj.vec[0] = (Math.random()-.5)*100+obj.dest[0]-bugpos[0];
			obj.vec[1] = (Math.random()-.5)*100+obj.dest[1]-bugpos[1];
			let mag = Math.sqrt(obj.vec[0]*obj.vec[0]+obj.vec[1]*obj.vec[1]);
			obj.vec[0]/=mag;
			obj.vec[1]/=mag;

			let isDecelerating = obj.last_speed>bugspeed;
			if(isDecelerating) {
				obj.vec[0]*=200;
				obj.vec[1]*=200;
			} else {
				obj.vec[0]*=125;
				obj.vec[1]*=125;
			}
			obj.bugBody.applyForce(obj.vec);

			let target_distance = Math.sqrt((bugpos[0]-obj.dest[0])*(bugpos[0]-obj.dest[0]) + (bugpos[1]-obj.dest[1])*(bugpos[1]-obj.dest[1]));
			if(target_distance<25) {
				obj.dest[0] = (Math.random()-.5)*(game.width>>>1);
				obj.dest[1] = (Math.random()-.5)*(game.height>>>1);
			}
		}
		else if (obj.mode===3) {
			obj.vec[0] = (Math.random()-.5)*400;
			obj.vec[1] = (Math.random()-.5)*400;
			obj.bugBody.applyForce(obj.vec);
		}
		else if (obj.mode===4) {
			let target_distance = Math.sqrt((bugpos[0]-plpos[0])*(bugpos[0]-plpos[0]) + (bugpos[1]-plpos[1])*(bugpos[1]-plpos[1]));
			obj.vec[0] = (Math.random()-.5)*4000*(80/target_distance);
			obj.vec[1] = (Math.random()-.5)*4000*(80/target_distance);
			obj.bugBody.applyForce(obj.vec);
		}
		else if (obj.mode===5) {
			obj.vec[0] = (Math.random()-.5)*600+obj.dest[0]-bugpos[0];
			obj.vec[1] = (Math.random()-.5)*600+obj.dest[1]-bugpos[1];
			let mag = Math.sqrt(obj.vec[0]*obj.vec[0]+obj.vec[1]*obj.vec[1]);
			obj.vec[0]/=mag;
			obj.vec[1]/=mag;

			let isDecelerating = obj.last_speed>bugspeed;
			if(isDecelerating) {
				obj.vec[0]*=150;
				obj.vec[1]*=150;
			} else {
				obj.vec[0]*=75;
				obj.vec[1]*=75;
			}
			obj.bugBody.applyForce(obj.vec);

			let target_distance = Math.sqrt((bugpos[0]-obj.dest[0])*(bugpos[0]-obj.dest[0]) + (bugpos[1]-obj.dest[1])*(bugpos[1]-obj.dest[1]));
			if(target_distance<25) {
				for(let ent of Object.values(game.ents)) {
					if((ent.type==="bug")&&(ent!=obj)) {
						obj.dest[0] = ent.bugBody.position[0];
						obj.dest[1] = ent.bugBody.position[1];
						break;
					}
				}
			}
		}
		
		obj.last_speed = bugspeed;
	};

	obj.remove = function() {
		cont.removeChild(obj.sprites.bug);
		game.phys.world.removeBody(obj.bugBody);
		game.var.bugs--;
		delete game.ents[obj.guid];
		game.var.score+=300;
	};

	AddEntity(obj);
}
})();

function Random_Safe_EnemyLocation() {
	var plpos = [game.ply_obj.position[0], game.ply_obj.position[1]];

	var randx, randy, pl_dist;
	do {
		randx = (Math.random()-.5)*(game.width-40);
		randy = (Math.random()-.5)*(game.height-40);
		pl_dist = Math.sqrt((plpos[0]-randx)*(plpos[0]-randx) + (plpos[1]-randy)*(plpos[1]-randy));
	} while(pl_dist<300);
	return [randx, randy];
}

function Create_MainLogic() {
	var obj = {
		type: "logic",
		score_text:  Create_Text(game.fonts.ui, 20-(game.width>>>1), -40+(game.height>>>1), 0x77FF7F),
		digits_text: Create_Text(game.fonts.ui, 60-(game.width>>>1), -40+(game.height>>>1), 0xFFFFFF),
		phase_text:  Create_Text(game.fonts.ui, 20-(game.width>>>1), -54+(game.height>>>1), 0xFFF77F),
		phase_num:   Create_Text(game.fonts.ui, 60-(game.width>>>1), -54+(game.height>>>1), 0xFFFFFF),
	};
	game.var.bug_spawns = 0	
	game.var.score      = 0;
	game.var.bugs       = 0; // Init bug count
	game.var.phase      = 0;
	var init = false;

	obj.onThink = function() {
		if(!init) {
			obj.phase_text.text = "Phase:";
			obj.score_text.text = "Score:";
			obj.digits_text.text = "0";
			init = true;
		}

		if(game.var.bugs===0) {
			game.var.phase++;
			let spawn_count = game.var.phase*game.var.phase;
			for(let i = spawn_count; i; i--) {
				game.var.score+=spawn_count*game.var.phase;
				game.var.bugs++;
				
				Schedule(function() {
					var rand_loc = Random_Safe_EnemyLocation();
					CreateBug(rand_loc[0], rand_loc[1], /*((Math.random()*5)|0)+1*/3);
				}, (Math.random()*60*3*game.var.phase)|0);
			}
		}
		
		obj.digits_text.text = game.var.score.toString().toLocaleString();
		obj.phase_num.text = game.var.phase.toString();

		if(!game.ents[game.player.pl_guid]) {
			if(game.keys.m0&0b100) {
				Cleanup_Entities();
				game.var.bug_spawns = 0;
				game.var.score      = 0;
				game.var.bugs       = 0;
				game.var.phase      = 0;
				StartPlayer(game.player.pl_guid, true, 640*(Math.random()-.5), 360*(Math.random()-.5));
				game.var.game_over_text.remove();
			}
		}
	};

	AddEntity(obj);
}

var FireParticle = (function(){
	var cont = new PIXI.ParticleContainer(15000, {position: true, scale:true, alpha: true}, 15000);
	cont.blendMode = PIXI.BLEND_MODES.ADD;
	var init = false;
	return function(x, y, scale) {
		if(!init) {
			stage.addChild(cont);
			init = true;
		}
		var spr, i; // Optimization: Define tmp var spr 
		var obj = {};
		obj.sprites = [];
		obj.x = x;
		obj.y = y;
		obj.sprnum = 0;
		obj.sprkill= 0;
		obj.kill = false;
		obj.onThink = function() {
			// Create fire sprites
			if((obj.sprnum<90)&&!obj.kill) {
				for(i=0; i<2; i++) {
					spr = PIXI.Sprite.from(game.textures.fire);
					spr.anchor.set(0.5, 0.5);
					spr.frame = 0;
					obj.sprites.push(spr);
					cont.addChild(spr);
					spr.sz = Math.random()*.09+.06;
					spr.x = obj.x +( (Math.random()-.5)*15)*scale;
					spr.y = obj.y+( (Math.random()-.5)*15)*scale;
					spr.rot = Math.random()*(2*Math.PI);
					spr.setTransform(spr.x, spr.y, spr.sz*scale, spr.sz*scale, spr.rot);
					obj.sprnum++;
				}
			}
			for(i=0; i<obj.sprnum; i++) {
				spr = obj.sprites[i];
				if (!spr) continue;
				// Respawn after 60 frames
				if(spr.frame===45){
					spr.sz = Math.random()*.09+.06;
					spr.rot = Math.random()*(2*Math.PI);
					spr.x = obj.x +( (Math.random()-.5)*15)*scale;
					spr.y = obj.y+( (Math.random()-.5)*15)*scale;
					spr.setTransform(spr.x, spr.y, spr.sz*scale, spr.sz*scale, spr.rot);
					spr.frame = 0;
					// Remove self if flagged for kill
					if(obj.kill) {
						cont.removeChild(spr);
						obj.sprites[i] = null;
						obj.sprkill++;
						if(obj.sprnum===obj.sprkill) {
							delete game.ents[obj.guid];
						}
					}
				}
				spr.frame++;
				spr.sz-= 0.0024;
				spr.alpha = 1-0.02*spr.frame;
				spr.setTransform(spr.x, spr.y, spr.sz*scale, spr.sz*scale, spr.rot);
			}
		}
		obj.remove = function() {
			obj.kill = true;
		}
		AddEntity(obj);
		return obj;
	}
})();

function BloodParticle(x, y, scale) {
	var spr, i; // Optimization: Define tmp var spr 
	var obj = {};
	obj.sprites = [];
	obj.cont = new PIXI.ParticleContainer(90, {position: true, scale:true, alpha: true}, 90);
	//obj.cont.blendMode = PIXI.BLEND_MODES.ADD;
	obj.x = x;
	obj.y = y;
	obj.sprnum = 0;
	stage.addChild(obj.cont);
	if(!game.textures.blood) {
		game.textures.blood = PIXI.Texture.fromImage("resources\\textures\\particles\\blood\\bloodmist.png");
	}
	obj.onThink = function() {
		// Create fire sprites
		if(obj.sprnum<90) {
			for(i=0; i<2; i++) {
				spr = PIXI.Sprite.from(game.textures.blood);
				spr.anchor.set(0.5, 0.5);
				spr.frame = 0;
				obj.sprites.push(spr);
				obj.cont.addChild(spr);
				spr.sz = Math.random()*.09+.56;
				spr.x = obj.x +( (Math.random()-.5)*15)*scale;
				spr.y = obj.y+( (Math.random()-.5)*15)*scale;
				spr.rot = Math.random()*(2*Math.PI);
				spr.setTransform(spr.x, spr.y, spr.sz*scale, spr.sz*scale, spr.rot);
				obj.sprnum++;
			}
		}
		for(i=0; i<obj.sprnum; i++) {
			spr = obj.sprites[i];
			// Respawn after 60 frames
			if(spr.frame===45){
				spr.sz = Math.random()*.09+.56;
				spr.rot = Math.random()*(2*Math.PI);
				spr.x = obj.x +( (Math.random()-.5)*15)*scale;
				spr.y = obj.y+( (Math.random()-.5)*15)*scale;
				spr.setTransform(spr.x, spr.y, spr.sz*scale, spr.sz*scale, spr.rot);
				spr.frame = 0;
			}
			spr.frame++;
			spr.sz-= 0.0024;
			spr.alpha = 1-0.02*spr.frame;
			spr.setTransform(spr.x, spr.y, spr.sz*scale, spr.sz*scale, spr.rot);
		}
	}
	obj.remove = function() {
		delete game.ents[obj.guid];
		obj.cont.destroy({children:true});
	}
	AddEntity(obj);
	return obj;
}

function SparkRing(x, y) {
	var NUM_PARTICLES = 150; // Number of particles
	var spr, i;
	var obj = {};
	obj.sprites = [];
	obj.cont = new PIXI.ParticleContainer(15000, {position: true}, 15000);
	obj.cont.position.x = x;
	obj.cont.position.y = y;
	obj.cont.position.rotation = -Math.PI/2;
	obj.frame = 0;
	stage.addChild(obj.cont);
	for(i=0; i<NUM_PARTICLES; i++) {
		spr = PIXI.Sprite.from(game.textures.hardspark);
		spr.anchor.set(0.5, 0.5);
		obj.sprites.push(spr);
		obj.cont.addChild(spr);
		spr.sz = .125;
		let rnd = Math.random()*(Math.PI*2);
		spr.x = 32*Math.cos(rnd);
		spr.y = 32*Math.sin(rnd);
		spr.velx = 5*Math.random()*Math.cos(rnd);
		spr.vely = 5*Math.random()*Math.sin(rnd);
		spr.rot = Math.atan(spr.vely/spr.velx)-Math.PI/2;
		spr.setTransform(spr.x, spr.y, -spr.sz, spr.sz, spr.rot);
	}
	obj.onThink = function() {
		obj.frame++;
		for(i=0; i<NUM_PARTICLES; i++) {
			spr = obj.sprites[i];
			//spr.vely-=.025;
			spr.y+=spr.vely;
			spr.x+=spr.velx;
			spr.rot = Math.atan(spr.vely/spr.velx)-Math.PI/2;
			spr.setTransform(spr.x, spr.y, -spr.sz, spr.sz, spr.rot);
		}
		if(obj.frame==400) {
			for(i=0; i<NUM_PARTICLES; i++) {
				spr = obj.sprites[i];
			}
			delete game.ents[obj.guid];
			obj.cont.destroy({children:true});
		}
	}
	AddEntity(obj);
}

// non-persistent spark effect
var Fragments = (function(){
	var cont = new PIXI.ParticleContainer(15000, {position: true}, 15000);
	cont.position.rotation = -Math.PI/2;
	var init = false;
	return function Fragments(x, y, ivel, scale) {
		if(!init) {
			init = true;
			stage.addChild(cont);
		}
		var NUM_PARTICLES = 3; // Number of particles
		var spr, i;
		var obj = {};
		obj.sprites = [];
		obj.frame = 0;
		for(i=0; i<NUM_PARTICLES; i++) {
			spr = PIXI.Sprite.from(game.textures.thickgradient);
			spr.anchor.set(0.5, 0.5);
			obj.sprites.push(spr);
			cont.addChild(spr);
			spr.sz = .05*scale;
			//spr.filters = [Filter_GlowRed];
			let rand_off = Math.random();
			spr.x = x+(Math.random()-.5)*4;
			spr.y = y+(Math.random()-.5)*4;
			spr.x += (ivel[0]*rand_off)*.03;
			spr.y += (ivel[1]*rand_off)*.03;
			let rand_speed = Math.random()*.1+.9;
			spr.velx = (Math.random()-.5)+(ivel[0]*rand_speed)/100;
			spr.vely = (Math.random()-.5)+(ivel[1]*rand_speed)/100;
			spr.rot = Math.atan(spr.vely/spr.velx)-Math.PI/2;
			spr.setTransform(spr.x, spr.y, -spr.sz, spr.sz, spr.rot);
		}
		obj.onThink = function() {
			obj.frame++;
			for(i=0; i<NUM_PARTICLES; i++) {
				spr = obj.sprites[i];
				spr.y+=spr.vely;
				spr.x+=spr.velx;
				spr.rot = Math.atan(spr.vely/spr.velx)-Math.PI/2;
				spr.setTransform(spr.x, spr.y, -spr.sz, spr.sz, spr.rot);
			}
			if(obj.frame==400) {
				while(spr=obj.sprites.pop()) {
					cont.removeChild(spr);
				}
				delete game.ents[obj.guid];
			}
		}
		AddEntity(obj);
	}
})();


  /////////////////////////////////
 // Init Function and Tick-Loop //
/////////////////////////////////
var click = new PIXI.Graphics();

var fixedTimeStep = 1/200;
var lastTickTime = 0;
function PreTick() {
	if(!game.deviceHz) {
		requestAnimationFrame(PreTick); 
		game.tick++;
	}
}
function Tick() {
	// Use animation frames for 60Hz screens
	if(game.deviceHz<=60 && !game.paused) {
		requestAnimationFrame(Tick); 
	} 

	// Execute async callbacks
	if(game.async[game.tick]) {
		for(var v of game.async[game.tick])
			v();
		delete game.async[game.tick];
	}

	if(!document.hidden) {
		game.tick++;
		game.m_dx = game.m_curpos[0]-game.m_lastpos[0];
		game.m_dy = game.m_curpos[1]-game.m_lastpos[1];
		// Think/Physics/Render
		for(var i in game.ents) {
			var ent = game.ents[i];
			if (ent.onThink) {
				ent.onThink();
			}
		}
	}

	var old_game_time = game.time;
	game.time = Date.now();
	var tdelta = (game.time-old_game_time)/1000;
	game.game_clock-=tdelta;

	if(!document.hidden) {
		game.phys.world.step(fixedTimeStep, tdelta);
		renderer.render(stage);

		/* NOT HANDLING INPUT FLAGS LAST WILL BREAK KEY-RELEASE DETECTION */
		game.AdjustInputFlags();
		game.m_lastpos = game.m_curpos;
	}
}

// FIX: prevent tick buffering while focus is lost
window.onfocus = document.onfocusin = function() {
	var old_game_time = game.time;
	game.time = Date.now();
	var tdelta = (game.time-old_game_time)/1000;
	game.game_clock-=tdelta;
};


/* |DetectDeviceHz|
	Attempt to detect device screen refresh to determine
	whether to enable use of the 60Hz frame limiter
*/
var _last_tick = 0;
var _tick_samples = [];
var _hzhandle;
function DetectDeviceHz() {
	if(!_last_tick) {
		//  First-Pass : read tick#
		_last_tick = game.tick;          
	} else if (_tick_samples.length==10) {
		//  Last-Pass : set game.deviceHz with averaged tick from frames
		let avghz = 0;
		for(let v in _tick_samples) {
			avghz+=_tick_samples[v];
		}
		avghz/=_tick_samples.length;
		avghz*=100;
		avghz+=.5;
		avghz|=0;
		game.deviceHz = avghz;
		clearInterval(_hzhandle);
		_tick_samples=undefined;
		_last_tick   =undefined;
		_hzhandle    =undefined;

		// This segmented approach seems to ensure best latencies for all devices
		if(game.deviceHz<=60) {
			requestAnimationFrame(Tick); 
			console.log(game.deviceHz+'Hz display, requestAnimationFrame mode...');
			game.hztype = 'requestAnimationFrame';
		} else {
			console.log(game.deviceHz+'Hz display, intervalFrame mode...');
			game.hztype = 'intervalFrame';
			//window.requestAnimationFrame(Tick); 
			setInterval(Tick, 16.6666666667);
		}
	} else { 
		//   Loop-Pass : collect additional frames
		let hz = game.tick-_last_tick;   
		_last_tick = game.tick;
		_tick_samples.push(hz);
	}
}

function Boot(e) {
	/*-----------------------------
		Precache Resources
		BEFORE EVERYTHING ELSE
	-----------------------------*/

	// Sounds
	if(!game.snd.ow) {
		game.snd.ow = [];
		for(let i=1;i<=5;i++) {
			game.snd.ow[i] = new Howl({src: ['resources/sound/hit'+i+'.wav']});
		}
	}
	//game.snd.swordclash     = new Howl({src: ['resources/sound/swordhit.mp3']});
	game.snd.death          = new Howl({src: ['resources/sound/death_gib.wav']});
	//game.snd.game_end       = new Howl({src: ['resources/sound/game_end.wav']});
	//game.snd.game_end_win   = new Howl({src: ['resources/sound/game_end_win.wav']});
	game.snd.ouch           = new Howl({src: ['resources/sound/sp/ouch.wav']});
	game.snd.heal           = new Howl({src: ['resources/sound/sp/heal.wav']});
	game.snd.bug_pop        = new Howl({src: ['resources/sound/sp/bug_pop.wav']});
	game.snd.player_hit     = new Howl({src: ['resources/sound/hit5.wav']});

	// Fonts
	LoadFont("fr24","resources/fonts/franchise24");
	LoadFont("fr32","resources/fonts/franchise32");
	LoadFont("fr48","resources/fonts/franchise48");
	LoadFont("ui", "resources/fonts/philui");

	/* Textures */
	var tmptex;
	game.textures.heart         = PIXI.Texture.fromImage("resources/textures/particles/heart.png");
	game.textures.gradient      = PIXI.Texture.fromImage("resources/textures/particles/gradient.png");
	game.textures.thickgradient = PIXI.Texture.fromImage("resources/textures/particles/thicker_gradient.png");
	// HP Sprite Map
	game.textures.hp = [];
	game.textures.hptiled = PIXI.Texture.fromImage('resources/textures/player/hp.png');
	tmptex = game.textures.hptiled.baseTexture;
	for(let i=0;i<4;i++) {
		game.textures.hp[i] = new PIXI.Texture(tmptex, {x:48-16*i, y:0, width:16, height:16});
	}
	game.textures.hardspark = PIXI.Texture.fromImage("resources/textures/particles/spark_hard.png");
	game.textures.fire      = PIXI.Texture.fromImage("resources/textures/particles/flame.png");
	// Bug Sprite Map
	game.textures.bugs = [];
	game.textures.bugtiled = PIXI.Texture.fromImage('resources/textures/bug/fly.png');
	tmptex = game.textures.bugtiled.baseTexture;
	for(let j=0;j<4;j++) {
		for(let i=0;i<2;i++) {
			game.textures.bugs[j*2+i] = new PIXI.Texture(tmptex, {x:20*i, y:15*j, width:19, height:14});
		}
	}
	game.textures.swordtex = PIXI.Texture.fromImage('resources/textures/player/sword.png');


	stage.setTransform(game.width>>>1, game.height>>>1, 1, -1);
	game.phys.world = new p2.World({
		gravity:[0, 0]
	});
	game.phys.world.solver.iterations = 7;
	game.phys.world.solver.tolerance = 0.001;
	game.phys.world.setGlobalStiffness(1e4);
	game.phys.world.setGlobalRelaxation(1);

	// Start Tick Loop:
	Init();  
	PreTick();
	_hzhandle = setInterval(DetectDeviceHz, 10);
} Boot();


// Init executes after render test completes
function Init() {
	// Draw grid and background
	Create_Background();

	// Spawn Game Entities:
	Create_Edges();
	//Create_ScoreBoard();
	Create_CollisionHandler();
	Create_MainLogic();
}

});