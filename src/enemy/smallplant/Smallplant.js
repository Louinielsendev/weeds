/**
 * Class for small enemy
 * @param {number, number, number, number, string, object, object, object, object, object, object, object, object}  
 */
weeds.enemy.Smallplant = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores, game) {
    weeds.enemy.Enemy.call(this, x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores, game);
    this.speed = 2.5
    this.life = 2
    this.attackCooldown = 300
}

weeds.enemy.Smallplant.prototype = Object.create(weeds.enemy.Enemy.prototype);
weeds.enemy.Smallplant.prototype.constructor = weeds.enemy.Smallplant;
