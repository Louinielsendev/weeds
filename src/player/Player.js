/**
 * Class for the player
 * @param {number, number, number, number, string, object, object, object, object, object, object, object, object, object}  
 */
weeds.player.Player = function (x, y, width, height, resource, gamepad, bullets, enemys, camera, boost, boostmeter, game, overlay, thorns) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.speed = 3
    this.lives = 3
    this.gamepad = gamepad
    this.bullets = bullets
    this.enemys = enemys
    this.camera = camera
    this.game = game
    this.overlay = overlay
    this.thorns = thorns
    this.boost = boost
    this.boostmeter = boostmeter
    this.shootSound = this.application.sounds.sound.get("weapon");
    this.hurtSound = this.application.sounds.sound.get('hurt');
    this.dashSound = this.application.sounds.sound.get('dash')
    this.ultiSound = this.application.sounds.sound.get('ulti')
    this.isDashing = false
    this.dashTimer = 0
    this.dashDuration = 300
    this.bulletTimer = 0
    this.bulletCooldown = 150
    this.walking = false
}

weeds.player.Player.prototype = Object.create(rune.display.Sprite.prototype);
weeds.player.Player.prototype.constructor = weeds.player.Player;


/**
 * Function that updates the player every tick
 * @param {number}  
 */
weeds.player.Player.prototype.updatePlayer = function (step) {
    var walking = false
    
    
    if (this.lives <= 0){
    this.animation.gotoAndPlay('death')
    
       this.game.endGame()
       return
    }
    this.boost.forEachMember(boost => {
        if (boost.intersects(this)) {
           boost.pickupSound.play()
            this.boost.removeMember(boost)
            this.boostmeter.value += 1
            if (this.boostmeter.value < 10){
                this.boostmeter.animation.gotoNextFrame()
            }
            else {
                this.boostmeter.animation.gotoAndPlay('full')
            }
            
          
        }
    })
    
    if (this.gamepad.stickLeftLeft && this.x > 66 || this.keyboard.pressed('a') && this.x > 66) {
        walking = true
        this.x -= this.speed
        this.flippedX = true
       
    }


    if (this.gamepad.stickLeftRight && this.x < 910 || this.keyboard.pressed('d') && this.x < 910) {
        walking = true
        this.x += this.speed
        this.flippedX = false
        this.animation.gotoAndPlay('run')
    }
    if (this.gamepad.stickLeftUp && this.y > 66 || this.keyboard.pressed('w') && this.y > 66) {
        walking = true
        this.y -= this.speed
        this.animation.gotoAndPlay('run')
    }
    if (this.gamepad.stickLeftDown && this.y < 915 || this.keyboard.pressed('s') && this.y < 915) {
        walking = true
        this.y += this.speed
        this.animation.gotoAndPlay('run')
    }

 


    if (!walking){
        this.animation.gotoAndPlay('idle')
    }
    else {
        this.animation.gotoAndPlay('run')
    }


    if (this.keyboard.justPressed('SPACE')) {
        this.isDashing = true

    }

    this.bulletTimer += step

    if (this.gamepad.stickRightDown || this.gamepad.stickRightUp || this.gamepad.stickRightRight || this.gamepad.stickRightLeft) {
        if (this.bulletTimer >= this.bulletCooldown) {
           
            var x = this.gamepad.stickRight.x
            var y = this.gamepad.stickRight.y
            var radians = Math.atan2(y, x)
            this.shot(radians)
            this.bulletTimer = 0
        }

    }

    if (this.isDashing ) {
       this.dash(step)
    }

    if (this.gamepad.justPressed(0)) {

        this.isDashing = true
    }
    if (this.overlay.flicker.active){
        this.overlay.visible = true
    }
    else {
        this.overlay.visible = false
    }

    if (this.gamepad.justPressed(7) && this.boostmeter.value >= 10) {
        this.ultimate()
    }

}

/**
 * Funktion that creates a new bullet object everytime the player shoots
 * @param {number}  
 */
weeds.player.Player.prototype.shot = function (radians) {
    console.log(typeof radians)
    this.shootSound.play()
    var bullet = new weeds.projectile.Bullet((this.x + 15), (this.y + 20), 4, 4, 'bullet2', radians, this.bullets, this.enemys, this.camera)
    this.bullets.addMember(bullet)
}

weeds.player.Player.prototype.ultimate = function(){
    this.overlay.flicker.start();
        this.ultiSound.play()
        this.thorns.forEachMember(thorn =>{
            if (this.camera.viewport.intersects(thorn)) {
                this.thorns.removeMember(thorn)

            }
        })
        this.enemys.forEachMember(enemy => {
           
           
            if (this.camera.viewport.intersects(enemy)) {
                enemy.life -= 10

            }
            this.boostmeter.value = 0
            this.boostmeter.animation.gotoAndPlay('fill', 0)
            

        })

}

/**
 * Function for player dash
 * @param {number}  
 */
weeds.player.Player.prototype.dash = function(step){
    this.animation.gotoAndPlay('dash')
    this.dashSound.play()
    this.dashTimer += step;
    if (this.dashTimer >= this.dashDuration) {
        this.isDashing = false;
        this.speed = 3
        this.dashTimer = 0
    }
    else if (this.gamepad.stickLeftDown && this.gamepad.stickLeftLeft || this.gamepad.stickLeftDown && this.gamepad.stickLeftRight || this.gamepad.stickLeftUp && this.gamepad.stickLeftRight || this.gamepad.stickLeftUp && this.gamepad.stickLeftLeft) {
        this.speed = 6
    }
    else {
        this.speed = 8;
    }


}
