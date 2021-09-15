
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
        armada: ships, //i can modify this so that the ships are placed automatically 
        //instead of having to do it down in the game loop
        attack: attacks,
        makeAttack(a,b) {
  
            this.enemy.receiveAttack(a,b)
            attacks.push([a,b]);
            return a,b;
        },
    }
}

function gameLogic(){
    let playerGameBoard = gameBoard();
    let computerGameBoard = gameBoard();
    let player1= player(computerGameBoard, 1);
    let cpu = player(playerGameBoard, 0); 
    let players= [player1, cpu] //this can also go
    let x =0;
    let isGameOver= false;
    let determinant =0;
    player1.armada.forEach(e => { //this needs to go 
        playerGameBoard.place(e, x)
        computerGameBoard.place(e,x);
        x++;
    })
    
  displayGameBoards(playerGameBoard.givenBoard, computerGameBoard.givenBoard); 

    //this part is only for the player's turn. the computer doesn't need to use event listeners to interact
    function strike(player, x, y, e){
        player.makeAttack(x,y);
        e.value = player.enemy.givenBoard[x][y];
        update(e);
        console.log(player.enemy.allShipsSunk())
        return player.enemy.allShipsSunk();
    }
   
   function gameLoop(determinant){
       console.log(determinant)
        if(determinant ==0){
            Array.from(document.getElementsByClassName('cell')).forEach(element =>{
                element.addEventListener("click", 
                
                function() {
                    console.log(element);
                    if(strike(player1, element.dataset.x, element.dataset.y, element) == false){
                        Array.from(document.getElementsByClassName('cell')).forEach(element =>{
                            element.outerHTML = element.outerHTML; 
    
                        })
                        gameLoop(determinant);
                    } else {
                        alert('Congratulations! You won the game!')
                    }
                }) 
            })
            determinant++;
        } else {
            let a = Math.floor(Math.random() * 10 +1);
            let b = Math.floor(Math.random() * 10 +1);
            let board = document.getElementById('player');
            console.log(`${a} ${b}`)
            Array.from(document.getElementsByClassName('cell')).forEach(element => {
                if(element.dataset.x == a && element.dataset.y == b 
                        && element.parentElement.id == 'player'){
                    update(element)
                }
            })
            cpu.makeAttack(a,b);
            determinant--;
            gameLoop(determinant)
        } 

   } 
   gameLoop(0);
}

gameLogic();

// Array.from(document.getElementsByClassName('cell')).forEach(element =>{
//     element.addEventListener("click", 
//      function() {
//         strike(currentPlayer, element.dataset.x, element.dataset.y, element);
//         Array.from(document.getElementsByClassName('cell')).forEach(element =>{
//             element.outerHTML = element.outerHTML; 
//         })      
//     }) 
// })

export{placement, ship, gameBoard, player}

/* 
*

here's our pseudocode

gameLoop(parameter1, parameter2,..., parameterx){

    if(player turn){
        eventlisteners added 
    } else {
        the computer makes a random but legal move 
    }
    we check the game condition to see if its done




    gameLoop(same paramaters)
}




*/