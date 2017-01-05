window.onload = function() {
	
	var promptText = document.getElementById('prompt');
	var randomisableSections = Array.from(document.querySelectorAll('aside section'));
	var randomisables = [];

	randomisableSections.forEach((section) => {
		var h2 = section.querySelector('h2');
		var title = h2.textContent.trim();
		var picker = section.querySelector('input[type=number]');
		var textarea = section.querySelector('textarea');
		var values = parseValues(textarea.value);
		
		// sanitise values back into the area
		textarea.value = values.join('\n');

		randomisables.push({
			title, values, picker
		});
	});

	var actionButton = document.querySelector('button');
	actionButton.addEventListener('click', getPrompt);

	// And get a prompt
	getPrompt();

	// ~~~

	function parseValues(text) {
		var lines = text.trim().split('\n');
		lines = lines.map((v) => {
			v = v.replace('- ', '');
			v = v.trim();
			return v;
		});
		return lines;
	}


	function getPrompt() {
	
		var output = '<dl>';

		randomisables.forEach((r) => {
			var numPicks = 1;

			if(r.picker) {
				numPicks = r.picker.value;
			}

			var picks = getRandomPicks(r.values, numPicks);

			output += '<dt>' + r.title + ':</dt>' + '<dd>' + picks.join(', ') + '</dd>';

		});

		output += '</dl>';

		promptText.innerHTML = output;
	}


	function getRandomPicks(values, maxNum) {
		var picks = [];
		var cloned = cloneArray(values);

		// Cannot pick more than the array contains, so cap it to array length
		maxNum = Math.min(maxNum, cloned.length);

		for(var i = 0; i < maxNum; i++) {
			var randomPick = Math.floor(Math.random() * cloned.length);
			picks.push(cloned[randomPick]);
			cloned.splice(randomPick, 1);
		}

		return picks;
	}


	
	function cloneArray(arr) {
		return arr.slice(0);
	}

	
};

