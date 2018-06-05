"use strict";
//	-------------------------------------------------
//	<BEGIN> GLAX : CORE_JAVASCRIPT_OPTIMIZATIONS
//  > Also contains all early-required core-functions
//	-------------------------------------------------
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
let _GSEED = (0xDEADC0DE*Math.random())|0
Math.lcg = function() {
	Math.LCG_MAX = 1<<15;
	var g_seed = new Uint32Array([_GSEED, 0]);
	Math.lcg = function() {
		g_seed[0] = (g_seed[0]*(214013|0)+(2531011|0));
		g_seed[1] = g_seed[0]>>>16;
		g_seed[1] &= 0x7FFF;
		return g_seed[1];
	}
	return Math.lcg();
}
Math.random = function() {
	return Math.lcg()/Math.LCG_MAX;
}
Math.rnd32 = function() {
	var g_seed = new Uint32Array([_GSEED]);
	Math.rnd32 = function() {
		g_seed[0]^=g_seed[0]<<13;
		g_seed[0]^=g_seed[0]>>17
		g_seed[0]^=g_seed[0]<<5;
		return g_seed[0];
	};
	return Math.rnd32();
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

// > rgb_to_lab(uint32 color)
//     RGB to CIELAB Conversion Algorithm 
// ----------------------------------------
// (Red|Green|Blue -> Lightness|green-red|blue-yellow)
window.rbg_to_lab = function(color) {
  var r = ((color>>>16)&0xFF)/255,
      g = ((color>>>8)&0xFF)/255,
      b = (color&0xFF)/255,
      x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}



// > lab_to_rgb(array lab)
//     CIELAB to RGB Conversion Algorithm 
// ----------------------------------------
// (Lightness|green-red|blue-yellow -> Red|Green|Blue)
window.lab_to_rgb = function(lab) {
  var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;
  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);
  r = x *  3.2406 + y * -1.5372 + z * -0.4986;
  g = x * -0.9689 + y *  1.8758 + z *  0.0415;
  b = x *  0.0557 + y * -0.2040 + z *  1.0570;
  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;
  return (((Math.max(0, Math.min(1, r)) * 255)+.5)<<16)|(((Math.max(0, Math.min(1, g)) * 255)+.5)<<8)|((Math.max(0, Math.min(1, b)) * 255)+.5);
}



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
		let bounds = renderer.view.getBoundingClientRect();
		game.m_curpos  = [e.clientX-bounds.left-(game.width>>>1), -(e.clientY-bounds.top-(game.height>>>1))];
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

function Create_Text(font, x, y, color, alpha) {
	var obj = {};
	obj.font = font;
	obj.color= typeof color==='undefined'?0xFFFFFF:color;
	obj.alpha= typeof alpha==='undefined'?1:alpha;
	obj.pcon = new PIXI.Container();
	Object.defineProperty(obj, 'x', {
		set: function(value) {obj.pcon.position.x=value;},
		configurable: true
	});
	Object.defineProperty(obj, 'y', {
		set: function(value) {obj.pcon.position.y=value;},
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
		for(i = obj.pcon.children.length-1; i>=0; i--) {
			obj.pcon.removeChild(obj.pcon.children[i]);
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
				spr.x = glyph.xoff+obj.xpos-1;
				spr.y = glyph.yoff+obj.ypos;
				obj.pcon.addChild(spr);
				obj.xpos+=glyph.xadd;
			}
		}
		obj.pcon.setTransform(x, y, 1, -1);
	};
	obj.remove = function() {
		stage.removeChild(obj.pcon);
		obj.pcon.destroy({children:true});
	}
	return obj;
}


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
}

