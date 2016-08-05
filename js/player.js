var player1score = [];
var player2score = [];
var player = true;
var oneTotal = 0;
var twoTotal = 0;
var round = 0;
var score = -2;


function endTurn() {
	if (player) {
		$('#twoScore').append("<li>" + score + "</li>");
		player2score.push(score);
		$('#turn').html("Turn: Player 1");

		sumScore2();
	} else {
		$('#oneScore').append("<li>" + score + "</li>");
		round++;
		$('#round').append("<li>" + round + "</li>");
		player1score.push(score);
		$('#turn').html("Turn: Player 2");

		sumScore1();
	}
	leadScore();
}

function sumScore1() {
	oneTotal = 0;
	for (var i = player1score.length - 1; i >= 0; i--) {
		oneTotal = oneTotal + player1score[i]
		$('#addScore1').html(oneTotal);

	}
}

function sumScore2() {
	twoTotal = 0;
	for (var i = player2score.length - 1; i >= 0; i--) {
		twoTotal = twoTotal + player2score[i]
		$('#addScore2').html(twoTotal);

	}

}

function leadScore() {
	if (oneTotal > twoTotal) {
		$('#ahead').html("Player 1");
	} else if (oneTotal < twoTotal) {
		$('#ahead').html("Player 2");
	} else {
		$('#ahead').html("No One");
	}
}