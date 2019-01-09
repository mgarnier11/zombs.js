Button = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, this.myConfig.x, this.myConfig.y, this.myConfig.sprite);

    this.game = game;
    this.offsetX = this.myConfig.x;
    this.offsetY = this.myConfig.y;
    this.text = this.addChild(new Text(this.game, this.myConfig.text))


    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(() => {
        this.onClickHandler(this, 'click');
    });
}

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        sprite: defSprite
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Button.prototype.onClick = function (handler) {
    this.onClickHandler = handler;
}