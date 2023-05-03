weeds.spawner.Spawner = function (enemys, tilemap, player, boost, score, lifes) {
    this.enemys = enemys
    this.level = 1
    this.spawnCooldown = 1000
    this.spawnDuration = 1000
    this.tilemap = tilemap
    this.player = player
    this.boost = boost
    this.score = score
    this.lifes = lifes
}

weeds.spawner.Spawner.prototype.update = function (step) {
    
    this.spawnDuration += step;
    if (this.spawnDuration >= this.spawnCooldown) {
        var side = Math.ceil(Math.random() * 4)
        var x = 0
        var y = 0
        switch (side) {
            case 1:
                x = Math.random() * 1000
                y = 0
                break;
            case 2:
                x = 1000
                y = Math.random() * 1000
                break;
            case 3:
                x = Math.random() * 1000
                y = 1000
                break;
            case 4:
                x = 0
                y = Math.random() * 1000
                break;
            
        }
        var enemyType =  Math.ceil(Math.random() * 15)
        if (enemyType == 7){
            var enemy = new weeds.enemy.Bigplant(x, y, 32, 48, 'bigenemy', this.tilemap, this.player, this.enemys, this.boost, this.score, this.lifes)
            this.enemys.addMember(enemy)
        }
        else {
            var enemy = new weeds.enemy.Smallplant(x, y, 16, 32, 'enemyhitbox', this.tilemap, this.player, this.enemys, this.boost, this.score, this.lifes)
            this.enemys.addMember(enemy)
        }
        this.spawnDuration = 0
        console.log('enemy spawn')
    }
    var fraction = step / 1000
    this.spawnCooldown -= fraction
    console.log(this.spawnCooldown)
}