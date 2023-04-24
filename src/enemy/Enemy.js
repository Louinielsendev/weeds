weeds.enemy.Enemy = function (x, y, width, height, resource) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
   
    
}

weeds.enemy.Enemy.prototype = Object.create(rune.display.Sprite.prototype);
weeds.enemy.Enemy.prototype.constructor = weeds.enemy.Enemy;
