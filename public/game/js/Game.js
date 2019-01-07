Game = function (width = 800, height = 600, worldWidth = 0, worldHeight = 0, renderer = Phaser.Auto, parent = '', state = null, transparent = false, antialias = true, physicsConfig = null) {
    Phaser.Game.call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig);
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.level = 0;
    this.score = 0;
    this.golds = 0;

}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.init = function () {

    this.world.setBounds(0, 0, this.worldWidth, this.worldHeight);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.land = this.add.tileSprite(0, 0, this.width, this.height, 'sky');
    this.land.fixedToCamera = true;

    this.hud = new Hud(this, 0, 0);
    this.add.existing(this.hud);

    this.menu = new Menu(this);
    /*
        this.menu.addEventListener('onClose', (menu) => {
            this.nextLevel();
        })
    */
    this.add.existing(this.menu);


    this.animations = this.add.group(undefined, 'animations');

    this.enemies = this.add.group(undefined, 'enemies');
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

Game.prototype.unitDestroyed = function (unit) {
    this.score++;
    this.golds += unit.value;
    //this.scoreText.setText('Score : ' + this.score);
    if (this.enemies.children.length == 1) {
        this.menu.show();
        //this.nextLevel();
    }
}

Game.prototype.spawnEnemies = function (nb) {
    console.log(nb + ' enemies in this wave');
    for (let index = 0; index < nb; index++) {
        let x = intRnd(0, this.worldWidth);
        let y = intRnd(0, this.worldHeight);
        let type = intRnd(0, enemies.length - 1);
        let enemy = new Unit(this, x, y, enemies[type]);
        this.enemies.add(enemy);
    }


    this.world.bringToTop(this.enemies);
    this.world.bringToTop(this.animations);
    this.world.bringToTop(this.hud);
}

Game.prototype.enemiesLeft = function () {
    return this.enemies.count();
}