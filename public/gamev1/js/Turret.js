Turret = function (game, x, y, json) {
    //this.parent = parent;
    this.game = game;
    this.json = json;
    Phaser.Sprite.call(this, this.game, x, y, this.json.sprite);
    this.health = this.json.health;
    this.game.physics.arcade.enable(this);
    this.parentX = 0//this.json.x;
    this.parentY = 0//this.json.y;
    //this.scale.setTo(0.5, 0.5);
    this.anchor.setTo(0.5, 0.5);
    this.guns = [];
    this.secondaryGuns = [];
    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.collide, this);

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.overlap, this);

    this.body.immovable = true;
    if (parent.teamColor) this.tint = parent.teamColor;
    if (this.json.guns) {
        this.json.guns.forEach((jsonGun) => {
            var gun = new Gun(this.game, this, jsonGun)
            this.guns.push(gun);
            //this.addChild(gun);
        });
    }

    if (this.json.secondaryGuns) {
        this.json.secondaryGuns.forEach((jsonGun) => {
            var gun = new Gun(this.game, this, jsonGun)
            this.secondaryGuns.push(gun);
            //this.addChild(gun);
        });
    }
}

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;
Turret.prototype.update = function () {
    this.rotation = this.game.physics.arcade.angleToPointer(this);

    //if (this.parent.isPlayer) this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, game.input.activePointer.worldX, game.input.activePointer.worldY) - this.parent.rotation + (Math.PI / 2);
};

Turret.prototype.fire = function (i) {
    if (i) {
        if (this.guns) {
            this.guns.forEach((gun) => {
                gun.fire();
            })
        }
    } else {
        if (this.secondaryGuns) {
            this.secondaryGuns.forEach((gun) => {
                gun.fire();
            })
        }
    }
}

Turret.prototype.collide = function (turret, obj) {
    if (obj instanceof Ennemy) {
        this.hit(obj.damage);
        obj.kill();
    }
}

Turret.prototype.overlap = function (turret, obj) {
    if (obj instanceof Ennemy) {
        this.hit(obj.damage);
        obj.kill();
    }
}

Turret.prototype.hit = function (damage) {
    console.log(this.health);


    this.health -= damage;

    this.game.livesText.setText('Lives : ' + this.health);

    if (this.health <= 0) {
        this.game.end();
        this.destroy();
    }
}