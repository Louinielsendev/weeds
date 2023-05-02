weeds.stats.Boostmeter = function(){
    rune.text.BitmapField.call(this, "0/10", "");
    this.value = 0
    
}

weeds.stats.Boostmeter.prototype = Object.create(rune.text.BitmapField.prototype);
weeds.stats.Boostmeter.prototype.constructor = weeds.stats.Boostmeter;

weeds.stats.Boostmeter.prototype.updateBoostmeter = function(){
    var meter = this.value.toString();
    meter = meter + "/10"
    this.text = meter
}