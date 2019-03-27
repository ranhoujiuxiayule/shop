function fn(){
var tbody=document.querySelector("#tbody");
var table=document.querySelector("#table");
var str="";
var shopcar = tools.cookie("shopcar");
shopcar=JSON.parse(shopcar);
console.log(shopcar);
if (shopcar) {
	shopcar.forEach(function(obj,index){
		str+=`<tr data-id="${obj.id}">
					<td>
					<input type="checkbox" />
					<button type="button" class="btn btn-danger btn-xs delbtn">删除该商品</button>
					</td>
					<td>${obj.name}</td>
					<td>
					<span class="nowp">${obj.num}</span>
					<input type="number" / class="inputnum">
					<button type="button" class="btn btn-info btn-xs editbtn" id="numbtn">修改数量</button>
					<button type="button" class="btn btn-info btn-xs okbtn">确定修改</button>
					<button type="button" class="btn btn-info btn-xs cancelbtn">取消修改</button>
					</td>
					<td>${obj.price}</td>
				</tr>`;
			});
			tbody.innerHTML=str;
}else if(shopcar.length==0){
	alert("购物车里的宝贝都被您清空咯！快去添加吧！")
}else{
	table.style.display="none";
	alert("暂无数据");
}
}
fn();
var numbtn=document.querySelector("#numbtn");
var table=document.querySelector("#table");
table.onclick=function(e){
	e=e||window.event;
	var target=e.target||e.srcElement;
	var tr=target.parentElement.parentElement;
	var aspan=tr.querySelectorAll("span");
	var id=tr.getAttribute("data-id");
	if(target.className.includes("editbtn")){
		tr.classList.add("ac");
		aspan.forEach(function(span){
			span.nextElementSibling.value=span.innerHTML;
		})
	}else if (target.className.includes("cancelbtn")) {
		tr.classList.remove("ac");
	}else if(target.className.includes("okbtn")){
		tr.classList.remove("ac");
		aspan.forEach(function(span){
			span.innerHTML=span.nextElementSibling.value;
		})
		var num=Number(tr.children[2].children[0].innerHTML);
		var shopcar = tools.cookie("shopcar");
		shopcar=JSON.parse(shopcar);
		var i=0;
			if(shopcar.some(function(item,index){
				i=index;
				return item.id==id;
			})){
				shopcar[i].num=num;
			}
			tools.cookie("shopcar","",{"expires":"-1"});
			tools.cookie("shopcar",JSON.stringify(shopcar),{"path":"/","expires":"30"});
			fn();
	}else if(target.className.includes("delbtn")){
		var shopcar = tools.cookie("shopcar");
		shopcar=JSON.parse(shopcar);
		if(shopcar.some(function(item,index){
				i=index;
				return item.id==id;
			})){
				if(confirm("确定删除该商品？")){
					shopcar.splice(i,1)
					}
			}
			tools.cookie("shopcar","",{"expires":"-1"});
			tools.cookie("shopcar",JSON.stringify(shopcar),{"path":"/","expires":"30"});
			fn();
	}

}
