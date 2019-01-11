var Game = function (config, parent, state) {
    this.setupConfiguration(config);


    Phaser.Game.call(this, this.myConfig.width, this.myConfig.height, Phaser.AUTO, parent, state);

    this.level = this.myConfig.level;
    this.score = this.myConfig.score;
    this.golds = this.myConfig.golds;
    this.worldWidth = this.myConfig.worldWidth;
    this.worldHeight = this.myConfig.worldHeight;
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

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

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Game.prototype.init = function () {

    this.world.setBounds(0, 0, this.myConfig.worldWidth, this.myConfig.worldHeight);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.land = this.add.tileSprite(0, 0, this.width, this.height, 'sky');
    this.land.fixedToCamera = true;

    this.animations = this.add.group(undefined, 'animations');
    this.enemies = this.add.group(undefined, 'enemies');

    console.log(this.myConfig);

    if (this.myConfig.hud) {
        this.hud = new Hud(this, this.myConfig.hud);
        this.add.existing(this.hud);
    }

    if (this.myConfig.player) {
        this.player = new Unit(this, this.myConfig.player);
        this.add.existing(this.player);


        this.player.weapons.children.forEach(weapon => {
            if (weapon.myConfig.bullet && weapon.myConfig.bullet.z >= 1) {
                this.world.bringToTop(weapon.bullets);
            }
        })
    }

    if (this.myConfig.menus) {
        this.menus = {};

        this.myConfig.menus.forEach(menu => {
            this.menus[menu.name] = new Menu(this, menu);
            this.add.existing(this.menus[menu.name]);
        });

        var menus = this.player.getMenus();

        menus.forEach(menu => {
            this.menus[menu.name] = new Menu(this, menu);
            this.add.existing(this.menus[menu.name]);
        })
    }


    /*
    this.hud = new Hud(this, 0, 0);
    this.add.existing(this.hud);

    this.menu = new Menu(this);
    this.menu.onClose((e) => {
        console.log(e);
    })
    this.add.existing(this.menu);


    

    */


    this.world.bringToTop(this.enemies);
    this.world.bringToTop(this.animations);
    this.world.bringToTop(this.hud);
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
    if (this.enemies.children.length == 1) {
        this.nextLevel();
    }
}

Game.prototype.spawnEnemies = function (nb) {
    console.log(nb + ' enemies in this wave');
    for (let index = 0; index < nb; index++) {
        let type = intRnd(0, this.myConfig.enemiesConfig.length - 1);
        let enemyCfg = this.myConfig.enemiesConfig[type];
        enemyCfg.x = intRnd(0, this.worldWidth);
        enemyCfg.y = intRnd(0, this.worldHeight);

        let enemy = new Unit(this, enemyCfg);
        enemy.events.onDestroy.add(this.unitDestroyed, this);
        this.enemies.add(enemy);
    }


    this.world.bringToTop(this.enemies);
    this.world.bringToTop(this.animations);
    this.world.bringToTop(this.hud);
}

Game.prototype.enemiesLeft = function () {
    return this.enemies.count();
}