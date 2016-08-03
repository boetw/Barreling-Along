var player1score = [];
var player2score = [];
var player = true;
var oneTotal = 0;
var twoTotal = 0;
var round = -1;
var score = -2;


function endTurn() {
	if (player) {
		$('#twoScore').append("<td>" + score + "</td>");
		player2score.push(score);
		sumScore();
	} else {
		$('#oneScore').append("<td>" + score + "</td>");
		player1score.push(score);
		sumScore();
	}
}

function sumScore() {
	for (var i = player1score.length - 1; i >= 0; i--) {
		oneTotal = oneTotal + player1score[i]
	}
	for (var i = player2score.length - 1; i >= 0; i--) {
		twoTotal = twoTotal + player2score[i]
	}
	leadScore();
}

function leadScore() {
	if (oneTotal > twoTotal) {
		$('#ahead').html("1");
	} else if (oneTotal < twoTotal) {
		$('#ahead').html("2");
	} else {
		$('#ahead').html("No One");
	}
}