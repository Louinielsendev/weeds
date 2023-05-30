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
 * Menu scene.
 */
weeds.scene.Menu = function () {
    this.highscore = null
    this.menu = null
    this.gamepad = null;
    this.titlescreen = null
    this.movesound = null;
    this.selectsound = null;
    this.titlesong = null;
 
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
    this.initTitlescreen();
    this.movesound = this.application.sounds.sound.get('movesound', false);
    this.selectsound = this.application.sounds.sound.get('selectsound', false);
    this.titlesong = this.application.sounds.master.get('titlesong')
    this.titlesong.play()




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
    if (this.gamepad.justPressed(13) || this.keyboard.justPressed('DOWN')) {
        this.menu.down()
        this.movesound.play()
    }

    if (this.gamepad.justPressed(12) || this.keyboard.justPressed('UP')) {
        this.menu.up()
        this.movesound.play()
    }
    if (this.gamepad.justPressed(0) || this.keyboard.justPressed('ENTER')) {
        this.menu.select()
        this.selectsound.play()
       if (this.menu.m_index == 0) {
        this.titlesong.fade(0, 2000)
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
weeds.scene.Menu.prototype.dispose = function () {
    rune.scene.Scene.prototype.dispose.call(this);
};

/**
 * Function that initilizes the menu with choices
 *
 */
weeds.scene.Menu.prototype.initMenu = function () {
    this.menu = new rune.ui.VTMenu()
    this.menu.y = 170
    this.menu.x = 250
    this.menu.add('Play')
    this.menu.add('How to play')
    this.menu.add('Highscore')
    this.stage.addChild(this.menu)
   
    this.menu.onSelect(function () {
       
        switch (this.menu.m_index) {
            case 0:
                this.titlesong.stop()
                this.application.scenes.load([new weeds.scene.Game(this.highscore, this.titlesong, this.gamepad)])
                break;
            case 1:
                this.application.scenes.load([new weeds.scene.Tutorial(this.gamepad)])
                break;
            case 2:
                this.application.scenes.load([new weeds.scene.Highscore(this.highscore, this.gamepad)])
                break;
        }

    }, this)
}

/**
 * Function that initilizes the gamepad
 *
 */
weeds.scene.Menu.prototype.initGamepad = function () {
    this.gamepad = this.gamepads.get(0)
}

/**
 * Function that initilizes the title screen
 *
 */
weeds.scene.Menu.prototype.initTitlescreen = function(){
    this.titlescreen = new rune.display.Graphic(0, 0, 640, 360, 'titlescreen')
    this.stage.addChild(this.titlescreen)
}