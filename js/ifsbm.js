window.onload=function(){
	var lg=document.querySelector("#lg"),
		reg=document.querySelector("#reg"),
		welcom=document.querySelector("#welcom"),
		clear=document.querySelector("#clear");
	var username=tools.cookie("username");
	if(username){
		lg.style.display="none";
		reg.style.display="none";
		welcom.style.display="inline-block";
		clear.style.display="inline-block";
		document.querySelector("#myname").innerHTML=username;
	}
	clear.onclick=function(){
		if (confirm("退出登录？")) {
			tools.cookie("username",username,{"expires":-1,"path":"/"});
			lg.style.display="block";
			reg.style.display="block";
			welcom.style.display="none";
			clear.style.display="none";
		}
		
	}
}
