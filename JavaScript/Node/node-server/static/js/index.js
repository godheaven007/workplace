// ajax请求
function ajax(options){
	// 参数设置
	var url = options.url;
	var data = options.data || {};
	var requestType = (options.requestType || "get").toLowerCase();
	var responseType = options.responseType || "json";
	var async = options.async || true;

	var onsuccess = options.onsuccess || function(){};
	var onerror = options.onerror || function(){};

	function getParam(data) {
	  var arr = [];
	  for(var key in data) {
		arr.push(key + "=" + data[key]);
	  }
	  return arr.join("&");
	}

	if(requestType === "get") {
	  url += "?" + getParam(data);
	} 

	var xhr = new XMLHttpRequest();
	xhr.open(requestType, url, async);
	
	xhr.onreadystatechange = function() {
	  if(xhr.readyState === 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
		  if(responseType == 'json') {
			onsuccess(JSON.parse(xhr.responseText));
		  } else {
			onsuccess(xhr.responseText);
		  }
		} else {
		  onerror();
		}
	  }
	}
	if(requestType === 'post') {
	  xhr.send(getParam(data));
	} else if(requestType === 'get') {
	  xhr.send(null);
	}
}