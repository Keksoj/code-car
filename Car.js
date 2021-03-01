// JavaScript source code
// Création classe Car

class Car {
    constructor(
        xPosition,
        yPposition,
        orientation // prend les valeurs 1, 2, 3 ou 4 si la voiture est orientée N, E, S, O
    ) {
        this.xPosition = xPosition;
        this.yPposition = yPosition;
        this.orientation = orientation;
    }

// méthodes pour les mouvements de la voiture

    moveForward(nbCases) {
        switch (this.orientation) {
            case 1:
                if (this.yPosition > nbCases) {
                    this.yPosition -= nbCases;
                } else {
                    console.log("Flash info : un accident est survenu sur le périphérique Nord de Canvas-city. Une candidature est morte sur le coup.")
                }
                break;
            case 2:
                if (this.xPosition < TAILLEMAX_X - CANVAS - nbCases) {
                    this.xPosition += nbCases;
                } else {
                    console.log("Flash info : un accident est survenu sur le périphérique Est de Canvas-city. Une candidature est morte sur le coup.")
                }
                break;
            case 3:
                if (this.yPosition < TAILLEMAX_Y - CANVAS - nbCases) {
                    this.yPosition += nbCases;
                } else {
                    console.log("Flash info : un accident est survenu sur le périphérique Sud de Canvas-city. Une candidature est morte sur le coup.")
                }
                break;
            case 4:
                if (this.xPosition > nbCases) {
                    this.xPosition -= nbCases;
                } else {
                    console.log("Flash info : un accident est survenu sur le périphérique Ouest de Canvas-city. Une candidature est morte sur le coup.")
                break;
        }
    }

    moveBack(nbCases) {
        switch (this.orientation) {
            case 1:
                this.yPosition += nbCases;
                break;
            case 2:
                if (this.xPosition > nbCases) {
                    this.xPosition -= nbCases;
                }
                break;
            case 3:
                if (this.yPosition > nbCases) {
                    this.yPosition -= nbCases;
                }
                break;
            case 4:
                this.xPosition += nbCases;
                break;
    }

    turnLeft() {
                this.orientation += 4 % 4;
                moveForward(1);
    }

    turnRight() {
                this.orientation += 1 % 4;
                moveForward(1);
    }
        

       

    

}