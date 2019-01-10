Weapon = function (game, config, parent) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, this.myConfig.x, this.myConfig.y, this.myConfig.sprite);

    this.unit = parent;
    this.name = this.myConfig.name;
    this.reload = this.myConfig.reload;
    this.damage = this.myConfig.damage;
    this.ranged = this.myConfig.ranged;
    this.action = this.myConfig.action;
    this.rotative = this.myConfig.rotative;
    this.turnRate = this.myConfig.turnRate;
    this.multiShot = this.myConfig.multiShot;

    this.game = game;
    this.anchor.setTo(0.3, 0.5);

    if (this.ranged) {
        this.bulletTime = 0;


        this.bullets = this.game.add.group(undefined, "bulletsGroup", false, true, Phaser.Physics.ARCADE);

        if (this.myConfig.bullet && this.myConfig.bullet.sprite) {
            this.damage = this.myConfig.bullet.damage;
            for (let index = 0; index < this.myConfig.ammos; index++) {
                this.bullets.add(new Bullet(this.game, this.myConfig.bullet, this));
            }
        }
        this.unit.bullets.push(this.bullets);
    }
}

Weapon.prototype = Object.create(Phaser.Sprite.prototype);
Weapon.prototype.constructor = Weapon;

Weapon.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        name: "weapon",
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

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

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