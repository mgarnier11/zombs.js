Weapon = function (game, parent, obj) {
    Phaser.Sprite.call(this, game, (parent.x | obj.x), (parent.y | obj.y), obj.sprite);

    this.game = game;
    this.anchor.setTo(0.5, 0.5);

    this.obj = obj;
    this.ammos = obj.ammos;

    if (parent != null) {
        this.parent = parent;

        this.offsetY = this.obj.x;
        this.offsetX = this.obj.y;
        this.bulletRotation = (this.obj.rotation | 0);
    }

    this.bullets = [];
    this.bulletTime = 0;

    for (let i = 0; i < this.ammos; i++) {
        this.bullets.push(new Bullet(this.game, this, obj.bullet))
    }
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.fire = function (bullet, target) {
    if (this.game.time.now > this.bulletTime) {
        bullet = this.getNextBullet(false);

        if (bullet) {
            bullet.fire();
            this.bulletTime = game.time.now + this.obj.reload;
        }
    }
}

Weapon.prototype.getNextBullet = function (exists = true) {
    var rBullet = null;
    for (var bullet of this.bullets) {
        rBullet = bullet;
        if (bullet.exists == exists) break;
    }

    return rBullet;
}