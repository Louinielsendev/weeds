weeds.player.Player = function (x, y, width, height, resource, gamepad, bullets, enemys, camera, boost, boostmeter, game, overlay) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.speed = 3
    this.lives = 3
    this.gamepad = gamepad
    this.bullets = bullets
    this.enemys = enemys
    this.camera = camera
    this.game = game
    this.overlay = overlay
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
}

weeds.player.Player.prototype = Object.create(rune.display.Sprite.prototype);
weeds.player.Player.prototype.constructor = weeds.player.Player;

weeds.player.Player.prototype.updatePlayer = function (step) {
    if (this.lives <= 0){
        
       this.game.endGame()
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

    if (this.gamepad.stickLeftLeft && this.x > 66) {
        this.x -= this.speed
        this.flippedX = true
        this.animation.gotoAndPlay('run')
    }


    if (this.gamepad.stickLeftRight && this.x < 910) {
        this.x += this.speed
        this.flippedX = false
        this.animation.gotoAndPlay('run')
    }
    if (this.gamepad.stickLeftUp && this.y > 66) {
        this.y -= this.speed
        this.animation.gotoAndPlay('run')
    }
    if (this.gamepad.stickLeftDown && this.y < 915) {
        this.y += this.speed
        this.animation.gotoAndPlay('run')
    }

    if (this.keyboard.pressed('d') && this.x < 950) {

        this.x += this.speed
        this.flippedX = false
        this.direction = 'right'


    }
    if (this.keyboard.pressed('a') && this.x > 50) {
        this.x -= this.speed
        this.flippedX = true
        this.direction = 'left'

    }
    if (this.keyboard.pressed('w') && this.y > 50) {
        this.y -= this.speed
        this.direction = 'up'

    }
    if (this.keyboard.pressed('s') && this.y < 950) {
        this.y += this.speed
        this.direction = 'down'

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

    if (this.isDashing) {
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
        this.overlay.flicker.start();
        this.ultiSound.play()
        this.enemys.forEachMember(enemy => {
           
           
            if (this.camera.viewport.intersects(enemy)) {
                enemy.life -= 10

            }
            this.boostmeter.value = 0
            this.boostmeter.animation.gotoAndPlay('fill', 0)
            

        })

    }

}

weeds.player.Player.prototype.shot = function (radians) {
    this.shootSound.play()
    var bullet = new weeds.projectile.Bullet((this.x + 15), (this.y + 20), 4, 4, 'bullet2', radians, this.bullets, this.enemys, this.camera)
    this.bullets.addMember(bullet)
}

