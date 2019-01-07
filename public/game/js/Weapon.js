Weapon = function (game, parent, obj) {
    Phaser.Sprite.call(this, game, obj.x, obj.y, (obj.sprite || 'undf'));

    this.game = game;
    this.anchor.setTo(0.3, 0.5);

    this.obj = obj;
    this.reload = (obj.reload || 500);
    this.damage = (obj.damage || 1);
    this.ranged = (obj.ranged || false);
    this.action = (obj.action || 'auto');
    this.multiShot = (obj.multiShot || false);
    this.rotative = (obj.rotative || false);
    this.turnRate = (obj.turnRate || 4);
    this.unit = parent;

    if (this.ranged) {

        this.bulletTime = 0;
        //this.game.add = new Phaser.Group(this.game, this, "bullets", false, true, Phaser.Physics.ARCADE);
        this.bullets = this.game.add.group(undefined, "bulletsGroup", false, true, Phaser.Physics.ARCADE);

        //this.addChild(this.bullets);
        if (this.obj.bullet && this.obj.bullet.sprite) {
            for (let index = 0; index < this.obj.ammos; index++) {
                this.bullets.add(new Bullet(this.game, this, this.obj.bullet));
            }
        }

        this.unit.bullets.push(this.bullets);

    }
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.prototype.constructor = Weapon;
Weapon.prototype.update = function () {

    if (this.unit.playerControlled) {
        if (this.rotative) {
            this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.input.activePointer.worldX, this.game.input.activePointer.worldY) - this.unit.rotation;
            //this.rotation = Phaser.Math.angleBetween(this.game.input.mousePointer.x, this.game.input.mousePointer.y, this.world.x, this.world.y) - this.unit.rotation + (Math.PI);
            //turret.rotation = Phaser.Math.angleBetween(game.input.mousePointer.x, game.input.mousePointer.y, turret.x, turret.y) + (Math.PI);
            /*
            let angleToPointer = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.input.activePointer.x, this.game.input.activePointer.y) - this.unit.rotation;

            if (angleToPointer > 0.10) {
                if (angleToPointer > 3.14) this.angle -= this.turnRate;
                else this.angle += this.turnRate;
            }
            else if (angleToPointer < 0.10) {
                if (angleToPointer < -3.14) this.angle += this.turnRate;
                else this.angle -= this.turnRate;
            }
                        */
        }

        if (this.action == 'auto') {
            if (this.ranged) this.fire();
        } else {
            let input = this.game.input.activePointer[this.action + 'Button'];
            if (input && input.isDown) {
                if (this.ranged) this.fire();
            }
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

            if (this.rotative) {
                this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, this.game.player.x, this.game.player.y) - this.unit.rotation;
            }


            if (this.action == 'auto') {
                if (this.ranged) this.fire();
            }
        }
    }
}

Weapon.prototype.fire = function () {
    if (this.game.time.now > this.bulletTime) {
        this.bulletTime = this.game.time.now + this.reload;
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