export function createLRUMap(max) {
    const cache = new Map();
    const lruMap = {}
    lruMap.has = (key) => hasFn(cache, key)
    lruMap.get = (key) => getFn(cache, key);
    lruMap.set = (key, value) => setFn(cache, max, key, value);
    lruMap.clear = () => cache.clear();
    lruMap.delete = (key) => cache.delete(key);
    lruMap.forEach = (cb) => cache.forEach(cb);
    return lruMap;
}


function hasFn(cache, key) {
    return cache.has(key);
}


function getFn(cache, key) {
    if (!cache.has(key)) return;
    const value = cache.get(key);
    cache.delete(key) && cache.set(key, value);
    return value;
}


function setFn(cache, max, key, value) {
    cache.has(key) && cache.delete(key);
    if (cache.size >= max) {
        const oldest = cache.keys().next().value;
        cache.delete(oldest);
    }
    cache.set(key, value);
}
