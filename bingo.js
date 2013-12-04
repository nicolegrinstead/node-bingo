var socketClient = require('socket.io-client');

var client = socketClient.connect('ws://yahoobingo.herokuapp.com');
var payload = { name: 'Nicole Grinstead',
  email: 'nicolergrinstead@gmail.com',
  url: 'https://github.com/nicolegrinstead/node-bingo' };

//client.emit('register', payload);

var numbers = [2,3,4,5,6,7,11,10,20,37,55,73,13];
var bingoCard = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
	 I: [ 20, 22, 25, 33, 36 ],
	 N: [ 37, 45, 46, 52, 54 ],
	 G: [ 55, 59, 60, 62, 69 ],
	 O: [ 73, 74, 76, 77, 78 ] } };

var hasBingo = checkForBingo(numbers, bingoCard);
console.log(hasBingo);

function checkForBingo(calledNumbers, card){ 
	var vertMatchCount = [0,0,0,0,0];
	console.log(calledNumbers);

	for (var i in bingoCard.slots) {
		var bingoCardLine = bingoCard.slots[i];
		if (checkForHorizontalBingo(calledNumbers, bingoCardLine)){
			 //return true;
		}
		for (var j in bingoCardLine){ 
			var bingoCardNumber = bingoCard.slots[i][j];
			if(calledNumbers.indexOf(bingoCardNumber) > -1){ 
				vertMatchCount[j] += 1;
			}
		}
	}

	for (var k in vertMatchCount){ 
		if (vertMatchCount[k] == 5){ 
 			return true;
	    }
	} 

	return false;
}

function checkForHorizontalBingo(calledNumbers, bingoCardLine){ 
	var horizMatchCount = 0;
	for (var j in bingoCardLine){ 
		var bingoCardNumber = bingoCardLine[j];
		if(calledNumbers.indexOf(bingoCardNumber) > -1){ 
			horizMatchCount++;
		}
		if (horizMatchCount == 5){ 
			console.log("BINGO!");
			return true;
		}
	}
	return false;
}