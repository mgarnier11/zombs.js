Menu = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Group.call(this, game, undefined, 'menu');

    this.pauseGame = this.myConfig.pauseGame;
    this.shadowColor = this.myConfig.shadowColor;

    this.shadow = this.addChild(new Phaser.Sprite(game, 0, 0, this.getShadowBitmap()));

    if (this.myConfig.buttons) {
        this.buttons = [];
        this.myConfig.buttons.forEach(buttonCfg => {
            this.buttons.push(this.addChild(new Button(game, buttonCfg)))
        });
    }

    this.visible = false;
    this.fixedToCamera = true;
    this.game = game;
}

Menu.prototype = Object.create(Phaser.Group.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        name: 'menu',
        shadowColor: 'rgba(0,0,0,0.5)',
        pauseGame: true,
        buttons: []
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Menu.prototype.show = function () {
    this.parentMenu = this.getParentMenu();
    this.hideParent();
    //this.game.paused = true;
    this.game.myPause = true;
    this.game.physics.arcade.isPaused = true;
    this.visible = true;
    this.game.world.bringToTop(this);
    if (this.onOpenHandler) this.onOpenHandler(this, 'show');
};

Menu.prototype.hideParent = function () {
    if (this.parentMenu) {
        this.parentMenu.ignoreChildInput = true;
        this.parentMenu.visible = false;
    }
}

Menu.prototype.getParentMenu = function () {
    let parentMenu;
    Object.keys(this.game.menus).forEach(key => {
        let menu = this.game.menus[key];
        if (menu.visible && !menu.ignoreChildInput) parentMenu = menu;
    })
    return parentMenu;
}

Menu.prototype.hide = function () {
    this.visible = false;
    this.showParent();
    if (this.onCloseHandler) this.onCloseHandler(this, 'hide');
};

Menu.prototype.showParent = function () {
    if (this.parentMenu) {
        this.parentMenu.ignoreChildInput = false;
        this.parentMenu.visible = true;
    } else {
        //this.game.paused = false;
        this.game.myPause = false;
        this.game.physics.arcade.isPaused = false;
    }
}

Menu.prototype.onClose = function (handler) {
    this.onCloseHandler = handler;
}

Menu.prototype.onOpen = function (handler) {
    this.onOpenHandler = handler;
}

Menu.prototype.getShadowBitmap = function () {
    let bitmapData = new Phaser.BitmapData(this.game, 'shadowMenu', this.game.width, this.game.height);
    bitmapData.ctx.fillStyle = this.shadowColor;
    bitmapData.ctx.beginPath();
    bitmapData.ctx.rect(0, 0, this.game.width, this.game.height)
    bitmapData.ctx.fill();
    return bitmapData;
}

