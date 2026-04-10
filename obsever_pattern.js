/*
    Observer pattern is one of the Behavior design pattern
    The observer pattern allows an object (the observable or subject) to maintain a list of other objects
    that depend on it (observers). 
*/

class Queue {
    constructor() {
        this.handlers = [];
    }
    subscribe(handlerFn) {
        this.handlers.push(handlerFn);
    }
    unsubscribe(handlerFn) {
        this.handlers = this.handlers.filter((handler) =>
            handler !== handlerFn);
    }
    notify(message) {
        this.handlers.forEach((handler) => {
            handler(message);
        });
    }
}

const queue = new Queue();
const createMessages = [];
queue.subscribe((message) => {
    if (message.type === 'CREATE') {
        createMessages.push(message);
    }
});
const updateMessages = [];
queue.subscribe((message) => {
    if (message.type === 'UPDATE') {
        updateMessages.push(message);
    }
});
const allMessages = [];
queue.subscribe((message) => {
    allMessages.push(message);
});

queue.notify({
    type: 'CREATE', data: { user: { id: 1 } }
});
queue.notify({ type: 'CREATE', data: { user: { id: 2 } } });
queue.notify({ type: 'CREATE', data: { user: { id: 3 } } });
queue.notify({
    type: 'UPDATE', data: {
        user: {
            id: 1, role:
                'ADMIN'
        }
    }
});
queue.notify({
    type: 'UPDATE',
    data: { user: { id: 3, role: 'DEVELOPER' } },
});
queue.notify({
    type: 'UPDATE', data: {
        user: {
            id: 3, role:
                'ADMIN'
        }
    }
});
console.assert(
    createMessages.length === 3,
    '%o collects CREATE messages',
    allMessages
);
console.assert(
    updateMessages.length === 3,
    '%o collects UPDATE messages',
    allMessages
);
console.assert(
    allMessages.length === 6,
    '%o collects all message',
    allMessages
);

/*
    Summary: 
        Is this a pattern ? looks like this is a just data structure, just one class/object. Is there any way to implement it ? 
*/