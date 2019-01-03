MinimapPoint = function (game, unit) {
    this.game = game;
    this.unit = unit;

    let color = (this.unit.playerControlled ? '#00FF00' : '#FF0000');

    Phaser.Sprite.call(this, game, (unit.x * 95) / game.worldWidth, (unit.y * 95) / game.worldHeight, this.getBmd(color));
}

MinimapPoint.prototype = Object.create(Phaser.Sprite.prototype);
MinimapPoint.prototype.constructor = MinimapPoint;

MinimapPoint.prototype.update = function () {
    this.x = (this.unit.x * 95) / this.game.worldWidth;
    this.y = (this.unit.y * 95) / this.game.worldHeight;
};

MinimapPoint.prototype.getBmd = function (color) {
    let bmd = new Phaser.BitmapData(this.game, 'minimapPoint', 5, 5);
    bmd.ctx.fillStyle = color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 5, 5);
    bmd.ctx.fill();
    return bmd;
}