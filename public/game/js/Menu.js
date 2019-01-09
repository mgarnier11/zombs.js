Menu = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Group.call(this, game, undefined, 'menu');

    if (this.myConfig.buttons) {
        this.buttons = [];
        this.myConfig.buttons.forEach(buttonCfg => {
            this.buttons.push(this.addChild(new Button(game, buttonCfg)))
        });
    }

    this.visible = false;
    this.fixedToCamera = true;
    this.pauseGame = this.myConfig.pauseGame;
    this.game = game;
}

Menu.prototype = Object.create(Phaser.Group.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        name: 'menu',
        pauseGame: true,
        buttons: []

    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Menu.prototype.show = function () {
    if (this.pauseGame) this.game.paused = true;
    this.visible = true;
    if (this.onOpenHandler) this.onOpenHandler(this, 'show');

};

Menu.prototype.hide = function () {
    this.game.paused = false;
    this.visible = false;
    if (this.onCloseHandler) this.onCloseHandler(this, 'hide');
};

Menu.prototype.onClose = function (handler) {
    this.onCloseHandler = handler;
}

Menu.prototype.onOpen = function (handler) {
    this.onOpenHandler = handler;
}

