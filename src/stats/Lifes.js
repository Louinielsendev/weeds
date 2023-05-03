weeds.stats.Lifes = function(){
    rune.text.BitmapField.call(this, "3", "");
    this.value = 3
    
}

weeds.stats.Lifes.prototype = Object.create(rune.text.BitmapField.prototype);
weeds.stats.Lifes.prototype.constructor = weeds.stats.Lifes;

weeds.stats.Lifes.prototype.updateLifes = function(){
    var lifes = this.value.toString();
    this.text = lifes
}