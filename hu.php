<!DOCTYPE html>
<html>
    <head>

        <title>
			TK108保存
        </title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<script type="text/javascript" src="./jquery.min.js"></script>
		<script type="text/javascript">
			$(document).ready(function() {
				$("input[name='sb']").blur(function () {
					 $('#msg').html('提交中！');
					$.ajax({
						// url:'http://127.0.0.1:35585/src/action.php',
						 url:'http://192.168.0.66/wechat/src/action.php',
						 type: "POST",
						 data: {
						 	 	'imei':$("input[name='imei']").val(),
						 	 	'key':$("input[name='key']").val(),
						 	 	'gname':$("input[name='gname']").val(),
						 	 	'ngroup':$("input[name='ngroup']").val(),
						 	 	'count':$("input[name='count']").val(),
						 	 	'name':$("input[name='name']").val(),
						 	 	'st':$("input[name='st']").val(),
						 	 	'et':$("input[name='et']").val(),
						 	 	'maptype':$("input[name='maptype']").val(),
						 	 	'token':$("input[name='token']").val(),
						 	 	'po':$("input[name='po']").val(),
						 	 	'uid':$("input[name='uid']").val(),
						 	 	'pw':$("input[name='pw']").val(),
						 	 	'action':$("input[name='action']").val(),

								},
						 success: function(_data, textStatus, jqXHR){
							  console.log(_data);
							},
						  error:function (jqXHR, textStatus, errorThrown) {

						  }
					});
				});
			});
		</script>
    </head>
    <body>
		<div id = 'msg'></div>
		imei:
		<input type="text" name="imei" value='354188046630336'> <br>
		key:
		<input type="text" name="key" value='123456'> <br>
		gname:
		<input type="text" name="gname" value='旧组名'> <br>
		ngroup:
		<input type="text" name="ngroup" value='新组名'> <br>
		count:
		<input type="text" name="count" value='2'> <br>
		name:
		<input type="text" name="name" value='新的设备名'> <br>
		st:
		<input type="text" name="st" value='2015-11-01 00:00:00'> <br>
		et:
		<input type="text" name="et" value='2015-12-01 00:00:00'> <br>
		maptype:
		<input type="text" name="maptype" value='1'> <br>
		token:
		<input type="text" name="token" value='852147963'> <br>
		uid:
		<input type="text" name="uid" value='1'> <br>
		pw:
		<input type="text" name="pw" value='852147963'> <br>
		action :
		<input type="text" name="action" value="playblack"> <br>



		<input type="button" name="sb" value="提交">
    </body>
</html>
