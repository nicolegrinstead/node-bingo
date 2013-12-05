
var bingoCard = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
     I: [ 20, 22, 25, 33, 36 ],
     N: [ 37, 45, 46, 52, 54 ],
     G: [ 55, 59, 60, 62, 69 ],
     O: [ 73, 74, 76, 77, 78 ] } };
var numbers = [4,7,10,11,13,22,46,20,37,55,20,37,55,73,62,33,78];

var hasBingo = checkForBingo(numbers, bingoCard);
if (hasBingo){
	console.log("BINGO"); 
}

function checkForBingo(calledNumbers, card){ 
	console.log(calledNumbers);
	if (checkForHorizontalBingo(calledNumbers, bingoCard)){
		console.log("HORIZONTAL BINGO!");
		return true;
	}
	if (checkForVerticalBingo(calledNumbers, bingoCard)){
		console.log("VERTICAL BINGO!");
		return true;
	}
	if (checkForDiagonalBingo(calledNumbers, bingoCard)){ 
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
			if(calledNumbers.indexOf(bingoCardNumber) == -1){ 
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
			if(calledNumbers.indexOf(bingoCardNumber) == -1){ 
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
			if (index==j){
				var bingoCardNumber = bingoCard.slots[i][j];
				if(calledNumbers.indexOf(bingoCardNumber) == -1){
					diag1Match = false;
				}
			}
			if ((parseInt(index)+parseInt(j)==4)){ 
				var bingoCardNumber = bingoCard.slots[i][j];
				if(calledNumbers.indexOf(bingoCardNumber) == -1){ 
					diag2Match = false;
				} 
			}
		});
		index++;
	}
	return diag1Match || diag2Match;
}