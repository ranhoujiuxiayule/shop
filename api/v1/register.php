<?php
	include("db.php");
	$username = $_POST["username"];
	$password = $_POST["password"];

	// 不允许重复注册
	$selSql = "select * from users where username = '$username'";

	$selRes = mysql_query($selSql);

	if(mysql_num_rows($selRes) >= 1){
		// 已经有此用户名了
		echo json_encode(array('res_code' => 0, 'res_message' => "用户名已存在"));
	}else{
		// 存此用户信息
		$insSql = "insert into users (username, password) values ('$username', '$password')";
		$insRes = mysql_query($insSql);

		if($insRes) {
			echo json_encode(array('res_code' => 1, 'res_message' => "注册成功"));
		}else{
			echo json_encode(array('res_code' => 0, 'res_message' => "网络错误"));
		}
	}

?>