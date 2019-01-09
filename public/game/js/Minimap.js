Minimap = function (game, config) {
    this.setupConfiguration(config);

    this.style = this.myConfig.style;
    this.baseX = this.myConfig.x;
    this.baseY = this.myConfig.y
    this.game = game;

    Phaser.Sprite.call(this, game, this.myConfig.x, this.myConfig.y, this.getBitmap());
}

Minimap.prototype = Object.create(Phaser.Sprite.prototype);
Minimap.prototype.constructor = Minimap;

Minimap.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 500,
        y: 500,
        style: {
            width: 100,
            height: 100,
            color: "#000000",
            alliesColor: "#00FF00",
            enemiesColor: "#FF0000"
        }
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Minimap.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    });
}


Minimap.prototype.getBitmap = function () {
    let bitmapData = new Phaser.BitmapData(this.game, 'minimapPoint', this.style.width, this.style.height);
    bitmapData.ctx.fillStyle = this.style.color;
    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0, 0, this.style.width, this.style.height)
    bitmapData.ctx.fill();
    return bitmapData;
}