
import {displayGameBoards, update} from './DOM';

function ship (length){

    let statusArray = statusQuo(length);

    return {
        length: length,
        type: typeDescriptor(length),
        status: statusArray,
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
        board[i].fill([]);
    }
    let ships = new Map();
    let misses =[];
    return { 
        givenBoard: board,
        missed: misses,
        place(ship, x) {    
            let coordinatesNeeded = ship.length;
            let y= 0;
            let coords =[];
            while(coordinatesNeeded >0){     
                let data= [ship.type, ship.status[coordinatesNeeded-1], ship.length-coordinatesNeeded];
                this.givenBoard[x][y] = data;
                let c = [x,y];
                coords.push(c)
                coordinatesNeeded--; 
                y++;
            }
            ships.set(ship, coords);
            board= this.givenBoard;
            console.log(ships)
            return this.givenBoard;
        },
   
        receiveAttack(x,y){
            let array = [x,y];
            if (this.givenBoard[x][y] !== 0){
                ships.forEach(function(value, key){
                    value.forEach(elem => {
                       if(elem.toString() === array.toString()){
                             key.hit(value.indexOf(elem));
                             let data = [key.type, key.status[value.indexOf(elem)]];
                             array= data; 
                       }
                    })
                })
            } else {
                misses.push(array);
                return misses;
            }
            this.givenBoard[x][y] = array;
            return this.givenBoard;
        },
        allShipsSunk(){
            let shipsSunk = true;
                ships.forEach(function(value, key){
                    if(key.isSunk() == false){
                        shipsSunk = false;
                    }
                })
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
        enemy: enemyGameBoard,
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
               console.log(this.enemy)
               this.enemy.receiveAttack(a,b)
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
    
  
           


  displayGameBoards(playerGameBoard.givenBoard, computerGameBoard.givenBoard);
    //this part is only for the player's turn. the computer doesn't need to use event listeners to interact
    function strike(player, x, y, e){
        player.makeAttack(x,y);
        console.log(x)
        console.log(y)
        e.value = player.enemy.givenBoard[x][y];
        update(e);
    }

    Array.from(document.getElementsByClassName('cell')).forEach(element =>{
        element.addEventListener("click", 
         function() {
            strike(player1, element.dataset.x, element.dataset.y, element);
          
        }) //we can use this command to strip the elements of its event listeners and proceed on
        element.outerHTML = element.outerHTML; 
    })
    

}

gameLoop();


export{placement, ship, gameBoard, player, gameLoop}

