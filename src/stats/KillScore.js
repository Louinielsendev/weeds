weeds.stats.KillScore = function(text){
    rune.text.BitmapField.call(this, text, "");
    
    
}

weeds.stats.KillScore.prototype = Object.create(rune.text.BitmapField.prototype);
weeds.stats.KillScore.prototype.constructor = weeds.stats.KillScore;

weeds.stats.KillScore.prototype.updateKillScore = function(){
    this.y -= 3
    this.alpha -= .1
}