function ship (length){
    return {
        length: length,
        type: typeDescriptor(length),
        status: statusQuo(length)
        
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



console.log(ship(5));



module.exports = ship;