let $gameboard = document.querySelector("#gameboard");
let $gameSquares = document.querySelectorAll(".square");
let $ending = document.querySelectorAll(".ending");
let $replayButton = document.querySelector(".end-button")
let $endingText = document.querySelector(".end-text")
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
let scoreCounter = 0;
let $selectedSquares = [];
function clickHandler(action) {
    if (action) {
        $gameboard.onclick = function (e) {
            console.log("Unlocked");
            if (e.target.classList.contains("available")) {
                clickHandler(false);
                squareOpacity([e.target], "100");
                $selectedSquares.push(e.target);
                if ($selectedSquares.length > 1) {
                    scoreCounter++;
                    clickCounter = 0;
                    if ($selectedSquares[0].className === $selectedSquares[1].className) {
                        lock($selectedSquares);
                        foundCount++;
                        if (foundCount === 8) {
                            endGame();
                        }
                    } else {
                        setTimeout(squareOpacity, 0.5 * 1000, $selectedSquares, "0");                    }
                    $selectedSquares = [];
                }
                setTimeout(clickHandler, 0.3 * 1000, true);
            }
        }
    } else {
        $gameboard.onclick = function (e) {
            console.log("Blocked");
        }
    }
}
function endGame() {
    foundCount = 0;
    $ending.forEach((element) => {element.classList.add("visible")});
    $endingText.textContent = `GOOD JOB PIRATE! Took you ${scoreCounter.toString()} shots.`
    $replayButton.onclick = function(){
        restartGame();
    }
}
function restartGame() {
    scoreCounter = 0;
    squareOpacity($gameSquares,0);
    shuffle();
    clickHandler(true);
    $ending.forEach((element) => {element.classList.remove("visible")});
    unlock($gameSquares)
}
function squareOpacity($squares, opacity) {
    $squares.forEach((element) => {
        element.style.opacity = opacity;
    });
}
function lock($squares) {
    $squares.forEach((element) => {
        element.classList.remove("available");
    })
}
function unlock($squares) {
    $squares.forEach((element) => {
        element.classList.add("available");
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
