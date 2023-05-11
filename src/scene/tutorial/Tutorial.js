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
weeds.scene.Tutorial = function () {
    this.gamepad = null
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

weeds.scene.Tutorial.prototype = Object.create(rune.scene.Scene.prototype);
weeds.scene.Tutorial.prototype.constructor = weeds.scene.Tutorial;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
weeds.scene.Tutorial.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);
    
this.initGamepad()

var text = new rune.text.BitmapField('Tutorial')
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
weeds.scene.Tutorial.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);
    
    if(this.gamepad.justPressed(1)){
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
weeds.scene.Tutorial.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};



weeds.scene.Tutorial.prototype.initGamepad = function () {
    this.gamepad = this.gamepads.get(0)
}