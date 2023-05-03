weeds.enemy.Bigplant = function (x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes) {
    weeds.enemy.Enemy.call(this, x, y, width, height, resource, tilemap, player, enemys, boost, score, lifes);
    this.speed = .5
    this.life = 30
}

weeds.enemy.Bigplant.prototype = Object.create(weeds.enemy.Enemy.prototype);
weeds.enemy.Bigplant.prototype.constructor = weeds.enemy.Bigplant;

