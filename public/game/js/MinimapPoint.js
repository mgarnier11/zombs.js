MinimapPoint = function (game, config, unit) {
    this.setupConfiguration(config);

    this.color = this.config.color;
    this.width = this.config.width;
    this.height = this.config.height;

    this.game = game;
    this.unit = unit;
    this.minimap = this.game.hud.minimap;

    //Phaser.Sprite.call(this, game, (unit.x * 95) / game.worldWidth, (unit.y * 95) / game.worldHeight, this.getBmd(game, color, { x: 5, y: 5 }));
    Phaser.Sprite.call(this, game, 0, 0, this.getBmd());

    if (this.minimap) this.minimap.addChild(this);
    else this.kill();

}

MinimapPoint.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        height: 5,
        width: 5,
        color: "#FF0000"
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
}

MinimapPoint.prototype = Object.create(Phaser.Sprite.prototype);
MinimapPoint.prototype.constructor = MinimapPoint;

MinimapPoint.prototype.update = function () {
    let maxWidth = (this.minimap.width - this.width);
    let newX = (this.unit.x * maxWidth) / this.game.worldWidth;
    this.x = (newX < 0 ? 0 : (newX > maxWidth) ? maxWidth : newX);

    let maxHeight = (this.minimap.height - this.height);
    let newY = (this.unit.y * maxHeight) / this.game.worldHeight;
    this.y = (newY < 0 ? 0 : (newY > maxHeight) ? maxHeight : newY);
};

MinimapPoint.prototype.getBmd = function () {
    let bmd = new Phaser.BitmapData(this.game, 'minimapPoint', this.width, this.height);
    bmd.ctx.fillStyle = this.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.width, this.height);
    bmd.ctx.fill();
    return bmd;
}