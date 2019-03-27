window.onload=function(){
	var user=document.querySelector("#inputuser"),
		psw=document.querySelector("#inputpsw"),
		sbm=document.querySelector("#sbm");
	sbm.onclick=function(){
		
		var username=user.value,
			password=psw.value;
		tools.ajaxPost("../api/v1/login.php",{username, password},function(res){
			if(res.res_code===1){
				var rempsw=document.querySelector("#rempsw");
				var option=rempsw.checked?{"path":"/","expires":10}:{"path":"/"}
				tools.cookie("username",username,option)
				if(confirm(res.res_message+",正在跳转值至首页")){
					location.href="../index.html";
				}
			}
			else{
				alert(res.res_message);
			}
		})
		return false;
	}
}
