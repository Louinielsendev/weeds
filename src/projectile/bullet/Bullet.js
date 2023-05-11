weeds.projectile.Bullet = function (x, y, width, height, resource, radians, bullets, enemys, camera) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.bulletSpeed = 5
    this.radians = radians
    this.velocity.x = this.bulletSpeed * Math.cos(this.radians)
    this.velocity.y = this.bulletSpeed * Math.sin(this.radians)
    this.bullets = bullets
    this.enemys = enemys
    this.camera = camera
    
}

weeds.projectile.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
weeds.projectile.Bullet.prototype.constructor = weeds.projectile.Bullet;

weeds.projectile.Bullet.prototype.updateBullet = function(){
    this.enemys.forEachMember(enemy => {

        if (enemy.intersects(this)){
           
            enemy.life -= 1
           enemy.flicker.start()
            
            this.bullets.removeMember(this)
            
        }
       
    })
    
    if (!this.camera.viewport.intersects(this)){
        this.bullets.removeMember(this)
    }
}