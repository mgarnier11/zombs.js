Bullet = function (game, parent, obj) {
    Phaser.Sprite.call(this, game, 0, 0, obj.sprite);

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);
    this.body.stopVelocityOnCollide = false;
    this.body.onMoveComplete = new Phaser.Signal()
    this.body.onMoveComplete.add(this.onMoveComplete, this);

    this.obj = obj;
    this.damage = obj.damage;
    this.bulletSpeed = obj.speed;
    this.penetrant = obj.penetrant;
    this.weapon = parent

    this.kill();
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {

}

Bullet.prototype.fire = function (bulletRotation = 0) {

    //this.game.world.moveUp(this.weapon.bullets);
    //this.game.world.bringToTop(this.weapon);
    this.reset(this.weapon.world.x, this.weapon.world.y);
    this.body.rotation = this.weapon.worldRotation + Phaser.Math.degToRad(bulletRotation);
    this.rotation = this.body.rotation;
    this.body.moveFrom(5000, 200, this.body.rotation);
    this.body.moveFrom(this.weapon.range, this.bulletSpeed, Phaser.Math.radToDeg(this.body.rotation));
    /*
    this.body.rotation = this.parent.worldRotation + Phaser.Math.degToRad(this.parent.bulletRotation);
    this.rotation = this.body.rotation;

    this.body.moveFrom(5000); //Arcade
    */

}

Bullet.prototype.onCollide = function (thisBullet, otherBullet) {

}

Bullet.prototype.onOverlap = function (thisBullet, unit) {

}

Bullet.prototype.onMoveComplete = function (thisBullet) {
    this.kill();
}