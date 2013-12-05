var bingoApp = require('../bingo.js');
var assert = require("assert")

describe('Bingo App', function(){
	
var bingoCard = { slots:
   { B: [ 4, 7, 10, 11, 13 ],
     I: [ 20, 22, 25, 33, 36 ],
     N: [ 37, 45, 46, 52, 54 ],
     G: [ 55, 59, 60, 62, 69 ],
     O: [ 73, 74, 76, 77, 78 ] } };

  describe('#checkForBingo()', function(){
    it('should return false when no numbers', function(){
    	var numbers = [];
     	assert.equal(false, bingoApp.checkForBingo(numbers, bingoCard));
    })
  })

  describe('#checkForBingo()', function(){
    it('should return false when bingo not present', function(){
		var numbers = [4,7,10,11];
     	assert.equal(false, bingoApp.checkForBingo(numbers, bingoCard));
    })
  })

  describe('#checkForBingo()', function(){
    it('should return true when horizontal bingo present', function(){
		var numbers = [4,7,10,11,13];
     	assert.equal(true, bingoApp.checkForBingo(numbers, bingoCard));
    })
  })

  describe('#checkForBingo()', function(){
    it('should return true when vertical bingo present', function(){
		var numbers = [4,20,37,55,73];
     	assert.equal(true, bingoApp.checkForBingo(numbers, bingoCard));
    })
  })

  describe('#checkForBingo()', function(){
    it('should return true when diagonal bingo present', function(){
		var numbers = [4,22,46,62,78];
     	assert.equal(true, bingoApp.checkForBingo(numbers, bingoCard));
    })
  })

  describe('#checkForBingo()', function(){
    it('should return true when other diagonal bingo present', function(){
		var numbers = [13,33,46,59,73];
     	assert.equal(true, bingoApp.checkForBingo(numbers, bingoCard));
    })
  })
})
