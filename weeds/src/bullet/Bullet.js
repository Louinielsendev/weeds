weeds.bullet.Bullet = function (x, y, width, height, resource, radians, bullets, enemys) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.bulletSpeed = 8
    this.radians = radians
    this.velocity.x = this.bulletSpeed * Math.cos(this.radians)
    this.velocity.y = this.bulletSpeed * Math.sin(this.radians)
    this.bullets = bullets
    this.enemys = enemys
    
}

weeds.bullet.Bullet.prototype = Object.create(rune.display.Sprite.prototype);
weeds.bullet.Bullet.prototype.constructor = weeds.bullet.bullet;

weeds.bullet.Bullet.prototype.updateBullet = function(){
    this.enemys.forEachMember(enemy => {
        if (enemy.intersects(this)){
            console.log('träff');
            enemy.flicker.start()
            this.bullets.removeMember(this)
            
        }
    })
}