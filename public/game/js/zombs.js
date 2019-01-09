var textBaseStyle = {
    font: "18px Arial",
    fill: "#FFFFFF",
    align: 'center',
    boundsAlignH: 'center'
}

var gameObj = {
    width: 1200,
    height: 900,
    worldWidth: 5000,
    worldHeight: 5000,
    level: 0,
    score: 0,
    golds: 0,
    hud: {
        x: 0,
        y: 0,
        minimap: {
            x: 1000,
            y: 700,
            style: {
                width: 200,
                height: 200,
                color: "#000000",
                alliesColor: "#00FF00",
                enemiesColor: "#FF0000"
            }
        },
        texts: [
            {
                x: 1120,
                y: 0,
                text: "score",
                style: textBaseStyle
            },
            {
                x: 1120,
                y: 18,
                text: "golds",
                style: textBaseStyle
            },
            {
                x: 1120,
                y: 36,
                text: "level",
                style: textBaseStyle
            },
        ]

    },
    menu: [

    ],
    player: {
        x: 100,
        y: 100,
        health: 100,
        sprite: "ship0",
        playerControlled: true,
        maxSpeed: 400,
        accelerationRate: 5,
        decelerationRate: 5,
        turnRate: 4,
        destroyAnimation: "explosion1",
        minimapPoint: {
            height: 7,
            width: 7,
            color: "#00FF00"
        },
        weapons: [
            {
                damage: 100,
                ranged: false,
                reload: 100,
                action: "auto"
            },
            {
                ranged: true,
                reload: 200,
                sprite: "turret2",
                action: "left",
                multiShot: 3,
                ammos: 200,
                rotative: true,
                x: 30,
                y: 0,
                bullet: {
                    z: 1,
                    speed: 750,
                    damage: 20,
                    lifespan: 1000,
                    sprite: "bullet1",
                    hitAnimation: "explosion0",
                    penetrant: true
                }
            }
        ]
    },
    enemiesConfig: [
        {
            health: 1000,
            sprite: "ship1",
            playerControlled: false,
            maxSpeed: 100,
            accelerationRate: 5,
            decelerationRate: 5,
            turnRate: 1,
            destroyAnimation: "explosion1",
            weapons: [
                {
                    damage: 15,
                    ranged: true,
                    reload: 1250,
                    action: "auto",
                    turnRate: 4,
                    multiShot: 1,
                    ammos: 20,
                    bullet: {
                        speed: 750,
                        damage: 0,
                        lifespan: 1000,
                        sprite: "bullet2",
                        hitAnimation: "explosion0",
                        penetrant: false
                    }
                },
            ]
        },
    ]
}


var defSprite = "undf";
var fps = true;


var game = new Game(gameObj, 'zombs', { preload: preload, create: create, update: update, render: render });

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
    game.load.image('turret2', 'assets/turret2.png');
    game.load.image('turret3', 'assets/turret3.png');


    game.load.image('bullet0', 'assets/bullet0.png');
    game.load.image('bullet1', 'assets/bullet1.png');
    game.load.image('bullet2', 'assets/bullet2.png');
    game.load.image('bullet3', 'assets/bullet3.png');

    game.load.image('ship0', 'assets/ship0.png');
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
