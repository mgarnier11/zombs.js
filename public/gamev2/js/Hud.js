Hud = function (game, x, y) {

    Phaser.Sprite.call(this, game, 0, 0, 'hud1');

    this.game = game;
    this.fixedToCamera = true;

    this.minimap = this.addChild(new Minimap(game, 500, 500));

    this.text = this.game.add.text(500, 0, "Level : 0\nScore : 0\nGolds : 0", {
        font: "18px Arial",
        fill: "#FFFFFF",
        align: 'right',
        boundsAlignH: 'right'
    })
    //this.text.anchor.setTo(0.5, 0.5);
    this.text.fixedToCamera = true;

}

Hud.prototype = Object.create(Phaser.Sprite.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function () {
    this.minimap.update();
    this.text.setText("Level : " + this.game.level + " \nScore : " + this.game.score + "\nGolds : 23");
};