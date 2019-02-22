Hud = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Group.call(this, game, undefined, 'hud');

    if (this.myConfig.minimap) {
        this.minimap = this.addChild(new Minimap(game, this.myConfig.minimap));
    }

    if (this.myConfig.texts) {
        this.texts = [];
        this.myConfig.texts.forEach(textCfg => {
            this.texts.push(this.addChild(new Text(game, textCfg)))
        });
    }

    if (this.myConfig.buttons) {
        this.buttons = [];
        this.myConfig.buttons.forEach(buttonCfg => {
            this.buttons.push(this.addChild(new Button(game, buttonCfg)))
        });
    }
    /*
        this.button = this.addChild(new Button(game, {
            x: 100,
            y: 100,
            text: {
                value: "",
                base: "Menu",
            },
            sprite: defSprite
        }));
        this.button.onClick((e) => {
            this.game.paused = !this.game.paused;
        })
        */

    this.fixedToCamera = true;

    this.game = game;
    this.offsetX = this.myConfig.x;
    this.offsetY = this.myConfig.y;
}

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        minimap: null,
        texts: [],
        buttons: []
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Hud.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    })
};