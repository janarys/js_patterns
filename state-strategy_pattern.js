/*
    The state and strategy patterns are closely related, in that they allow the extension of a software system‘s
    functionality by changing decoupled implementation objects, instead of changing the core subject object.
 */

class PullRequest {
    constructor(isDraft = false) {
        this.state = isDraft ? new DraftState(this) : new
            OpenState(this);
    }
    setState(state) {
        this.state = state;
    }
    open() {
        this.state.open();
    }
    markDraft() {
        this.state.markDraft();
    }
    markReadyForReview() {
        this.state.markReadyForReview();
    }
    close() {
        this.state.close();
    }
    merge() {
        this.state.merge();
    }
}

class DraftState {
    constructor(pullRequest) {
        this.pullRequest = pullRequest;
    }
    markReadyForReview() {
        this.pullRequest.setState(new OpenState
            (this.pullRequest));
    }
    close() {
        this.pullRequest.setState(new ClosedState
            (this.pullRequest));
    }
}

class OpenState {
    constructor(pullRequest) {
        this.pullRequest = pullRequest;
    }
    markDraft() {
        this.pullRequest.setState(new DraftState
            (this.pullRequest));
    }
    close() {
        this.pullRequest.setState(new ClosedState
            (this.pullRequest));
    }
    merge() {
        this.pullRequest.setState(new MergedState
            (this.pullRequest));
    }
}

class MergedState {
    constructor(pullRequest) {
        this.pullRequest = pullRequest;
    }
}

class ClosedState {
    constructor(pullRequest) {
        this.pullRequest = pullRequest;
    }
    open() {
        this.pullRequest.setState(new OpenState
            (this.pullRequest));
    }
}

const pullRequest1 = new PullRequest(true);
console.assert(pullRequest1.state instanceof DraftState,
    pullRequest1.state);
pullRequest1.markReadyForReview();
console.assert(pullRequest1.state instanceof OpenState,
    pullRequest1.state);

pullRequest1.merge();

console.assert(
    captureError(() => pullRequest1.open()) instanceof Error,
    pullRequest1.state
);
console.assert(
    captureError(() => pullRequest1.markReadyForReview())
    instanceof Error,
    pullRequest1.state
);
console.assert(
    captureError(() => pullRequest1.close()) instanceof
    Error,
    pullRequest1.state
);

class ObjectMerger {
    constructor(defaultStrategy) {
        this.strategy = defaultStrategy;
    }
    setStrategy(newStrategy) {
        this.strategy = newStrategy;
    }
    combineObjects(obj1, obj2) {
        return this.strategy.combineObjects(obj1, obj2);
    }
}

class PureObjectAssignStrategy {
    constructor() { }
    combineObjects(obj1, obj2) {
        return Object.assign({}, obj1, obj2);
    }
}

const obj1 = {
    keys: '123',
};
const obj2 = {
    keys: '456',
};
const defaultMergeStrategyOutput =
    objectMerger.combineObjects(obj1, obj2);
console.assert(defaultMergeStrategyOutput.keys === '456',
    '%o has keys = 456');
console.assert(obj1.keys === '123' && obj2.keys === '456',
    obj1, obj2);

class MutatingObjectAssignStrategy {
    constructor() { }
    combineObjects(obj1, obj2) {
        return Object.assign(obj1, obj2);
    }
}

objectMerger.setStrategy(new
    MutatingObjectAssignStrategy());
const mutatingMergedStrategyOutput =
    objectMerger.combineObjects(obj1, obj2);
console.assert(
    mutatingMergedStrategyOutput.keys === '456',
    '%o has keys = 456',
    mutatingMergedStrategyOutput
);
console.assert(
    obj1.keys === '456' && obj2.keys === '456',
    'Mutates the original object obj1 %o, obj2 %o',
    obj1,
    obj2
);

class ObjectSpreadStrategy {
    constructor() { }
    combineObjects(obj1, obj2) {
        return { ...obj1, ...obj2 };
    }
}

objectMerger.setStrategy(new ObjectSpreadStrategy());
const newObj1 = { keys: '123' };
const newObj2 = { keys: '456', obj1: newObj1 };
const objectSpreadStrategyOutput = objectMerger.combineObjects(
    newObj1,
    newObj2
);
console.assert(
    objectSpreadStrategyOutput.keys === '456',
    '%o has keys = 456',
    objectSpreadStrategyOutput
);
console.assert(
    newObj1.keys === '123' && newObj2.keys === '456',
    'Does not mutate the original object new Obj1 %o,newObj2 % o',
    newObj1,
    newObj2
);

console.assert(
    objectSpreadStrategyOutput.obj1 === newObj1,
    'Does a shallow clone so objectSpreadStrategyOutput.obj1 references newObj1'
);

class DeepCloneObjectAssignStrategy {
    constructor() { }
    combineObjects(obj1, obj2) {
        return Object.assign(structuredClone(obj1),
            structuredClone(obj2));
    }
}

objectMerger.setStrategy(new DeepCloneObjectAssignStrategy());
const deepCloneStrategyOutput = objectMerger.
    combineObjects(newObj1, newObj2);
console.assert(
    deepCloneStrategyOutput.keys === '456',
    '%o has keys = 456',
    deepCloneStrategyOutput
);
console.assert(
    newObj1.keys === '123' && newObj2.keys === '456',
    'Does not mutate the original object newObj1 %o,newObj2 % o',
    newObj1,
    newObj2
);
console.assert(
    deepCloneStrategyOutput.obj1 !== newObj1 &&
    deepCloneStrategyOutput.obj1.keys === newObj1.keys,
    'Does a shallow clone so deepCloneStrategyOutput.obj1 references newObj1'
);

/*
    Summary:
        Overcomplicated may be under the hood v8 it is implemented like this but i don't see reason use this in javascript, TODO implement all of these staffs in my way 
*/