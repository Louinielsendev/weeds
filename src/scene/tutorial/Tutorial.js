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
    this.description = null
    this.playerRunning = null
    this.playerDashing = null
    this.playerShooting = null
    this.boost = null
    this.camera = null
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
this.initDescription()    
this.initGamepad()
this.initPlayerRunning()
this.initPlayerDashing()
this.initPlayerShooting()
this.initCamera()
this.initBoost()

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

weeds.scene.Tutorial.prototype.initDescription = function() {
    var text = new rune.text.BitmapField('Goal')
    var text2 = new rune.text.BitmapField('Survive for as long as possible by killing the enemies that is trying to attack you. \n Earn points by killing enemies and be aware, different enemies have different strengths `\n and different ways of attacking you.')
    
    text.y = 30
    text.x = 70
    text2.y = 50
    text2.x = 70
    
    text2.width = 800
    text2.height = 500
    text2.leading = 6
    this.stage.addChild(text)
    this.stage.addChild(text2)

}

weeds.scene.Tutorial.prototype.initPlayerRunning = function() {
    this.playerRunning = new weeds.player.Player(70, 140, 24, 30, 'full24X30', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.playerRunning.animation.create('run', [0,1,2,3,4,5], 6, true)
    var text = new rune.text.BitmapField('Use left stick')
    var text2 = new rune.text.BitmapField('to move player')
    var text3 = new rune.text.BitmapField('Controlls')
    text.y = 145
    text.x = 170
    text2.y = 165
    text2.x = 170
    text3.y = 120
    text3.x = 70
    this.stage.addChild(text)
    this.stage.addChild(text2)
    this.stage.addChild(text3)
    this.stage.addChild(this.playerRunning)
    
    
}

weeds.scene.Tutorial.prototype.initPlayerDashing = function() {
    this.playerDashing = new weeds.player.Player(70, 205, 24, 30, 'full24X30', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.playerDashing.animation.create('dash', [6,7,8,9,10,11], 6, true)
    this.stage.addChild(this.playerDashing)
    var text = new rune.text.BitmapField('While running, press A')
    var text2 = new rune.text.BitmapField('to dash')
    
    text.y = 210
    text.x = 170
    text2.y = 230
    text2.x = 170
   
    this.stage.addChild(text)
    this.stage.addChild(text2)
    
}

weeds.scene.Tutorial.prototype.initPlayerShooting = function() {
    this.playerShooting = new weeds.player.Player(70, 270, 96, 30, 'gardenershooting', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.playerShooting.animation.create('shooting', [0,1,2,3,4,5], 6, true)
    this.stage.addChild(this.playerShooting)
    var text = new rune.text.BitmapField('Use right stick')
    var text2 = new rune.text.BitmapField('to shoot')
    
    text.y = 275
    text.x = 170
    text2.y = 295
    text2.x = 170
    this.stage.addChild(text)
    this.stage.addChild(text2)
    
}

weeds.scene.Tutorial.prototype.initCamera = function() {
    this.camera = this.cameras.getCameraAt(0)
    this.camera.bounderies = new rune.geom.Rectangle(0, 0, 1024, 1000)
  
    
}

weeds.scene.Tutorial.prototype.initBoost = function() {
    this.boost = new weeds.boost.Boost(350, 140, 16, 16, 'gas', this.player, this.boost)
    this.boost.animation.create('idle', [0,1], 2, true)
    this.stage.addChild(this.boost)
    var text = new rune.text.BitmapField('Boost')
    var text2 = new rune.text.BitmapField('When enemies  die, they can drop boost. \n Collect boost to load up player ultimate. \n When 10 boost have been collected use\n R2 to trigger the ultimate, \n which will cause greater damage \n over a greater area. ')
    text.y = 120
    text.x = 353
    text2.y = 145
    text2.x = 380
    text2.width = 400
    text2.height = 500
    text2.leading = 6
    this.stage.addChild(text)
    this.stage.addChild(text2)
    
}

