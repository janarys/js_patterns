/*
    The singleton pattern allows an object to be instantiated only once, exposes this single instance to
    consumers, and controls the instantiation of the single instance.
*/

class Logger {
    static logLevels = ['info', 'warn', 'error'];
    static #loggerInstance = null;

    constructor(logLevel = 'info', transport = console) {
        if (Logger.#loggerInstance) {
            throw new TypeError('Logger is not  constructable, use getInstance() instead')
        }
        this.logLevel = logLevel;
        this.transport = transport;
    }

    static getInstance() {
        if (!Logger.#loggerInstance) {
            Logger.#loggerInstance = new Logger('warn', console);
        }
        return Logger.#loggerInstance;
    }

    isLevelEnabled(targetLevel) {
        return Logger.logLevels.indexOf(targetLevel) >= Logger.logLevels.indexOf(this.logLevel)
    }

    info(message) {
        if (this.isLevelEnabled('info')) {
            return this.transport.info(message)
        }
    }

    warn(message) {
        if (this.isLevelEnabled('warn')) {
            return this.transport.info(message)
        }
    }

    error(message) {
        if (this.isLevelEnabled('error')) {
            return this.transport.info(message)
        }
    }

}

const a = Logger.getInstance();
const b = Logger.getInstance();

console.assert(a === b, 'Logger.getInstance() returns the same reference');


/*
    export default new SomeClass(); If we export default then js will cache it and when we will import (different places, multiple time) it, we will get the same object;
    export default Object.freeze(new Logger('warn', console)); we can use this for prevent changing obj properties;
    Summary:
        This is good one it's clear for me, and i bellive we should do it like on example above and don't dance with Object.freeze, export default and other staffs.
*/