Menu = function (game) {
    Phaser.Group.call(this, game, undefined, 'menu');

    this.fixedToCamera = true;
    this.game = game;

    this.test = this.addChild(new Minimap(game, 100, 100, 'minimap0'));
    this.test.inputEnabled = true;

    this.test.events.onInputDown.add(() => {
        this.hide();
    });

    this.onOpen = new CustomEvent('onOpen');
    this.onClose = new CustomEvent('onClose');

    this.visible = false;

}

Menu.prototype = Object.create(Phaser.Group.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.show = function () {
    console.log(this);
    this.game.paused = true;
    this.visible = true;
    this.dispatchEvent(this.onOpen);
};

Menu.prototype.hide = function () {
    this.game.paused = false;
    this.visible = false;
    this.dispatchEvent(this.onClose);
};

Menu.prototype.onClick = function (e) {
    console.log('click');
    console.log(e);
}