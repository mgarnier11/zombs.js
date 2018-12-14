Bullet = function (game, parent, obj) {
    Phaser.Sprite.call(this, game, 0, 0, obj.sprite);

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.onCollide, this);
    this.body.stopVelocityOnCollide = !obj.penetrant;
    this.body.onMoveComplete = new Phaser.Signal()
    this.body.onMoveComplete.add(this.onMoveComplete, this);

    this.obj = obj;
    this.damage = obj.damage;
    this.bulletSpeed = obj.speed;
    this.penetrant = obj.penetrant;
    this.weapon = parent;
    this.lifeTime = obj.lifespan;
    this.hitAnimation = obj.hitAnimation;

    this.overlapTime = 0;


    this.kill();
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function () {

}

Bullet.prototype.fire = function (bulletRotation = 0) {

    //this.game.world.moveUp(this.weapon.bullets);
    //this.game.world.bringToTop(this.weapon);
    this.lifespan = this.lifeTime;
    this.reset(this.weapon.world.x + (25 * Math.cos(this.weapon.worldRotation)), this.weapon.world.y + (25 * Math.sin(this.weapon.worldRotation)));
    this.body.rotation = this.weapon.worldRotation + Phaser.Math.degToRad(bulletRotation);
    this.rotation = this.body.rotation;
    this.body.moveFrom(this.weapon.range, this.bulletSpeed, Phaser.Math.radToDeg(this.body.rotation));
}

Bullet.prototype.onCollide = function (thisBullet, unit) {

}

Bullet.prototype.onOverlap = function (thisBullet, unit) {
    if (this.game.time.now > this.overlapTime) {
        this.overlapTime = this.game.time.now + 100;

        unit.damage(this.damage);

        playAnimation(this.game, (unit.world.x + this.world.x) / 2, (unit.world.y + this.world.y) / 2, this.hitAnimation);
    }
}

Bullet.prototype.onMoveComplete = function (thisBullet) {
    //this.kill();
}