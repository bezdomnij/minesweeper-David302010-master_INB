let clickedCol;
let clickedRow;
let minesInTheNeighborhood;


function init() {
    CheckClickOnFields();
}

function CheckClickOnFields() {
    let elements = document.querySelectorAll(".game-field .row .field ");

    //added: get dataset of mine fields
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
            //changed: right click action
            if (e.button === 2) { // toggles 'flagged' html class to change background (defined in css)
                console.log('flag');
                if (e.target.classList.contains("flagged")) { // remove if it's there
                    e.target.classList.remove("flagged");
                } else {
                    e.target.className += " flagged"; // add if it's not there
                }
            }
            //changed: left click -- open field & get mines nearby
            if (e.button === 0) {
                clickedCol = e.target.dataset.col;
                clickedRow = e.target.dataset.row;
                let nameOfClass = e.target.className;
                console.log(nameOfClass);
                //added: gets array of field contacts
                let neighborhood = collectNeighbours(parseInt(clickedRow), parseInt(clickedCol));
                console.table(neighborhood); // => list of direct contacts

                if (nameOfClass == "field mine") {
                    console.log('mine');
                    e.target.className = "stepped-on-mine";
                } else if (nameOfClass == "field ") {
                    e.target.className = "no-mine";
                    console.log(clickedRow + clickedCol);
                    //added: get count of nearby mines
                    let minesNearby;
                    minesNearby = getMinesNearby(mineIndices, neighborhood);
                    console.log(minesNearby);
                    if (minesNearby) {
                        e.target.textContent = minesNearby; // show number in field
                    }
                }
            }
        });
    }

    function collectNeighbours(row, col) { // calculates neighbours of clicked field
        let neighbours = [];
        let left = col === 0 ? -1 : (col - 1);
        let right = col === 9 ? -1 : (col + 1);
        let above = row === 0 ? -1 : (row - 1);
        let below = row === 9 ? -1 : (row + 1);
        const sides = [left, right];
        for (const side of sides) {
            if (side >= 0) {
                neighbours.push([row.toString(), side.toString()]);
                if (above >= 0) {
                    neighbours.push([above.toString(), side.toString()]);
                }
                if (below >= 0) {
                    neighbours.push([below.toString(), side.toString()]);
                }
            }
        }
        if (above >= 0) {
            neighbours.push([above.toString(), col.toString()]);
        }
        if (below >= 0) {
            neighbours.push([below.toString(), col.toString()]);
        }
        return neighbours;
    }

    // should calculate the coords of the neighbors
    function getMinesNearby(mines, neighbours) {// compares mine and neighbour addresses
        console.table(mines);
        console.table(neighbours);
        let minesNearby = 0;
        for (let i = 0; i < mines.length; i++) {
            for (let j = 0; j < neighbours.length; j++) {
                if (mines[i][0] === neighbours[j][0] && mines[i][1] === neighbours[j][1]) {
                    minesNearby += 1;
                }
            }
        }
        return minesNearby;
    }
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





