Menu = function (game, obj) {
    Phaser.Group.call(this, game, undefined, 'menu');

    this.fixedToCamera = true;
    this.game = game;

    let buttonObj = {
        "text": "testButton",
        "style": {

        }
    }

    this.button = this.addChild(new Button(game, buttonObj));
    this.button.onClick((e) => {
        console.log(e);
    })

    this.visible = false;

}

Menu.prototype = Object.create(Phaser.Group.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.show = function () {
    console.log(this);
    this.game.paused = true;
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

