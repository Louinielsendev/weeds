weeds.stats.Score = function(){
    rune.text.BitmapField.call(this, "00", "");
    this.value = 20000
    
}

weeds.stats.Score.prototype = Object.create(rune.text.BitmapField.prototype);
weeds.stats.Score.prototype.constructor = weeds.stats.Score;

weeds.stats.Score.prototype.updateScore = function(){
    var score = this.value.toString();
    this.text = score
}