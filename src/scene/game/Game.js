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
    this.tilemap = null
    this.camera = null
    this.spawner = null;
    this.score = null;
    this.boost = null;
    this.boostmeter = null;
    this.gameOver = null;

    
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
    this.initTilemap()
    this.initCamera();
    this.initBoost();
    this.initScore();
    this.initBoostmeter();
    this.initPlayer();
    this.initSpawner();
    
    
    
    
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

   
    if (!this.gameOver){
        this.bullets.forEachMember(bullet => {
            bullet.updateBullet()
        })
        this.enemys.forEachMember(enemy => {
            enemy.updateEnemy(step)
        })
        this.spawner.update(step);
        this.player.updatePlayer(step)
    }
    

    if (this.gameOver){
        if (this.gamepad.justPressed(9)){
            this.resetGame()
        }
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
    this.player = new weeds.player.Player(500, 500, 32, 32, 'gardnerFull', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this)
    this.player.animation.create('run', [0,1,2,3,4,5], 6, true)
    this.player.animation.create('dash', [6,7,8,9,10,11], 6, true )
    this.stage.addChild(this.player)
    this.camera.targets.add(this.player)
    
}

weeds.scene.Game.prototype.initCamera = function() {
    this.camera = this.cameras.getCameraAt(0)
    this.camera.bounderies = new rune.geom.Rectangle(0, 0, 1000, 1000)
  
    
}

weeds.scene.Game.prototype.initEnemys = function(){
    this.enemys = this.groups.create(this.stage)
    
}

weeds.scene.Game.prototype.initTilemap = function(){
    this.stage.map.load('tilemap')
}

weeds.scene.Game.prototype.initSpawner = function(){
    this.spawner = new weeds.spawner.Spawner(this.enemys, this.stage.map, this.player, this.boost, this.score)
    
}

weeds.scene.Game.prototype.initBoost = function(){
    this.boost = this.groups.create(this.stage)
}

weeds.scene.Game.prototype.initScore = function(){
    this.score = new weeds.stats.Score()
    this.score.updateScore()
    this.score.x = 530;
    this.score.y = 10;
    this.application.screen.addChild(this.score)
    console.log(this.score)
}

weeds.scene.Game.prototype.initBoostmeter = function(){
    this.boostmeter = new weeds.stats.Boostmeter()
    this.boostmeter.x = 480;
    this.boostmeter.y = 10;
    this.application.screen.addChild(this.boostmeter)

}



weeds.scene.Game.prototype.endGame = function(){
    this.application.screen.removeChild(this.score)
    this.application.screen.removeChild(this.boostmeter)
    this.application.scenes.load([new weeds.scene.GameOver()])
}