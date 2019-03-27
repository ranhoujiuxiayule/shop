window.onload=function(){
var user=document.querySelector("#inputuser");
var psw=document.querySelector("#inputpsw");
var zhc=document.querySelector("#zhc");
zhc.onclick=function(){
	var username=user.value,
		password=psw.value;
	tools.ajaxPost("../api/v1/register.php",{username, password},function(res){
		if(res.res_code === 1){
				if(confirm(res.res_message+ "，即将跳转登录页面")){
					location.href = "login.html";
				}
			}
		else{
			alert(res.res_message)
		}
	});
	return false;
}
}
