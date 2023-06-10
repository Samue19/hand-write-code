// LFU: 最不经常使用

class LFUCache {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;

        const count = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, count + 1);
    }

    put(key) {
        if (this.cache.has(key)) this.cache
    }
}

