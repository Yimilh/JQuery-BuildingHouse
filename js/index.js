//添加方块

function addLine(father,index,length){
     var ul = $("<ul/>");
     father.append(ul);

     for (var i = 0; i < length; i++) {
     	var li = $("<li/>");
     	ul.append(li);
     }
     //每次点击重新设置ul的bottom值，先创建再设置css
     ul.css({
     	bottom:index*$("li").height()
     });
     move(ul,father);
}

function move(tag,father){
	//animate实现ul来回左右移动的动画，5s从0到终点，结束后再5s从终点到0
    //递归实现来回移动

	tag.animate({

        left:father.width()-tag.width(),

     },2000,function(){

     	tag.animate({

           left:0

     	},2000,function(){

     		move(tag,father);
     	});
     });
}
//current是ul的jq对象
function remove(before,current){
      var before_left=before.position().left;
      var current_left=current.position().left;
      var difference=current_left-before_left;
      //判断此时当前方块在前一个方块的左边还是右边
      var direction_left=true;
      if (difference>0) {
      	direction_left=false;
      } 
      var value =Math.abs(difference);
      //掉下去的方块个数
      var num = parseInt(value/10);
      //找bug s1 
      console.log("num:"+num);
      // console.log("before_left:"+before_left);
      // console.log("current_left:"+current_left);

      var removeIndex=0;
      for (var i = 0; i < num; i++) {
         	//取出ul里面的li的jq对象
         	var li = current.children()[i];
         	//找bug s2
         	console.log("当前li个数："+current.children().length);
         	//console.log("i:"+i);

         	//答案：每次删除都应该删除第一个
         	$(li).remove();
         	if (direction_left) {
         	    	current.css({
                    left:current.position().left+$(current.children()).width()
         	    });
         	}
         	//每次都令i=0，即删除的都是第一个li
         	i--;
         	removeIndex++;
         	if (removeIndex == num) {
         		  //删除次数==删除个数时 说明任务完成，直接停掉循环
                  break;
         	}
         }   
}