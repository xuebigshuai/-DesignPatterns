Function.prototype.bind =  function(contex){
  var self = this;
  var args = Array.prototype.slice.call(arguments,1);
  return function(){
   return self.apply(contex,args)
  }
}

function getYv (){
  console.log(this)
  return this.Yv
}
var obj = {
  Yv:120
}
console.log(getYv.bind(obj)());