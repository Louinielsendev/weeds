weeds.boost.Boost = function (x, y, width, height, resource) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    
}

weeds.boost.Boost.prototype = Object.create(rune.display.Sprite.prototype);
weeds.boost.Boost.prototype.constructor = weeds.boost.Boost;

