# Architecture

-   Le navigateur ouvre `index.html`
-   `index.html` appelle `index.js`
-   `index.js` instancie la classe `Game` de `Game.js`
-   `game.js` pilote toute la logique.

## `Game.js`

Effectue le rendu du `canvas`
Construit la `Map`.

## `Map.js`

Se génère avec:

-   une certaine quantité d'obstacle (`obstacleRatio`)
-   un point de départ
-   un point d'arrivée

## `Car.js`
