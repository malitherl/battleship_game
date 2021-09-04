const ship = require('./index')

it('Ship length is specified', ()=>{
    expect(ship(5)).toEqual({length: 5, type: 'Carrier', 
    status:[
        "Not hit",
             "Not hit",
             "Not hit",
             "Not hit",
             "Not hit",
    ]});
})
