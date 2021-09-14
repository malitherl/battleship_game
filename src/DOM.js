

function displayGameBoards(playerBoard, computerBoard){
    let content = document.getElementById("content");
    content.style.width= "520px"
    let playerSection = document.createElement('DIV');
    let computerSection = document.createElement('DIV');
    
    playerSection.style.display= "none";
    playerSection.style.gridTemplateColumns= "auto auto auto auto auto auto auto auto auto auto "

    computerSection.style.marginTop= "10px";
    computerSection.style.display= "grid";
    computerSection.style.gridTemplateColumns= "auto auto auto auto auto auto auto auto auto auto "


    




    playerBoard.forEach(element => {     
        element.forEach(e => {
            //we could use divs inside divs to create the shapes that we'd want to represent our battleships 
            let cell = document.createElement("DIV");
            cell.setAttribute("class", "cell");
            cell.style.width = "50px";
            cell.style.height = "50px";
            sortingCells(e, cell)
            cell.style.border = "solid 1px grey";
            playerSection.appendChild(cell)
        })
    });

    for(let a=0; a<10; a++){
        for(let b=0; b<10; b++){
            let cell = document.createElement("DIV");
            cell.setAttribute("class", "cell");
            cell.style.width = "50px";
            cell.style.height = "50px";
            sortingCells(computerBoard[a][b], cell)
            cell.style.border = "solid 1px grey";
            cell.value = computerBoard[a][b];
            cell.dataset.x= a;
            cell.dataset.y= b;   
            computerSection.appendChild(cell)
        }
    }
    content.appendChild(playerSection);
    content.appendChild(computerSection);



function sortingCells(array, cell){
    
    if(array[1] === 'Hit'){
        //we could replace this with a png overlaid the top so that it looks like a real hit 
        cell.style.backgroundColor = 'black';
        let img= document.createElement('img');
        img.style.height='50px';
        img.style.width ='50px';
        img.src= 'https://www.pngpix.com/wp-content/uploads/2016/11/PNGPIX-COM-Explosion-PNG-Image.png';
        cell.appendChild(img);

    } else {    
        if(array[0] !== undefined){
            cell.style.backgroundColor =  'black';
        } else {
            cell.style.backgroundColor =  '#003366';
        }
    }
}
}





function update(cell){
    if(cell.value[1] === 'Hit'){
        cell.style.backgroundColor = 'black';
        let img= document.createElement('img');
        img.style.height='50px';
        img.style.width ='50px';
        img.src= 'https://www.pngpix.com/wp-content/uploads/2016/11/PNGPIX-COM-Explosion-PNG-Image.png';
        cell.appendChild(img);
    } else {
        cell.textContent = 'X';
        cell.style.color= 'red';
        cell.style.fontSize = '45px';
        cell.style.fontFamily = 'arial'
        cell.style.textAlign ='center'
    }
}





export {displayGameBoards, update};