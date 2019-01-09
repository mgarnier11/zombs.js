Button = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, this.myConfig.x, this.myConfig.y, this.myConfig.sprite);

    this.game = game;
    this.action = this.myConfig.action;
    this.target = this.myConfig.target;
    this.offsetX = this.myConfig.x;
    this.offsetY = this.myConfig.y;
    this.text = this.addChild(new Text(this.game, this.myConfig.text))


    this.inputEnabled = true;
    this.input.useHandCursor = true;
    this.events.onInputDown.add(() => {
        if (this.onClickHandler) this.onClickHandler(this, 'click');
        if (this.action) this.executeAction();

    });
}

Button.prototype = Object.create(Phaser.Sprite.prototype);
Button.prototype.constructor = Button;

Button.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        sprite: defSprite,
        action: '',
        target: ''

    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Button.prototype.executeAction = function () {
    switch (this.action) {
        case 'showMenu':
            this.game.menus[this.target].show();
            break;
        case 'hideMenu':
            this.game.menus[this.target].hide();
            break;
        default:
            console.log('noActionDefined')
            break;
    }
}

Button.prototype.onClick = function (handler) {
    this.onClickHandler = handler;
}