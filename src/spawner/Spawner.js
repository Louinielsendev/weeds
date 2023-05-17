weeds.spawner.Spawner = function (enemys, tilemap, player, boost, score, lives, thorns, camera, killScores) {
    this.enemys = enemys
    this.level = 1
    this.spawnCooldown = 1000
    this.spawnDuration = 1000
    this.tilemap = tilemap
    this.player = player
    this.boost = boost
    this.score = score
    this.lives = lives
    this.thorns = thorns
    this.camera = camera
    this.killScores = killScores
}

weeds.spawner.Spawner.prototype.update = function (step) {
    
    this.spawnDuration += step;
    if (this.spawnDuration >= this.spawnCooldown) {
        var side = Math.ceil(Math.random() * 4)
        var x = 0
        var y = 0
        switch (side) {
            case 1:
                x = Math.random() * 900 + 70
                y = 0
                break;
            case 2:
                x = 1000
                y = Math.random() * 900 + 70
                break;
            case 3:
                x = Math.random() * 900 + 70
                y = 1000
                break;
            case 4:
                x = 0
                y = Math.random() * 900 + 70
                break;
            
        }
        var enemyType =  Math.ceil(Math.random() * 30)
        if (enemyType == 7){
            var enemy = new weeds.enemy.Bigplant(x, y, 32, 48, 'bigplantfull', this.tilemap, this.player, this.enemys, this.boost, this.score, this.lives, this.killScores)
            enemy.animation.create('run', [0,1], 4, true)
            enemy.animation.create('attack', [8,9,10,11,12,13,14,15], 16, true)
            this.enemys.addMember(enemy)
        }
        else if (enemyType == 9 || enemyType == 11 ){
            
            var enemy = new weeds.enemy.Thornbush(x, y, 32, 32, 'thornballfull', this.tilemap, this.player, this.enemys, this.boost, this.score, this.lives, this.killScores, side, this.thorns, this.camera)
        
            this.enemys.addMember(enemy)
        }
        else {
            var enemy = new weeds.enemy.Smallplant(x, y, 16, 32, 'smallplantfull', this.tilemap, this.player, this.enemys, this.boost, this.score, this.lives, this.killScores)
            enemy.animation.create('run', [0,1,2,3], 8, true)
            enemy.animation.create('attack', [7,8,9,10,11,12,13], 16, true)
            this.enemys.addMember(enemy)
        }
           
        
        this.spawnDuration = 0
      
    }
    var fraction = step / 1000
    this.spawnCooldown -= fraction
  console.log(this.spawnCooldown)
}