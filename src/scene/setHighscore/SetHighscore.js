//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new object.
 *
 * @constructor
 * @extends rune.scene.Scene
 *
 * @class
 * @classdesc
 * 
 * Game scene.
 */
weeds.scene.SetHighscore = function (highscore, score) {
    this.gamepad = null
    this.highscore = highscore
    this.gamepad = null;
    this.score = score;
    this.firstLetter = null
    this.secondLetter = null
    this.thirdLetter = null
    this.letters = []
    this.selectedIndex = 0
    this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------

    /**
     * Calls the constructor method of the super class.
     */
    rune.scene.Scene.call(this);
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

weeds.scene.SetHighscore.prototype = Object.create(rune.scene.Scene.prototype);
weeds.scene.SetHighscore.prototype.constructor = weeds.scene.SetHighscore;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
weeds.scene.SetHighscore.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
   
    

    var highscoreText = new rune.text.BitmapField('CONGRATULATIONS NEW HIGHSCORE!')
    highscoreText.center = this.application.screen.center; 
    highscoreText.y = 100
    highscoreText.x -= 20
    highscoreText.width = 200
    this.stage.addChild(highscoreText)
    

    
    var name = new rune.text.BitmapField('PLEASE ENTER YOUR NAME')
    name.center = this.application.screen.center;
    name.y = 150
    
    this.stage.addChild(name)

    this.initNameSelector()
    this.initGamepad()

};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
weeds.scene.SetHighscore.prototype.update = function (step) {
    this.letters.forEach(letter => {
       letter.debug = false
    });
    this.letters[this.selectedIndex].debug = true
    
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepad.justPressed(13)){
        this.letters[this.selectedIndex].animation.gotoNextFrame()
    }

    if (this.gamepad.justPressed(12)){
        this.letters[this.selectedIndex].animation.gotoPreviousFrame()
    }

    if (this.gamepad.justPressed(15) && this.selectedIndex <= 1){
        this.selectedIndex ++
    }
    else if (this.gamepad.justPressed(15)){
        this.selectedIndex = 0
    }

    if (this.gamepad.justPressed(14) && this.selectedIndex >= 1){
        this.selectedIndex --
    }
    else if (this.gamepad.justPressed(14)){
        this.selectedIndex = 2
    }
    if (this.gamepad.justPressed(0)){
        var name = ''
        for (var i = 0; i < this.letters.length; i++){
            var index = this.letters[i].animation.m_atlasIndex
            var letter = this.alphabet[index]
            name += letter;

        }
        this.highscore.send(this.score, name, 0)
        this.application.scenes.load([new weeds.scene.GameOver(this.highscore, this.score)])
    }
    


};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
weeds.scene.SetHighscore.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

weeds.scene.SetHighscore.prototype.initNameSelector = function() {
    for (var i = 0; i < 3; i++){
        var letter = new rune.display.Sprite((40 * i + 250 ),200,32,32, 'thealphabet')
        letter.animation.create('full', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 0, true)
        letter.debugColor = 'yellow'
        this.stage.addChild(letter)
        this.letters.push(letter);
        
    }
}

weeds.scene.SetHighscore.prototype.initGamepad = function () {
    this.gamepad = this.gamepads.get(0)
}