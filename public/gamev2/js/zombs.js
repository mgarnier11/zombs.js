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



    player = new Unit(game, 800, 400, playerObj);
    game.add.existing(player);
    game.ennemies = game.add.group();


    for (let i = 0; i < 4; i++) {
        ennemy = new Unit(game, 0, 200 * i, ennemyObj);
        game.ennemies.add(ennemy);
    }
    game.camera.follow(player);

}

function update() {
    game.physics.arcade.collide(player, game.ennemies);
    game.physics.arcade.collide(game.ennemies);

    game.physics.arcade.overlap(player.bullets, game.ennemies);

    game.ennemies.getAll().forEach((ennemy) => {
        game.physics.arcade.overlap(player, ennemy.bullets);

    })

}

function render() {

}

function intRnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAnimation(game, x, y, sprite) {
    if (sprite && game) {
        let animSprite = game.add.sprite(x, y, sprite);
        animSprite.anchor.setTo(0.5, 0.5)
        animSprite.animations.add('animation', null, 20, false);

        let animation = animSprite.animations.getAnimation('animation');
        animation.onComplete = new Phaser.Signal();
        animation.onComplete.add((animSprite) => { animSprite.destroy(); }, animSprite);

        animSprite.play('animation');
    }
}

var playerObj = {
    "health": 100,
    "sprite": "tank0",
    "playerControlled": true,
    "maxSpeed": 400,
    "accelerationRate": 5,
    "decelerationRate": 5,
    "turnRate": 4,
    "destroyAnimation": "explosion1",
    "weapons": [
        /*
        {
            "damage": 1,
            "ranged": false,
            "reload": 500,
            "action": "auto"
        },*/
        {
            "damage": 1,
            "ranged": true,
            "reload": 100,
            "sprite": "turret0",
            "action": "left",
            "turnRate": 4,
            "multiShot": 1,
            "ammos": 20,
            "bullet": {
                "speed": 750,
                "damage": 0,
                "lifespan": 1000,
                "sprite": "bullet1",
                "hitAnimation": "explosion3",
                "penetrant": false
            }
        }
    ]
};


var ennemyObj = {
    "health": 100,
    "sprite": "tank0",
    "playerControlled": false,
    "maxSpeed": 200,
    "accelerationRate": 5,
    "decelerationRate": 5,
    "turnRate": 4,
    "destroyAnimation": "explosion1",
    "weapons": [
        {
            "damage": 1,
            "ranged": true,
            "reload": 750,
            "sprite": "turret0",
            "action": "auto",
            "turnRate": 4,
            "multiShot": 1,
            "ammos": 20,
            "bullet": {
                "speed": 750,
                "damage": 0,
                "lifespan": 1000,
                "sprite": "bullet1",
                "hitAnimation": "explosion3",
                "penetrant": false
            }
        }
    ]
};