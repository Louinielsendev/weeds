weeds.player.Player = function (x, y, width, height, resource, gamepad, bullets, enemys, camera, boost, boostmeter, game) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.speed = 3
    this.lifes = 3
    this.gamepad = gamepad
    this.bullets = bullets
    this.enemys = enemys
    this.camera = camera
    this.game = game
    this.boost = boost
    this.boostmeter = boostmeter
    this.debug = true
    this.isDashing = false
    this.dashTimer = 0
    this.dashDuration = 300
    this.bulletTimer = 0
    this.bulletCooldown = 130
}

weeds.player.Player.prototype = Object.create(rune.display.Sprite.prototype);
weeds.player.Player.prototype.constructor = weeds.player.Player;

weeds.player.Player.prototype.updatePlayer = function (step) {
    if (this.lifes <= 0){
        
       this.game.endGame()
    }
    this.boost.forEachMember(boost => {
        if (boost.intersects(this)) {
            console.log('load ulti')
            this.boost.removeMember(boost)
            this.boostmeter.value++
            this.boostmeter.updateBoostmeter()
        }
    })

    if (this.gamepad.stickLeftLeft) {
        this.x -= this.speed
        this.flippedX = true
        this.animation.gotoAndPlay('run')
    }


    if (this.gamepad.stickLeftRight) {
        this.x += this.speed
        this.flippedX = false
        this.animation.gotoAndPlay('run')
    }
    if (this.gamepad.stickLeftUp) {
        this.y -= this.speed
        this.animation.gotoAndPlay('run')
    }
    if (this.gamepad.stickLeftDown) {
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
            console.log(this.bulletTimer)
            var x = this.gamepad.stickRight.x
            var y = this.gamepad.stickRight.y
            var radians = Math.atan2(y, x)
            this.shot(radians)
            this.bulletTimer = 0
        }

    }

    if (this.isDashing) {
        this.animation.gotoAndPlay('dash')
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

    if (this.gamepad.justPressed(7) && this.boostmeter.value >= 1) {
        this.enemys.forEachMember(enemy => {
            
            if (this.camera.viewport.intersects(enemy)) {
                enemy.life -= 10

            }
            this.camera.flicker.start(1000)
          
            this.boostmeter.value = 0
            this.boostmeter.updateBoostmeter()

        })

    }

}

weeds.player.Player.prototype.shot = function (radians) {
    var bullet = new weeds.bullet.Bullet((this.x + 15), (this.y + 20), 4, 4, 'bullet2', radians, this.bullets, this.enemys, this.camera)
    this.bullets.addMember(bullet)
}

weeds.player.Player.prototype.dash = function () {


}