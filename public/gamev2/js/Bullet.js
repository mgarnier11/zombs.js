Bullet = function (game, parent, obj) {
    Phaser.Sprite.call(this, game, parent.x, parent.y, obj.sprite);

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);


    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);

    this.obj = obj;
    this.parent = parent;
    this.lifespan = obj.lifespan;
    this.damage = obj.damage;
    this.bulletSpeed = obj.speed;

    this.kill();
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function () {

    this.reset(this.parent.world.x, this.parent.world.y);
    this.body.rotation = this.parent.worldRotation + Phaser.Math.degToRad(this.parent.bulletRotation);
    this.rotation = this.body.rotation;

    this.body.moveFrom(5000); //Arcade
}

Bullet.prototype.onCollide = function (thisBullet, otherBullet) {

}

Bullet.prototype.onOverlap = function (thisBullet, otherBullet) {

}