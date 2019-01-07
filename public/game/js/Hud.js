Hud = function (game, x, y) {

    Phaser.Group.call(this, game, undefined, 'hud');

    this.minimap = this.addChild(new Minimap(game, 500 + x, 500 + y, 'minimap0'));

    this.scoreDisplay = this.addChild(new Phaser.Text(game, 500 + x, 0 + y, "Level : 0\nScore : 0\nGolds : 0", {
        font: "18px Arial",
        fill: "#FFFFFF",
        align: 'right',
        boundsAlignH: 'right'
    }));

    this.enemiesLeft = this.addChild(new Phaser.Text(game, 350 + x, 582 + y, "Enemies Left : 0", {
        font: "18px Arial",
        fill: "#FFFFFF",
        align: 'right',
        boundsAlignH: 'right'
    }))

    this.fixedToCamera = true;
    this.game = game;
    this.offsetX = x;
    this.offsetY = y;
}

Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;

Hud.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    })

    this.scoreDisplay.setText("Level : " + this.game.level + " \nScore : " + this.game.score + "\nGolds : " + this.game.golds + "\n");
    this.enemiesLeft.setText("Enemies Left : " + this.game.enemiesLeft());
};