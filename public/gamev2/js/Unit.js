Unit = function (game, x, y, obj) {
    Phaser.Sprite.call(this, game, x, y, obj.sprite);

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.onCollide, this);

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);

    this.obj = obj;
    this.health = this.obj.health;
    this.weapons = [];

    if (this.obj.weapons) {
        this.obj.weapons.forEach((weapon) => {
            this.weapons.push(new Weapon(this.game, this, weapon));
        });
    }
}

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;
Unit.prototype.update = function () {

};

Unit.prototype.onCollide = function (thisUnit, otherUnit) {

}

Unit.prototype.onOverlap = function (thisUnit, otherUnit) {

}

Unit.prototype.hitAll = function () {
    if (this.weapons) {
        this.weapons.forEach((weapon) => {
            weapon.fire();
        });
    }
}

Unit.prototype.hit = function (i) {
    if (this.weapons[i]) this.weapons[i].fire();
}