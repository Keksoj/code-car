// classe Level

class Level {
    constructor () {
        this.timer = timer;
        this.ctx = ctx;
        this.ticktime = 500;
        this.cellSize = cellSize;
        this.widthInCells = widhtInCells;
        this.heightInCells =heightInCells;

        this.start = false;
        this.end = false;
    }

    startLevel() {
        var leftTime = this.timer;
        while (leftTime!=0){
            setTimeout(function(){
                leftTime-=1
            }, 1000);
        }
    
    }

    levelOver() {
        gameOver();
    }
}