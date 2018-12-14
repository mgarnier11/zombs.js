/// <reference path="typings/phaser.d.ts" />

var gameWidth = 800;
var gameHeight = 800;


var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'zombs', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.path = 'gamev1/';

    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.image('turret0', 'assets/turret0.png');
    game.load.image('turret1', 'assets/turret1.png');


    game.load.image('bullet0', 'assets/bullet0.png');
    game.load.image('bullet1', 'assets/bullet1.png');
    game.load.image('bullet2', 'assets/bullet2.png');
    game.load.image('bullet3', 'assets/bullet3.png');


    game.load.spritesheet('explosion0', 'assets/exp0.png', 64, 64, 16);
    game.load.spritesheet('explosion1', 'assets/exp1.png', 64, 64, 25);
    game.load.spritesheet('explosion2', 'assets/exp2.png', 256, 256, 64);
    game.load.spritesheet('explosion3', 'assets/exp3.png', 32, 32, 6);
    game.load.spritesheet('explosion4', 'assets/exp4.png', 128, 128, 64);
    game.load.spritesheet('explosion5', 'assets/exp5.png', 128, 128, 40);
    game.load.spritesheet('explosion6', 'assets/exp6.png', 128, 128, 40);





    game.load.spritesheet('zombie0', 'assets/zombie0.png', 288, 311);
    game.load.image('tank0', 'assets/tank0.png');


    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }


}

function create() {
    game.world.setBounds(0, 0, game.width, game.height);

    game.land = game.add.tileSprite(0, 0, game.width, game.height, 'earth');
    game.land.fixedToCamera = true;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.cursors = game.input.keyboard.createCursorKeys();



    player = new Unit(game, 100, 100, playerObj);
    game.add.existing(player);

    ennemy = new Unit(game, 300, 300, ennemyObj);

    game.ennemies = game.add.group();
    //game.ennemies.add(ennemy);



    game.camera.follow(player);

}

function update() {
    game.physics.arcade.collide(player, game.ennemies);

}

function render() {
    game.debug.spriteInfo(player.weapons[1], 32, 32);
    //game.debug.spriteBounds(player.weapons[1]);

}


function intRnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var playerObj = {
    "health": 5,
    "sprite": "tank0",
    "playerControlled": true,
    "maxSpeed": 400,
    "accelerationRate": 5,
    "decelerationRate": 5,
    "turnRate": 4,
    "weapons": [
        {
            "damage": 1,
            "range": 0,
            "reload": 500,
            "action": "auto"
        },
        {
            "damage": 1,
            "range": 1000,
            "reload": 500,
            "sprite": "turret0",
            "action": "left",
            "turnRate": 4,
            "multiShot": 5,
            "ammos": 20,
            "bullet": {
                "speed": 500,
                "damage": 1,
                "sprite": "bullet1",
                "penetrant": false
            }
        }
    ]
};


var ennemyObj = {
    "health": 5,
    "sprite": "tank0",
    "playerControlled": false,
    "maxSpeed": 100,
    "accelerationRate": 4,
    "decelerationRate": 5,
    "turnRate": 4,
    "weapons": [
        {
            "damage": 1,
            "range": 500,
            "reload": 500,
            "sprite": "turret0",
            "turnRate": 5
        }
    ]
};