Weapon = function (game, obj) {
    Phaser.Sprite.call(this, game, obj.x, obj.y, obj.sprite);

    this.game = game;
    this.anchor.setTo(0.5, 0.5);

    this.obj = obj;
    this.reload = this.obj.reload;
    this.damage = this.obj.damage;
    this.range = this.obj.range;
    this.action = this.obj.action;

    /*
        if (parent != null) {
            this.parent = parent;
    
            this.offsetY = this.obj.x;
            this.offsetX = this.obj.y;
            this.bulletRotation = (this.obj.rotation | 0);
        }
    
        */
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.prototype.constructor = Weapon;
Weapon.prototype.update = function () {
    if (this.parent.playerControlled) {
        this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.input.activePointer.x, this.game.input.activePointer.y) - this.parent.rotation;
        var input = this.game.input.activePointer[this.action + 'Button'];
        if (input && input.isDown) {

        }
    } else {
        if (this.game.player) {
            this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.player.x, this.game.player.y) - this.parent.rotation;


        }
    }
}

Weapon.prototype.fire = function () {
    if (this.game.time.now > this.bulletTime) {
        bullet = this.bullets.getFirstExists(false);

        if (bullet) {
            var dist = Phaser.Math.distance(this.parent.parentX, this.parent.parentY, this.outX, this.outY);
            var angle = Phaser.Math.angleBetween(this.parent.parentX, this.parent.parentY, this.outX, this.outY);
            bullet.reset(this.parent.world.x + (dist * Math.cos(this.parent.worldRotation + angle)), this.parent.world.y + (dist * Math.sin(this.parent.worldRotation + angle)));
            bullet.lifespan = this.json.lifespan;
            bullet.body.rotation = this.parent.worldRotation + Phaser.Math.degToRad(this.bulletRotation);
            bullet.rotation = bullet.body.rotation;

            bullet.body.moveFrom(this.json.lifespan, this.json.speed, Phaser.Math.radToDeg(bullet.body.rotation)); //Arcade

            this.bulletTime = game.time.now + this.json.reload;
        }
    }
}