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
 * @param {object, object, object} 
 * Game scene.
 */
weeds.scene.Game = function (highscore, titlesong, gamepad) {
    this.background = null
    this.player = null;
    this.gamepad = gamepad;
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
    this.titlesong = titlesong
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
weeds.scene.Game.prototype.init = function () {
    rune.scene.Scene.prototype.init.call(this);


    this.initBackground();
    this.initGroups()
    this.initCamera();
    this.initScore();
    this.initLives();
    this.initBoostmeter();
    this.initPlayer();
    this.initTilemap();
    this.initSpawner();
    this.initFountain();
    this.themeSong = this.application.sounds.music.get("thememusic");
    this.themeSong.play()
    this.themeSong.loop = true
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
weeds.scene.Game.prototype.update = function (step) {
    rune.scene.Scene.prototype.update.call(this, step);


    if (!this.gameOver) {
        this.bullets.forEachMember(bullet => {
            bullet.updateBullet()
            this.stage.map.m_bufferA.hitTest(bullet, function (bullet) {
                this.bullets.removeMember(bullet)
            }, this)
        })
        this.thorns.forEachMember(thorn => {
            thorn.updateThorn()
            if (!this.background.intersects(thorn)) {
                this.thorns.removeMember(thorn)

            }
            if (this.fountain.intersects(thorn)) {
                this.thorns.removeMember(thorn)

            }
        })
        this.killScores.forEachMember(killScore => {
            killScore.updateKillScore()
            if (killScore.alpha <= 0) {
                this.killScores.removeMember(killScore)

            }
           
        })
        this.enemys.forEachMember(enemy => {

            enemy.updateEnemy(step)
            this.stage.map.m_bufferA.hitTestAndSeparate(enemy, this)
        })
        this.spawner.update(step);
        this.player.updatePlayer(step)

    }


    if (this.gameOver) {
        if (this.gamepad.justPressed(9)) {
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
weeds.scene.Game.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};


/**
 * Function that initilizes the background of the game
 *
 */
weeds.scene.Game.prototype.initBackground = function () {
    this.background = new rune.display.Graphic(0, 0, 1024, 1024, 'garden1024v5')

    this.stage.addChild(this.background)
}

/**
 * Function that initilizes all the groups of the game
 *
 */
weeds.scene.Game.prototype.initGroups = function () {
    this.bullets = this.groups.create(this.stage)
    this.enemys = this.groups.create(this.stage)
    this.boost = this.groups.create(this.stage)
    this.thorns = this.groups.create(this.stage)
    this.killScores = this.groups.create(this.stage)
}


/**
 * Function that initilizes the player
 *
 */
weeds.scene.Game.prototype.initPlayer = function () {
    this.player = new weeds.player.Player(448, 600, 24, 30, 'fullgardener', this.gamepad, this.bullets, this.enemys, this.camera, this.boost, this.boostmeter, this, this.overlay, this.thorns)
    this.player.animation.create('idle', [18, 19], 6, true)
    this.player.animation.create('run', [0, 1, 2, 3, 4, 5], 6, true)
    this.player.animation.create('dash', [6, 7, 8, 9, 10, 11], 6, true)
    this.player.animation.create('death', [12,13,14,15], 1.8, true)
    this.stage.addChild(this.player)
    this.camera.targets.add(this.player)

}


/**
 * Function that initilizes the camera
 *
 */
weeds.scene.Game.prototype.initCamera = function () {
    this.camera = this.cameras.getCameraAt(0)
    this.camera.bounderies = new rune.geom.Rectangle(0, 0, 1024, 1024)
    this.overlay = new rune.display.DisplayObject(0, 0, this.camera.width, this.camera.height)
    this.overlay.backgroundColor = '#A020F0'
    this.overlay.alpha = .6
    this.camera.addChild(this.overlay)
    this.overlay.visible = false



}


/**
 * Function that initilizes the tilemap
 *
 */
weeds.scene.Game.prototype.initTilemap = function () {
    this.stage.map.load('tilemap')


}

/**
 * Function that initilizes the spawner that spawns enemies
 *
 */
weeds.scene.Game.prototype.initSpawner = function () {
    this.spawner = new weeds.spawner.Spawner(this.enemys, this.stage.map, this.player, this.boost, this.score, this.lives, this.thorns, this.camera, this.killScores, this.bullets, this)

}

/**
 * Function that initilizes the score of the game
 *
 */
weeds.scene.Game.prototype.initScore = function () {
    this.score = new weeds.stats.Score()
    this.score.updateScore()
    this.score.x = 280;
    this.score.y = 15;
    this.application.screen.addChild(this.score)

}

/**
 * Function that initilizes the meter for boost
 *
 */
weeds.scene.Game.prototype.initBoostmeter = function () {
    this.boostmeter = new weeds.stats.Boostmeter(448, 0, 192, 32, 'newboost')
    this.boostmeter.animation.create('fill', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, true)
    this.boostmeter.animation.create('full', [11, 12, 13, 14], 8, true)

    this.application.screen.addChild(this.boostmeter)




}


/**
 * Function that initilizes the lives for the player
 *
 */
weeds.scene.Game.prototype.initLives = function () {

    this.lives = new weeds.stats.Lives(0, 0, 160, 32, 'lifebarnew')
    this.lives.animation.create('full', [0, 1, 2, 3], 0, true)
    this.application.screen.addChild(this.lives)




}

/**
 * Function that initilizes the fountain object 
 *
 */
weeds.scene.Game.prototype.initFountain = function () {
    this.fountain = new rune.display.Sprite(448, 448, 128, 96, 'fountain')
    this.fountain.animation.create('run', [0, 1, 2, 3], 6, true)
    this.stage.addChild(this.fountain)
}

/**
 * Function for when the player loses
 *
 */
weeds.scene.Game.prototype.endGame = function () {
    
    this.timers.create({
        duration: 2000,
       
        onComplete: function () {
            
            this.application.screen.removeChild(this.score)
            this.application.screen.removeChild(this.boostmeter)
            this.application.screen.removeChild(this.lives)
            if (this.highscore.test(this.score.value) >= 0) {
               this.application.scenes.load([new weeds.scene.SetHighscore(this.highscore, this.score.value, this.titlesong, this.gamepad)])
                

            } else {
                this.application.scenes.load([new weeds.scene.GameOver(this.highscore, this.score.value, this.titlesong, this.gamepad)])
            }
           
        }

    })




}