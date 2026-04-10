/*
    Proxy/reflect pattern is one of structural design pattern;
    Structural design pattern -> all about connection between objects
    Proxy/reflect provide interfacees to object
*/

// There we follow open/closed principle not modified but extended
class Implementation {
    someFn() {
        return 'some-output'
    }

    sensetiveFn() {
        return 'sensetive-output'
    }
}

class ReductionProxy {
    constructor() {
        this.impl = new Implementation();
    }

    someFn() {
        return this.impl.someFn();
    }

    sensetiveFn() {
        return this.impl.sensetiveFn().replace('sensetive', '[Redacted]');
    }
}

const obj = {
    someFn() {
        return 'sensetive-some-output'
    },
    sensetiveFn() {
        console.log("-->", this)
        return 'sensetive-output'
    },
    field: 'sensetive-data'
}


const createObjProxy = new Proxy(obj,
    {
        get(target, property, _reciver) {
            if (target[property] instanceof Function) {
                return (...args) => {
                    if (property.includes('sensetive')) {
                        return '[Redacted]'
                    }

                    console.log('proxy this', this)
                    // There we lost 'this' context;
                    // Intersting way to call a function;
                    const output = target[property](...args);
                    if (typeof output === 'string') {
                        return output.replace('sensetive', '[Redacted]')
                    }
                    return output;
                }
            }
            if (property.includes('sensetive')) {
                return '[Redacted]'
            }
            return target[property].replace('sensetive', '[Redacted]')
        }
    })
createObjProxy.sensetiveFn()

const redact = (propertyName, redactionValue) => {
    if (propertyName.includes('sensetive')) {
        return '[Redact]'
    }
    if (typeof redactionValue === 'string') {
        return redactionValue.replace('sensetive', '[Redact]')
    }
    return redactionValue
}

const createObjProxyReflect = new Proxy(obj,
    {
        get(target, property, reciver) {
            const targetPropertyValue = Reflect.get(target, property, reciver)
            if (target[property] instanceof Function) {
                return (...args) => {
                    const output = Reflect.apply(
                        targetPropertyValue,
                        this === reciver ? this : target,
                        args
                    )
                    return redact(property, output)
                }
            }
            return redact(property, targetPropertyValue)
        }
    })


/* 
    Idea is very good and fully clear but
    i think we can do all of this staffs without complication like this  
*/
