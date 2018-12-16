Game = function (width = 800, height = 600, renderer = Phaser.Auto, parent = '', state = null, transparent = false, antialias = true, physicsConfig = null) {
    Phaser.Game.call(this, width, height, renderer, parent, state, transparent, antialias, physicsConfig);
    this.level = 0;
    this.score = 0;
}

Game.prototype = Object.create(Phaser.Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.start = function (level) {
    this.level = (level | 0);
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
        var distBorder = intRnd(0, 400);
        var distSide = intRnd(0, (this.height + this.width) / 2);
        var type = intRnd(0, ennemies.length - 1);
        var ennemy;

        //baseEnnemy.health = parseInt((this.level + 2) / 3);
        //baseEnnemy.damage = parseInt((this.level + 2) / 3);

        switch (intRnd(1, 4)) {
            case 1:
                ennemy = new Unit(this, -(distBorder), distSide, ennemies[type]);
                break;
            case 2:
                ennemy = new Unit(this, distSide, -(distBorder), ennemies[type]);
                break;
            case 3:
                ennemy = new Unit(this, this.width + distBorder, distSide, ennemies[type]);
                break;
            case 4:
                ennemy = new Unit(this, distSide, this.height + distBorder, ennemies[type]);
                break;
        }
        this.ennemies.add(ennemy);
    }
}