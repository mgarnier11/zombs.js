Gun = function (game, parent, json) {
    this.game = game;
    this.json = json;
    this.parent = parent;
    this.outX = this.json.x;
    this.outY = this.json.y;
    this.bulletRotation = (this.json.rotation | 0);

    this.bullets = game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(40, this.json.sprite);
    this.bulletTime = 0;
    this.bullets.json = json;

    if (this.json.explosion) {
        this.bullets.explosions = this.game.add.group();

        for (var i = 0; i < 100; i++) {
            var explosionAnimation = this.bullets.explosions.create(0, 0, this.json.explosion, [0], false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            //explosionAnimation.scale.setTo(0.25, 0.25);
            explosionAnimation.animations.add(this.json.explosion);
        }
    }


    this.bullets.getAll().forEach((bullet) => {
        bullet.anchor.x = 0.5;
        bullet.anchor.y = 0.5;
        bullet.damage = this.json.damage;

        //bullet.body.setCollisionGroup(bulletCollisionGoup);
        //bullet.body.collides(ennemyCollisionGroup, this.hit, this);

        //bullet.animations.add('explosion');

        bullet.body.onOverlap = new Phaser.Signal();
        bullet.body.onOverlap.add(this.hit, bullet);

        bullet.body.collideWorldBounds = false;
        bullet.body.label = 'bullet';
    });
}

//Gun.prototype = Object.create(Phaser.Sprite.prototype);
Gun.prototype.constructor = Gun;

Gun.prototype.hit = function (bullet, target) {
    if (bullet.visible) {
        if (bullet.parent.json.explosion) {
            var explosionAnimation = bullet.parent.explosions.getFirstExists(false);
            explosionAnimation.reset((target.x + bullet.x) / 2, (target.y + bullet.y) / 2);
            explosionAnimation.play(bullet.parent.json.explosion, 30, false, true);

            this.game.world.bringToTop(bullet.parent.explosions);
        }

        if (target.hit) target.hit(bullet.damage);
        bullet.visible = false;

    }
}

Gun.prototype.fire = function () {
    //this.game.world.bringToTop(this.bullets);
    if (this.game.time.now > this.bulletTime) {
        bullet = this.bullets.getFirstExists(false);

        if (bullet) {
            var dist = Phaser.Math.distance(this.parent.parentX, this.parent.parentY, this.outX, this.outY);
            var angle = Phaser.Math.angleBetween(this.parent.parentX, this.parent.parentY, this.outX, this.outY);
            bullet.reset(this.parent.world.x + (dist * Math.cos(this.parent.worldRotation + angle)), this.parent.world.y + (dist * Math.sin(this.parent.worldRotation + angle)));
            bullet.lifespan = this.json.lifespan;
            bullet.body.rotation = this.parent.worldRotation + Phaser.Math.degToRad(this.bulletRotation);
            bullet.rotation = bullet.body.rotation;

            //bullet.body.moveForward(this.json.speed); //P2JS

            bullet.body.moveFrom(this.json.lifespan, this.json.speed, Phaser.Math.radToDeg(bullet.body.rotation)); //Arcade

            this.bulletTime = game.time.now + this.json.reload;
        }
    }
}