import querystring from 'querystring'

var request = async (params)=>{
	/*if(__DEV__){
		var domain="https://xcxtest.jdcf88.com/";//测试地址
	}else{
		var domain="https://xntj.jdcf88.com/";
	}*/
	if(process.env.NODE_ENV==="development"){
		var domain="https://test-user.jdcf88.com/";//测试地址
	}else{
		var domain="https://app.jdcf88.com/";
	}
	var url = "";
	if(params.url.indexOf('http')==0){
		url=params.url;
	}
	else{
		url=domain+`${params.url}`;
	}
	var settings={
	    method: params.method||"POST",
	    headers: {
	       'Content-Type': 'application/x-www-form-urlencoded',
	    },
	    //mode: 'cors',
	    //credentials: 'include',
	    body: querystring.stringify(params.data)
    };
	if(params.method=='GET'){
		settings={
		    method: params.method,
		    headers: {
		       'Content-Type': 'application/x-www-form-urlencoded',
		    },
	    };
	    url=url+"?"+querystring.stringify(params.data);
	}
	console.log(settings,url)
    // var settings={
	   //  method: params.method||"POST",
	   //  headers: {
	   //     'Content-Type': 'application/x-www-form-urlencoded',
	   //  },
	   //  //mode: 'cors',
	   //  //credentials: 'include',
	   //  body: querystring.stringify(params.data)
    // };
    var result = await (await fetch(url,settings)).json();
    console.log(result);
    return result;
}
export default request
