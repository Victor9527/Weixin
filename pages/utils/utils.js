
/**
 * 10 =>  [1,0,0,0,0]
 * 20 =>  [1,1,0,0,0]
 * ...以此推类
 * 
 */

function cutStars(num){
    var currentNum = num.substring(0,1);
    var stars =[];
    for(var i = 0;i<5;i++){
      if(currentNum >i){
        stars.push(1);

      }else{
        stars.push(0);

      }

    }
    return stars;
}

/*过长标题超过部分 用 ...显示 */
function cutTitle(name){
  if(name.length >6){
    name=name.substring(0,6)+"...";
  }
  return name;
}

function http(url,callback,params){
  wx.request({
    url:url,
    data:params,
    header:{
      'content-type':'application/xml'
    },
    success:function(data){
      callback(data.data);
    }
  })
}
module.exports={
  cutStars:cutStars,
  cutTitle:cutTitle,
  http:http
}