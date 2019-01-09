MinimapPoint = function (game, config, unit) {
    this.setupConfiguration(config);

    this.color = this.myConfig.color;
    this.myWidth = this.myConfig.width;
    this.myHeight = this.myConfig.height;

    this.game = game;
    this.unit = unit;
    this.minimap = this.game.hud.minimap;

    Phaser.Sprite.call(this, game, 50, 50, this.getBmd());

    if (this.minimap) this.minimap.addChild(this);
    else this.kill();
}

MinimapPoint.prototype = Object.create(Phaser.Sprite.prototype);
MinimapPoint.prototype.constructor = MinimapPoint;

MinimapPoint.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        height: 5,
        width: 5,
        color: "#FF0000"
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

MinimapPoint.prototype.update = function () {
    let maxWidth = (this.minimap.width - this.myWidth);
    let newX = (this.unit.x * maxWidth) / this.game.worldWidth;
    this.x = (newX < 0 ? 0 : (newX > maxWidth) ? maxWidth : newX);

    let maxHeight = (this.minimap.height - this.myHeight);
    let newY = (this.unit.y * maxHeight) / this.game.worldHeight;
    this.y = (newY < 0 ? 0 : (newY > maxHeight) ? maxHeight : newY);

};

MinimapPoint.prototype.getBmd = function () {
    let bmd = new Phaser.BitmapData(this.game, 'minimapPoint', this.myWidth, this.myHeight);
    bmd.ctx.fillStyle = this.color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.myWidth, this.myHeight);
    bmd.ctx.fill();
    return bmd;
}