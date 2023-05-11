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
weeds.scene.Menu = function () {
    this.highscore = null
    this.menu = null
    this.gamepad = null;
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

weeds.scene.Menu.prototype = Object.create(rune.scene.Scene.prototype);
weeds.scene.Menu.prototype.constructor = weeds.scene.Menu;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
weeds.scene.Menu.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    this.highscore = new rune.data.Highscores('weeds', 5, 1)
   
    this.initMenu();
    this.initGamepad();
    console.log(this.highscore)
    var text = new rune.text.BitmapField('Weeds')
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
weeds.scene.Menu.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if (this.gamepad.justPressed(13)) {
        this.menu.down()

    }

    if (this.gamepad.justPressed(12)) {
        this.menu.up()
    }
    if (this.gamepad.justPressed(0)) {
        this.menu.select()
      
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
weeds.scene.Menu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

weeds.scene.Menu.prototype.initMenu = function () {
    this.menu = new rune.ui.VTMenu()
    this.menu.y = 100
    this.menu.add('Play')
    this.menu.add('How to play')
    this.menu.add('Highscore')
    this.stage.addChild(this.menu)
   
    this.menu.onSelect(function () {
       
        switch (this.menu.m_index) {
            case 0:
                this.application.scenes.load([new weeds.scene.Game(this.highscore)])
                break;
            case 1:
                this.application.scenes.load([new weeds.scene.Tutorial()])
                break;
            case 2:
                this.application.scenes.load([new weeds.scene.Highscore(this.highscore)])
                break;
        }

    }, this)
}

weeds.scene.Menu.prototype.initGamepad = function () {
    this.gamepad = this.gamepads.get(0)
}