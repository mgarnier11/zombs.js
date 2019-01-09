Hud = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Group.call(this, game, undefined, 'hud');

    if (this.myConfig.minimap) this.minimap = this.addChild(new Minimap(game, this.myConfig.minimap));

    if (this.myConfig.texts) {
        this.texts = [];
        this.myConfig.texts.forEach(text => {
            this.texts.push(this.addChild(new Text(game, text)))
        });

    }


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
        minimap: {},
        texts: []
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Hud.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    })
};