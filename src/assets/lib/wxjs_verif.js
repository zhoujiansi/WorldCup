	;$(function(){
		wx_share();
	});
	var uid;
	var shareid; // 使用这个shareid则分享出去的一直就是这个shareid，只为这个shareid增加积分
	var shareUrl;
	function wx_share(){
		uid =sessionStorage.getItem('uid') || localStorage.getItem("uid");
		shareid = localStorage.getItem("shareid") || uid || ""; // 使用这个shareid则分享出去的一直就是这个shareid，只为这个shareid增加积分
		if(!shareid){
			shareUrl="http://event.hach.com.cn/worldcup2018wap/index.html"
		}
		else{
			shareUrl="http://event.hach.com.cn/worldcup2018wap/index.html?shareid="+shareid
			if(location.href.split("#")[0]!=shareUrl){
				window.location.href=shareUrl;
			}
		}
		console.log("***wx_share***",uid,shareid);
		wx_verif(0,false);//校验签名- 0代表从缓存读取token，第一次调用必须设置为0，因为频繁调用token会被微信禁用。第二个参数true代表开启debug模式
		var share_param = {
			title:'哈希邀你乐享世界杯',
			desc:'猜比赛赢好礼，要什么全看你！',
			link: shareUrl, //location.href.split("#")[0],
			imgUrl:'http://event.hach.com.cn/worldcup2018wap/assets/lib/logo.png',
			type:'',
			dataUrl:'',
			calback:function(){
				//window.location.href="";
				console.log("分享回调",uid);
        		// $('.share1').show();
        		if(uid){
        			$.ajax({
		                "async": true,
		                "crossDomain": true,
		                "url":'http://event.hach.com.cn/H5_server/api/WorldCup/ShareWorldCup?pdataid='+uid,
		                "method":'get',
		                // "contentType":"multipart/form-data",//(可以)
		                success:function (data) {
		                    //setCookie("data15",data.data);
		                    console.log("分享回调success",data);
		                },
		                error:function(error){
		                }
		            })
        		}
			}
		};
		//分享调用
		share(share_param);
	}
	//验证签名
	function wx_verif(force,debug){
		var _force = force,_debug = debug;
		$.ajax({  
			type : "get",  
			async:true,
			cache:false,
			data:{
				url:shareUrl, //location.href.split("#")[0],
				force:_force
			},
			url : "http://event.hach.com.cn/GZ_Server/key.php",
			dataType : "jsonp",
			success : function(res) {
				if(typeof res == "string")res = JSON.parse(res);
				if(res.ret == "1"){
					var data = res.data;
					console.log("&&&&&&wx_verif&&&&&&",data)
					wx.config({
						debug: _debug,//如果在测试环境可以设置为true，会在控制台输出分享信息； //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId:data.appId, // 必填，公众号的唯一标识
						timestamp:data.timestamp , // 必填，生成签名的时间戳
						nonceStr:data.nonceStr, // 必填，生成签名的随机串
						signature:data.signature,// 必填
						jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems','hideAllNonBaseMenuItem','startRecord','stopRecord','playVoice'] // 必填
					});
					if(_force == 1){
						//window.location.reload();
						return;
					}
					wx.error(function(res){
						//签名过期导致验证失败 
						if(res.errMsg != 'config:ok'){//如果签名失效，不读缓存，强制获取新的签名
								console.log("签名失效1");
								// wx_verif(1,false);		
							}
						});
					}
			},  
			error : function() {  
				if(_force == 1){
					window.location.reload();
					return;
				}
			}
		}); 
	}
	//分享
	function share(param){
		//var myparam = JSON.parse(getCookie("param"));
		//var mytitle="咱"+myparam.data10+"的美食目前全国排名第"+getCookie("rank")+"，快来给咱家乡美食助力啊！";
		var _param = {
				title : param.title,// 分享标题
				link : param.link,// 分享链接
				imgUrl : param.imgUrl,// 分享图标
				desc : param.desc,// 分享描述,分享给朋友时用
				type : param.type,// 分享类型,music、video或link，不填默认为link,分享给朋友时用
				dataUrl : param.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空,分享给朋友时用
				calback:param.calback//分享回调
			}
			wx.ready(function(res){
			//	wx.hideAllNonBaseMenuItem();
					wx.hideMenuItems({
						menuList: ['menuItem:copyUrl','menuItem:openWithSafari','menuItem:share:brand'] // 要隐藏的菜单项，所有menu项见附录3
					});
					//校验分享接口是否可用
					wx.checkJsApi({
						jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','hideMenuItems'],
						success: function(res) {
							if((res.checkResult.onMenuShareTimeline=!!false) || (res.checkResult.onMenuShareAppMessage=!!false)){
								return false;
							}
						},
						error : function(e){
						}
					});
					//分享到朋友圈
					wx.onMenuShareTimeline({
						title :_param.title,
						link : _param.link,
						imgUrl : _param.imgUrl, 
						success : function (res) { 
							// 用户确认分享后执行的回调函数
							_param.calback();
		
						},
						cancel: function (res) { 

							// 用户取消分享后执行的回调函数
						}
					});
					//分享给朋友
					wx.onMenuShareAppMessage(
					{
						title :_param.title,
						desc : _param.desc,
						link : _param.link, 
						imgUrl : _param.imgUrl, 
						type : _param.type, 
						dataUrl : _param.dataUrl, 
						success : function (res) { 
							// 用户确认分享后执行的回调函数
							_param.calback();
							
		
						},
						cancel: function (res) { 
			
							// 用户取消分享后执行的回调函数
						}
					});
			});	
	}	
			