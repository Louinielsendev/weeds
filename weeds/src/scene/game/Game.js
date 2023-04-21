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
weeds.scene.Game = function() {
    this.background = null
    this.player = null;
    this.gamepad = null;
    this.bullets = null;
    this.enemys = null;
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

weeds.scene.Game.prototype = Object.create(rune.scene.Scene.prototype);
weeds.scene.Game.prototype.constructor = weeds.scene.Game;

//------------------------------------------------------------------------------
// Override public prototype methods (ENGINE)
//------------------------------------------------------------------------------

/**
 * This method is automatically executed once after the scene is instantiated. 
 * The method is used to create objects to be used within the scene.
 *
 * @returns {undefined}
 */
weeds.scene.Game.prototype.init = function() {
    rune.scene.Scene.prototype.init.call(this);


    this.initBackground();
    this.initGamepad();
    this.initBullets();
    this.initEnemys();
    this.initPlayer();
    this.initCamera();
   
    
    
};

/**
 * This method is automatically executed once per "tick". The method is used for 
 * calculations such as application logic.
 *
 * @param {number} step Fixed time step.
 *
 * @returns {undefined}
 */
weeds.scene.Game.prototype.update = function(step) {
    rune.scene.Scene.prototype.update.call(this, step);

    this.player.updatePlayer(step)

    this.bullets.forEachMember(bullet => {
        bullet.updateBullet()
    })
};

/**
 * This method is automatically called once just before the scene ends. Use 
 * the method to reset references and remove objects that no longer need to 
 * exist when the scene is destroyed. The process is performed in order to 
 * avoid memory leaks.
 *
 * @returns {undefined}
 */
weeds.scene.Game.prototype.dispose = function() {
    rune.scene.Scene.prototype.dispose.call(this);
};

weeds.scene.Game.prototype.initBackground = function() {
    this.background = new rune.display.Graphic(0, 0, 1000, 1000, 'garden')
   
    this.stage.addChild(this.background)
}

weeds.scene.Game.prototype.initGamepad = function() {
   this.gamepad = this.gamepads.get(0)
}

weeds.scene.Game.prototype.initBullets = function(){
    this.bullets = this.groups.create(this.stage)
}

weeds.scene.Game.prototype.initPlayer = function() {
    this.player = new weeds.player.Player(50, 50, 32, 32, 'gardner', this.gamepad, this.bullets, this.enemys)
    this.player.animation.create('run', [0,1,2,3,4,5], 6, true)
    this.stage.addChild(this.player)
    console.log(this.player)
}

weeds.scene.Game.prototype.initCamera = function() {
    this.cameras.getCameraAt(0).targets.add(this.player)
    this.cameras.getCameraAt(0).bounderies = new rune.geom.Rectangle(0, 0, 1000, 1000)
  
    
}

weeds.scene.Game.prototype.initEnemys = function(){
    this.enemys = this.groups.create(this.stage)
    for (var i = 0; i < 10; i++){
        var x = Math.random() * 800
        var y = Math.random() * 800
        var enemy = new weeds.enemy.Enemy(x, y, 32, 32, 'enemy')
        this.enemys.addMember(enemy)
    }
}

