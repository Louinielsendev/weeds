/**
 * Class for the scpre
 *  
 */
weeds.stats.Score = function(){
    rune.text.BitmapField.call(this, "00", "");
    this.value = 0
    
}

weeds.stats.Score.prototype = Object.create(rune.text.BitmapField.prototype);
weeds.stats.Score.prototype.constructor = weeds.stats.Score;

/**
 * Function that updates the score of the game when ever an enemy is killed
 * 
 */
weeds.stats.Score.prototype.updateScore = function(){
    var score = this.value.toString();
    this.text = score
}