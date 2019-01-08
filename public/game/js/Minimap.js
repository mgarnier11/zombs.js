Minimap = function (game, obj) {

    this.style = (obj.style || {
        color: "#000000",
        alliesColor: "#00FF00",
        enemiesColor: "#FF0000",
        width: 100,
        height: 100
    });
    this.baseX = (obj.x || 0);
    this.baseY = (obj.y || 0);
    this.game = game;

    Phaser.Sprite.call(this, game, this.baseX, this.baseY, this.getBitmap());
}

Minimap.prototype = Object.create(Phaser.Sprite.prototype);
Minimap.prototype.constructor = Minimap;

Minimap.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    });
}


Minimap.prototype.getBitmap = function () {
    let bitmapData = new Phaser.BitmapData(game, 'minimapPoint', this.style.width, this.style.height);
    bitmapData.ctx.fillStyle = color;
    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0, 0, this.style.width, this.style.height)
    bitmapData.ctx.fill();
    return bitmapData;
}