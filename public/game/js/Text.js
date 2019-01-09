Text = function (game, config) {
    this.setupConfiguration(config);

    this.game = game;

    Phaser.Text.call(this, game, this.myConfig.x, this.myConfig.y, this.textBuilder(), this.myConfig.style);
}

Text.prototype = Object.create(Phaser.Text.prototype);
Text.prototype.constructor = Text;

Text.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        text: "",
        style: textBaseStyle
    }

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Text.prototype.update = function () {
    this.setText(this.textBuilder());
}

Text.prototype.textBuilder = function () {
    return this.myConfig.text + ' : ' + this.game[this.myConfig.text];
}