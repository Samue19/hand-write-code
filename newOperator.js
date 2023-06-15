// url: https://juejin.cn/post/6844903704663949325
// 1. 创建了一个全新的对象。
// 2. 这个对象会被执行[[Prototype]]（也就是__proto__）链接。
// 3. 生成的新对象会绑定到函数调用的this。
// 4. 通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
// 5. 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，
// 	那么new表达式中的函数调用会自动返回这个新的对象。

function newOperator(ctor){
    if(typeof ctor !== 'function'){
      throw 'the first param must be a function';
    }
    newOperator.target = ctor;

    var newObj = Object.create(ctor.prototype);
    var argsArr = [].slice.call(arguments, 1);
    var res = ctor.apply(newObj, argsArr);

    var isObject = typeof res === 'object' && res !== null;
    var isFunction = typeof res === 'function';
    if(isObject || isFunction){
        return res;
    }

    return newObj;
}
