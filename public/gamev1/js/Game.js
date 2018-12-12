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
    this.scoreText = this.add.text(this.width - 160, 0, 'Score : 0', { font: '24px Arial', fill: '#fff' });
    this.livesText = this.add.text(0, 0, 'Lives : 5', { font: '24px Arial', fill: '#fff' });

    this.nextLevel();

}

Game.prototype.end = function () {
    this.paused = true;
    //this.destroy();
}


Game.prototype.nextLevel = function () {
    this.level++;
    this.spawnEnnemies(parseInt((19 * this.level - 11) / 8));
}

Game.prototype.ennemyKill = function (ennemy) {
    this.score++;
    this.scoreText.setText('Score : ' + this.score);
    if (this.ennemies.children.length == 1) {
        this.nextLevel();
    }
}

Game.prototype.spawnEnnemies = function (nb) {
    console.log(nb + ' ennemies in this wave');
    for (let index = 0; index < nb; index++) {
        var distBorder = intRnd(0, 400);
        var distSide = intRnd(0, (this.height + this.width) / 2);
        var ennemy;

        baseEnnemy.health = parseInt((this.level + 2) / 3);
        //baseEnnemy.damage = parseInt((this.level + 2) / 3);

        switch (intRnd(1, 4)) {
            case 1:
                ennemy = new Ennemy(this, -(distBorder), distSide, baseEnnemy);
                break;
            case 2:
                ennemy = new Ennemy(this, distSide, -(distBorder), baseEnnemy);
                break;
            case 3:
                ennemy = new Ennemy(this, this.width + distBorder, distSide, baseEnnemy);
                break;
            case 4:
                ennemy = new Ennemy(this, distSide, this.height + distBorder, baseEnnemy);
                break;
        }
        this.ennemies.add(ennemy);
    }
}