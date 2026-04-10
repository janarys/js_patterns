/**
    The flyweight pattern is where the subset of object properties that have the same value are stored in
    shared “flyweight” objects.
    The flyweight pattern is useful when generating large quantities of objects that share a subset of the
    same values.
 */

class CoinFlyweight {
    constructor(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
}

class CoinFlyweightFactory {
    static flyweight = {};
    static get(amount, currency) {
        const flyWeightKey = `${amount} - ${currency}`;
        if (this.flyweight[flyWeightKey]) {
            return this.flyweight[flyWeightKey]
        }
        const instance = new CoinFlyweight(amount, currency);
        this.flyweight[flyWeightKey] = instance;
        return instance;
    }
    static getCount() {
        return Object.keys(this.flyweight).length;
    }
}

class MaterialFlyweight {
    constructor(materialName) {
        this.materialName = materialName;
    }
}

class MaterialFlyweightFactory {
    static flyweight = {}
    static get(materialName) {
        if (this.flyweight[materialName]) {
            return this.flyweight[materialName]
        }
        const instance = new MaterialFlyweight(materialName);
        this.flyweight[materialName] = materialName;
    }

    static getCount() {
        return Object.keys(this.flyweight).length;
    }
}

class Coin {
    constructor(amount, currency, yearOfIssue, materials) {
        this.flyweight = CoinFlyweightFactory.get(amount, currency);
        this.yearOfIssue = yearOfIssue;
        this.materials = materials.map(el => MaterialFlyweightFactory.get(el))
    }
}

class Wallet {
    constructor() {
        this.coins = []
    }
    add(amount, currency, yearOfIssue, materials) {
        const coin = new Coin(amount, currency, yearOfIssue, materials)
        console.log(coin)
        this.coins.push(coin)
    }
    getTotalValueForCurrency(currency) {
        return this.coins.filter(coin => coin.flyweight.currency === currency).reduce((acc, curr) => acc + curr.flyweight.amount, 0)
    }
}
const wallet = new Wallet();

wallet.add(100, 'GBP', '2023', ['nickel-brass',
    'nickel-plated alloy']);
wallet.add(100, 'GBP', '2022', ['nickel-brass',
    'nickel-plated alloy']);
wallet.add(100, 'GBP', '2021', ['nickel-brass',
    'nickel-plated alloy']);
wallet.add(100, 'GBP', '2021', ['nickel-brass',
    'nickel-plated alloy']);
wallet.add(200, 'GBP', '2021', ['nickel-brass',
    'cupro-nickel']);
wallet.add(100, 'USD', '1990', ['copper', 'nickel']);
wallet.add(5, 'USD', '1990', ['copper', 'nickel']);
wallet.add(1, 'USD', '2010', ['copper', 'zinc']);

const memory = process.memoryUsage();
console.log(memory)
console.log(`Heap Used: ${Math.round(memory.heapUsed / 1024 / 1024 * 100) / 100} MB`); // 4.56 MB


const mallet = {
    coins: [],
    add(amount, currency, yearOfIssue, materials) {
        this.coins.push({ amount, currency, yearOfIssue, materials })
    }
}

mallet.add(100, 'GBP', '2023', ['nickel-brass',
    'nickel-plated alloy']);
mallet.add(100, 'GBP', '2022', ['nickel-brass',
    'nickel-plated alloy']);
mallet.add(100, 'GBP', '2021', ['nickel-brass',
    'nickel-plated alloy']);
mallet.add(100, 'GBP', '2021', ['nickel-brass',
    'nickel-plated alloy']);
mallet.add(200, 'GBP', '2021', ['nickel-brass',
    'cupro-nickel']);
mallet.add(100, 'USD', '1990', ['copper', 'nickel']);
mallet.add(5, 'USD', '1990', ['copper', 'nickel']);
mallet.add(1, 'USD', '2010', ['copper', 'zinc']);


console.log(memory)
console.log(`Heap Used: ${Math.round(memory.heapUsed / 1024 / 1024 * 100) / 100} MB`);// 3.76 MB

/*
    Summary:
        Can't buy it. I'm reading this book, i see examples, i braing generates questions, no answers. 
        words from book -> "The flyweight pattern is a normalization technique that reduces the memory footprint at the cost
        of cognitive overhead when accessing and running computations over objects using this pattern.
        Flyweight can be leveraged as a performance optimization when handling large numbers of objects".
        I don't bellive it , we need proofs. Why we should create 4 classes? in fact we see this approach uses more memory , than simple js object which is more simplle,
        easy to understand, read, use and it's uses less memory. May be there should be other example, or more explanation or what ever to explain me why flyweight is good
*/