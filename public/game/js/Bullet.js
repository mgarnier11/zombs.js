Bullet = function (game, config, parent) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, 0, 0, this.config.sprite);

    this.weapon = parent;
    this.z = this.config.z;
    this.damage = this.config.damage;
    this.lifeTime = this.config.lifespan;
    this.bulletSpeed = this.config.speed;
    this.penetrant = this.config.penetrant;
    this.hitAnimation = this.config.hitAnimation;

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);

    this.outOfBoundsKill = true;
    this.checkWorldBounds = true;

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.onCollide, this);

    this.body.onMoveComplete = new Phaser.Signal()
    this.body.onMoveComplete.add(this.onMoveComplete, this);

    this.body.stopVelocityOnCollide = !this.config.penetrant;

    this.overlapTime = 0;

    this.kill();
}

Bullet.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        z: 0,
        speed: 1000,
        damage: 1,
        lifespan: 1000,
        sprite: defSprite,
        hitAnimation: "",
        penetrant: false
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
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
    this.body.moveFrom(this.lifeTime, this.bulletSpeed, Phaser.Math.radToDeg(this.body.rotation));
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

    if (!this.penetrant) this.kill();
}