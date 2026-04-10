/*
    Structural design pattern -> Adapter pattern
    In the adapter pattern’s case, it involves being able to use a new implementation without changing the
    consumer or the implementation’s interface. The “adapter” takes the new implementation and “adapts”
    the interface to match what the consumer expects.
    We’re not changing the implementation or the consumer; rather, we’re building an adapter to wrap
    the implementation and plug it into the consumer without changing either.
*/

import { v4 as uuidv4 } from 'uuid';

class IdGenerator {
    get(entry) {
        return JSON.stringify(entry);
    }
}
class Database {
    constructor(idGenerator) {
        this.idGenerator = idGenerator;
        this.entries = {};
    }
    createEntry(entryData) {
        const id = this.idGenerator.get(entryData);
        this.entries[id] = entryData;
        return id;
    }
    get(id) {
        return this.entries[id];
    }
}

const naiveIdDatabase = new Database(new IdGenerator());
naiveIdDatabase.createEntry({
    name: 'pear',
});
console.assert(
    naiveIdDatabase.get('{"name":"pear"}').name === 'pear',
    'stringIdDatabase recalls entries by stringified entry'
);

class UuidFactory {
    generateUuid() {
        return uuidv4();
    }
}

class UuidIdGeneratorAdapter {
    constructor() {
        this.uuidFactory = new UuidFactory();
    }
    get(_entry) {
        return this.uuidFactory.generateUuid();
    }
}

const uuidIdDatabase = new Database(new UuidIdGeneratorAdapter());
const uuidEntryId = uuidIdDatabase.createEntry({
    name: 'pear',
});

/*
    Summary:
        Make sense, good;
*/