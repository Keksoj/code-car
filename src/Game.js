// Classe Game
// 



class Game {
    constructor() {
        this.level = level;
        this.timer = timer;
        this.score = score;

        this.start = false;
        this.end = false;
        this.onPause = false;
    }

    startGame() {
        level = 0;
        timer = 0;
        score = 0;


        while (this.end == false) {
            currentLevel = new Level();
            startLevel(currentLevel);
        }
    }

    gameOver() {
        this.end == true;

    }

}


