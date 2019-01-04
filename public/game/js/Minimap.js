Minimap = function (game, x, y, sprite) {
    Phaser.Sprite.call(this, game, x, y, sprite);
    this.game = game;
}

Minimap.prototype = Object.create(Phaser.Sprite.prototype);
Minimap.prototype.constructor = Minimap;

Minimap.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    });
};