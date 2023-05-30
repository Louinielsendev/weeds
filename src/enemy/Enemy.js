/**
 * Class for the enemy
 * @param {number, number, number, number, string, object, object, object, object, object, object, object, object}  
 */
weeds.enemy.Enemy = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lives, killScores, game) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.tilemap = tilemap
    this.player = player
    this.enemys = enemys
    this.boost = boost
    this.score = score
    this.lives = lives
    this.speed = 2
    this.path = null
    this.pathTimer = 1000
    this.pathCooldown = 200
    this.life = 5
    this.attackTimer = 0
    this.attackCooldown = 1000
    this.value = 10
    this.killScores = killScores
    this.game = game
}

weeds.enemy.Enemy.prototype = Object.create(rune.display.Sprite.prototype);
weeds.enemy.Enemy.prototype.constructor = weeds.enemy.Enemy;

/**
 * Function that updates the enemy every Tick
 * @param {number}  
 */
weeds.enemy.Enemy.prototype.updateEnemy = function (step){
  if (this.player.lives <= 0){
        
    
    return
 }
  this.pathTimer += step;
  if (this.life <= 0){
    this.death()
    
  }
  if (this.intersects(this.player)){
    this.attack(step)
    this.animation.gotoAndPlay('attack')
  }
  else{
    this.animation.gotoAndPlay('run')
    this.attackTimer = 0
  }

  if (this.x > this.player.x){
    this.flippedX = true
  }
  else {
    this.flippedX = false
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

weeds.enemy.Enemy.prototype.attack = function(step){
  this.attackTimer += step
    console.log(this.player.flicker.active)
  if (this.attackTimer >= this.attackCooldown && !this.player.flicker.active){
    this.player.flicker.start(1000)
    this.player.lives -= 1;
    this.lives.animation.gotoNextFrame()
    this.player.hurtSound.play()
    
 
  this.attackTimer = 0
  }
}

weeds.enemy.Enemy.prototype.death = function(){
  console.log(this.game.timers)
   
  this.game.dieSound.play()
  var text = this.value.toString()
  var killScore = new weeds.stats.KillScore(text)
  killScore.x = this.x
  killScore.y = this.y
  
  this.killScores.addMember(killScore)
  this.dieSound = null;
  this.enemys.removeMember(this)
  this.score.value += this.value
  this.score.updateScore()
 
  var randomNumber = Math.floor(Math.random() * 8)
  if (randomNumber == 7){
    var boost = new weeds.boost.Boost(this.x, this.y, 16, 16, 'gas', this.player, this.boost)
    boost.animation.create('idle', [0,1], 2, true)
    this.boost.addMember(boost)
  }
  var smoke =  new rune.display.Sprite(this.x, this.y, 32, 32, 'smoke');
  smoke.center = this.center
  smoke.animation.create('idle', [0,1,2,3], 12, true)
  this.game.timers.create({
    duration: 500,
    onStart: function(){

      this.stage.addChild(smoke)
    },
    onComplete: function(){
      this.stage.removeChild(smoke)
    }
  })
 
  }