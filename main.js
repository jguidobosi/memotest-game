$gameboard = document.querySelector("#gameboard");
$gameSquares = document.querySelectorAll(".square");

let possibilities =
    [{ class: "blue", src: "imgs/blue.jpg" },
    { class: "purple", src: "imgs/purple.jpg" },
    { class: "green", src: "imgs/green.jpg" },
    { class: "light-blue", src: "imgs/light-blue.jpg" },
    { class: "orange", src: "imgs/orange.jpg" },
    { class: "pink", src: "imgs/pink.jpg" },
    { class: "red", src: "imgs/red.jpg" },
    { class: "yellow", src: "imgs/yellow.jpg" },]

possibilitiesDuplicate = possibilities.concat(possibilities);





$gameboard.onclick = function (e) {
    console.log("Clases: " + e.target.className);
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
/*
TABLERO ON CLICK(E)








*/