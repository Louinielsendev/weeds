weeds.spawner.Spawner = function (enemys, tilemap, player, boost, score) {
    this.enemys = enemys
    this.level = 1
    this.spawnCooldown = 1000
    this.spawnDuration = 2000
    this.tilemap = tilemap
    this.player = player
    this.boost = boost
    this.score = score
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

        var enemy = new weeds.enemy.Enemy(x, y, 32, 32, 'enemyhitbox', this.tilemap, this.player, this.enemys, this.boost, this.score)
        this.enemys.addMember(enemy)
        this.spawnDuration = 0
        console.log('enemy spawn')
    }

}