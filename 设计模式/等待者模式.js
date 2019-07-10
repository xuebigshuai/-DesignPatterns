// 等待者模式
var Waiter = function() {
  //注册了等待对象的容器
  var dfd = [],
    // 成功回调方法的容器
    doneArr = [],
    // 失败回调方法的容器
    faillArr = [],
    slice = Array.prototype.slice,
    that = this
  class Promise {
    constructor() {
      this.resolved = false
      this.rejected = false
    }
    resolve() {
      // 设置当前对象成功解决
      this.resolved = true
      // 如果没有监控对象则取消
      if (dfd.length === 0) {
        return
      }
      dfd = dfd.filter(item => {
        return !item.resolved || item.rejected
      })
      dfd.length === 0 && _exec(doneArr)
    }
    reject() {
      this.rejected = true
      if (!dfd.length) {
        return
      }
      dfd.splice(0)
      _exec(faillArr)
    }
  }
  // 内部方法 生成Promise实例
  that.Deferred = function() {
    return new Promise()
  }
  //回调执行方法
  function _exec(arr) {
    Array.prototype.forEach.call(arr, fn => {
      fn && fn()
    })
  }
  // 监控异步方法
  that.when = function() {
    dfd = slice.call(arguments)
    // 获取监控对象的长度
    var i = dfd.length
    for (--i; i > 0; i--) {
      // 如果已经成功或失败或者不是promise监控对象或者不存在
      if (
        !dfd[i] ||
        dfd[i].resolved ||
        dfd[i].rejected ||
        !dfd[i] instanceof Promise
      ) {
        // 清理内存，去除当前对象
        dfd.splice(i, 1)
      }
    }
    return that
  }
  // resolve成功回调函数 添加方法
  that.done = function() {
    doneArr = doneArr.concat(slice.call(arguments))
    return that
  }
  // reject失败回调函数 添加方法
  that.fail = function() {
    faillArr = faillArr.concat(slice.call(arguments))
    return that
  }
}
var waiter = new Waiter()

var first = (function() {
  var dtd = waiter.Deferred()
  setTimeout(() => {
    console.log("first")
    dtd.resolve()
  }, 5000)
  return dtd
})()
var second = (function() {
  var dtd = waiter.Deferred()
  setTimeout(() => {
    console.log("second")
    dtd.resolve()
  }, 10000)
  return dtd
})()
waiter.when(first, second).done(
  function() {
    console.log("success")
  },
  function() {
    console.log("success again")
  }
)
