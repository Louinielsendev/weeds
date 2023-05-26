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
weeds.scene.Highscore = function (highscore) {
    this.gamepad = null;
    this.highscore = highscore
    this.highscoreList = null
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

weeds.scene.Highscore.prototype = Object.create(rune.scene.Scene.prototype);
weeds.scene.Highscore.prototype.constructor = weeds.scene.Highscore;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
weeds.scene.Highscore.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.initGamepad();
    this.initHighscoreList();
    var text = new rune.text.BitmapField('Highscore')
    text.autoSize = true
    text.center = this.application.screen.center;
    this.stage.addChild(text)
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
weeds.scene.Highscore.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
   
if(this.gamepad.justPressed(1) || this.keyboard.justPressed('ESCAPE')){
    this.application.scenes.load([new weeds.scene.Menu])
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
weeds.scene.Highscore.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};


weeds.scene.Highscore.prototype.initGamepad = function () {
    this.gamepad = this.gamepads.get(0)
}

weeds.scene.Highscore.prototype.initHighscoreList = function(){
    this.highscoreList = new rune.ui.VTList()
    this.highscoreList.y = 100
    this.highscoreList.x = 50
    for(var i = 0; i < this.highscore.m_data[0].length; i++){
        console.log(this.highscore)
        var text = this.highscore.m_data[0][i].name + ' ' + this.highscore.m_data[0][i].score
        this.highscoreList.add(text)
    }
    this.stage.addChild(this.highscoreList)
}