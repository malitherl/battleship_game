import {ship, placement, gameBoard, player} from './src/index';
/* 
test('Coordinates are too big for ship', () => {
    let x = ship(5);
    expect(placement([1, 10], ['B','C','D','E','F'], x)).toEqual('invalid');
})

test('Coordinates are too small for ship', () => {
    let x = ship(5);
    expect(placement([1], ['B','C','D','E'], x)).toEqual('invalid');
})

test('Board is a 10 x 10 Array', ()=> { 
    expect(gameBoard().givenBoard.length).toEqual(10)
    expect(gameBoard().givenBoard[0].length).toEqual(10)
})

test('Small Destroyer was placed onto Board', ()=>{
    expect(gameBoard().place(ship(2))).toEqual([
        ["Destroyer", "Destroyer", 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ])
})

test('Small Destroyer was hit', ()=>{
    let game= gameBoard();
    let ship0 = ship(2)
    game.place(ship0)
    expect(game.receiveAttack(0,0, ship0)).toEqual('Hit');
})

test('Small Destroyer was not hit', ()=>{
    let game1 = gameBoard();
    let ship1 = ship(2);
    game1.place(ship1);
    game1.receiveAttack(3,3, ship1);
    game1.receiveAttack(3,4, ship1);
    game1.receiveAttack(3,5, ship1);
    expect(game1.missed).toEqual(["(3, 3)", "(3, 4)", "(3, 5)"])
})

test('Not all Ships have been sunk', ()=>{
    let game2 = gameBoard();
    let ship2=ship(5);
    game2.place(ship2);
    expect(game2.allShipsSunk()).toEqual(false);
})
test('All ships have been sunk', ()=>{
    let game3 = gameBoard();
    let ship3= ship(2);
    game3.place(ship3);
    game3.receiveAttack(0,0, ship3);
    game3.receiveAttack(0,1, ship3);
    expect(game3.allShipsSunk()).toEqual(true);
})

test('A computer has made a legal move', ()=> {
    let enemyBoard = gameBoard();
    let cpu = player(enemyBoard, 0);
    expect(cpu.makeAttack()).toBeLessThan(11);
})

test('An attack was recorded', ()=>{
    let enemyBoard = gameBoard();
    let cpu = player(enemyBoard, 1);
    cpu.makeAttack(0,0);
    expect(cpu.attack).toEqual([[0,0]]);
}) */

test('Gameboard displays correct information', ()=>{
    let game = gameBoard();
    let a = ship(2)
    expect(game.place(a,0)).toStrictEqual([
        [["Destroyer", "Not hit"], ["Destroyer", "Not hit"], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []]
    ])
})

test('Game takes a hit when an attack is made', ()=>{
    let game = gameBoard();
    let b = ship(2);
    game.place(b, 0,0)
    expect(game.receiveAttack(0,0)).toStrictEqual([
        [["Destroyer", "Hit"], ["Destroyer", "Not hit"], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []], 
        [[], [], [], [], [], [], [], [], [], []]
    ])
})
