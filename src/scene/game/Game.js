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
weeds.scene.Game = function(highscore) {
    this.background = null
    this.player = null;
    this.gamepad = null;
    this.bullets = null;
    this.thorns = null;
    this.enemys = null;
    this.camera = null
    this.overlay = null
    this.spawner = null;
    this.score = null;
    this.boost = null;
    this.livaes = null;
    this.boostmeter = null;
    this.gameOver = null;
    this.killScores = null
    this.highscore = highscore
    this.themeSong = null
    this.dieSound = null
    this.fountain = null

    
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
    this.initGroups()
    this.initCamera();
    this.initScore();
    this.initLives();
    this.initBoostmeter();
    this.initPlayer();
    this.initTilemap();
    this.initSpawner();
    this.initFountain();
    this.themeSong = this.application.sounds.sound.get("thememusic");
    this.dieSound = this.application.sounds.sound.get('die', false)
  
    
    
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
            this.stage.map.m_bufferA.hitTest(bullet, function(bullet){
                this.bullets.removeMember(bullet)
            }, this)
        })
        this.thorns.forEachMember(thorn => {
            thorn.updateThorn()
            if (!this.background.intersects(thorn)){
                this.thorns.removeMember(thorn)
                
            }
            if (this.fountain.intersects(thorn)){
                this.thorns.removeMember(thorn)
                
            }
        })
        this.killScores.forEachMember(killScore => {
           killScore.updateKillScore()
           if(killScore.alpha <= 0){
            this.killScores.removeMember(killScore)
           
           }
           console.log(this.killScores)
        })
        this.enemys.forEachMember(enemy => {
           
            enemy.updateEnemy(step)
            this.stage.map.m_bufferA.hitTestAndSeparate(enemy, this)
        })
        this.spawner.update(step);
        this.player.updatePlayer(step)
     
    }
    

    if (this.gameOver){
        if (this.gamepad.justPressed(9)){
            this.resetGame()
        }
    }
    this.stage.map.m_bufferA.hitTestAndSeparate(this.player, this)
   
    
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
    this.background = new rune.display.Graphic(0, 0, 1024, 1024, 'garden1024v5')
   
    this.stage.addChild(this.background)
}

weeds.scene.Game.prototype.initGamepad = function() {
   this.gamepad = this.gamepads.get(0)
}

weeds.scene.Game.prototype.initGroups = function(){
    this.bullets = this.groups.create(this.stage)
    this.enemys = this.groups.create(this.stage)
    this.boost = this.groups.create(this.stage)
    this.thorns = this.groups.create(this.stage)
    this.killScores = this.groups.create(this.stage)
}



weeds.scene.Game.prototype.initPlayer = function() {
    this.player = new weeds.player.Player(448, 600, 24, 30, 'full24X30', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay)
    this.player.animation.create('run', [0,1,2,3,4,5], 6, true)
    this.player.animation.create('dash', [6,7,8,9,10,11], 6, true )
    this.stage.addChild(this.player)
    this.camera.targets.add(this.player)
    
}

weeds.scene.Game.prototype.initCamera = function() {
    this.camera = this.cameras.getCameraAt(0)
    this.camera.bounderies = new rune.geom.Rectangle(0, 0, 1024, 1024)
    this.overlay = new rune.display.DisplayObject(0, 0, this.camera.width, this.camera.height)
    this.overlay.backgroundColor = '#A020F0'
    this.overlay.alpha = .6
    this.camera.addChild(this.overlay)
    this.overlay.visible = false
    
  
    
}


weeds.scene.Game.prototype.initTilemap = function(){
    this.stage.map.load('tilemap')
  

}

weeds.scene.Game.prototype.initSpawner = function(){
    this.spawner = new weeds.spawner.Spawner(this.enemys, this.stage.map, this.player, this.boost, this.score, this.lives, this.thorns, this.camera, this.killScores,this.bullets, this)
    
}


weeds.scene.Game.prototype.initScore = function(){
    this.score = new weeds.stats.Score()
    this.score.updateScore()
    this.score.x = 280;
    this.score.y = 15;
    this.application.screen.addChild(this.score)
   
}

weeds.scene.Game.prototype.initBoostmeter = function(){
    this.boostmeter = new weeds.stats.Boostmeter(448, 0, 192, 32, 'newboost')
    this.boostmeter.animation.create('fill', [0,1,2,3,4,5,6,7,8,9,10], 0, true)
    this.boostmeter.animation.create('full', [11,12,13,14], 8, true)
    
    this.application.screen.addChild(this.boostmeter)
        
  
  

}

weeds.scene.Game.prototype.initLives = function(){
    
    this.lives = new weeds.stats.Lives(0, 0, 160, 32, 'lifebarnew')
    this.lives.animation.create('full', [0,1,2,3], 0, true)
    this.application.screen.addChild(this.lives)
        
  
        

}

weeds.scene.Game.prototype.initFountain = function(){
    this.fountain = new rune.display.Sprite(448, 448, 128, 96, 'fountain')
    this.fountain.animation.create('run', [0,1,2,3], 6, true)
    this.stage.addChild(this.fountain)
}


weeds.scene.Game.prototype.endGame = function(){
    
    if(this.highscore.test(this.score.value) >= 0){
        
        this.highscore.send(this.score.value, 'loui', 0)
        
    }
    console.log(this.highscore.test(this.score.value))
    console.log(this.highscore)
    this.application.screen.removeChild(this.score)
    this.application.screen.removeChild(this.boostmeter)
    this.application.screen.removeChild(this.lives)
    this.application.scenes.load([new weeds.scene.GameOver(this.highscore)])
}