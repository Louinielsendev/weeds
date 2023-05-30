/**
 * Class for thorn
 * @param {number, number, number, number, string, object, object, object, object, object, object}  
 */
weeds.projectile.Thorn = function (x, y, width, height, resource, player, camera, thorns, lives, side, bullets) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.side = side
    this.player = player
    this.camera = camera
    this.thorns = thorns
    this.lives = lives
    this.bullets = bullets

}

weeds.projectile.Thorn.prototype = Object.create(rune.display.Sprite.prototype);
weeds.projectile.Thorn.prototype.constructor = weeds.projectile.Thorn;

/**
 * Function that updates thorn every tick
 *  
 */
weeds.projectile.Thorn.prototype.updateThorn = function () {
    if (this.intersects(this.player)) {
        this.player.lives -= 1
        this.lives.animation.gotoNextFrame()
        this.player.flicker.start()
        this.player.hurtSound.play()
        this.thorns.removeMember(this)
    }
    
    this.bullets.forEachMember(bullet => {
        if (bullet.intersects(this)) {
            this.thorns.removeMember(this)
        }
        
    });

}

/**
 * Funktion that decides wich side the thorn is going to spawn at
 * 
 */
weeds.projectile.Thorn.prototype.setDirection = function () {

    switch (this.side) {
        case 0:
            this.velocity.x = 2
            this.rotation -= 90
            break;
        case 1:
            this.velocity.y = 2
            break;
        case 2:
            this.velocity.x = -2
            this.rotation += 90
            break;
        case 3:
            this.velocity.y = -2
            this.flippedY = true
            break;

    }

}