function Create_ScoreBoard() {
	var obj = {
		// Base Location
		x: -633,
		y: 246,
		width: 290,
		height: 115,

		// Dialog BgColor
		base_color:   0x777777,
		players: [],
		labels: []
	};
	obj._y = obj.y;

	// Render Objects
	obj.con   = stage.addChild(new PIXI.Container());
	obj.panel = obj.con.addChild(new PIXI.Graphics());
	obj.con.interactive = true;
	
	// Drawing
	obj.refreshPanel = function() {
		obj.con.position.x = obj.x;
		obj.con.position.y = obj.y;
		obj.panel.clear();
		obj.panel.beginFill(obj.base_color, 0.25);
		obj.panel.drawRoundedRect(0, 0, obj.width, obj.height, 4);
		obj.panel.endFill();
	}; obj.refreshPanel();

	// Some text
	obj.title = Create_Text(game.fonts.fr32, 90, 15, 0x10A3FF, 1);
	obj.con.addChild(obj.title.pcon);

	// Think Function
	obj.onThink = function() {
		if(game.game_clock<=2 && game.game_clock>0) {
			// Signal that game has ended (Queued events should check for this)
			game.ended = true;
		}
		if(game.game_clock<=1 && game.game_clock>0) {
			
			// For now only fire event for local player
			if(game.player.winning) {
				FireEvent('player_win',{userId:game.player.userId});
			} else {
				FireEvent('player_lose',{userId:game.player.userId});
			}


			game.game_clock = -1; // hacky fix, should rework this (look for other uses of this)
		}
		if(game.game_clock<=-1) {
			game.snd.game_end.play();

			// reset clock to huge value to prevent finalizer from running more than once
			game.game_clock = 999999; 

			// kill websocket and clean up game environment
			lobby.ws.close();
			Cleanup_Entities();

			// Setup user-stats screen
			//document.querySelector('#muistatus').textContent = game.player.name; 
			document.querySelector('#muikills').textContent = 'Kills: '+game.state.self.kills; 
			document.querySelector('#muiwins').textContent = 'Wins: '+game.state.self.wins; 
			document.querySelector('#muitkills').textContent = 'Total Kills: '+game.state.self.total_kills;  
			document.querySelector('#muitwins').textContent = 'Total Wins: '+game.state.self.total_wins; 

			// Toggle visibility back to menu
			document.body.style.display = '';
			renderer.view.style.display = 'none';
			document.querySelector('#mainui').style.display = ''; 
			document.querySelector("#highui").style.display = ''; 
			document.querySelector('#waitui').style.display = 'none'; 
		}
		obj.title.text = 'Fight  '+('00'+((game.game_clock/60)|0)).slice(-2)+":"+('00'+((game.game_clock%60)|0)).slice(-2);
		obj.title.y    = obj.height;
		for(var i in obj.players) {
			obj.labels[i*2].text = obj.players[i].name;
			obj.labels[i*2].y    = obj.height-30-28*i;

			obj.labels[i*2+1].text = obj.players[i].score+" kills";
			obj.labels[i*2+1].y    = obj.height-30-28*i;
		}
	};

	obj.adjustList = function(e) {
		for(i in obj.labels) obj.labels[i].remove();
		obj.labels  = [];
		obj.players = []; 
		for(var uid in game.clients) {
			obj.players.push(game.clients[uid]);
			let name = Create_Text(game.fonts.fr24, 24, 0, 0xEEEEEE);
			obj.con.addChild(name.pcon);
			obj.labels.push(name);
			let score = Create_Text(game.fonts.fr24, 214, 0, 0xEEEEEE);
			obj.con.addChild(score.pcon);
			obj.labels.push(score);
		}
		obj.height =    44+obj.players.length*26;
		obj.y = obj._y +44-obj.players.length*26;
		obj.refreshPanel();
	};
	AddEventHook('player_join', obj.adjustList);

	obj.drawOnDisconnect = function(e) {
		if(game.ended) return;
		if(game.game_clock<5) return;
		FireEvent('player_draw',{userId:game.player.userId, msg: 'Opponent Disconnected...'});
		obj.adjustList();
	};
	AddEventHook('player_leave', obj.drawOnDisconnect);


	AddEventHook('player_win', function(evnt){
		if(game.player.userId===evnt.userId)  {
			_hsW();
			document.querySelector('#muistatus').textContent = 'Victory!';
			game.snd.game_end_win.play();
		}
	});
	AddEventHook('player_lose', function(evnt){
		if(game.player.userId===evnt.userId) {
			document.querySelector('#muistatus').textContent = 'Defeat...';
			_hsR();
		}
	});
	AddEventHook('player_draw', function(evnt){
		if(game.player.userId==evnt.userId) {
			document.querySelector('#muistatus').textContent = evnt.msg;
			game.game_clock = -1; // hacky fix, should rework this (look for other uses of this)
		}
	});

	// Object Destructor (Disabled: This object will persist between game-sessions)
	/*
	obj.remove = function() {
		obj.con.destroy({children:true});
		delete game.ents[obj.guid];
	}
	*/

	AddEntity(obj);
	return obj;
}

