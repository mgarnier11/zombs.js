MinimapPoint = function (game, unit) {
    this.unit = unit;
    this.game = game;

    let color = (unit.playerControlled ? '#00FF00' : '#FF0000');

    Phaser.Sprite.call(this, game, (unit.x * 95) / game.worldWidth, (unit.y * 95) / game.worldHeight, this.getBmd(game, color, { x: 5, y: 5 }));

    this.game.hud.minimap.addChild(this);
}

MinimapPoint.prototype = Object.create(Phaser.Sprite.prototype);
MinimapPoint.prototype.constructor = MinimapPoint;

MinimapPoint.prototype.update = function () {
    let newX = (this.unit.x * 95) / this.game.worldWidth;
    this.x = (newX < 0 ? 0 : (newX > 95) ? 95 : newX);

    let newY = (this.unit.y * 95) / this.game.worldHeight;
    this.y = (newY < 0 ? 0 : (newY > 95) ? 95 : newY);
};

MinimapPoint.prototype.getBmd = function (game, color, size) {
    let bmd = new Phaser.BitmapData(game, 'minimapPoint', (size.x || 5), (size.y || 5));
    bmd.ctx.fillStyle = color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, (size.x || 5), (size.y || 5));
    bmd.ctx.fill();
    return bmd;
}