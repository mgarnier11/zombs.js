Unit = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, this.config.x, this.config.y, this.config.sprite);

    this.value = this.config.value;
    this.health = this.config.health;
    this.maxHealth = this.config.health;
    this.turnRate = this.config.turnRate;
    this.maxSpeed = this.config.maxSpeed;
    this.destroyAnimation = this.config.destroyAnimation;
    this.playerControlled = this.config.playerControlled;
    this.accelerationRate = this.config.accelerationRate;
    this.decelerationRate = this.config.decelerationRate;

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.onCollide, this);

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);

    this.body.collideWorldBounds = this.config.playerControlled;

    this.currentSpeed = 0;
    this.collideTime = 0;

    this.healthBar = this.addChild(new HealthBar(this.game, this.config.healthBar));

    this.minimapPoint = new MinimapPoint(this.game, this.config.minimapPoint, this);

    this.weapons = this.game.add.group(this, "weaponsGroup", false, false);

    this.bullets = [];
    if (this.config.weapons) {
        this.config.weapons.forEach((weapon) => {
            this.weapons.add(new Weapon(this.game, weapon, this));
        });
    }

    if (this.config.playerControlled) this.game.player = this;
}

Unit.prototype.setupConfiguration = function (newConfig) {
    this.defaultConfig = {
        x: 0,
        y: 0,
        sprite: defSprite,
        value: 1,
        health: 10,
        turnRate: 4,
        maxSpeed: 400,
        destroyAnimation: "",
        playerControlled: false,
        accelerationRate: 4,
        decelerationRate: 4
    }

    this.config = mergeObjects(this.defaultConfig, newConfig);
}


Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

Unit.prototype.update = function () {
    this.updateWeapons();

    if (this.playerControlled) {
        if (this.game.cursors.left.isDown) this.angle -= this.turnRate;
        else if (this.game.cursors.right.isDown) this.angle += this.turnRate;

        if (this.game.cursors.up.isDown & this.currentSpeed < this.maxSpeed) {
            this.currentSpeed += this.accelerationRate;
        }
        else {
            if (this.currentSpeed > 0) {
                this.currentSpeed -= this.decelerationRate;
            }
        }

        if (this.currentSpeed > 0) {
            this.game.physics.arcade.velocityFromRotation(this.rotation, this.currentSpeed, this.body.velocity);
        } else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

        }
    } else if (this.game.player) {
        if (this.currentSpeed < this.maxSpeed) this.currentSpeed += this.accelerationRate;

        let angleToPlayer = this.game.physics.arcade.angleBetween(this, this.game.player) - this.worldRotation;

        if (angleToPlayer > 0.10) {
            if (angleToPlayer > 3.04) this.angle -= this.turnRate;
            else this.angle += this.turnRate;
        }
        else if (angleToPlayer < -0.10) {
            if (angleToPlayer < -3.04) this.angle += this.turnRate;
            else this.angle -= this.turnRate;
        }

        if (this.currentSpeed > 0) this.game.physics.arcade.velocityFromRotation(this.rotation, this.currentSpeed, this.body.velocity);

        //this.rotation = this.game.physics.arcade.angleToXY(this, this.game.player.x, this.game.player.y);

    } else {
        this.angle += 1;
    }

    this.healthBar.update(this.health * 100 / this.maxHealth);
};

Unit.prototype.onCollide = function (thisUnit, otherUnit) {
    if (this.game.time.now > this.collideTime) {

        let meleeWeapon = thisUnit.getMeleeWeapon();
        if (meleeWeapon) {
            if (meleeWeapon.action == 'auto') {
                otherUnit.damage(meleeWeapon.damage);
                this.collideTime = this.game.time.now + meleeWeapon.reload;
            }
        } else {
            this.collideTime = this.game.time.now + 50;
        }
    }
}

Unit.prototype.onOverlap = function (thisUnit, otherUnit) {

}

Unit.prototype.onDestroy = function (handler) {
    this.onDestroyHandler = handler;
}

Unit.prototype.doDestroy = function () {
    this.onDestroyHandler(this);
    this.pendingDestroy = true;
    this.minimapPoint.pendingDestroy = true;
    this.weapons.children.forEach(weapon => {
        weapon.bullets.pendingDestroy = true;
    })
    playAnimation(this.game, this.world.x, this.world.y, this.destroyAnimation);
}

Unit.prototype.damage = function (damage) {
    this.health -= damage;

    if (this.health <= 0) this.doDestroy();
}

Unit.prototype.getMeleeWeapon = function () {
    let meleeWeapon = null;
    if (this.weapons) {
        for (let weapon of this.weapons.children) {
            if (!weapon.ranged && weapon.damage > (meleeWeapon ? meleeWeapon.damage : 0)) meleeWeapon = weapon;
        }
    }
    return meleeWeapon;
}

Unit.prototype.updateWeapons = function () {
    this.weapons.forEach((weapon) => {
        weapon.update();
    })
}