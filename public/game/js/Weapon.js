Weapon = function (game, config, parent) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, this.config.x, this.config.y, this.config.spite);

    this.unit = parent;
    this.reload = this.config.reload;
    this.damage = this.config.damage;
    this.ranged = this.config.ranged;
    this.action = this.config.action;
    this.rotative = this.config.rotative;
    this.turnRate = this.config.turnRate;
    this.multiShot = this.config.multiShot;

    this.game = game;
    this.anchor.setTo(0.3, 0.5);

    if (this.ranged) {
        this.bulletTime = 0;

        this.bullets = this.game.add.group(undefined, "bulletsGroup", false, true, Phaser.Physics.ARCADE);

        if (this.config.bullet && this.config.bullet.sprite) {
            for (let index = 0; index < this.config.ammos; index++) {
                this.bullets.add(new Bullet(this.game, this.config.bullet, this));
            }
        }
        this.unit.bullets.push(this.bullets);
    }
}

Weapon.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        damage: 1,
        reload: 500,
        sprite: defSprite,
        turnRate: 4,
        rotative: false,
        ranged: false,
        multishot: 1,
        ammos: 10,
        action: "auto"
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
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