weeds.stats.Boostmeter = function(width, heigth, backgroundColor, forgroundColor){
    rune.ui.Progressbar.call(this, width, heigth, backgroundColor, forgroundColor)
    this.value = 0
    
    
}

weeds.stats.Boostmeter.prototype = Object.create(rune.ui.Progressbar.prototype);
weeds.stats.Boostmeter.prototype.constructor = weeds.stats.Boostmeter;

