//synchronous module definition
// 定义模块管理器单体对象
var F = F || {}
F.define = function(str, fn) {
  // 解析模块路径
  var parts = str.split(".")
  //old 当前模块的祖父级模块，parent当前模块的父级模块
  var old = (parent = this)
  // i 模块的当前层级，len 模块的层级长度
  var i = (len = 0)
  //如果第一个模块是模块管理器单体对象，则移除
  if (parts[0] === "F") {
    parts = parts.slice(1)
  }
  // 屏蔽对define和module的重写
  if (parts[0] === "define" || parts[0] === "module") {
    return
  }
  // 变例路由模块并定义每层模块
  for(len = parts.length;i<len;i++){
    // 若果父模块中不存在当前模块
    if(typeof parent[parts[i]] === 'undefined'){
      parent[parts[i]] = {};
    }
    // 缓存下一层的祖父模块
    old = parent;
    // 缓存下一层的父级模块
    parent = parent[parts[i]];
  }
  // 如果给定模块方法则定义该模块方法
  if(fn){
    old[parts[--i]] = fn(); 
  }
  // 返回模块管理单体对象
  return this
}
F.module = function(){
  // 将参数转换成数组
  var args = [...arguments] ;// Array.prototype.slice.call(arguments)
  // 获取回调执行函数
  var fn = args.pop();
  // 获取依赖模块，如果args[0]为数组，则依赖模块为args[0],否则为args
  var parts = Array.isArray(args[0])?args[0] : args ;
  // 依赖模块列表
  var modules = [];
  // 模块路由
  var modIDs = '';
  // 依赖模块索引
  var i = 0;
  // 依赖模块长度
  var len  = parts.length;
  // 父模块, 模块路由层级索引，模块路由层级长度
  var parent , j , jlen;
  // 遍历依赖模块,解析依赖路由,获取到依赖并添加到依赖模块列表中
  modules = modules.concat(parts.map((item,index)=>{
    if(typeof item === 'string'){
       parent = this;
       modIDs = item.replace(/^F./,'').split('.');
       modIDs.forEach(element => {
         parent = parent[element] || false
       });
       return parent
    }else{
     return item
    }
  }))
  // 执行回调函数
  //fn.apply(null,modules)
  fn(...modules)
}
F.define('string',function(){
  return {
    // 清除字符串两端的空白
    trim(str){
      return str.replace(/^\s+|\s+$/g,'')
    }
  }
})
F.define('time',function(){
  return new Date()
})
console.log(' 123 '.length)
console.log(F.string.trim(' 123 ').length)
F.module(['string','time'],function(string,time){
  console.log(string.trim('   235  '))
  console.log(time.getDay())
})
F.module(function(){
  return 'module'
},function(fn){
  console.log(fn())
})
