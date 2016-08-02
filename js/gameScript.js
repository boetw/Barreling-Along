var game = new Phaser.Game(400, 700, Phaser.AUTO, 'Game', {
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
//varibles
var sprite;
var rock;
var end;
var group;
var speed = 0;
var counter = 1;
var score = 0;
var text;
var rockGroup;
var stateText;
var start;
var textLevel;

function create() {
    //  Enable ARCADE physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    // Gravity
    game.physics.arcade.gravity.y = 300;
    //  background
    game.stage.backgroundColor = 'rgb(68, 136, 170)';
    rockGroup = game.add.group() //  The hero!
    star = game.add.sprite(200, 600, 'star');
    game.physics.enable(star, Phaser.Physics.ARCADE);
    star.body.allowGravity = false;
    star.body.collideWorldBounds = true;
    //start bar
    end = game.add.sprite(0, 0, 'end');
    game.physics.enable(end, Phaser.Physics.ARCADE);
    var style = {
        font: "20px Arial",
        fill: "#ff0044",
        wordWrap: true,
        wordWrapWidth: end.width,
        align: "center",
        backgroundColor: "#ffff00"
    };
    text = game.add.text(0, 0, "Level " + counter, style);
    text.anchor.set(0.3);
    //cursors
    cursors = game.input.keyboard.createCursorKeys();
    //timers
    game.time.events.repeat(Phaser.Timer.SECOND * 12, 20, accelerate, this);
    game.time.events.repeat(Phaser.Timer.SECOND * 12, 22, winner, this);
    game.time.events.repeat(Phaser.Timer.SECOND * 12, 20, createEnd, this);
    // game.time.events.repeat(Phaser.Timer.SECOND * 84, victor, this);
    game.time.events.loop(Phaser.Timer.QUARTER * counter, createRock, this);
}
//faster
function accelerate() {
    speed++;
}
//rock
function createRock() {
    rock = game.add.sprite(game.world.randomX, 0, 'diamond');
    game.physics.arcade.enable(rock);
    rockGroup.add(rock)
    rock.body.collideWorldBounds = false;
    score += 5;
}
//level marker
function createEnd() {
    end = game.add.sprite(00, 0, 'end');
    game.physics.arcade.enable(end);
    end.body.collideWorldBounds = false;
    counter++;
    var style = {
        font: "20px Arial",
        fill: "#ff0044",
        wordWrap: true,
        wordWrapWidth: end.width,
        align: "center",
        backgroundColor: "#ffff00"
    };
    text = game.add.text(0, 0, "Level " + counter, style);
    // text.anchor.set(0.3);
}
//finish
function winner() {
    if (counter === 20) {
        alert("You Finished " + score);
        game.time.events.stop();
    } else {
        console.log(counter + " : " + score / 5);
    }
}

function update() {
    //level sign
    text.x = Math.floor(end.x + end.width / 2);
    text.y = Math.floor(end.y + end.height / 2);
    //star speed
    star.body.velocity.setTo(0, 0);
    if (cursors.left.isDown) {
        star.body.velocity.x = -200;
    } else if (cursors.right.isDown) {
        star.body.velocity.x = 200;
    }
    // //  Run collision
    game.physics.arcade.overlap(star, rockGroup, collisionHandler, null, this);
}
// make rocks
function render() {
    for (var i = 0; i < rock.length; i++) {
        game.debug.body(rock.children[i]);
    }
}
//rock meets barrel
function collisionHandler(star, rock) {
    star.kill();
    alert(" GAME OVER \n Click to restart");
    game.time.events.stop();
}