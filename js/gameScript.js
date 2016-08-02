var game = new Phaser.Game(400, 900, Phaser.AUTO, 'Game', {
preload: preload,
create: create,
update: update
});

function preload() {
game.load.image('ground', 'assets/platform.png');
game.load.image('star', 'assets/star.png');
game.load.image('diamond', 'assets/diamond.png');
game.load.image('end', 'assets/end.png');
}

var sprite;
var rock;
var end;
var group;
var speed = 0;
var counter = 0;
var score = 0;
var text;
var rockGroup

function create() {
//  Enable ARCADE physics
game.physics.startSystem(Phaser.Physics.ARCADE);
game.world.enableBody = true;

// Gravity
game.physics.arcade.gravity.y = 300;
//  background
game.stage.backgroundColor = 'rgb(68, 136, 170)';
rockGroup = game.add.group()//  The hero!
star = game.add.sprite(200, 800, 'star');
game.physics.enable(star, Phaser.Physics.ARCADE);

star.body.allowGravity = false;
star.body.collideWorldBounds = true;

// star = game.add.group();

cursors = game.input.keyboard.createCursorKeys();
game.time.events.repeat(Phaser.Timer.SECOND * 12, 10, accelerate, this);
game.time.events.repeat(Phaser.Timer.SECOND * 12, 11, createEnd, this);
// game.time.events.repeat(Phaser.Timer.SECOND * 84, victor, this);
game.time.events.loop(Phaser.Timer.QUARTER * (1 - (speed/10)), createRock, this);
}



function accelerate() {
    speed++;
}

function createRock() {
rock = game.add.sprite(game.world.randomX, 0, 'diamond');
game.physics.arcade.enable(rock);
rockGroup.add(rock)
rock.body.collideWorldBounds = true;
score += 5;
console.log("rock");
}

function createEnd() {
end = game.add.sprite(00, 0, 'end');
game.physics.arcade.enable(end);
end.body.collideWorldBounds = false;
    counter++;


        var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: end.width, align: "center", backgroundColor: "#ffff00" };

    text = game.add.text(100, counter*50, 'Counter: ' + counter, style);
    text.anchor.set(0.5);
}

function update() {
star.body.velocity.setTo(0, 0);
if (cursors.left.isDown) {
star.body.velocity.x = -200;
} else if (cursors.right.isDown) {
star.body.velocity.x = 200;
}

// //  Run collision
game.physics.arcade.overlap(star, rockGroup, collisionHandler, null, this);
// game.physics.arcade.collide(rock, end, rockHitsBottom, null, this);
}

function render() {
for (var i = 0; i < rock.length; i++) {
game.debug.body(rock.children[i]);
}
}

function collisionHandler(star, rock) {
star.kill();
alert("You died! "+"SCORE: "+score);
game.time.events.stop();
}

function rockHitsBottom(killer, end) {
killer.kill();

}