Ennemy = function (game, x, y, json) {
    this.game = game;
    this.json = json;
    Phaser.Sprite.call(this, this.game, x, y, this.json.sprite);
    this.health = this.json.health;
    this.damage = this.json.damage;
    this.speed = this.json.speed;
    this.value = this.json.value;
    this.scale.setTo(0.2, 0.2);

    this.game.physics.arcade.enable(this);

    this.body.width = this.width * 0.8;
    this.body.height = this.height * 0.8;

    this.text = game.add.text(this.x, this.y + this.height + 5, 'test', { font: '12px Arial', fill: '#fff' });

    this.animations.add('walk', null, 20, true);
    this.play('walk');

    if (this.json.explosion) {
        this.explosions = this.game.add.group(game, this, 'deathExplosions');

        for (var i = 0; i < 5; i++) {
            var explosionAnimation = this.explosions.create(0, 0, this.json.explosion, [0], false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            //explosionAnimation.scale.setTo(0.25, 0.25);
            explosionAnimation.animations.add(this.json.explosion);
        }
    }

    //this.scale.setTo(0.5, 0.5);
    this.anchor.setTo(0.5, 0.5);
    this.events.onKilled.add(this.onKilledFunction, this);

}

Ennemy.prototype = Object.create(Phaser.Sprite.prototype);
Ennemy.prototype.constructor = Ennemy;
Ennemy.prototype.update = function () {
    this.rotation = this.game.physics.arcade.angleToXY(this, this.game.turret.x, this.game.turret.y);
    this.game.physics.arcade.moveToXY(this, this.game.turret.x, this.game.turret.y, this.speed);
    this.updateText();

    //if (this.parent.isPlayer) this.rotation = Phaser.Math.angleBetween(this.world.x, this.world.y, game.input.activePointer.worldX, game.input.activePointer.worldY) - this.parent.rotation + (Math.PI / 2);
};

Ennemy.prototype.updateText = function () {
    this.text.x = this.x - 15;
    this.text.y = this.y - this.height + 25;
    this.text.setText(this.health);
}

Ennemy.prototype.explode = function (damage) {
    this.kill();
}

Ennemy.prototype.hit = function (damage) {
    this.health -= damage;

    if (this.health <= 0) this.kill();
}

Ennemy.prototype.onKilledFunction = function (ennemy) {
    if (this.json.explosion) {
        var explosionAnimation = this.explosions.getFirstExists(false);
        explosionAnimation.reset(this.x, this.y);
        explosionAnimation.play(this.json.explosion, 30, false, true);
    }
    this.game.ennemyKill(this);
    this.text.destroy();
    this.destroy();
}