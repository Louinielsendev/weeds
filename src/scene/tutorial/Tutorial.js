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
 * @param {object} 
 * Tutorial scene.
 */
weeds.scene.Tutorial = function (gamepad) {
    this.gamepad = gamepad
    this.gamepadGraphic = null
    this.running = null
    this.shoot = null;
    this.dash = null;
    this.gas = null 
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

this.initGamepadGraphic()
this.initRunning()
this.initShoot()
this.initDash()
this.initGas()

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
weeds.scene.Tutorial.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};


/**
 * Function that initilizes the running animation
 *
 */
weeds.scene.Tutorial.prototype.initRunning = function() {
    this.running = new weeds.player.Player(190, 280, 24, 30, 'fullgardener', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.running.animation.create('run', [0,1,2,3,4,5], 6, true)
    var text = new rune.text.BitmapField('Run')
    text.y = 320
    text.x = 195
    this.stage.addChild(text)
    this.stage.addChild(this.running)
    
    
}

/**
 * Function that initilizes the shooting animation
 *
 */
weeds.scene.Tutorial.prototype.initShoot = function() {
    this.shoot = new weeds.player.Player(315, 280, 96, 32, 'gardenershooting', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.shoot.animation.create('shoot', [0,1,2,3,4,5], 6, true)
    var text = new rune.text.BitmapField('Shoot')
    text.y = 320
    text.x = 320
    this.stage.addChild(text)
    this.stage.addChild(this.shoot)
    
    
}


/**
 * Function that initilizes the dash animation
 *
 */
weeds.scene.Tutorial.prototype.initDash = function() {
    this.dash = new weeds.player.Player(470, 280, 24, 30, 'fullgardener', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.dash.animation.create('dash', [6,7,8,9,10,11], 6, true)
    var text = new rune.text.BitmapField('Dash')
    text.y = 320
    text.x = 475
    this.stage.addChild(text)
    this.stage.addChild(this.dash)
    
    
}

/**
 * Function that initilizes the gamempad graphic
 *
 */
weeds.scene.Tutorial.prototype.initGamepadGraphic = function(){
    this.gamepadGraphic = new rune.display.Graphic(50,40, 530, 250, 'gamepad')
    this.stage.addChild(this.gamepadGraphic)
}

/**
 * Function that initilizes the ulti animation
 *
 */
weeds.scene.Tutorial.prototype.initGas = function() {
    this.gas = new weeds.player.Player(547, 175, 32, 32, 'gasexplosion', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.gas.animation.create('gas', [0,1,2,3,4,5,6], 6, true)
    var text = new rune.text.BitmapField('Ultimate')
    text.y = 210
    text.x = 540
    this.stage.addChild(text)
    this.stage.addChild(this.gas)
    
    
}
