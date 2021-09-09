import { player } from ".";

function displayGameBoards(playerBoard, computerBoard){
    let content = document.getElementById("content");
    content.style.width= "520px"
    let playerSection = document.createElement('DIV');
    
    let computerSection = document.createElement('DIV');
    
    playerSection.style.display= "grid";
    playerSection.style.gridTemplateColumns= "auto auto auto auto auto auto auto auto auto auto "

    computerSection.style.marginTop= "10px";
    computerSection.style.display= "grid";
    computerSection.style.gridTemplateColumns= "auto auto auto auto auto auto auto auto auto auto "



    playerBoard.forEach(element => {     
        element.forEach(e => {
            let cell = document.createElement("DIV");
            cell.setAttribute("class", "cell");
            cell.style.width = "50px";
            cell.style.height = "50px";
            cell.style.backgroundColor= sortingCells(e)
            cell.style.border = "solid 1px grey";
            playerSection.appendChild(cell)
        })
    });

    computerBoard.forEach(element => {
        element.forEach(e=>{
            let cell = document.createElement("DIV");
            cell.setAttribute("class", "cell");
            cell.style.width = "50px";
            cell.style.height = "50px";
            cell.style.backgroundColor= sortingCells(e)
            cell.style.border = "solid 1px grey";
            cell.value = e;
            computerSection.appendChild(cell)
        })
    })

    content.appendChild(playerSection);
    content.appendChild(computerSection);

  return Array.from(document.getElementsByClassName('cell')).forEach(element => {
        element.addEventListener("click", function() {
            if(element.value !== 0 && element.value !== 'Hit'){
                   return 'Hit';
               }
           })
    })
}

function sortingCells(string){
    if(string === 'Destroyer'){
        return 'yellow';
    } else if(string === 'Cruiser'){
        return '#99cc00';
    } else if(string === 'Battleship'){
        return '#00ff00';
    } else if(string === 'Carrier'){
        return '#6699ff';
    } else if(string === 'Hit'){
        return 'red';
    } else {
        return '#003366';
    }
}


export {displayGameBoards};