var socketClient = require('socket.io-client');

var client = socketClient.connect('ws://yahoobingo.herokuapp.com');
var payload = { name: 'Nicole Grinstead',  email: 'nicolergrinstead@gmail.com', url: 'https://github.com/nicolegrinstead/node-bingo' };
client.emit('register', payload);

var bingoCard;
var numbers = [];
client.on('connect', function () { console.log("connected"); 
});
client.on('card', function (payload) {
	bingoCard = payload;
	console.log("Got bingo card ", bingoCard);
});
client.on('number', function (number) {
	var bingoNumber = parseInt(number.replace(/[a-z]/i,''));
	numbers.push(bingoNumber);

	var hasBingo = checkForBingo(numbers, bingoCard);
	if (hasBingo){
		client.emit('bingo'); 
	}
});
client.on('win', function (message) { console.log("WINNER"); });
client.on('lose', function (message) { console.log("loser :("); });
client.on('disconnect', function () { console.log("disconnected"); });

function checkForBingo(calledNumbers, card){ 
	if (checkForHorizontalBingo(calledNumbers, card)){
		console.log("HORIZONTAL BINGO!");
		return true;
	}
	if (checkForVerticalBingo(calledNumbers, card)){
		console.log("VERTICAL BINGO!");
		return true;
	}
	if (checkForDiagonalBingo(calledNumbers, card)){ 
		console.log("DIAGONAL BINGO!");
		return true;
	}
	return false;
}

function checkForHorizontalBingo(calledNumbers, bingoCard){ 
	for (var i in bingoCard.slots) {
		var bingoCardLine = bingoCard.slots[i];
		var horizMatch = true;
		bingoCardLine.forEach(function (bingoCardNumber){ 
			if(calledNumbers.indexOf(bingoCardNumber) === -1){ 
				horizMatch = false;
			}

		});
		return horizMatch;
	}
}

function checkForVerticalBingo(calledNumbers, bingoCard){ 
	var vertMatches = [true,true,true,true,true];
	for (var i in bingoCard.slots) {
		var bingoCardLine = bingoCard.slots[i];
		bingoCardLine.forEach(function(bingoCardNumber, j){ 
			var bingoCardNumber = bingoCard.slots[i][j];
			if(calledNumbers.indexOf(bingoCardNumber) === -1){ 
				vertMatches[j] = false;
			}
		});
	}

	for (var k=0; k<vertMatches.length; k++){ 
		if (vertMatches[k]){ 
 			return true;
	    }
	} 
}

function checkForDiagonalBingo(calledNumbers, bingoCard){ 
	var diag1Match = true, diag2Match = true; 
	var index = 0; 
	for (var i in bingoCard.slots) {
		var bingoCardLine = bingoCard.slots[i];
		bingoCardLine.forEach(function(bingoCardNumber, j){ 
			if (index===j){
				var bingoCardNumber = bingoCard.slots[i][j];
				if(calledNumbers.indexOf(bingoCardNumber) === -1){
					diag1Match = false;
				}
			}
			if ((parseInt(index)+parseInt(j)===4)){ 
				var bingoCardNumber = bingoCard.slots[i][j];
				if(calledNumbers.indexOf(bingoCardNumber) === -1){ 
					diag2Match = false;
				} 
			}
		});
		index++;
	}
	return diag1Match || diag2Match;
}
exports.checkForBingo = checkForBingo;