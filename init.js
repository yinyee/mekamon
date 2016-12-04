var joystick_left = {
	radius: 200,
	activeGradient: ["rgba( 128,173,96,.9 )", "rgba( 128,173,96,.9 )"],
	activeStrokeStyle: "rgba( 128,173,96,.9 )",
	inactiveGradient: ["rgba( 128,173,96,.9 )", "rgba( 128,173,96,.9 )"],
	inactiveStrokeStyle: "rgba( 128,173,96,.9 )",
	touchMove: function( e ) {
		console.log( e);

		var coordX = (e.normalizedX * 50) + 49;
		var coordY = (e.normalizedY * 50) + 49;

		var message = {
			"from": window.user,
			"type": "translation",
			"translation" : {"strideLenX": coordX, "strideLenY": coordY},
		}
		publish( message); // publishes to pubnub
	},
	touchEnd: function ( e ) {
		console.log( e);

		var message = {
			"from": window.user,
			"type": "translation",
			"translation" : {"strideLenX": 49, "strideLenY": 49}
		}
		publish( message); // publishes to pubnub
	}
};

var joystick_right = {
	radius: 200,
	activeGradient: ["rgba( 128,173,96,.9 )", "rgba( 128,173,96,.9 )"],
	activeStrokeStyle: "rgba( 128,173,96,.9 )",
	inactiveGradient: ["rgba( 128,173,96,.9 )", "rgba( 128,173,96,.9 )"],
	inactiveStrokeStyle: "rgba( 128,173,96,.9 )",
	touchMove: function( e ) {
		console.log( e);

		var coordX = (e.normalizedX * 50) + 49;

		var message = {
			"from": window.user,
			"type": "translation",
			"translation" : {"rotate": coordX},
		}
		publish( message); // publishes to pubnub
	},
	touchEnd: function ( e ) {
		console.log( e);

		var message = {
			"from": window.user,
			"type": "translation",
			"translation" : {"rotate": 49}
		}
		publish( message); // publishes to pubnub
	}
};

var joystick_off = {
	fixed: true,
	radius: 200,
	activeGradient: ["rgba( 117,168,201,.9 )", "rgba( 117,168,201,.9 )"],
	activeStrokeStyle: "rgba( 117,168,201,.9 )",
	inactiveGradient: ["rgba( 117,168,201,.9 )", "rgba( 117,168,201,.9 )"],
	inactiveStrokeStyle: "rgba( 117,168,201,.9 )",
	touchMove: function( e ) {
		console.log( e);
		// does not publish
	},
	touchEnd: function ( e ) {
		console.log( e);
	}
};

function init_left() {
	window.user = "user_left";
	init_general(true);
}	

function init_right() {
	window.user = "user_right";
	init_general(false);
}

function init_general(left_player) {
	var options = {
	forcePerformanceFriendly: true,
	left: {
		type: 'joystick',
		position: { left: '20%', bottom: '50%' },
		joystick: left_player ? joystick_left : joystick_off,
	},
	right: {
		type: 'joystick',
		position: { right: '20%', bottom: '50%' },
		joystick: left_player ? joystick_off : joystick_right,
	},
	touchRadius: 5
	};

	console.log(options);
	GameController.init(options);
}