//------------------------------------------------------------------------------
// Constructor scope
//------------------------------------------------------------------------------

/**
 * Creates a new instance of the Main class.
 *
 * @constructor
 * 
 * @class
 * @classdesc
 * 
 * Entry point class.
 */
weeds.system.Main = function() {

    //--------------------------------------------------------------------------
    // Super call
    //--------------------------------------------------------------------------
    
    /**
     * Extend (Rune) Application.
     */
    rune.system.Application.call(this, {
        developer: "com.louidev",
        app: "weeds",
        build: "1.0.0",
        scene: weeds.scene.Game,
        resources: weeds.data.Requests,
        useGamepads:true,
        useKeyboard:true,
        framerate: 30,
        debug: true,
        screenResolutionX: 568,
        screenResolutionY: 320
    });
};

//------------------------------------------------------------------------------
// Inheritance
//------------------------------------------------------------------------------

weeds.system.Main.prototype = Object.create(rune.system.Application.prototype);
weeds.system.Main.prototype.constructor = weeds.system.Main;