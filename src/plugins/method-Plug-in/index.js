import loadding from '../components-Plug-in/loadding';
export default {
  install(Vue){
    Vue.prototype.loadding=loadding;
    //对象深度拷贝 1）（递归方法）
    Vue.prototype.unbound0 = obj => {

      let newObj = null;

      const obj1 = (isObj, keys) => {
        if (keys === undefined) {
          newObj = Array.isArray(obj) ? [] : {};
          Object.assign(newObj, newObj, obj);
        } else {
          const newSt = JSON.parse(isObj), newObj1 = Array.isArray(newSt) ? [] : {};
          Object.assign(newObj1, newObj1, newSt);
          newObj[keys] = newObj1;
        }
        for (let key of Object.keys(isObj)) {
          if (typeof isObj[key] === "object") {
            obj1(JSON.stringify(isObj[key]), key);
          }
        }
        return newObj
      };
      return obj1(obj);
    };

    //对象深度拷贝 2）（利用 JSON.stringify 不可枚举的属性默认会被忽略的特性）
    Vue.prototype.unbound = obj => {
      let newObj = {}, ObjString;
      Object.assign(newObj, newObj, obj);
      ObjString = JSON.stringify(newObj);
      return JSON.parse(ObjString);
    };

    //判断对象是否相等
    Vue.prototype.objEqual = (a, b) => {
      const a1 = JSON.stringify(a), b1 = JSON.stringify(b);
      const isTrue = a1.split("").sort().join() === b1.split("").sort().join();//高效率
      return isTrue;
    };

    //判断数组是否相等
    Vue.prototype.arrayEqual = (a, b) => {
      return JSON.stringify(a.sort()) === JSON.stringify(b.sort());
    };

    //数组去重
    Vue.prototype.duplicateRemoval = arry => {
      const b = new Set(arry);
      return Array.from(b);
    };

    // 不同域名跨域传值
    Vue.prototype.asyncLocalStorage=async() => {
      console.log(999999)
      return new Promise((resolve, reject) => {
        window.onmessage = function (e) {
          resolve(e);
        };
      });
    };
  }
}
