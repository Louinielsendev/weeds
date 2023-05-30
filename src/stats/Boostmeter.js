/**
 * Class for the boostmeter
 * @param {number, number, number, number, string}  
 */
weeds.stats.Boostmeter = function(x, y, width, height, resource){
    rune.display.Sprite.call(this,x, y, width, height, resource)
    this.value = 0
    
    
}

weeds.stats.Boostmeter.prototype = Object.create(rune.display.Sprite.prototype);
weeds.stats.Boostmeter.prototype.constructor = weeds.stats.Boostmeter;

