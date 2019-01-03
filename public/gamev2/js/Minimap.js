Minimap = function (game, x, y) {

    Phaser.Sprite.call(this, game, x, y, 'minimap0');

    this.game = game;
}

Minimap.prototype = Object.create(Phaser.Sprite.prototype);
Minimap.prototype.constructor = Minimap;

Minimap.prototype.update = function () {
    this.children.forEach(child => {
        child.update();
    });
};