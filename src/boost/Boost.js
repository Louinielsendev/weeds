weeds.boost.Boost = function (x, y, width, height, resource) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.pickupSound = this.application.sounds.sound.get('pickup')
}

weeds.boost.Boost.prototype = Object.create(rune.display.Sprite.prototype);
weeds.boost.Boost.prototype.constructor = weeds.boost.Boost;

