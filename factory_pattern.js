/*
    Factory pattern -> objects which is produce new objects (function return new ojb)
 */

class Building {
    generateBuilding() {
        this.topFloor = this.makeTopFloor();
        /*
            Interesting thing there happens, if we do console.log(this) it will return {House {topFloor: 1}} 
            I suppose because we call generateBuilding() 
            like this house.generateBuilding() add pass house context to the generateBuilding method
        */
    }
    // Js don't provide abstract methods, overriding methods and thats way we do what we do here
    makeTopFloor() {
        throw new Error('not implemented, left for subclass to implement')
    }
}

// We can implement makeTopFloor() for each subclass

/*
   There is open/closed principle. Building class is open to extension we can create sub classes but it closed to modification we can not
   change Building class behavior 
*/

class SkyScarper extends Building {
    makeTopFloor() {
        return {
            level: 123
        }
    }
}

class House extends Building {
    makeTopFloor() {
        return {
            level: 1
        }
    }
}

const house = new House();
house.generateBuilding();
console.assert(house.topFloor.level === 1, 'topFloor works in House')

// Js way to do factory pattern

function generateBuilding({ makeTopFloor }) {
    return {
        topFloor: makeTopFloor()
    }
}

const house2 = generateBuilding({
    makeTopFloor() {
        return {
            level: 1
        }
    }
})

/* 
    Summary:
        This is interesting one, i belive there might be a several ways to do factory method,
        for example we do something like this -> 
        function generateBuilding(obj, floor){
            return {...obj, obj.floor = floor}
        }
        const house = generateBuilding({}, 1)
        is it factory pattern ? i guess yes it is. 
*/