function Create_Edges() {
		// Create an infinite plane for boundaries
		let bottom = new p2.Body({
			position:[0,-(game.height>>>1)+12],
			mass: 0 // Setting mass to 0 makes it static
		});
		var botShape = new p2.Plane();
		bottom.addShape(botShape);
		game.phys.world.addBody(bottom);

		let top = new p2.Body({
			position:[0,(game.height>>>1)-12],
			mass: 0,
			angle: Math.PI
		});
		var topShape = new p2.Plane();
		top.addShape(topShape);
		game.phys.world.addBody(top);

		
		let left = new p2.Body({
			position:[-(game.width>>>1),0],
			mass: 0,
			angle: (Math.PI/2)*3
		});
		var leftShape = new p2.Plane();
		left.addShape(leftShape);
		game.phys.world.addBody(left);

		
		let right = new p2.Body({
			position:[(game.width>>>1),0],
			mass: 0,
			angle: Math.PI/2
		});
		var rightShape = new p2.Plane();
		right.addShape(rightShape);
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
		obj.gfx.beginFill(0x123455, 1);
		obj.gfx.drawRect(game.win.bl[0],game.win.bl[1],game.width,game.height);
		obj.gfx.beginFill(0xFFFFFF, .25);
		obj.gfx.drawRect(-(game.width>>>1), 0, game.width, 1);
		obj.gfx.drawRect(0, -(game.height>>>1), 1, game.height);
		stage.addChild(obj.gfx);
	}
}

window.CreateIdentifier = function(ply_obj, text, txtcolor) {
	// Name Tag
	let obj = {
		type: 'point_label'
	};
	obj.txt = new PIXI.Text(text, {font: '18px Arial', fill : txtcolor});
	let tagTex = PIXI.RenderTexture.create(256, 32);
	renderer.render(obj.txt, tagTex);
	obj.sprite = PIXI.Sprite.from(tagTex.baseTexture);
	obj.sprite.setTransform(0, 0, 1, -1);
	stage.addChild(obj.sprite);
	obj.sprite.cacheAsBitmap = true;
	obj.onThink = function() {
		if(game.ents[ply_obj.guid]) {
			// Update while valid parent
			obj.sprite.position.x = ply_obj.playerBody.position[0];
			obj.sprite.position.y = ply_obj.playerBody.position[1]+35;
		} else {
			// Delete self if parent is removed
			delete game.ents[obj.guid];
			obj.sprite.destroy({texture:true, baseTexture:true});
		}
	}
	obj.remove = function() {
		delete game.ents[obj.guid];
		obj.sprite.destroy({texture:true, baseTexture:true});
	}
	AddEntity(obj);
}

function Create_CollisionHandler() {
	// Handle special collision events
	game.phys.world.on('beginContact', function(e) {
		var sword, sword2, player;
		// Player hit
		if(e.bodyA.classname==="ent_sword" && e.bodyB.classname==="ent_player") {
			sword = e.bodyA;
			player = e.bodyB;
		} else if (e.bodyA.classname==="ent_player" && e.bodyB.classname==="ent_sword") {
			sword = e.bodyB;
			player = e.bodyA;
		// Swords hit
		} else if (e.bodyA.classname==="ent_sword" && e.bodyB.classname==="ent_sword") {
			sword = e.bodyA;
			sword2 = e.bodyB;
		}
		if(sword && player) {
			if(sword.parent.guid == game.player.pl_guid) {
				// Prevent rapid subsequent hits
				player.parent.lasthit = player.parent.lasthit || 0;
				if((player.parent.lasthit+500)<Date.now()) {
					player.parent.lasthit = Date.now();
					FireEvent('player_hurt', {
						attacker: game.player.pl_guid,
						victim: player.parent.guid,
						attackerid: game.player.userId,
						victimid: player.parent.clientId
					}, true);
				}
			}

			// turn off update flag and ping opponent for hit registry
			if(game.player.pl_guid===sword.parent.guid) {
				player.parent.update = false;
				lobby.tSendTo(player.parent.clientId, {op:'HIT'});
			}
		}
		if(sword && sword2) {
			game.snd.swordclash._volume = .1;
			game.snd.swordclash.play();

			// turn off update flag and ping opponent
			if(game.player.pl_guid===sword.parent.guid) {
				sword2.parent.update = false;
				lobby.tSendTo(sword2.parent.clientId, {op:'HIT'});
			}
		}
	});
}

