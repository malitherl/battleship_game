import {displayGameBoards} from './DOM';

import _ from 'lodash';

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
        place(ship, x) {    
            let coordinatesNeeded = ship.length;
            let y= 0;
            while(coordinatesNeeded >0){     
                this.givenBoard[x][y]= ship.type;
                coordinatesNeeded--; 
                y++;
            }
            board= this.givenBoard;
            return this.givenBoard;
        },
        //we need to fix this method
        receiveAttack(x,y){
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

function player(enemyGameBoard, a){
    let ships= [];
    let attacks= [];
    let computer;
    for(let i=2; i< 6; i++){
        ships.push(ship(i));
    }
    if(a == 0){
        computer =true;
    } else {
        computer =false;
    }
//need to add a function here to have the player place their ships 
    return{
        armada: ships,
        attack: attacks,
        makeAttack(a,b) {
            let x;
            let y;
            if(computer== true){
               x = Math.floor(Math.random() * 10 +1);
               y = Math.floor(Math.random() * 10 +1);
                if(enemyGameBoard.givenBoard[x][y] !== 0){
                    this.makeAttack(0,0);
                } else {
                    this.attack.forEach(elem => {
                        if(elem === [x,y]){
                            this.makeAttack(0,0);
                        }
                    })
                }
            } else {
                y=b
                x=a;
            } 
            attacks.push([x,y]);
            return x,y;
        },
    }
}


//2.  For now just populate each Gameboard with predetermined coordinates. 
function gameLoop(){
    let playerGameBoard = gameBoard();
    let computerGameBoard = gameBoard();
    let player1= player(computerGameBoard, 1);
    let cpu = player(playerGameBoard, 0); 
    let x =0;
    player1.armada.forEach(e => {
        playerGameBoard.place(e, x)
        computerGameBoard.place(e,x);
        x++;
    })
 
        
 
    

     while((playerGameBoard.allShipsSunk() || computerGameBoard.allShipsSunk()) !== true){
        displayGameBoards(playerGameBoard.givenBoard, computerGameBoard.givenBoard)
        let turn =0;
            if(turn == 0){
                player1.makeAttack(0,0);
                computerGameBoard.receiveAttack(0,0);
                turn++;
            } else {
                cpu.makeAttack(0,0);
                player1.receiveAttack(x,y);
                turn--;
            } 
    } 


}
//how we enter coordinates to place a ship will differ 
gameLoop();


export{placement, ship, gameBoard, player, gameLoop}

