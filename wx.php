<?php
//error_reporting(E_ALL);
// 载入类
require_once('../data/e2l/service.php');
//include_once('../data/Tencent/wxBizMsgCrypt.php');
//首先判断有没有 access_token
// 没有就去获取 access_token
// 有就进行下一步
//file_put_contents('/mnt/e2l/web/weixin/e2ltoken/ttt', json_encode($_GET),FILE_APPEND);
//file_put_contents('/mnt/e2l/web/weixin/e2ltoken/ttt', $GLOBALS["HTTP_RAW_POST_DATA"]);
//file_put_contents('/mnt/e2l/web/weixin/e2ltoken/ttt',"hu/r/n",FILE_APPEND);
if(false){
	// GET传递获取的参数进行初始化
	if( isset($_GET['signature']) || isset($_GET['timestamp']) || isset($_GET['nonce']) || isset($_GET['encrypt_type']) || isset($_GET['msg_signature']) ){
		if( $_GET['encrypt_type']=='aes' ){
			$txGetData = array(
					// 腾讯微信加密签名
					'signature' => $_GET["signature"],
					//时间戳
					'timestamp' => $_GET["timestamp"],
					//随机数
					'nonce' => $_GET["nonce"],
					//  消息的加密签名
					'msg_signature' => $_GET["msg_signature"]
				);
			$txPostData = $GLOBALS["HTTP_RAW_POST_DATA"];
		}else{
			//file_put_contents('/mnt/e2l/web/weixin/e2ltoken/err1','123');
			exit();
		}
	}else{
		//file_put_contents('/mnt/e2l/web/weixin/e2ltoken/err2','234');
		exit();
	}


}else{
	//模拟数据
	$txGetData = array(
		// 腾讯微信加密签名
		'signature' => "a9277a605b9f85b25931dffbee4f23ad90fc2107",
		//时间戳
		'timestamp' => "1451355120",
		//随机数
		'nonce' => "1026047124",
		//  消息的加密签名
		'msg_signature' => "fe496a4e0058b8dfc7e52596eaba14f91b7bfe6e"
	);

	//$txPostData = $GLOBALS["HTTP_RAW_POST_DATA"];
	$txPostData = '<xml>
    <ToUserName><![CDATA[gh_8e1750348200]]></ToUserName>
    <Encrypt><![CDATA[u/q1GvCf8y2y4ohuL12ipOJG88VvkkWeEUH6CA31c2VLSx4sDTJjocyTkXIpnPYverxY2bSXLs44YSCRe3Tsoq8xxhMbCQ+8YQ75x/RtCH45bnerRxrqNTA+/X6WczWRg35jMa6ZPSxh75QPNDbnVhfOjHRs405AYqsaPUvoyPz0OWtE7o2JdQc2pLWVhA5VpuIzvmGe601PteJRb5Wh5hjLgs2q88NSxlUQd8o8srdrsHze8+xC3lwJYdjPTgG7eAlQD1IiUqhN0N1PxSJiC9ixPWJaOWg5yBvBWDjZabynDR5rywhlJyoW0WwRGwC76A0UNkBOh48B/OzACngTb9HoBjposok3WRrScKGiJQgxP5pyQKMiQ4OMmvHnPOL5t1avaldFj7OzSa46cUrNGEppKrDKyHGxr1vbiYbMN/Y=]]></Encrypt>
</xml>';
}
libxml_disable_entity_loader(true);

$e2lservice = new e2lservice( $txGetData ,$txPostData );
if($e2lservice->checkMsg()){
	//处理开始，在内部各个类自行处理
	if(!$e2lservice->listen()){
		echo '';
	}
}else{
	//消息不对。来路不明 不处理
	exit();
}

