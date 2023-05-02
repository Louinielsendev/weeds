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
weeds.scene.GameOver = function() {
    
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
weeds.scene.GameOver.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);
    
var text = new rune.text.BitmapField('game over')
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
weeds.scene.GameOver.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);
    if(this.gamepads.get(0).justPressed(9)){
        this.application.scenes.load([new weeds.scene.Game()])
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
weeds.scene.GameOver.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

