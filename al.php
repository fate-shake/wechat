<?php

class cURl_post{
	function __construct(){
		 // test $this->_path = "http://127.0.0.1:35585/data/sql/";
		$this->_path = "http://demo.yuendong.com:7070/bgerp/sendWarnRecords";
		$this->_path = "http://s-241587.abc188.com/bgerp/sendWarnRecords";
		$this ->ch = curl_init($this->_path);
		curl_setopt($this ->ch, CURLOPT_TIMEOUT,180);
		curl_setopt($this ->ch, CURLOPT_POST,1);
		curl_setopt($this ->ch, CURLOPT_RETURNTRANSFER,1);//不直接输出，返回到变量
	}
	//$data 格式  key = > value 的数组  或者 url 编码格式 "tpl_ok=value&next_target=value&tpl=value&skip_ok="
	public function setURL($url){
		curl_setopt($this->ch, CURLOPT_URL, $this->_path.$url.'.php');
	}
	public function send($data){
		curl_setopt($this->ch, CURLOPT_POST, $data);
		// echo curl_exec($this->ch);
		return json_decode(curl_exec($this->ch));
	}
	public function download_file($data){
		curl_setopt($this->ch, CURLOPT_POSTFIELDS, $data);
		//echo curl_exec($this->ch);
		return curl_exec($this->ch);
	}
}


$curl = new cURl_post();
$post_data['key'] = 'cb837df482d51383c1a57ac57b30f7c9';
$post_data['imei'] = '352544070479986';
$post_data['address'] = 'address_test';
$post_data['warndesc'] = 'warndesc_test';
$post_data['warntime'] = 1452505478;
$result = $curl->send($post_data);
var_dump($post_data,$result);
?>



