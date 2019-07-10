function instance_of(t, r) {
  console.log("r", r.prototype)
  console.log("t", t.__proto__)
  console.log(Object.prototype.toString.call(r))
  while (true) {
    if (!t.__proto__) {
      return false
    }
    if (t.__proto__ === r.prototype) {
      return true
    }
    t = t.__proto__
  }
}
const arr = new Array()
//console.log(arr instanceof Array)
console.log(instance_of(arr, 1222))
/**
 * Object.prototype.toString.call 能够判断数据类型的原理
 *
 * Object.prototype.toString
 * 在toString方法被调用时,会执行下面的操作步骤:
 *    如果this的值为undefined,则返回"[object Undefined]".
 *    如果this的值为null,则返回"[object Null]".
 *    让O成为调用ToObject(this)的结果.
 *    让class成为O的内部属性[[Class]]的值.
 *    返回三个字符串"[object ", class, 以及 "]"连接后的新字符串.
 *
 * */
class NewA {
  constructor(a) {
    this.num = a
  }
}
let newA = new NewA(3)
console.log(Object.prototype.toString(newA))
console.log(instance_of(newA, NewA))
console.log(instance_of(newA, Object))
