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
            return this.status[index];
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
        board[i] = new Array(10);
        board[i].fill(0, 0)
    }
    let misses =[];
    return { 
        givenBoard: board,
        missed: misses,
        place(ship) {    
            let coordinatesNeeded = ship.length;
            let x =0;
            let y= 0;
            while(coordinatesNeeded >0){     
                this.givenBoard[x][y]= ship.type;
                coordinatesNeeded--; 
                y++;
            }
            board= this.givenBoard;
            return this.givenBoard;
        },
        receiveAttack(x,y, ship0){
            if (this.givenBoard[x][y] !== 0){
                this.givenBoard[x][y] = ship0.hit(x);
                return ship0.hit(x);
            } else {
                misses.push("(" + x + ", " + y + ")");
                return misses;
            }           
        },
        allShipsSunk(){
            let shipsSunk = true;
            for(let i= 0; i< 10; i++){
                for(let j=0; j< 10; j++){
                    if(this.givenBoard[i][j] !== 0 && this.givenBoard[i][j] !== 'Hit'){
                        shipsSunk= false;
                    }
                }
            }
            return shipsSunk;
        }


    }
}






export{placement, ship, gameBoard}