window.StartPlayer = function(guid, local, x , y) {
	var obj = {};
	obj.type = "player";
	obj.sprites = {};
	obj.hp = 3;

	// flag indicating whether to accept location packets
	// an experiment to reduce noticable latency by ignoring 'wrong position updates' until opponent acknowledges the hit
	obj.update = true; 

	// Create 'Player' Sprite (Circle representing the player)
	obj.gfx = new PIXI.Graphics();
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
	let swordtex = PIXI.Texture.fromImage('resources/textures/player/sword.png');
	swordtex._frame = new PIXI.Rectangle(0, 0, 29, 157);
	let swordspr = PIXI.Sprite.from(swordtex);
	swordspr.setTransform(-9, 51, .65, -.65);
	obj.sword = new PIXI.Container();
	obj.sword.addChild(swordspr);
	stage.addChild(obj.sword);

	// Initialize HP status Sprites
	if(!game.textures.hptiled) {
		game.textures.hp = [];
		game.textures.hptiled = PIXI.Texture.fromImage('resources/textures/player/hp.png');
		let tex = game.textures.hptiled.baseTexture;
		for(let i=0;i<4;i++) {
			game.textures.hp[i] = new PIXI.Texture(tex, {x:48-16*i, y:0, width:16, height:16});
		}
	}

	obj.sprites.hp = PIXI.Sprite.from(game.textures.hp[3]);
	obj.lasthp = 3;
	obj.sprites.hp.setTransform(0, 0, 1, -1);
	stage.addChild(obj.sprites.hp);

	// Update location and take input
	obj.onThink = (function() {
		if(obj.hp!=obj.lasthp) {
			stage.removeChild(obj.sprites.hp);
			obj.sprites.hp.texture = game.textures.hp[obj.hp];
			stage.addChild(obj.sprites.hp);
			obj.lasthp = obj.hp;
		}

		obj.sprites.hp.position.x = obj.playerBody.position[0]-18;
		obj.sprites.hp.position.y = obj.playerBody.position[1]+33;

		obj.sword.position.x = obj.swordBody.position[0];
		obj.sword.position.y = obj.swordBody.position[1];
		obj.sword.rotation = obj.swordBody.angle;

		obj.gfx.rotation = obj.playerBody.angle;
		obj.gfx.position.x = obj.playerBody.position[0];
		obj.gfx.position.y = obj.playerBody.position[1];
		
		if(local) {
			obj.playerBody.angularVelocity = Math.abs(obj.playerBody.angularVelocity)>28 ? Math.sign(obj.playerBody.angularVelocity)*28 : obj.playerBody.angularVelocity;
			var wasd_down = game.keys.w&1 || game.keys.a&1 || game.keys.s&1 || game.keys.d&1;
			if(wasd_down||((game.keys.m0&1) && !(game.keys.m0&2)) ) {
				// Don't register on first tick after mouse press to avoid input jumps from touch screen devices
				if(game.m_dy||game.m_dx||wasd_down) {
					var IN_SPEED  = 350; // Max input speed
					var IN_MAX_SPEED = 350 + 200*obj.no_sword;
					var TOP_POWER_DISTANCE = 100; // How far cursor must move for inputFactor of 1
					
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
			if(game.keys.m0===7) {
				obj.playerBody.angularVelocity*=-12;
			}

			var MAX_SPEED = 450;
			var curSpeed  = Math.sqrt(obj.playerBody.velocity[0]*obj.playerBody.velocity[0]+obj.playerBody.velocity[1]*obj.playerBody.velocity[1]);
			if(curSpeed > MAX_SPEED) {
				var slowFactor = MAX_SPEED/curSpeed;
				obj.playerBody.velocity[0] *= slowFactor;
				obj.playerBody.velocity[1] *= slowFactor;
			}

			let updatePacket = {
				op:'PTICK',
				guid:game.player.pl_guid,
				pbody:{
					vel:[obj.playerBody.velocity[0], obj.playerBody.velocity[1]],
					ang:obj.playerBody.angle,
					avel:obj.playerBody.angularVelocity,
					pos:[obj.playerBody.position[0], obj.playerBody.position[1]]
				},
				sbody:{
					vel:[obj.swordBody.velocity[0], obj.swordBody.velocity[1]],
					ang:obj.swordBody.angle,
					avel:obj.swordBody.angularVelocity,
					pos:[obj.swordBody.position[0], obj.swordBody.position[1]]
				}
			};
			lobby.tSendTo(re.TEXT_BROADCAST, updatePacket);
		}
		var MAX_SPEED = 450;
		var curSpeed  = Math.sqrt(obj.playerBody.velocity[0]*obj.playerBody.velocity[0]+obj.playerBody.velocity[1]*obj.playerBody.velocity[1]);
		if(curSpeed > MAX_SPEED) {
			var slowFactor = MAX_SPEED/curSpeed;
			obj.playerBody.velocity[0] *= slowFactor;
			obj.playerBody.velocity[1] *= slowFactor;
		}

	});

	// Register relevant event handlers
	obj.hurt_handler = function(evnt) {
		if(evnt.victim===obj.guid) { // Only run if current entity hit
			// Apply damage
			if(game.ents[evnt.victim]) {
				var ent = game.ents[evnt.victim];
				if(ent.hp>0) {
					ent.hp-=1;
				}
				if(ent.hp==0) {
					FireEvent('player_death', evnt);
				}
				if(game.player.userId===evnt.victimid) {
					if ("vibrate" in navigator) {
						navigator.vibrate(50);
					}
				}
			}
			var rnd = 4;//(Math.random()*5+1)|0;
			game.snd.ow[rnd]._volume = .2;
			game.snd.ow[rnd].play();
		}
	};
	AddEventHook("player_hurt", obj.hurt_handler);


	var hRespawnTimer; // Handle to timer (make sure to destroy on obj.remove)
	obj.death_handler = function(evnt) {
		// Filter for victim object
		if(obj.guid===evnt.victim) {
			if(evnt.attacker===game.player.pl_guid) {
				_hsK();
			}

			SparkRing(obj.playerBody.position[0],obj.playerBody.position[1]);
			game.snd.death._volume = .1;
			game.snd.death.play();
			game.clients[evnt.attackerid].score++;
			if(game.player.userId===evnt.victimid) {
				hRespawnTimer = setTimeout(CreatePlayer, 3000);
			}

			// PRE-CALCULATE WHO IS WINNING
			// DOING THIS TO PREVENT LOSING USER-STATE AT THE END WHEN SOCKETS CLOSE, RESULTING IN THE WRONG WINNER
			for(var v in game.clients) { // Temporarilly mark everybody as winning
				game.clients[v].winning = true;
			}
			for(var i in game.clients) { // If any player has a higher score, mark as not winning
				for(var j in game.clients) {
					if(game.clients[j].score>game.clients[i].score) {
						game.clients[i].winning = false;
					}
				}
			}

			obj.remove();
		}
	};
	AddEventHook("player_death", obj.death_handler);
	

	// Player destructor (free everything)
	obj.remove = function() {
		delete game.ents[obj.guid];
		obj.gfx.destroy();
		obj.sword.destroy({children:true});
		obj.sprites.hp.destroy();
		game.phys.world.removeConstraint(obj.swordAttach);
		game.phys.world.removeBody(obj.playerBody);
		game.phys.world.removeBody(obj.swordBody);
		RemoveEventHook(obj.hurt_handler);
		RemoveEventHook(obj.death_handler);
	}

	AddEntity(obj, guid);
	return obj;
}

function FireParticle(x, y, scale) {
	var spr, i; // Optimization: Define tmp var spr 
	var obj = {};
	obj.sprites = [];
	obj.cont = new PIXI.ParticleContainer(90, {position: true, scale:true, alpha: true}, 90);
	obj.cont.blendMode = PIXI.BLEND_MODES.ADD;
	obj.x = x;
	obj.y = y;
	obj.sprnum = 0;
	stage.addChild(obj.cont);
	if(!game.textures.fire) {
		game.textures.fire = PIXI.Texture.fromImage("resources\\textures\\particles\\flame.png");
	}
	obj.onThink = function() {
		// Create fire sprites
		if(obj.sprnum<90) {
			for(i=0; i<2; i++) {
				spr = PIXI.Sprite.from(game.textures.fire);
				spr.anchor.set(0.5, 0.5);
				spr.frame = 0;
				obj.sprites.push(spr);
				obj.cont.addChild(spr);
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
			// Respawn after 60 frames
			if(spr.frame===45){
				spr.sz = Math.random()*.09+.06;
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
	obj.cont = new PIXI.ParticleContainer(NUM_PARTICLES, {position: true, rotation: true}, NUM_PARTICLES);
	obj.cont.position.x = x;
	obj.cont.position.y = y;
	obj.cont.position.rotation = -Math.PI/2;
	obj.frame = 0;
	stage.addChild(obj.cont);
	if(!game.textures.thickgradient) {
		game.textures.thickgradient = PIXI.Texture.fromImage("resources\\textures\\particles\\spark_hard.png");
	}
	for(i=0; i<NUM_PARTICLES; i++) {
		spr = PIXI.Sprite.from(game.textures.thickgradient);
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
function Fragments(x, y) {
	var NUM_PARTICLES = 5; // Number of particles
	var spr, i;
	var obj = {};
	obj.sprites = [];
	obj.cont = new PIXI.Container();
	obj.cont.position.x = x;
	obj.cont.position.y = y;
	obj.cont.position.rotation = -Math.PI/2;
	obj.frame = 0;
	stage.addChild(obj.cont);
	if(!game.textures.thickgradient) {
		game.textures.thickgradient = PIXI.Texture.fromImage("textures\\particles\\thicker_gradient.png");
	}
	for(i=0; i<NUM_PARTICLES; i++) {
		spr = PIXI.Sprite.from(game.textures.thickgradient);
		spr.anchor.set(0.5, 0.5);
		obj.sprites.push(spr);
		obj.cont.addChild(spr);
		spr.sz = .15;
		spr.x = Math.random()*20;
		spr.y = 0;
		spr.velx = (Math.random()-.15)*5;
		spr.vely = (Math.random()*3-.5);
		spr.setTransform(spr.x, spr.y, -spr.sz, spr.sz);
		spr.tint = rndcolor();
		spr.trail = FireParticle(spr.x+obj.cont.position.x, spr.y+obj.cont.position.y, .3);
	}
	obj.onThink = function() {
		obj.frame++;
		for(i=0; i<NUM_PARTICLES; i++) {
			spr = obj.sprites[i];
			spr.vely-=.025;
			spr.y+=spr.vely;
			spr.x+=spr.velx;
			spr.sz=Math.cos(obj.frame/5)/4;
			spr.setTransform(spr.x, spr.y, -spr.sz, spr.sz);
			spr.trail.x = obj.cont.position.x+spr.x;
			spr.trail.y = obj.cont.position.y+spr.y;
		}
		if(obj.frame==400) {
			for(i=0; i<NUM_PARTICLES; i++) {
				spr = obj.sprites[i];
				spr.trail.remove();
			}
			delete game.ents[obj.guid];
			obj.cont.destroy({children:true});
		}
	}
	AddEntity(obj);
}

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
		avghz*=10;
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
			Tick();
		}
	} else { 
		//   Loop-Pass : collect additional frames
		let hz = game.tick-_last_tick;  
		_last_tick = game.tick;
		_tick_samples.push(hz);
	}
}

function Init(e) {
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
	game.snd.swordclash     = new Howl({src: ['resources/sound/swordhit.mp3']});
	game.snd.death          = new Howl({src: ['resources/sound/death_gib.wav']});
	game.snd.game_end       = new Howl({src: ['resources/sound/game_end.wav']});
	game.snd.game_end_win   = new Howl({src: ['resources/sound/game_end_win.wav']});

	// Fonts
	LoadFont("fr24","resources/fonts/franchise24");
	LoadFont("fr32","resources/fonts/franchise32");
	LoadFont("fr48","resources/fonts/franchise48");
	LoadFont("ui", "resources/fonts/philui");
	
	stage.setTransform(game.width>>>1, game.height>>>1, 1, -1);
	game.phys.world = new p2.World({
		gravity:[0, 0]
	});
	game.phys.world.solver.iterations = 7;
	game.phys.world.solver.tolerance = 0.001;
	game.phys.world.setGlobalStiffness(1e4);
	game.phys.world.setGlobalRelaxation(1);

	// Start Tick Loop:
	PreTick();
	_hzhandle = setInterval(DetectDeviceHz, 100);

	// Draw grid and background
	Create_Background();

	// Spawn Game Entities:
	Create_Edges();
	Create_ScoreBoard();
	Create_CollisionHandler();
} Init();

});