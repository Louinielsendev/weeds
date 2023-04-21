weeds.player.Player = function (x, y, width, height, resource, gamepad, bullets, enemys) {
    rune.display.Sprite.call(this, x, y, width, height, resource);
    this.speed = 4
    this.gamepad = gamepad
    this.bullets = bullets
    this.enemys = enemys
}

weeds.player.Player.prototype = Object.create(rune.display.Sprite.prototype);
weeds.player.Player.prototype.constructor = weeds.player.Player;

weeds.player.Player.prototype.updatePlayer = function (step) {

    if (this.gamepad.stickLeftLeft){
        this.x -= this.speed
        this.flippedX = true
    }

    if (this.gamepad.stickLeftRight){
        this.x += this.speed
        this.flippedX = false
    }
    if (this.gamepad.stickLeftUp){
        this.y -= this.speed
    }
    if (this.gamepad.stickLeftDown){
        this.y += this.speed
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


    if (this.keyboard.pressed('SPACE')) {
        this.isDashing = true

    }

    if (this.gamepad.stickRightDown || this.gamepad.stickRightUp || this.gamepad.stickRightRight || this.gamepad.stickRightLeft){
        var x = this.gamepad.stickRight.x
        var y = this.gamepad.stickRight.y
        var radians = Math.atan2(y, x)
        this.shot(radians)
    }
}

weeds.player.Player.prototype.shot = function(radians){
    var bullet = new weeds.bullet.Bullet((this.x + 15), (this.y + 20), 4, 4, 'bullet2', radians, this.bullets, this.enemys)
    this.bullets.addMember(bullet)
}