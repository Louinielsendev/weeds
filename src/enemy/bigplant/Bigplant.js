/**
 * Class for big enemy
 * @param {number, number, number, number, string, object, object, object, object, object, object, object, object}  
 */
weeds.enemy.Bigplant = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores, game) {
    weeds.enemy.Enemy.call(this, x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores, game);
    this.speed = .5
    this.life = 15
    this.value = 500
   
    this.attackCooldown = 600
}

weeds.enemy.Bigplant.prototype = Object.create(weeds.enemy.Enemy.prototype);
weeds.enemy.Bigplant.prototype.constructor = weeds.enemy.Bigplant;

