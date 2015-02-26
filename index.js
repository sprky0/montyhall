(function(){

	// run a game, where the player stays or switches
	function game(swit, boardlen) {

		swit = !!swit;
		boardlen = boardlen || 3;

		var board = [false,false,false];
		var winner = Math.floor( Math.random() * boardlen );
		var picked = Math.floor( Math.random() * boardlen );
		var exposed = -1;

		board[ winner ] = true;

		// expose a random non-winning door to the player
		while(exposed == -1) {
			var trying = Math.floor( Math.random() * boardlen );
			if (trying !== winner && trying !== picked) {
				exposed = trying;
			}
		}

		// switch to a non-exposed door if we are inclined
		if (swit) {

			var lastpicked = picked;

			// expose a random non-winning door to the player
			while(lastpicked == picked) {
				var trying = Math.floor( Math.random() * boardlen );
				if (trying !== exposed && trying !== lastpicked) {
					picked = trying;
				}
			}

		}

		return picked == winner;

	}

	function run(samplesize, boardsize) {

		var stays = {won : 0,lost : 0};
		var switched = {won : 0,lost : 0};
		var set = samplesize || 1000;
		var boardlen = boardsize || 3;

		// stays
		for(var i = 0; i < set; i++) {
			var result = game(false,boardlen);
			if (result) {
				stays.won++;
			} else {
				stays.lost++;
			}
		}

		// switches
		for(var i = 0; i < set; i++) {
			var result = game(true,boardlen);
			if (result) {
				switched.won++;
			} else {
				switched.lost++;
			}
		}

		return {
			stays : (stays.won / set),
			switches : (switched.won / set)
		};

	}

	var result = run(2000000, 3);

	console.log(result);

})();
