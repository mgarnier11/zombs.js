Button = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, 0, 0, obj.sprite);

    this.game = game;
    this.offsetX = (obj.x || 0);
    this.offsetY = (obj.y || 0);
    this.textStr = (obj.text || 'button');
    this.style = (obj.style || {});
    this.text = this.addChild(new Phaser.Text(this.game, 0 + this.offsetX, 0 + this.offsetY, this.textStr, this.style))


    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(() => {
        this.onClickHandler(this, 'click');
    });
}

Button.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        text: "Button",
        style: textBaseStyle
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
}

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.onClick = function (handler) {
    this.onClickHandler = handler;
}