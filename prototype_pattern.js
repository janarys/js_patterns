/*  
    Prototype pattern is one of creational design pattern
    Creational pattern handle object creation , it's allow create object without knowing how new object is creating
*/

//  This is an example from book "Javascript Design Patterns ( Hugo Di Francesco )"

class BoardSquare {
    constructor(color, row, file, startingPiece) {
        this.color = color;
        this.row = row;
        this.file = file;
    }
    occupySquare() {
        this.piece = piece;
    }
    clearSquare() {
        this.piece = null;
    }
}

/*
    const whiteSquare = new BoardSquare('white');
    const blackSquare = new BoardSquare('black');
    const whiteSquareLast = new BoardSquare('white');
*/

/*  
    We need create each square manualy -> const whiteSquareTwo = new BoardSquare('white');
    In this case if we want to change all squares to 'black' we have to change the parameter passed to each call of BoardSquare,
*/

class BoardSquarePrototype {
    constructor(prototype) {
        this.prototype = prototype;
    }
    clone() {
        const boardSquare = new BoardSquare();
        boardSquare.color = this.prototype.color;
        boardSquare.row = this.prototype.row;
        boardSquare.file = this.prototype.file;
        return boardSquare;
    }
}

const whiteSquare = new BoardSquare('white');
const whiteSquarePrototype = new BoardSquarePrototype(whiteSquare);
const whiteSquareTwo = whiteSquarePrototype.clone();
const whiteSquareLast = whiteSquarePrototype.clone();

// console.assert will show nothing, and it will show message when condition is fail and in this case message is not relevant, not clear;
console.assert(
    whiteSquare.color === whiteSquareTwo.color,
    'Prototype.clone() -ed instance have the  same color as the prototype'
)
console.assert(
    whiteSquare !== whiteSquareTwo,
    'each Prototype.clone() call outputs a different instance'
)

/*

    clone() {
        const boardSquare = new BoardSquare();
        boardSquare.color = this.prototype.color;
        boardSquare.row = this.prototype.row;
        boardSquare.file = this.prototype.file;
        return boardSquare;
    }

    there we can update our clone method with Object.assign() method which is copy all properties of objec

    clone () {
        return Object.assign(new BoardSquare() , this prototype) 
    }
    
*/

/*
    We can use Object.create() method, it works as inheritance, under the hood it just reference to square object.
    If we try get some properties which is not exist in otherSquare obj then js will search that property in objects parrent object, proptype chain
*/

const square = {
    color: 'white',
    occupySquare(piece) {
        this.piece = piece;
    },
    clearSquare() {
        this.piece = null;
    }
}

const otherSquare = Object.create(square);

otherSquare.color = 'black'

console.log(otherSquare) // {color: 'black'} 

console.log(otherSquare.__proto__)
/*
    {
        color: 'white',
        occupySquare: [Function: occupySquare],
        clearSquare: [Function: clearSquare]
    }

    if we change otherSquare.color to 'black' , square object color property still 'white'
 */


/*
    Summary: 
        Propbably not the best example, but ok. I would say there we explored some js features not the idea of creational -> prototyping pattern;
        In fact this is just a wrapper which is took already created instance and copy its values and return new instance, may be it is some kind of HOC,
        may be we need more use cases to buy it for now its look like not so much useful in real world let's see 
*/

