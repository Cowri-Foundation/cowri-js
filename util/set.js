export function createLRUSet(max) {
    const cache = new Map();
    const lruSet = {}
    lruSet.has = (value) => hasFn(cache, value)
    lruSet.add = (value) => addFn(cache, max, value);
    lruSet.clear = () => cache.clear();
    lruSet.delete = (key) => cache.delete(key);
    lruSet.forEach = (cb) => cache.forEach(cb);
    return lruSet;
}


function hasFn(cache, value) {
    return cache.has(value);
}


function addFn(cache, max, value) {
    cache.has(value) && cache.delete(value);
    if (cache.size >= max) {
        const oldest = cache.keys().next().value;
        cache.delete(oldest);
    }
    cache.add(value);
}
