/*
    Structural design pattern -> Decorator pattern 
    very similar to the proxy pattern, decorator pattern is about adding functionality to object
*/

class HttpClient {
    async getJson(url) {
        const response = await fetch(url);
        if (response.ok) {
            return response.json();
        }
        throw new Error(`Error loading ${url}`);
    }
}

class InstrumentedHttpClient {
    constructor(client) {
        this.client = client;
        this.requestTimings = {};
    }
    async getJson(url) {
        const start = performance.now();
        const output = await this.client.getJson(url);
        const end = performance.now();
        if (!Array.isArray(this.requestTimings[url])) {
            this.requestTimings[url] = []
        }
        this.requestTimings[url].push(end - start)
        return output
    }
}

const httpClient = new HttpClient();
const instrumentedClient = new InstrumentedHttpClient(httpClient);

console.log(
    await instrumentedClient.getJson('https://ifconfig.io/all.json')
)
console.log(instrumentedClient.requestTimings)

async function getJsonF(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    throw new Error(`Error loading ${url}`);
}

const allOperations = new Map();

function addTiming(getJson) {
    return async (url) => {
        const start = performance.now();
        const output = await getJson(url);
        const end = performance.now();
        const prevOperationTimings = allOperations.set(url) || [];
        allOperations.set(url, prevOperationTimings.concat(end - start));
        return output;
    }
}

const getJsonWithTiming = addTiming(url)

console.log(await getJsonWithTiming('https://ifconfig.io/all.json'))


/*
    Summary: 
        It make sense, good one;
*/
