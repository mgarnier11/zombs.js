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

    game.turret = new Unit(game, game.width / 2, game.width / 2, unit);
    game.add.existing(game.turret);

    game.ennemies = game.add.group();

    game.camera.follow(game.turret);

    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    if (game.input.activePointer.leftButton.isDown) {
        console.log(game);

        game.turret.hitAll();
    }
}

function render() {

}


function intRnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var unit = {
    "health": 5,
    "sprite": "bullet3",
    "weapons": [
        {
            "x": 0,
            "y": 0,
            "rotation": 0,
            "damage": 10,
            "reload": 100,
            "lifespan": 1000,
            "speed": 1200,
            "sprite": "turret0",
            "ammos": 40,
            "bullet": {
                "sprite": "bullet0",
                "lifespan": 1000
            }
        }
    ]
};