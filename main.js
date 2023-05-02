let $gameboard = document.querySelector("#gameboard");
let $gameSquares = document.querySelectorAll(".square");
let $ending = document.querySelectorAll(".ending");
let $replayButton = document.querySelector(".end-button")
let possibilities =
    [{ class: "blue", src: "imgs/blue.jpg" },
    { class: "purple", src: "imgs/purple.jpg" },
    { class: "green", src: "imgs/green.jpg" },
    { class: "light-blue", src: "imgs/light-blue.jpg" },
    { class: "orange", src: "imgs/orange.jpg" },
    { class: "pink", src: "imgs/pink.jpg" },
    { class: "red", src: "imgs/red.jpg" },
    { class: "yellow", src: "imgs/yellow.jpg" },];
possibilitiesDuplicate = possibilities.concat(possibilities);
let clickCounter = 0;
let foundCount = 0;
let attemptsCounts = 0;
let $selectedSquares = [];
function clickHandler(action) {
    if (action) {
        $gameboard.onclick = function (e) {
            console.log(e.target, clickCounter);
            if (e.target.classList.contains("available")) {
                clickHandler(false);
                squareOpacity([e.target], "100");
                $selectedSquares.push(e.target);
                console.log(clickCounter);
                if ($selectedSquares.length > 1) {
                    clickCounter = 0;
                    console.log("PAR: " + $selectedSquares[0].classList + $selectedSquares[1].classList);
                    if ($selectedSquares[0].className === $selectedSquares[1].className) {
                        lock($selectedSquares);
                        foundCount++;
                        attemptsCounts++;
                        console.log("PUNTUACION:" + attemptsCounts);
                        if (foundCount === 8) {
                            endGame();
                        }
                    } else {
                        setTimeout(squareOpacity, 0.5 * 1000, $selectedSquares, "0");
                    }
                    $selectedSquares = [];
                }
                setTimeout(clickHandler, 0.3 * 1000, true);
            }
        }
    } else {
        console.log("LOCKED");
        $gameboard.onclick = function (e) {
            console.log("Blocked");
        }
    }
}
function endGame() {
    console.log("GAME FINISHED");
    $ending.forEach((element) => {element.classList.add("visible")});
    //$replayButton.onclick = 
}
function squareOpacity($squares, opacity) {
    $squares.forEach((element) => {
        console.log("opacidad: " + opacity + element.classList);
        element.style.opacity = opacity;
    });
}
function lock($squares) {
    $squares.forEach((element) => {
        element.classList.remove("available");
    });
}
function shuffle() {
    $gameSquares.forEach(square => square.classList.remove(possibilities[0].class,
        possibilities[1].class,
        possibilities[2].class,
        possibilities[3].class,
        possibilities[4].class,
        possibilities[5].class,
        possibilities[6].class,
        possibilities[7].class));
    possibilitiesDuplicate = possibilitiesDuplicate.sort(function () {
        return Math.random() - 0.5;
    });
    $gameSquares.forEach(function (value, i) {
        value.classList.add(possibilitiesDuplicate[i].class);
        value.src = possibilitiesDuplicate[i].src;
    });
}
shuffle();
clickHandler(true);
/*
TABLERO ON CLICK(E)








*/