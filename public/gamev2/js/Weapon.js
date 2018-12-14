Weapon = function (game, obj) {
    Phaser.Sprite.call(this, game, obj.x, obj.y, obj.sprite);

    this.game = game;
    this.anchor.setTo(0.3, 0.5);

    this.obj = obj;
    this.reload = this.obj.reload;
    this.damage = this.obj.damage;
    this.range = this.obj.range;
    this.action = this.obj.action;
    this.turnRate = this.obj.turnRate;
    this.multiShot = this.obj.multiShot;

    this.bulletTime = 0;
    //this.game.add = new Phaser.Group(this.game, this, "bullets", false, true, Phaser.Physics.ARCADE);
    this.bullets = this.game.add.group(undefined, "bulletsGroup", false, true, Phaser.Physics.ARCADE);

    //this.addChild(this.bullets);
    if (this.obj.bullet) {
        for (let index = 0; index < this.obj.ammos; index++) {
            this.bullets.add(new Bullet(this.game, this, this.obj.bullet));
        }
    }
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.prototype.constructor = Weapon;
Weapon.prototype.update = function () {
    if (this.parent.playerControlled) {
        /*
        let angleToPointer = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.input.activePointer.x, this.game.input.activePointer.y) - this.worldRotation;

        if (angleToPointer > 0.10) {
            if (angleToPointer > 3.14) this.angle -= this.turnRate;
            else this.angle += this.turnRate;
        }
        else if (angleToPointer < 0.10) {
            if (angleToPointer < -3.14) this.angle += this.turnRate;
            else this.angle -= this.turnRate;
        }
        */
        this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.input.activePointer.x, this.game.input.activePointer.y) - this.parent.rotation;
        var input = this.game.input.activePointer[this.action + 'Button'];
        if (input && input.isDown) {
            this.fire();
        }
    } else {
        if (this.game.player) {
            /*
            let angleToPlayer = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.player.x, this.game.player.y) - this.worldRotation;
            if (angleToPlayer > 0.10) {
                if (angleToPlayer > 3.14) this.angle -= this.turnRate;
                else this.angle += this.turnRate;
            }
            else if (angleToPlayer < 0.10) {
                if (angleToPlayer < -3.14) this.angle += this.turnRate;
                else this.angle -= this.turnRate;
            }
            */

            this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.player.x, this.game.player.y) - this.parent.rotation;
        }
    }
}

Weapon.prototype.fire = function () {
    if (this.game.time.now > this.bulletTime) {
        this.bulletTime = game.time.now + this.reload;
        if (this.multiShot > 1) {
            let baseAngle = (-(2.5) * (this.multiShot - 1));
            for (let i = 0; i < this.multiShot; i++) {
                let bullet = this.bullets.getFirstExists(false);
                if (bullet) bullet.fire(baseAngle + (i * 5));
            }
        } else {
            let bullet = this.bullets.getFirstExists(false);
            if (bullet) bullet.fire();

        }
    }
}