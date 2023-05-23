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
weeds.scene.GameOver = function (highscore, score) {
    this.highscore = highscore
    this.menu = null
    this.gamepad = null;
    this.score = score;
    
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

weeds.scene.GameOver.prototype = Object.create(rune.scene.Scene.prototype);
weeds.scene.GameOver.prototype.constructor = weeds.scene.GameOver;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
weeds.scene.GameOver.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
   
    this.initMenu();
    this.initGamepad();


    var gameoverText = new rune.text.BitmapField('Game Over!')
    gameoverText.autoSize = true
    gameoverText.center = this.application.screen.center;
    gameoverText.y = 50
    this.stage.addChild(gameoverText)
    
    var scoreText = this.score.toString();
    var score = new rune.text.BitmapField('Your Score: ' + scoreText)
    score.center = this.application.screen.center;
    score.y = 100
    score.x += 30
    this.stage.addChild(score)




};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
weeds.scene.GameOver.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepad.justPressed(13)) {
        this.menu.down()

    }

    if (this.gamepad.justPressed(12)) {
        this.menu.up()
    }
    if (this.gamepad.justPressed(0)) {
        this.menu.select()
        console.log(this.menu)
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
weeds.scene.GameOver.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

weeds.scene.GameOver.prototype.initMenu = function () {
    this.menu = new rune.ui.VTMenu()
    this.menu.y = 170
    this.menu.x = 250
    this.menu.add('Play again')
    this.menu.add('Back to main menu')
    
    this.stage.addChild(this.menu)
    
    this.menu.onSelect(function () {
        console.log(this.menu.m_index)
        switch (this.menu.m_index) {
            case 0:
                this.application.scenes.load([new weeds.scene.Game(this.highscore)])
                break;
            case 1:
                this.application.scenes.load([new weeds.scene.Menu()])
                break;
        }

    }, this)
}

weeds.scene.GameOver.prototype.initGamepad = function () {
    this.gamepad = this.gamepads.get(0)
}