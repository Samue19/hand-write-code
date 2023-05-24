// 1.如何处理复杂对象, 如 Date, Regexp, Set, Map
// 2.如何处理循环引用
function deepClone(source, memory) {
    const isPrimitive = (value) => {
        return /Number|Boolean|String|Null|Undefined|Symbol|Function/.test(
            Object.prototype.toString.call(value)
        );
    };

    let result = null;
    memory || (memory = new WeakMap());
    if (isPrimitive(source)) {
        result = source;
    }
    else if (Array.isArray(source)) {
        result = source.map((value) => deepClone(value, memory));
    }
    else if (Object.prototype.toString.call(source) === "[object Date]") {
        result = new Date(source);
    }
    else if (Object.prototype.toString.call(source) === "[object Regexp]") {
        result = new RegExp(source);
    }
    else if (Object.prototype.toString.call(source) === "[object Set]") {
        result = new Set();
        for (const value of source) {
            result.add(deepClone(value, memory))
        }
    }
    else if (Object.prototype.toString.call(source) === "[object Map]") {
        result = new Map();
        for (const [key, value] of source.entries()) {
          result.set(key, deepClone(value, memory));
        }
    }
    // 引用类型
    else {          
        if (memory.has(source)) {
            result = memory.get(source);
        } else {
            result = Object.create(null);
            memory.set(source, result);
            Object.keys(source).forEach((key) => {
                const value = source[key];
                result[key] = deepClone(value, memory);
            })
        }
    }
    return result;
}

let a = {
    "a": 1,
    name: "samuel"
}
let b = null;

let c = deepClone(a, b)
console.log(c)
