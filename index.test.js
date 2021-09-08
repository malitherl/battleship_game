import {ship, placement, gameBoard} from './index';

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