Game = function (config) {
    this.setupConfiguration(config);

    Phaser.Game.call(this, this.config.width, this.config.height);

    this.level = this.config.level;
    this.score = this.config.score;
    this.golds = this.config.golds;
}

Game.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        width: 600,
        height: 600,
        worldWidth: 2000,
        worldHeight: 2000,
        level: 0,
        score: 0,
        golds: 0
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.init = function () {

    this.world.setBounds(0, 0, this.config.worldWidth, this.config.worldHeight);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.land = this.add.tileSprite(0, 0, this.width, this.height, 'sky');
    this.land.fixedToCamera = true;

    this.animations = this.add.group(undefined, 'animations');

    /*
    this.hud = new Hud(this, 0, 0);
    this.add.existing(this.hud);

    this.menu = new Menu(this);
    this.menu.onClose((e) => {
        console.log(e);
    })
    this.add.existing(this.menu);


    

    this.enemies = this.add.group(undefined, 'enemies');
    */
}

Game.prototype.start = function (level) {
    this.level = (level || 0);
    this.score = 0;
    this.golds = 0;

    this.nextLevel();
}

Game.prototype.end = function () {
    this.paused = true;
    //this.destroy();
}


Game.prototype.nextLevel = function () {
    this.level++;
    this.spawnEnemies(parseInt(this.level * 2));
}

Game.prototype.onUnitDestroyed = function (unit) {
    this.score++;
    this.golds += unit.value;
}

Game.prototype.unitDestroyed = function (unit) {
    this.score++;
    this.golds += unit.value;
    if (this.enemies.children.length == 1) {
        //this.menu.show();
        //this.nextLevel();
    }
}

Game.prototype.spawnEnemies = function (nb) {
    console.log(nb + ' enemies in this wave');
    for (let index = 0; index < nb; index++) {
        let x = intRnd(0, this.config.worldWidth);
        let y = intRnd(0, this.config.worldHeight);
        let type = intRnd(0, enemies.length - 1);
        let enemy = new Unit(this, x, y, enemies[type]);
        enemy.onDestroy(this.onUnitDestroyed);
        this.enemies.add(enemy);
    }


    this.world.bringToTop(this.enemies);
    this.world.bringToTop(this.animations);
    this.world.bringToTop(this.hud);
}

Game.prototype.enemiesLeft = function () {
    return this.enemies.count();
}