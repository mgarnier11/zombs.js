Game = function (width = 800, height = 600, worldWidth = 0, worldHeight = 0, renderer = Phaser.Auto, parent = '', state = null, transparent = false, antialias = true, physicsConfig = null) {
    Phaser.Game.call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig);
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;

    this.level = 1;
    this.score = 0;
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.start = function (level) {
    this.level = (level || 1);
    this.score = 0;

    this.nextLevel();
}

Game.prototype.end = function () {
    this.paused = true;
    //this.destroy();
}


Game.prototype.nextLevel = function () {
    this.level++;
    this.spawnEnnemies(parseInt(this.level * 2));
}

Game.prototype.unitDestroyed = function (unit) {
    this.score++;
    //this.scoreText.setText('Score : ' + this.score);
    if (this.ennemies.children.length == 1) {
        this.nextLevel();
    }
}

Game.prototype.spawnEnnemies = function (nb) {
    console.log(nb + ' ennemies in this wave');
    for (let index = 0; index < nb; index++) {
        var x = intRnd(0, this.worldWidth);
        var y = intRnd(0, this.worldHeight);
        var type = intRnd(0, ennemies.length - 1);
        var ennemy = new Unit(this, x, y, ennemies[type]);
        this.ennemies.add(ennemy);
        this.hud.minimap.addChild(ennemy.minimapPoint);
    }
}