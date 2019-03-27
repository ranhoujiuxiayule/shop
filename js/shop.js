var rname=document.querySelector("#inputname"),
	rnum=document.querySelector("#inputnum"),
	rprice=document.querySelector("#inputprice"),
	sava=document.querySelector("#sava"),
	tbody=document.querySelector("#tbody"),
	prevp=document.querySelector("#prevp"),
	nextp=document.querySelector("#nextp"),
	pagenext=document.querySelector("#page-next");
var pageIndex=1,totalPage;
sava.onclick=function(){
	var name=rname.value,
		num=rnum.value,
		price=rprice.value;
	tools.ajaxGet("api/v1/add.php",{name,price,num},function(res){
		if (res.res_code===1) {
			alert(res.res_message);
			rname.value=rnum.value=rprice.value="";
			$('#myModal').modal('hide');
			goshop();
		}
	})
}
goshop();
function goshop(){
	tools.ajaxGet("api/v1/get.php",{pageIndex},function(res){
		if (res.res_code===1) {
			var {data}=res.res_body;
			pageIndex=res.res_body.pageIndex;
			totalPage=res.res_body.totalPage;
			console.log(pageIndex,totalPage)
			var html="";
			data.forEach(function(shop,i){
				html+=`<tr data-id="${shop.id}">
			  				<td>${(pageIndex-1)*4+ i+1}</td>
			  				<td><span>${shop.name}</span><input type="text"></td>
			  				<td><span>${shop.num}</span><input type="text"></td>
			  				<td><span>${shop.price}</span><input type="text"></td>
			  				<td>
			  					<button type="button" class="btn btn-xs btn-info shopcar">加入购物车</button>
			  					<button class="btn btn-primary btn-xs editbtn">编辑</button>
			  					<button class="btn btn-danger btn-xs delbtn">删除</button>
			  					<button class="btn btn-success btn-xs okbtn">确定</button>
			  					<button class="btn btn-warning btn-xs cancelbtn">取消</button>
			  				</td>
			  			</tr>`
			})
			tbody.innerHTML=html;
			Array.from(pagenext.querySelectorAll(".pageli")).forEach(function(li){
				li.remove();
			})
			for(var i=1;i<=totalPage;i++){
				var li=document.createElement("li");
				li.innerHTML='<a class="page" href="javascript:;">'+i+'</a>';
				li.className=i===pageIndex?"active pageli":"pageli";
				pagenext.insertBefore(li, nextp);
			}
		}
	})
}
pagenext.onclick=function(e){
	e=e||window.event;
	var target=e.target||e.srcElement;
	switch(target.className){
		case "page":
		pageIndex=Number(target.innerHTML);
		goshop();
		break;
		case "prev":
		if(--pageIndex<1){
			pageIndex=1
			return
		}
		goshop();
		break;
		case "next":
		if(++pageIndex>totalPage){
			pageIndex=totalPage;
			return
		}
		goshop();
		break;
		
	}
}
tbody.onclick=function(e){
	e=e||window.event;
	var target=e.target||e.srcElement;
	var tr=target.parentNode.parentNode;
	var id = tr.getAttribute("data-id");
	var aspan=tr.querySelectorAll("span");
	if(target.className.includes("editbtn")){
		tr.classList.add("edit");
		aspan.forEach(function(span){
			span.nextElementSibling.value=span.innerHTML;
		})
	}else if(target.className.includes("okbtn")){
		tr.classList.remove("edit");
		aspan.forEach(function(span){
			span.innerHTML=span.nextElementSibling.value;
		})
		var name=aspan[0].innerHTML,num=aspan[1].innerHTML,price=aspan[2].innerHTML;
		tools.ajaxGet("api/v1/revise.php",{name,num,price,id},function(res){
			if(res.res_code===1){
				alert(res.res_message);
				goshop();
			}else{
				alert(res.res_message);
			}
		})
	}else if(target.className.includes("delbtn")){
		tools.ajaxGet("api/v1/del.php",{id},function(res){
			if(res.res_code===1){
				confirm("确定删除吗？")
				goshop();
			}else{
				alert(res.res_message);
			}
		})
	}else if(target.className.includes("cancelbtn")){
		tr.classList.remove("edit");
	}else if(target.className.includes("shopcar")){
		var name=tr.children[1].children[0].innerHTML;
		var price=tr.children[2].children[0].innerHTML;
		var id=tr.getAttribute("data-id");
		console.log(name,price,id)
		var obj={
			"id":id,
			"name":name,
			"price":price,
			"num":1
		};
		var shopcar=tools.cookie("shopcar");
		if(shopcar){
			shopcar=JSON.parse(shopcar);
			var i=0;
			if(shopcar.some(function(item,index){
				i=index;
				return item.id==id;
			})){
				shopcar[i].num++;
			}else{
				shopcar.push(obj)
			}
		}else{
			shopcar=[obj];
		}
		tools.cookie("shopcar",JSON.stringify(shopcar),{"path":"/","expires":"30"});
	}
	
}
document.querySelector("#shopcar").onclick=function(){
	location.href="html/shopcar.html"
}
