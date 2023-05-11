weeds.enemy.Bigplant = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores) {
    weeds.enemy.Enemy.call(this, x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes, killScores);
    this.speed = .5
    this.life = 30
    this.value = 250
}

weeds.enemy.Bigplant.prototype = Object.create(weeds.enemy.Enemy.prototype);
weeds.enemy.Bigplant.prototype.constructor = weeds.enemy.Bigplant;

