weeds.enemy.Smallplant = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores) {
    weeds.enemy.Enemy.call(this, x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores);
    this.speed = 2.8
    this.life = 2
}

weeds.enemy.Smallplant.prototype = Object.create(weeds.enemy.Enemy.prototype);
weeds.enemy.Smallplant.prototype.constructor = weeds.enemy.Smallplant;
