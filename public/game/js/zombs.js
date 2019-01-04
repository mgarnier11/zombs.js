/// <reference path="typings/phaser.d.ts" />

var gameWidth = 600;
var gameHeight = 600;
var worldWidth = 2000;
var worldHeight = 2000;

var fps = true;


var game = new Game(gameWidth, gameHeight, worldWidth, worldHeight, Phaser.AUTO, 'zombs', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.path = 'game/';

    game.load.image('undf', 'assets/null.png');

    game.load.image('earth', 'assets/scorched_earth.png');
    game.load.image('sky', 'assets/starfield.jpg');

    game.load.image('hud0', 'assets/hud0.png');
    game.load.image('hud1', 'assets/hud1.png');


    game.load.image('minimap0', 'assets/minimap0.png');

    game.load.image('turret0', 'assets/turret0.png');
    game.load.image('turret1', 'assets/turret1.png');


    game.load.image('bullet0', 'assets/bullet0.png');
    game.load.image('bullet1', 'assets/bullet1.png');
    game.load.image('bullet2', 'assets/bullet2.png');
    game.load.image('bullet3', 'assets/bullet3.png');


    game.load.image('ship1', 'assets/cruiser1.png');
    game.load.image('ship2', 'assets/enemyBlack1.png');
    game.load.image('ship3', 'assets/enemyBlack2.png');
    game.load.image('ship4', 'assets/enemyBlack3.png');
    game.load.image('ship5', 'assets/enemyBlack4.png');
    game.load.image('ship6', 'assets/enemyBlack5.png');


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
    game.init();

    if (fps) game.time.advancedTiming = true;

    game.player = new Unit(game, 100, 100, playerObj);
    game.add.existing(game.player);
    game.hud.minimap.addChild(game.player.minimapPoint);


    game.player.weapons.children.forEach(weapon => {
        if (weapon.obj.bullet && weapon.obj.bullet.z >= 1) {
            game.world.bringToTop(weapon.bullets);
        }
    })

    game.start();

    game.camera.follow(game.player);
}

function update() {
    game.physics.arcade.collide(game.player, game.enemies);
    game.physics.arcade.collide(game.enemies);

    game.player.bullets.forEach(bulletGroup => {
        game.physics.arcade.overlap(bulletGroup, game.enemies);
    })


    game.enemies.getAll().forEach((enemy) => {
        enemy.bullets.forEach(enemyBulletGroup => {
            game.physics.arcade.overlap(game.player, enemyBulletGroup);
        })
    })




    if (!game.camera.atLimit.x) {
        game.land.tilePosition.x -= (game.player.body.velocity.x * game.time.physicsElapsed);
    }

    if (!game.camera.atLimit.y) {
        game.land.tilePosition.y -= (game.player.body.velocity.y * game.time.physicsElapsed);
    }

}

function render() {
    if (fps) game.debug.text(game.time.fps, 2, 14, "#00ff00");

    //game.debug.body(game.player);
    //game.debug.pointer(this.input.activePointer);
}

function intRnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playAnimation(game, x, y, sprite) {
    if (sprite && game) {
        let animSprite = game.animations.add(new Phaser.Sprite(game, x, y, sprite))//.sprite(x, y, sprite);
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
    "sprite": "ship1",
    "playerControlled": true,
    "maxSpeed": 400,
    "accelerationRate": 5,
    "decelerationRate": 5,
    "turnRate": 4,
    "destroyAnimation": "explosion1",
    "weapons": [
        {
            "damage": 100,
            "ranged": false,
            "reload": 100,
            "action": "auto"
        },
        {
            "ranged": true,
            "reload": 200,
            "sprite": "turret1",
            "action": "left",
            "multiShot": 3,
            "ammos": 200,
            "rotative": true,
            "x": 20,
            "y": 0,
            "bullet": {
                "z": 1,
                "speed": 750,
                "damage": 20,
                "lifespan": 1000,
                "sprite": "bullet1",
                "hitAnimation": "explosion0",
                "penetrant": true
            }
        },
        {
            "ranged": true,
            "reload": 50,
            "action": "right",
            "ammos": 200,
            "bullet": {
                "z": 0,
                "speed": 1200,
                "damage": 5,
                "lifespan": 1000,
                "sprite": "bullet0",
                "hitAnimation": "explosion3"
            }
        }
    ]
};

var playerObjv2 = {
    "health": 100,
    "sprite": "ship2",
    "playerControlled": true,
    "maxSpeed": 800,
    "accelerationRate": 10,
    "decelerationRate": 5,
    "turnRate": 8,
    "destroyAnimation": "explosion1",
    "weapons": [
        {
            "damage": 100,
            "ranged": false,
            "reload": 100,
            "action": "auto"
        },
        {
            "ranged": true,
            "reload": 50,
            "action": "left",
            "ammos": 200,
            "rotative": false,
            "bullet": {
                "damage": 50,
                "speed": 1500,
                "lifespan": 3000,
                "sprite": "bullet0",
                "hitAnimation": "explosion3",
                "penetrant": true
            }
        }
    ]
};

var enemies = [
    {
        "health": 1000,
        "sprite": "ship1",
        "playerControlled": false,
        "maxSpeed": 100,
        "accelerationRate": 5,
        "decelerationRate": 5,
        "turnRate": 1,
        "destroyAnimation": "explosion1",
        "weapons": [
            {
                "damage": 15,
                "ranged": true,
                "reload": 1250,
                "action": "auto",
                "turnRate": 4,
                "multiShot": 1,
                "ammos": 20,
                "bullet": {
                    "speed": 750,
                    "damage": 0,
                    "lifespan": 1000,
                    "sprite": "bullet2",
                    "hitAnimation": "explosion0",
                    "penetrant": false
                }
            },
        ]
    },/*
    {
        "health": 20,
        "sprite": "ship2",
        "playerControlled": false,
        "maxSpeed": 400,
        "accelerationRate": 5,
        "decelerationRate": 5,
        "turnRate": 4,
        "destroyAnimation": "explosion1",
        "weapons": [
            {
                "damage": 5,
                "ranged": false,
                "reload": 250,
                "sprite": "turret0",
            }
        ]
    },
    {
        "health": 50,
        "sprite": "ship3",
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
                "reload": 250,
                "sprite": "turret0",
                "action": "auto",
                "turnRate": 4,
                "multiShot": 1,
                "ammos": 20,
                "bullet": {
                    "speed": 750,
                    "damage": 0,
                    "lifespan": 1000,
                    "sprite": "bullet3",
                    "hitAnimation": "explosion3",
                    "penetrant": false
                }
            }
        ]
    },
    {
        "health": 20,
        "sprite": "ship4",
        "playerControlled": false,
        "maxSpeed": 200,
        "accelerationRate": 5,
        "decelerationRate": 5,
        "turnRate": 4,
        "destroyAnimation": "explosion1",
        "weapons": [
            {
                "damage": 5,
                "ranged": true,
                "reload": 500,
                "sprite": "turret0",
                "action": "auto",
                "turnRate": 4,
                "multiShot": 1,
                "ammos": 20,
                "bullet": {
                    "speed": 750,
                    "damage": 0,
                    "lifespan": 1000,
                    "sprite": "bullet0",
                    "hitAnimation": "explosion0",
                    "penetrant": false
                }
            }
        ]
    }*/
];