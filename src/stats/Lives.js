weeds.stats.Lives = function(width, heigth, backgroundColor, forgroundColor){
    rune.ui.Progressbar.call(this, width, heigth, backgroundColor, forgroundColor)
    this.value = 3
    
    
}

weeds.stats.Lives.prototype = Object.create(rune.ui.Progressbar.prototype);
weeds.stats.Lives.prototype.constructor = weeds.stats.Lives;

