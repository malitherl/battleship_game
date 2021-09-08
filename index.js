function ship (length){
    return {
        length: length,
        type: typeDescriptor(length),
        status: statusQuo(length),
        hit(index){
          if(index >= this.length){
              throw Error; 
          } else {
            this.status[index] = 'Hit';  
          }
        },
        isSunk(){
            let sunk = true;
            this.status.forEach(e =>  {
                if(e.valueOf() == 'Not hit'){
                    sunk = false;
                }
            })
            return sunk;
        },
        getLength(){
            return this.length
        },
    }
}
function typeDescriptor(length){
    switch(length){
        case 2: 
            return 'Destroyer';
        case 3: 
            return 'Cruiser';
        case 4: 
            return 'Battleship';
        case 5: 
            return 'Carrier';
        default:
            break;
    }
}

function statusQuo(length){
    let statusArray = [];
    for(let i=0; i< length; i++){
        statusArray.push('Not hit');
    }  
    return statusArray;
}

function placement(col, row, ship){

    if((col.length + row.length) !== ship.length+1){
        return 'invalid';  
    }
}

function gameBoard(){
    let board = new Array(10)
    for(let i =0; i<board.length;i++){
        board[i] = new Array(10)
    }
    return {
        givenBoard: board,
    }
}






export{placement, ship, gameBoard}

