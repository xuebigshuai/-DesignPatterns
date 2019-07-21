(function(window){

  if(typeof window === 'undefined'){
    window = global;
  }
  // 消息队列
  const subList = [];
  function log(str){
    console.log(str)
  }
  function lazyMan(str){
      log('Hi This is ' + str + '!')
      publish()
  }
  // 具体是实现方法
  function eat (str){
    log('Eat' + str + '~')
    publish()
  }
  function sleep (num){
    setTimeout(function(){
      log('sleep' + num + 's')
      publish()
    },num * 1000)
  }
  // 执行
  const run = ({msg,args})=>{
       switch(msg){
         case 'lazyMan':
             lazyMan.call(null,args)
             break;
         case 'eat':
             eat.call(null,args)
             break;
         case 'sleep': 
         case 'firstSleep':
              sleep.call(null,args)
              break;
         default:;
       }
  }
  // 订阅
  function subscription (){
    var  args = [].slice.call(arguments)
    var  msg = args[0];
    var  params = {};
    params.msg = msg;
    params.args = args.slice(1);
    if(msg === 'firstSleep'){
      subList.unshift(params)
    }else{
      subList.push(params)
    }
  }
  // 发布
  function publish(){
    if(subList.length){
      const task = subList.shift();
      run(task)
    }
  }
  class LazyMan {
     eat(str){
      subscription('eat',str)
      return this
     }
     sleep(num){
      subscription('sleep',num)
      return this
     }
     firstSleep(num){
      subscription('firstSleep',num)
      return this
     }
  }

  // 对外暴露接口
  window.LazyMan = function(str){
    subscription('lazyMan',str)
    setTimeout(()=>{
      publish()
    })
    return new LazyMan();
  }

})(window)