Unit = function (game, config) {
    this.setupConfiguration(config);

    Phaser.Sprite.call(this, game, this.myConfig.x, this.myConfig.y, this.myConfig.sprite);

    this.value = this.myConfig.value;
    this.health = this.myConfig.health;
    this.upgrades = this.myConfig.upgrades;
    this.maxHealth = this.myConfig.health;
    this.turnRate = this.myConfig.turnRate;
    this.maxSpeed = this.myConfig.maxSpeed;
    this.destroyAnimation = this.myConfig.destroyAnimation;
    this.playerControlled = this.myConfig.playerControlled;
    this.accelerationRate = this.myConfig.accelerationRate;
    this.decelerationRate = this.myConfig.decelerationRate;

    this.game = game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 0.5);

    this.body.onCollide = new Phaser.Signal();
    this.body.onCollide.add(this.onCollide, this);

    this.body.onOverlap = new Phaser.Signal();
    this.body.onOverlap.add(this.onOverlap, this);

    this.events.onDestroy = new Phaser.Signal();

    this.body.collideWorldBounds = this.myConfig.playerControlled;

    this.currentSpeed = 0;
    this.collideTime = 0;

    this.healthBar = this.addChild(new HealthBar(this.game, this.myConfig.healthBar));

    this.minimapPoint = new MinimapPoint(this.game, this.myConfig.minimapPoint, this);

    this.weapons = this.game.add.group(this, "weaponsGroup", false, false);

    this.bullets = [];
    if (this.myConfig.weapons) {
        this.myConfig.weapons.forEach((weaponCfg) => {
            let weapon = new Weapon(this.game, weaponCfg, this);
            this[weapon.name] = weapon;
            this.weapons.add(weapon);
        });
    }

    if (this.myConfig.playerControlled) this.game.player = this;
}

Unit.prototype = Object.create(Phaser.Sprite.prototype);
Unit.prototype.constructor = Unit;

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

    this.myConfig = mergeObjects(this.defaultConfig, newConfig);
}

Unit.prototype.update = function () {
    if (this.game.myPause) {
        return undefined;
    }

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

Unit.prototype.upgrade = function (values) {
    let target = values.upgrade.target.split('.');
    if (target.length > 1) {
        if (values.name == 'this') {
            val = this[target[0]];
            for (let i = 1; i < target.length; i++) {
                val = val[target[i]];
            }
            val += values.upgrade.value;
            this.game.golds -= values.upgrade.cost;
        } else {

            val = this[values.name][target[0]];
            for (let i = 1; i < target.length - 1; i++) {
                val = val[target[i]];

            }
            val[target[target.length - 1]] += values.upgrade.value;
            this.game.golds -= values.upgrade.cost;

        }
    } else {
        if (values.name == 'this') {
            switch (target[0]) {
                case 'health':
                    this.health += values.upgrade.value;
                    this.maxHealth += values.upgrade.value;
                    this.game.golds -= values.upgrade.cost;
                    break;
                default:
                    this[target[0]] += values.upgrade.value;
                    this.game.golds -= values.upgrade.cost;
                    break;
            }
        } else {
            this[values.name][target[0]] += values.upgrade.value;
            this.game.golds -= values.upgrade.cost;
        }
    }
}

Unit.prototype.getMenus = function () {

    var menus = [];

    var shipMenuCfg = {
        name: 'playerMenu',
        pauseGame: true,
        buttons: [
            buttonHideMenuThis,
            {
                x: 500,
                y: 400,
                text: {
                    base: "Ship",
                    style: {
                        font: "26px Arial",
                        fill: "#FFFFFF",
                    }
                },
                action: 'showMenu',
                target: 'playerMenuShip'
            }
        ]
    };

    if (this.upgrades) {
        menus.push({
            name: 'playerMenuShip',
            pauseGame: true,
            buttons: getButtons('this', this.upgrades)
        })
    }

    var meleeWeapon = this.getMeleeWeapon();
    if (meleeWeapon.upgrades) {
        shipMenuCfg.buttons.push({
            x: 500,
            y: 450,
            text: {
                base: "Melee Weapon",
                style: {
                    font: "26px Arial",
                    fill: "#FFFFFF",
                }
            },
            action: 'showMenu',
            target: 'playerMenuMeleeWeapon'
        });


        menus.push({
            name: 'playerMenuMeleeWeapon',
            pauseGame: true,
            buttons: getButtons(meleeWeapon.name, meleeWeapon.upgrades)
        })
    }

    var j = (meleeWeapon.upgrades ? 1 : 0);
    for (let i = 0; i < this.weapons.children.length; i++) {
        if (this.weapons.children[i].upgrades && this.weapons.children[i].ranged) {
            var weapon = this.weapons.children[i];
            shipMenuCfg.buttons.push({
                x: 500,
                y: 450 + j * 50,
                text: {
                    base: "Weapon " + j,
                    style: {
                        font: "26px Arial",
                        fill: "#FFFFFF",
                    }
                },
                action: 'showMenu',
                target: 'playerMenuWeapon' + j
            });

            menus.push({
                name: 'playerMenuWeapon' + j,
                pauseGame: true,
                buttons: getButtons(weapon.name, weapon.upgrades)
            })

            j++;
        }
    }

    menus.push(shipMenuCfg);

    return menus;

    function getButtons(name, upgrades) {
        var buttons = [
            buttonHideMenuThis,
        ]

        for (let i = 0; i < upgrades.length; i++) {
            var upgrade = upgrades[i];
            buttons.push({
                x: 500,
                y: 400 + i * 50,
                text: {
                    base: upgrade.value + ' ' + upgrade.target + ' : ' + upgrade.cost + ' golds',
                    style: {
                        font: "26px Arial",
                        fill: "#FFFFFF",
                    }
                },
                action: 'upgrade',
                target: { name: name, upgrade: upgrade }
            })
        }

        return buttons;
    }

}

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

Unit.prototype.doDestroy = function () {
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