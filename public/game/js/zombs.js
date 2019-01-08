var textBaseStyle = {
    font: "18px Arial",
    fill: "#FFFFFF",
    align: 'center',
    boundsAlignH: 'center'
}

var gameObj = {
    width: 600,
    height: 600,
    worldWidth: 2000,
    worldHeight: 2000,
    level: 0,
    score: 0,
    golds: 0,
    hud: {
        x: 0,
        y: 0,
        minimap: {
            x: 500,
            y: 500,
            style: {
                width: 100,
                height: 100,
                color: "#000000",
                alliesColor: "#00FF00",
                enemiesColor: "#FF0000"
            }
        },
        texts: [
            {
                x: 500,
                y: 0,
                text: "score",
                style: textBaseStyle
            },
            {
                x: 500,
                y: 18,
                text: "gold",
                style: textBaseStyle
            },
            {
                x: 500,
                y: 36,
                text: "level",
                style: textBaseStyle
            },
        ]

    },
    menu: [

    ],
    player: {

    },
    enemies: [

    ]
}


var defSprite = "undf";
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

function mergeObjetcs(targetObj, newObj) {
    for (var p in newObj) {
        try {
            targetObj[p] = newObj[p].constructor == Object ? mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
        } catch (e) {
            targetObj[p] = newObj[p];
        }
    }
    return targetObj;
}