<?php 
	include("db.php");
	$pageIndex = $_GET["pageIndex"];
	// 考虑pageIndex如果大于totalPage, pageIndex = totalPage
	$selSql = "select * from shop";
	
	$totalPage = ceil(mysql_num_rows(mysql_query($selSql)) / 4);
	if($pageIndex > $totalPage) $pageIndex = $totalPage;
	
	$start = ($pageIndex-1) * 4;

	$sql = "select * from shop limit $start,4";

	$res = mysql_query($sql);

	$arr = array();

	while ($row = mysql_fetch_assoc($res)) {
		array_push($arr, $row);
	}

	$resArr = array(
		'res_code' => 1,
		'res_message' => '查询成功',
		'res_body' => array(
			'data' => $arr,
			"totalPage" => $totalPage,
			"pageIndex" => $pageIndex - 0 
		)
	);

	echo json_encode($resArr);



 ?>