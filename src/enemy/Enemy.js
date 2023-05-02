weeds.enemy.Enemy = function (x, y, width, height, resource, tilemap, player, enemys, boost, score) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.tilemap = tilemap
    this.player = player
    this.enemys = enemys
    this.boost = boost
    this.score = score
    this.speed = 2
    this.path = null
    this.pathTimer = 1000
    this.pathCooldown = 200
    this.life = 5
    this.attackTimer = 500
    this.attackCooldown = 1000
}

weeds.enemy.Enemy.prototype = Object.create(rune.display.Sprite.prototype);
weeds.enemy.Enemy.prototype.constructor = weeds.enemy.Enemy;

weeds.enemy.Enemy.prototype.updateEnemy = function (step){
  
  this.pathTimer += step;
  if (this.life <= 0){
    this.enemys.removeMember(this)
    this.score.value += 10
    this.score.updateScore()
    var randomNumber = Math.floor(Math.random() * 12)
    if (randomNumber == 7){
      var boost = new weeds.boost.Boost(this.x, this.y, 16, 16, 'bonus', this.player, this.boost)
      boost.animation.create('idle', [0,1,2,3], 8, true)
      this.boost.addMember(boost)
    }
  }
  if (this.intersects(this.player)){
    this.attackTimer += step
    
    if (this.attackTimer >= this.attackCooldown){
      this.player.flicker.start()
      this.player.lifes -= 1;
   
    this.attackTimer = 0
    }
    
  }
   
  if (this.pathTimer >= this.pathCooldown){
    this.path = this.tilemap.m_bufferA.getPath(this.x, this.y, this.player.x, this.player.y, true)
    this.pathTimer = 0
  }
   
    this.moveEnemy()

}

weeds.enemy.Enemy.prototype.moveEnemy = function(){
   
    if (this.path.m_nodes.length > 1) {
        var nextTile = this.path.m_nodes[1];
        var distanceX = nextTile.x - this.x;
        var distanceY = nextTile.y - this.y;
        var distanceTotal = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
        if (distanceTotal <= this.speed) {
          
          this.x = nextTile.x;
          this.y = nextTile.y;
          this.path.m_nodes.shift();
        } else {
          var fraction = this.speed / distanceTotal;
          this.x += distanceX * fraction;
          this.y += distanceY * fraction;
        }
    
      
      }
}