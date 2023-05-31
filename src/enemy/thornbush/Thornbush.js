/**
 * Class for the thornbush 
 * @param {number, number, number, number, string, object, object, object, object, object, object, object, object, object, object, object, object}  
 */
weeds.enemy.Thornbush = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lives, killScores, side, thorns, camera, bullets, game) {
    weeds.enemy.Enemy.call(this, x, y, width, height, resource, tilemap, player, enemys, boost, score, lives, killScores, game);
    this.life = 6
    this.lives = lives
    this.speed = 1.5
    this.side = side
    this.value = 250
    this.thorns = thorns
    this.thornTimer = 0
    this.thornCooldown = 2000
    this.camera = camera
    this.bullets = bullets
}

weeds.enemy.Thornbush.prototype = Object.create(weeds.enemy.Enemy.prototype);
weeds.enemy.Thornbush.prototype.constructor = weeds.enemy.Thornbush;

/**
 * Function that updates the thornbush every tick
 * @param {number}  
 */
weeds.enemy.Thornbush.prototype.updateEnemy = function (step) {
    this.thornTimer += step;
    if (this.player.lives <= 0) {

        return
    }
    if (this.life <= 0) {
       this.death()
    }


    switch (this.side) {

        case 1:
            if (this.y < 930) {
                this.y += this.speed
            }
            else {
                this.side = 3
            }
            break;
        case 2:
            if (this.x > 70) {
                this.x -= this.speed
            }
            else {
                this.side = 4
            }
            break;
        case 3:
            if (this.y > 70) {
                this.y -= this.speed
            }
            else {
                this.side = 1
            }
            break;
        case 4:
            if (this.x < 930) {
                this.x += this.speed
            }
            else {
                this.side = 2
            }
            break;

    }
    if (this.thornTimer >= this.thornCooldown && this.intersects(this.camera.viewport)) {
        this.attack()
        this.thornTimer = 0
    }
    if (this.tilemap.m_bufferA.hitTest(this, this) && this.side == 4) {
        this.side = 1
    }
    else if (this.tilemap.m_bufferA.hitTest(this, this)) {
        this.side++
    }
}

/**
 * Function that spawns new thorns
 *   
 */
weeds.enemy.Thornbush.prototype.attack = function () {
    for (var i = 0; i < 4; i++) {
        var thorn = new weeds.projectile.Thorn(this.centerX, this.centerY, 16, 16, 'thorn', this.player, this.camera, this.thorns, this.lives, i, this.bullets)
        thorn.setDirection()
        thorn.animation.create('roll', [0, 1, 2, 3, 4, 5], 12, true)
        this.thorns.addMember(thorn)
    }

}


