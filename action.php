<?php
header("Content-type:application/json;charset=utf-8");
if( !isset($_POST['action']) || !isset($_POST['token'])){
	//echo json_encode(array('ret'=>'10020'));
	var_dump($_POST);
	echo "23435hhhh";
	exit();
}


require_once(dirname(__FILE__).'/../data/bin/act_init.php');
require_once(dirname(__FILE__).'/../data/bin/curl_init.php');
$rqs = new act_init();
$t_token = $rqs->checkToken();
 //var_dump($t_token);
if($t_token['errorcode']=='0'){
	
	$rqs->data['err_code']=='99999';
	$filename = dirname(__FILE__).'/../data/class/'. $rqs->data['act'].'.php';
	if (file_exists($filename)) {
		//var_dump(123245555);	
	    require_once($filename);
	} else {
		echo "$filename";
	    $rqs->err_out();
	}
}else{
	 //var_dump(1232);	
	$rqs->err_out();
}

?>
