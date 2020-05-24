let clickedCol;
let clickedRow;
let minesInTheNeighborhood;


function init() {
    CheckClickOnFields();
}

function CheckClickOnFields() {
    let elements = document.querySelectorAll(".game-field .row .field ");

    // get dataset of mine fields
    let mines = document.getElementsByClassName('field mine');
    let mineIndices = [];
    for (let i = 0; i < mines.length; i++) {
        mineIndices.push([mines[i].dataset.row, mines[i].dataset.col]);
    }
    console.table(mineIndices);

    //let checkCoord = [];
    for (let element of elements) {
        element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            return false;
        });
        element.addEventListener('mousedown', function (e) {
            if (e.button === 2) {
                console.log('flag');
                if (e.target.classList.contains("flagged")) {
                    e.target.classList.remove("flagged");
                    //e.target.style.background = "url(''static/img/open-field.png)";
                    // if (e.target.classList.contains("mine")) {
                    //     // e.target.className = "field mine";
                    //     e.target.classList.remove("flagged");
                    // } else {
                    //     e.target.className = "field "
                    // }

                } else {
                    e.target.className += " flagged";
                }
            }
            if (e.button === 0) {
                let classnm = e.target.className;
                if (classnm == "field mine") {
                    console.log('mine')
                    // e.target.className = "stepped-on-mine";
                    console.log(e.target.dataset.row, e.target.dataset.col,"lofasz")
                } else if (classnm == "field ") {
                    e.target.className = "no-mine";
                    clickedCol = e.target.dataset.col;
                    clickedRow = e.target.dataset.row;
                    console.log(clickedRow + clickedCol)
                    calculateNeighborCoord()
                }
            }
        });
    }
}

// should calculate the coords of the neighbors
function calculateNeighborCoord() {
    return
}


// should go through all the fields with mines, and check if it is the neighbor of the clicked field.
// If yes, then minesInTheNeighborhood should be counting the sum of the mines. minesInTheNeighborhood should
// be displayed on the clicked field
/*function checkMines() {
    let mines = document.querySelectorAll(". mine");
    for (let field of mines) {
        if (field.dataset.row == 2 && field.dataset.col == 2){
            console.log()
        }
    }

}*/


init();





