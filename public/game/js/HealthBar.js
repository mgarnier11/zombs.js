var HealthBar = function (game, config) {
    this.setupConfiguration(config);

    this.game = game;
    this.baseX = this.config.x;
    this.baseY = this.config.y;

    Phaser.Sprite.call(this, game, this.baseX, this.baseY, this.getBmp(this.config.bgColor));

    this.fgBar = this.addChild(new Phaser.Sprite(game, 0, 0, this.getBmp(this.config.fgColor)));
};

HealthBar.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        width: 64,
        height: 8,
        bgColor: '#FF0000',
        fgColor: '#00FF00',
        x: -35,
        y: -40
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
}

HealthBar.prototype.constructor = HealthBar;
HealthBar.prototype = Object.create(Phaser.Sprite.prototype);

HealthBar.prototype.update = function (percent = 100) {
    var dist = Phaser.Math.distance(0, 0, this.baseX, this.baseY);
    var angle = Phaser.Math.angleBetween(0, 0, this.baseX, this.baseY);
    this.x = (dist * Math.cos(-(this.parent.rotation) + angle));
    this.y = (dist * Math.sin(-(this.parent.rotation) + angle));
    this.rotation = -(this.parent.rotation);
    this.setPercent(percent);
}

HealthBar.prototype.getBmp = function (color) {
    let bmd = new Phaser.BitmapData(this.game, 'healthBar', this.config.width, this.config.height);
    bmd.ctx.fillStyle = color;
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, this.config.width, this.config.height);
    bmd.ctx.fill();
    return bmd;
}

HealthBar.prototype.setPercent = function (newValue) {
    if (newValue < 0) newValue = 0;
    if (newValue > 100) newValue = 100;

    var newWidth = (newValue * 64) / 100;

    this.setWidth(newWidth);
};

HealthBar.prototype.setWidth = function (newWidth) {
    this.fgBar.width = newWidth;
}; 