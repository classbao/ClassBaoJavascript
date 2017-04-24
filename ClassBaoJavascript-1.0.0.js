﻿/***
* explain: Common JavaScript extension library,Completely free of charge.Development and maintenance by ClassBao team.
* version: V1.0
* Copyright: classbao.com
* Author: xiongzaiqiren
* Blog: http://xiongzaiqiren.blog.163.com/
* E-mail: xiongzaiqiren@163.com
* Last modified: xiongzaiqiren
* Last modified time: 2016-11-29 10:21
* Version source: https://github.com/classbao/ClassBaoJavascript.git
***/

/***** 通用ClassBaoJavascript模拟类库 *****/
function ClassBaoJavascript() { }

/***** 通用ClassBaoJavascript模拟类库·开始 *****/
/*根据id获取元素（唯一元素）*/
ClassBaoJavascript.prototype.GetById = function (id) {
	if (id && document) return document.getElementById(id) || null;
	return null;
}
/*根据className获取元素（元素数组）*/
ClassBaoJavascript.prototype.GetByClass = function (className) {
	var classElements = [], allElements = document.all ? document.all : document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; i++) {
		if (allElements[i].className == className) {
			classElements.push(allElements[i]);
		}
	}
	return classElements;
}

/*检测浏览器类型与版本*/
ClassBaoJavascript.prototype.GetBrowser = function () {
	/*
	document.writeln("浏览器代码名称：navigator.appCodeName=" + navigator.appCodeName);
	document.writeln("浏览器名称：navigator.appName=" + navigator.appName);
	document.writeln("浏览器版本号：navigator.appVersion=" + navigator.appVersion);
	document.writeln("对Java的支持：navigator.javaEnabled()=" + navigator.javaEnabled());
	document.writeln("MIME类型（数组）：navigator.mimeTypes=" + navigator.mimeTypes);
	document.writeln("系统平台：navigator.platform=" + navigator.platform);
	document.writeln("插件（数组）：navigator.plugins=" + navigator.plugins);
	document.writeln("用户代理：navigator.userAgent=" + navigator.userAgent);

	var browser = GetBrowser();
	if (browser) {
		_html += "浏览器：" + browser.name + "，版本：" + browser.version + " <br />";
		_html += "系统平台：" + browser.platform + " <br />";
		_html += "语言：" + browser.language + " <br />";
		_html += "isPC：" + browser.isPC + "，设备：" + browser.hardware + " <br />";
		_html += "网页可见区域：" + document.body.clientWidth + "*" + document.body.clientHeight + "（" + window.screen.availWidth + "*" + window.screen.availHeight + "） <br />";
	}
	*/
	var result = { name: "", version: "", platform: "", language: "", isPC: true, hardware: "", userAgent: null, appVersion: "" };
	result.userAgent = navigator.userAgent;
	result.appVersion = navigator.appVersion;
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf("msie") > -1) { //IE内核
		result.name = "IE";
		try {
			result.version = ua.match(/msie ([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf("trident") > -1) //IE内核
	{
		result.name = "Trident";
		try {
			result.version = ua.match(/trident ([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf("chrome") > -1) {
		result.name = "Chrome";
		try {
			result.version = ua.match(/chrome\/([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf("firefox") > -1) {
		result.name = "Firefox";
		try {
			result.version = ua.match(/firefox\/([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf("opera") > -1) { //opera内核
		result.name = "Opera";
		try {
			result.version = ua.match(/opera.([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf('presto') > -1) { //opera内核
		result.name = "Opera";
		try {
			result.version = ua.match(/presto.([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf("safari") > -1) {
		result.name = "Safari";
		try {
			result.version = ua.match(/version\/([\d.]+).*safari/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf('gecko') > -1) { //火狐内核
		result.name = "Gecko";
		try {
			result.version = ua.match(/gecko\/([\d.]+)/)[1];
		}
		catch (e) { }
	}
	else if (ua.indexOf('applewebkit') > -1) { //苹果、谷歌内核
		result.name = "webKit";
		try {
			result.version = ua.match(/version\/([\d.]+).*AppleWebKit/)[1];
		}
		catch (e) { }
	}
	else if (!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/ig)) { //ios终端 
		result.name = "ios";
		try {
			result.version = ua.match(/version\/([\d.]+).*AppleWebKit/)[1];
		}
		catch (e) { }
	}
	else {
	}

	result.platform = navigator.platform;
	result.language = (navigator.browserLanguage || navigator.language);

	//移动端与PC端判断
	var u = navigator.userAgent;
	if (u.indexOf('iPhone') > -1) { //是否为iPhone或者QQHD浏览器 
		result.hardware = "iPhone";
		result.isPC = false;
	}
	else if (u.indexOf('iPad') > -1) { //是否iPad  
		result.hardware = "iPad";
		result.isPC = false;
	}
	else if (u.indexOf('iPod') > -1) { //是否iPod  
		result.hardware = "iPod";
		result.isPC = false;
	}
	else if (u.indexOf('Android') > -1) { //android终端或者uc浏览器  
		result.hardware = "Android";
		result.isPC = false;
	}
	else if (u.indexOf('Linux') > -1) { //Linux终端   
		result.hardware = "Linux";
		result.isPC = false;
	}
	else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) { //ios终端  
		result.hardware = "ios";
		result.isPC = false;
	}
	else if (u.indexOf('SymbianOS') > -1) { //SymbianOS终端
		result.hardware = "SymbianOS";
		result.isPC = false;
	}
	else if (u.indexOf('Windows Phone') > -1) { //Windows Phone终端
		result.hardware = "Windows Phone";
		result.isPC = false;
	}
	else if (!!u.match(/AppleWebKit.*Mobile.*/)) { //是否为移动终端
		result.hardware = "mobile";
		result.isPC = false;
	}
	else {
	}

	return result;
}
/*获取当前屏幕；结果：{ top: top, left: left, height: height, width: width }*/
ClassBaoJavascript.prototype.GetScreen = function () {
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	var left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
	var width = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
	var height = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
	width = Math.max(width, window.document.body.offsetWidth);
	height = Math.max(height, window.document.body.offsetHeight);

	if (!width) { width = screen.availWidth; }
	if (!height) { height = screen.availHeight }

	return { top: top, left: left, height: height, width: width };
}
/*检测是否支持Html5元素Canvas*/
ClassBaoJavascript.prototype.supportCanvas = function () {
	return !!document.createElement("canvas").getContext;
}

/***** 通用ClassBaoJavascript模拟类库·Http请求相关 *****/
/*跳转到链接*/
ClassBaoJavascript.prototype.GoToLocation = function (url) {
	if (url) { window.location = url; }
}
/*从最顶层窗口跳转链接*/
ClassBaoJavascript.prototype.TopLocation = function (url) {
	if (url) {
		if (window.top != window.self) { window.top.location = url; }
		else { window.location = url; }
	}
}
/*从父窗口窗口跳转链接。注：如果窗口本身是顶层窗口，parent属性返回的是对自身的引用。在框架网页中，一般父窗口就是顶层窗口，但如果框架中还有框架，父窗口和顶层窗口就不一定相同了。*/
ClassBaoJavascript.prototype.ParentLocation = function (url) {
	if (url) {
		if (window.parent != window.self) { window.parent.location = url; }
		else { window.location = url; }
	}
}

/*强制刷新页面*/
ClassBaoJavascript.prototype.Reload = function () {
	try { history.go(0); }
	catch (e) { location.reload(); }
}

/*** 前进 ***/
/*frame窗体“前进”（name是frame窗体名称）*/
ClassBaoJavascript.prototype.GoToForward = function (name) {
	if (name && window.frames[name]) {
		if (window.frames[name].history) {
			//window.frames[name].history.go(1);
			window.frames[name].history.forward();
		}
		else if (window.frames[name].contentWindow.history) {
			//window.frames[name].contentWindow.history.go(1);
			window.frames[name].contentWindow.history.forward();
		}
	}
}
/*当前窗体前进页面*/
ClassBaoJavascript.prototype.GoToForward = function () {
	try { history.go(1); }
	catch (e) { history.forward(); }
}
/*** 后退 ***/
/*frame窗体“后退”（name是frame窗体名称）*/
ClassBaoJavascript.prototype.GoToBack = function (name) {
	if (name && window.frames[name]) {
		if (window.frames[name].history) {
			//window.frames[name].history.go(-1);
			window.frames[name].history.back();
		}
		else if (window.frames[name].contentWindow.history) {
			//window.frames[name].contentWindow.history.go(-1);
			window.frames[name].contentWindow.history.back();
		}
	}
}
/*当前窗体后退页面*/
ClassBaoJavascript.prototype.GoToBack = function () {
	try {
	    window.history.go(-1);
	}
	catch (e) {
		window.history.back();
		//history.go(-1);
		//window.history.back(-1);
	}
}

/*** 刷新 ***/
/*frame窗体“刷新”（name是frame窗体名称）*/
ClassBaoJavascript.prototype.Reload = function (name) {
	if (name && window.frames[name]) {
		if (window.frames[name].location) {
			window.frames[name].location.reload();
		}
		else if (window.frames[name].contentWindow.location) {
			window.frames[name].contentWindow.location.reload();
		}
	}
}
/*当前窗体强制刷新页面*/
ClassBaoJavascript.prototype.Reload = function () {
	try { history.go(0); }
	catch (e) { location.reload(); }
}

/*获取域名URL。（例如：http://www.classbao.com）*/
ClassBaoJavascript.prototype.GetDomainUrl = function () {
	if (window && window.location)
		return window.location.protocol + "//" + window.location.host; //http://www.classbao.com
	else
		return "";
}

/*获取参数值（类似URL，Cookie等格式的参数文本）（ParamName是参数名称；PaeramText是完整参数文本（例如：FromUser=o--NRtx58MS4JX9ilO_BV-VjBAGU&Latitude=39.972054&Longitude=116.312386&Precision=40）；BetweenOfChar是参数间隔符（例如：“&”，“;”））*/
ClassBaoJavascript.prototype.GetParamValue = function (ParamName, ParamText, BetweenOfChar) {
	/*
	 FromUserParamName=o--NRtx58MS4JX9ilO_BV-VjBAGU&Latitude=39.972054&Longitude=116.312386&Precision=40&Scale=&AddressLabel=
	*/
	if (!ParamName || !ParamText) return null;
	var textstring = ParamText.toString();
	var start = textstring.indexOf(ParamName + "=");
	if (start == -1) return null;   //   找不到 
	start += ParamName.length + 1;
	var end = textstring.indexOf(BetweenOfChar, start);
	if (end == -1) return textstring.substring(start);
	return textstring.substring(start, end);
}
/*获取页面GET请求URL参数值*/
ClassBaoJavascript.prototype.GetUrlParamValue = function (name) {
	var searchStr = decodeURIComponent(location.search);
	return CBJS.GetParamValue(name, searchStr, "&");
}

/* //示例：
error: function (XMLHttpRequest, textStatus, errorThrown) {
CBJS.RequestState(XMLHttpRequest, textStatus, errorThrown);
}
*/
/*ajax请求错误的状态解读*/
ClassBaoJavascript.prototype.RequestState = function (XMLHttpRequest, textStatus, errorThrown) {
	if (textStatus != null) {
		var errorMsg = "";
		if (textStatus == "timeout") { errorMsg = "对不起，请求超时！"; }
		else if (textStatus == "parsererror") { errorMsg = "对不起，请求数据发生解析器错误！请检查参数个数或接收数据格式。"; }
		else { errorMsg = "对不起，请求发生了错误！"; }
		//alert(errorMsg + "\n 请求状态：\n textStatus= " + textStatus + "\n XMLHttpRequest.status= " + XMLHttpRequest.status + "\n XMLHttpRequest.readyState= " + XMLHttpRequest.readyState);
		return errorMsg + "<br /> 请求状态：<br /> textStatus= " + textStatus + "<br /> XMLHttpRequest.status= " + XMLHttpRequest.status + "<br /> XMLHttpRequest.readyState= " + XMLHttpRequest.readyState;
	}
}


/*** Cookie 开始 ***/
/*当前浏览器Cookie是否启用*/
ClassBaoJavascript.prototype.CookieEnabled = function () {
	var result = false;
	if (navigator.cookieEnabled && document.cookie && typeof (document.cookie) != "undefined") {
		var date = new Date();
		date.setTime(date.getTime() + 60 * 1000); //60秒
		document.cookie = "testcookie=yes; expires=" + date.toGMTString();
		var _cookie = document.cookie;
		if (_cookie.indexOf("testcookie=yes") > -1)
			result = true;
	}
	return result;
}
/*设置Cookie（name是名称；value是值；days是过期时间（天）；path是路径（可以是一个目录，或者是一个路径。path属性设置成“/”，凡是来自同一服务器（或者多级域名之间），URL里有相同路径的所有WEB页面都可以共享cookies。）；domain是域（值是域名，这是对path路径属性的一个延伸。如果我们想让 catalog.mycompany.com 能够访问shoppingcart.mycompany.com设置的cookies，该怎么办? 我们可以把domain属性设置成“mycompany.com”，并把path属性设置成“/”。不能把cookies域属性设置成与设置它的服务器的 所在域不同的值。）；isSecure是传输安全（如果一个cookie标记为secure，那么它与WEB服务器之间就通过HTTPS或者其它安全协议传递数据。把cookie设置为secure，只保证cookie与WEB服务器之间的数据传输过程加密，而保存在本地的 cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。）；）*/
ClassBaoJavascript.prototype.SetCookie = function (name, value, days, path, domain, isSecure) {
	if (!CBJS.CookieEnabled()) return;
	if (!name) return;
	value = value || "";
	days = days || 7;
	path = path || "/";
	var exp = new Date;
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path + (domain ? ";domain=" + domain : "") + (isSecure ? ";secure" : "");
	/*
	 document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/; domain=classbao.com; secure";
	*/
}
/*设置Cookie（name是名称；value是值；days是过期时间（天））*/
ClassBaoJavascript.prototype.SetCookie = function (name, value, days) {
	if (!CBJS.CookieEnabled()) return;
	if (!name) return;
	value = value || "";
	days = days || 7;
	var exp = new Date;
	exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
}

/*获取Cookie（name是名称）*/
ClassBaoJavascript.prototype.GetCookie = function (name) {
	if (!CBJS.CookieEnabled()) return null;
	return CBJS.GetParamValue(name, decodeURIComponent(document.cookie), ";");
}
/*获取Cookie（name是名称）*/
ClassBaoJavascript.prototype.GetCookie2 = function (name) {
	if (!CBJS.CookieEnabled()) return null;
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return decodeURIComponent(arr[2]); return null;
}

/*删除Cookie（name是名称）*/
ClassBaoJavascript.prototype.DeleteCookie = function (name) {
	if (!CBJS.CookieEnabled()) return;

	var exdate = new Date();
	exdate.setTime(exdate.getTime() - 1000);
	document.cookie = name + "=; expires=" + exdate.toGMTString();
}
/*** Cookie 结束 ***/


/***** 常用实例方法扩展·字符串 *****/
/*JS移除字符串首尾空格*/
String.prototype.LRTrim = function () { return this.replace(/(^\s+)|(\s+$)/g, ""); }
/*JS移除字符串左边空格*/
String.prototype.LTrim = function () { return this.replace(/(^\s+)/g, ""); }
/*JS移除字符串右边空格*/
String.prototype.RTrim = function () { return this.replace(/(\s+$)/g, ""); }
/*换行转义字符转换成HTML换行标签*/
String.prototype.ReplaceNewlineToBr = function () { return this.replace(/(\\n\\r|\\r\\n|\\n|\\f|\\r)/g, "<br />"); } //换行,换页,回车
/*编码Html源代码*/
ClassBaoJavascript.prototype.EncodingHTML = function (text) {
	text = text.replace(/&/g, "&amp;");
	text = text.replace(/"/g, "&quot;");
	text = text.replace(/</g, "&lt;");
	text = text.replace(/>/g, "&gt;");
	text = text.replace(/'/g, "&#146;");
	return text;
}
/*解码Html源代码*/
ClassBaoJavascript.prototype.DecodingHTML = function (text) {
	text = text.replace(/&amp;/g, "&");
	text = text.replace(/&quot;/g, "\"");
	text = text.replace(/&lt;/g, "<");
	text = text.replace(/&gt;/g, ">");
	text = text.replace(/&#146;/g, "'");
	return text;
}

/*移除字符串中的Html标签*/
ClassBaoJavascript.prototype.RemoveHtmlTag = function (text) {
	if (text)
		return text.toString().replace(/<[^>]+>|<\/[^>]+>/g, "");
	return text;
}

/*Unicode（编码）转义(\uXXXX)的编码和解码*/
ClassBaoJavascript.prototype.EncodingUnicode = function (text) {
	return escape(text).replace(/%(u[0-9A-F]{4})|(%[0-9A-F]{2})/gm, function ($0, $1, $2) {
		return $1 && '\\' + $1.toLowerCase() || unescape($2);
	});
}
/*Unicode（解码）转义(\uXXXX)的编码和解码*/
ClassBaoJavascript.prototype.DecodingUnicode = function (text) {
	return unescape(text.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}

/*移除URL末尾的空格、格式符号、“&”、“?”*/
ClassBaoJavascript.prototype.ClearURLEnd = function (url) {
	if (url)
		return url.toString().replace(/(&|\?|\s)+$/g, "");
	return url;
}

/***** 常用实例方法扩展·字符串·常用的正则表达式 *****/
/*匹配空字符串的正则表达式*/
ClassBaoJavascript.prototype.Regex_empty = /^\s*$/;
/*匹配Email的正则表达式*/
ClassBaoJavascript.prototype.Regex_email = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/i; //或者：/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
/*匹配座机号码的正则表达式*/
ClassBaoJavascript.prototype.Regex_telephone = /^(([\(（]?\d{3,4}[-#\)）]{1})?\d{7,8}([-#\(（]{1}\d+[\)）]?)?)$/; //010-62515008#8002
/*匹配移动电话号码的正则表达式*/
ClassBaoJavascript.prototype.Regex_mobilephone = /^(([\+\(（]?\d{2,5}[-#\)）]{1})?1[3|5|7|8|9]\d{9})$/; //+86#15311212118
/*匹配中国邮政编码*/
ClassBaoJavascript.prototype.Regex_postalcode = /^[1-9]{1}(\d+){5}$/; //465513
/*匹配中国居民身份证（18位或者15位字符）*/
ClassBaoJavascript.prototype.Regex_IDCard = /^\d{17}(\d|X)|\d{14}(\d|X)$/;
/*匹配汉字的正则表达式*/
ClassBaoJavascript.prototype.Regex_chinese = /^[\u4E00-\u9FA5]+$/ig;
/*匹配双字节字符串(汉字)的正则表达式*/
ClassBaoJavascript.prototype.Regex_chinese = /^[^\x00-\xff]+$/ig;

/*
* 字符串中包含中文，英文字母，链接符横线，链接符点，以及空格，最少一个字符。（例如：贝拉克·侯赛因·奥巴马，Barack·Hussein·Obama）
* 主要用于验证真实姓名，公司名等个人信息修改
*/
ClassBaoJavascript.prototype.Regex_Name = /^[·\s\-/#a-zA-Z\u4E00-\u9FA5]+$/i;
/*
* 字符串中包含中文，英文字母，中文括号，英文括号，链接符横线，链接符点，以及空格，最少一个字符。
* 主要用于验证地址。（例如：北京市/海淀(区)（中关村大街）#44-45号）
*/
ClassBaoJavascript.prototype.Regex_Address = /^[()（）·\s\-~/#0-9a-zA-Z\u4E00-\u9FA5]+$/i;
/*
* 验证字符串包含特殊符号（非中文，英文，中文标点符号，英文标点符号，键盘特殊符号）的正则表达式
*/
ClassBaoJavascript.prototype.Regex_Special = /[^\u4E00-\u9FA5\w·~！@#￥%……&*（）——+\-={}【】\|、：；“”‘《，》。？、\./`\!\$\^\(\)\\\[\]\:;"'<,>\?\s\n\r]/gi;

/*匹配分号间隔字符串的正则表达式*/
ClassBaoJavascript.prototype.Regex_splitSemicolon = /\s*(;|；)\s*/ig;
/*匹配逗号间隔字符串的正则表达式*/
ClassBaoJavascript.prototype.Regex_splitComma = /\s*(,|，)\s*/ig;
/*逗号间隔数字格式（例如1,2,3）*/
ClassBaoJavascript.prototype.Reg_CommasBetweenDigital = /(^\d+$)|(^\d+,\d+$)|(^\d+(,\d+,)+\d+$)/ig;
/*匹配字符串首尾分号或空格的正则表达式*/
ClassBaoJavascript.prototype.Regex_semicolonByHeadAndTail = /(^((\s*(;|；)+\s*)|(\s+)))|(((\s*(;|；)+\s*)|(\s+))$)/ig;
/*匹配Guid格式的正则表达式*/
ClassBaoJavascript.prototype.Regex_guid = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/;

/*密码格式（由数字字母下划线，英文标点符号组成，6-18位字符）*/
ClassBaoJavascript.prototype.Regex_password = /^[0-9a-zA-Z~`\!@#\$%\^&\*\(\)_\-+={\[}\]\|\:;"'<,>\\\.\?/]{6,18}$/;

/*判断一个字符串是否全是空格*/
ClassBaoJavascript.prototype.IsEmpty = function (text) { return (!!CBJS.Regex_empty.test(text)); }
/*检查Email的格式是否正确*/
ClassBaoJavascript.prototype.IsEmail = function (email) { return (!!CBJS.Regex_email.test(email)); }
/*检查固定电话号码的格式是否正确*/
ClassBaoJavascript.prototype.IsTelePhone = function (telephone) { return (!!CBJS.Regex_telephone.test(telephone)); }
/*检查手机号码的格式是否正确*/
ClassBaoJavascript.prototype.IsMobilePhone = function (mobilephone) { return (!!CBJS.Regex_mobilephone.test(mobilephone)) }
/*判断是否为汉字字符串*/
ClassBaoJavascript.prototype.IsChinese = function (text) { return (!!CBJS.Regex_chinese.test(text)) }
/*判断是否为单个汉字*/
ClassBaoJavascript.prototype.IsChineseByChar = function (_char) { return (_char.charCodeAt(0) <= 255) ? false : true; }

/*JS移除字符串首尾中文/英文逗号*/
String.prototype.LRTrimComma = function () { return this.replace(/(^(,|，|\s)*)|((,|，|\s)*$)/ig, ""); }
/*JS移除字符串首尾中文/英文分号*/
String.prototype.LRTrimSemicolon = function () { return this.replace(/(^(;|；|\s)*)|((;|；|\s)*$)/ig, ""); }

/*根据索引移除数组中指定项（index表示数组下标索引，从0开始）*/
ClassBaoJavascript.prototype.RemoveByIndex = function (array, index) {
	/*prototype为对象原型，注意这里为对象增加自定义方法的方法。*/
	if (index < 0)　/*如果index<0，则不进行任何操作。*/
		return array;
	else
		return array.slice(0, index).concat(array.slice(index + 1, array.length));
	/*
  　　　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
  　　　　　　　　　这里就是返回this.slice(0,index)/this.slice(index+1,this.length)
  　　 　　　　　　组成的新数组，这中间，刚好少了第index项。
  　　　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
  　*/
}
/*移除数组中指定项*/
ClassBaoJavascript.prototype.RemoveByItem = function (array, removeItem) {
	for (var i = 0 ; i < array.length; i++) {
		if (array[i] == removeItem) {
			array = CBJS.RemoveByIndex(array, i);
			i--;
		}
	}
	return array;
}
/*正则表达式分割字符串为数组*/
ClassBaoJavascript.prototype.RegexSplit = function (splitString, regexFormat) {
	if (!splitString) return [];
	var stringArray = splitString.toString().split(regexFormat);
	if (!stringArray || stringArray.length < 1) return [];
	for (var i = 0; i < stringArray.length; i++) {
		if (regexFormat.test(stringArray[i]))
			stringArray = stringArray.slice(0, i).concat(stringArray.slice(i + 1, stringArray.length));
	}
	return stringArray;
	/*
  　　　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
  　　　　　　　　　这里就是返回this.slice(0,index)/this.slice(index+1,this.length)
  　　 　　　　　　组成的新数组，这中间，刚好少了第index项。
  　　　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
  　*/
}

/*密码复杂度。密码长度权重是1，密码连续3个相同元素权重是-1，密码物种权重是10。对于6-18位密码来说：12-28为低级，28-38为中低级，38-48为中高级，48以上为高级*/
ClassBaoJavascript.prototype.PasswordComplexity = function (password) {
	var complexity = 0; /* 密码复杂度。密码长度权重是1，密码连续3个相同元素权重是-1，密码物种权重是10。对于6-18位密码来说：12-28为低级，28-38为中低级，38-48为中高级，48以上为高级（熊学浩） */
	if (!!password) {
		/* 空 */
		var reg_empty = /^\s*$/;
		/* 数字 */
		var reg_digital = /([0-9])+/;
		/* 小写英文字母 */
		var reg_lowercase = /([a-z])+/;
		/* 大写英文字母 */
		var reg_capitalletters = /([A-Z])+/;
		/* 符号 */
		var reg_punctuation = /([~`\!@#\$%\^&\*\(\)_\-+={\[}\]\|\:;"'<,>\\\.\?/])+/;

		if (password.toString().match(reg_empty)) return complexity; /* 密码不能为空 */
		if (password.toString().length < 6) return complexity; /* 密码长度必须是6位（含）以上 */

		var passwordArray = password.toString().split("");
		for (var i = 0; i < passwordArray.length; i++) {
			if (passwordArray[i].match(reg_digital)) {
				complexity++;
				species
				continue;
			}
			else if (passwordArray[i].match(reg_lowercase)) {
				complexity++;
				continue;
			}
			else if (passwordArray[i].match(reg_capitalletters)) {
				complexity++;
				continue;
			}
			else if (passwordArray[i].match(reg_punctuation)) {
				complexity++;
				continue;
			}
		}
		for (var i = 0; i < passwordArray.length; i++) { /* 连续相同的3个字符 */
			if (i < passwordArray.length - 2) {
				if (passwordArray[i] == passwordArray[i + 1] && passwordArray[i] == passwordArray[i + 2]) {
					if (complexity > 1)
						complexity--;
					continue;
				}
			}
		}
		var species = 0; /* 密码物种数量 */
		if (password.toString().match(reg_digital))
			species++;
		if (password.toString().match(reg_lowercase))
			species++;
		if (password.toString().match(reg_capitalletters))
			species++;
		if (password.toString().match(reg_punctuation))
			species++;

		if (species > 0)
			complexity += (species * 10); /* 密码物种权重是10 */
	}
	return complexity;
	//var a1 = PasswordComplexity("111111"); /* 12 */
	//var b1 = PasswordComplexity("123456"); /* 16 */
	//var c1 = PasswordComplexity("123456789123456789"); /* 28 */
	//var a2 = PasswordComplexity("111abc"); /* 25 */
	//var b2 = PasswordComplexity("123abc"); /* 26 */
	//var c2 = PasswordComplexity("123456789abcdefghj"); /* 38 */
	//var a3 = PasswordComplexity("111abC"); /* 35 */
	//var b3 = PasswordComplexity("123abC"); /* 36 */
	//var c3 = PasswordComplexity("123456789abCDEfghj"); /* 48 */
	//var a4 = PasswordComplexity("111aB_"); /* 45 */
	//var b4 = PasswordComplexity("123aB_"); /* 46 */
	//var c4 = PasswordComplexity("123456789abCDE_$@;"); /* 58 */
}

/*转义单引号（用于Sql传参数）*/
ClassBaoJavascript.prototype.escapeSingleQuotesForSQL = function (text) {
	if (text) {
		if (Reg_Sql.test(text)) {
			return text.replace(/'/ig, "''");
		}
		else
			return text;
	}
	else
		return "";
}
/*转义单引号（用于javascript传参数）*/
ClassBaoJavascript.prototype.escapeSingleQuotesForJS = function (text) {
	if (text) {
		return text.replace(/\'/g, "\\\'");
	}
	else
		return "";
}

/*字符串长度（字节长度，真实字节长度）*/
ClassBaoJavascript.prototype.RealLength = function (str) {
	if (!str) { return 0; }
	var _str = str.LRTrim();
	var len = 0;
	var i = 0;
	for (i = 0; i < _str.length; i++) {
		if (_str.charCodeAt(i) > 255) {
			len += 2;
		}
		else {
			len++;
		}
	}
	return len;
}

/*按字节数截取字符串（从位置0开始；str是原始字符串；len是要截取长度（字节数）；suffix是后缀）*/
ClassBaoJavascript.prototype.SubString = function (str, len, suffix) {
	if (!str || !len) { return ''; }
	var _str = str.LRTrim();
	var a = 0;
	var i = 0;
	var temp = '';
	for (i = 0; i < _str.length; i++) {
		if (_str.charCodeAt(i) > 255) {
			a += 2;
		}
		else {
			a++;
		}
		if (a > len) { return temp + suffix; }
		temp += _str.charAt(i);
	}
	return _str;
}

/***** 常用实例方法扩展·日期与时间 *****/
/*获得Unix Timestamp时间戳*/
ClassBaoJavascript.prototype.UnixTimestamp = function (time) {
	if (time)
		return Math.round(new Date(time).getTime() / 1000);
	else
		return Math.round(new Date().getTime() / 1000);
}
/*获得Unix Timestamp时间戳转换得普通时间对象*/
ClassBaoJavascript.prototype.GetDate = function (_UnixTimestamp) {
	if (_UnixTimestamp) {
		if (/^[1-9]\d{12}$/.test(_UnixTimestamp.toString())) return (new Date(_UnixTimestamp));
		else if (/^[1-9]\d{9}$/.test(_UnixTimestamp.toString())) return (new Date(_UnixTimestamp * 1000));
		else return null;
	}
}
/*时间格式化扩展*/
Date.prototype.format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份       
		"d+": this.getDate(), //日      
		"h+": this.getHours() == 0 ? 12 : this.getHours(), //小时       
		"H+": this.getHours(), //小时       
		"m+": this.getMinutes(), //分       
		"s+": this.getSeconds(), //秒       
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度       
		"f": this.getMilliseconds() //毫秒       
	};
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}
//短时间，形如 (13:04:06)
ClassBaoJavascript.prototype.isTime = function (str) {
	var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
	if (a == null) { return false }
	if (a[1] > 24 || a[3] > 60 || a[4] > 60) {
		return false;
	}
	return true;
}
//短日期，形如 (2003-12-05)
ClassBaoJavascript.prototype.isDate = function (str) {
	var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
}
//长时间，形如 (2003-12-05 13:04:06)
ClassBaoJavascript.prototype.isDateTime = function (str) {
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
	var r = str.match(reg);
	if (r == null) return false;
	var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
	return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
}

/*获取值域为[minValue, maxValue]的随机数（可以取到最大值和最小值，均衡分布）*/
ClassBaoJavascript.prototype.GetRandom = function (minValue, maxValue) {
	/*
	* 也就是说，如果要创建一个从x到y的随机数，就可以这样写：
	* Math.round(Math.random() * (y - x)) + x;
	* x和y可以是任何的数值，即使是负数也一样。
	*/
	return Math.round(Math.random() * (maxValue - minValue)) + minValue;
}

/* //调用示例：
document.onkeydown = function (e) {
    if (CBJS.GetKeyCode(e) == 13) { CBJS.LabelAlert(null, '您按下了回车键'); return true; }
}
*/
/*获取键盘按键代码（event是按键事件）*/
ClassBaoJavascript.prototype.GetKeyCode = function (event) {
	// 兼容IE，FireFox，Chrome，Opera等
	var theEvent = event || window.event;
	var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
	return code; //13=回车键
}


/*添加事件（target是载体，type是事件类型，func是事件函数）*/
ClassBaoJavascript.prototype.AddEventHandler = function (target, type, func) {
    if (target.addEventListener)
        target.addEventListener(type, func, false);
    else if (target.attachEvent)
        target.attachEvent("on" + type, func);
    else target["on" + type] = func;
}
/*移除事件（target是载体，type是事件类型，func是事件函数）*/
ClassBaoJavascript.prototype.RemoveEventHandler = function (target, type, func) {
    if (target.removeEventListener)
        target.removeEventListener(type, func, false);
    else if (target.detachEvent)
        target.detachEvent("on" + type, func);
    else delete target["on" + type];
}

/***** 通用ClassBaoJavascript模拟类库·Dom *****/
/*** 全选/全不选/反选 ***/
/*选项组（checkbox组或者radio组）全选/全不选/反选（name是checkbox组名称或者radio组名称；flage是0：全不选；1：全选；2：反选；（默认全不选））*/
ClassBaoJavascript.prototype.cbSelect = function (name, flage) {
	if (name) {
		var cbList = document.getElementsByName(name);
		if (cbList && cbList.length > 0) {
			for (var i = 0; i < cbList.length; i++) {
				if (cbList[i] && (cbList[i].type == "checkbox" || cbList[i].type == "radio")) {
					switch (flage) {
						case 0: cbList[i].checked = false; break; //全不选
						case 1: cbList[i].checked = true; break; //全选
						case 2: cbList[i].checked = !cbList[i].checked; break; //反选
						default: cbList[i].checked = false; break; //全不选
					}
				}
			}
		}
	}
}
/*获取checkbox中被选中的项，checkbox以前缀("checkbox_")+关键字命名ID号(如"checkbox_002")，boxname:checkbox名称，idpre:checkbox的ID号前缀，返回被选中项ID号中关键字，以";"分隔*/
ClassBaoJavascript.prototype.GetSelectedBoxes = function (boxname, idpre) {
    var boxes = document.getElementsByName(boxname);
    var keys = "";
    for (var i = 0; i < boxes.length; i++) {
        var boxElem = boxes[i];
        if (boxElem.checked) {
            var key = idpre == null ? boxElem.id : boxElem.id.substring(idpre.length);
            keys += key + ";";
        }
    }
    //去掉最后一个“;”符
    if (keys.indexOf(";") != -1) {
        keys = keys.substring(0, keys.length - 1);
    }
    return keys;
}
/*获取checkbox中被选中的项的值，boxname:checkbox名称，以";"分隔*/
ClassBaoJavascript.prototype.GetSelectedBoxes = function (boxname) {
    var boxes = document.getElementsByName(boxname);
    var keys = "";
    for (var i = 0; i < boxes.length; i++) {
        var boxElem = boxes[i];
        if (boxElem.checked) {
            var key = boxElem.value;
            keys += key + ";";
        }
    }
    //去掉最后一个“;”符
    if (keys.indexOf(";") != -1) {
        keys = keys.substring(0, keys.length - 1);
    }
    return keys;
}

/*获取下拉列表框（单选）选中项*/
ClassBaoJavascript.prototype.GetSelectedItem = function (id) {
	var result = { index: 0, value: "", text: "" };
	var dom = CBJS.GetById(id);
	if (dom && dom.tagName == "SELECT" && dom.options) {
		//单选
		var item = dom.options[dom.selectedIndex];
		result.index = dom.selectedIndex;
		result.value = item.value;
		result.text = item.text;
	}
	return result;
}
/*获取下拉列表框（多选）选中项集合*/
ClassBaoJavascript.prototype.GetSelectedItems = function (id) {
	var results = [];
	var result = { index: 0, value: "", text: "" };
	var dom = CBJS.GetById(id);
	if (dom && dom.tagName == "SELECT" && dom.options) {
		//多选
		if (dom.multiple && dom.selectedOptions) {
			for (var i = 0; i < dom.selectedOptions.length; i++) {
				var item = dom.selectedOptions[i];
				results.push({ index: i, value: item.value, text: item.text });
			}
		}
	}
	return results;
}
/*设置下拉列表框（单选）选中项（id是下拉列表框ID；value是下拉列表框值或文本）*/
ClassBaoJavascript.prototype.SetSelectedItem = function (id, value) {
	//document.getElementById("classcode").value = classcode; //可以解决下拉框的“返回”页面定位
	var dom = CBJS.GetById(id);
	if (dom && dom.options) {
		for (var i = 0; i < dom.options.length; i++) {
			if (dom.options[i].value == value || dom.options[i].text == value) {
				dom.options[i].defaultSelected = true;
				dom.options[i].selected = true;
			}
		}
	}
}
/*设置下拉列表框（多选）选中项集合（id是下拉列表框ID；value是下拉列表框值或文本集合）*/
ClassBaoJavascript.prototype.SetSelectedItems = function (id, items) {
	var dom = CBJS.GetById(id);
	if (dom && dom.options) {
		//var item={ index:0, value: "", text: "" };
		for (var i = 0; i < items.length; i++) {
			var value = items[i].value || items[i].text || items[i];
			for (var j = 0; i < dom.options.length; j++) {
				if (dom.options[j].value == value || dom.options[j].text == value) {
					dom.options[j].defaultSelected = true;
					dom.options[j].selected = true;
				}
			}
		}
	}
}

/*获取单选按钮组选中项（name是radio组名称）*/
ClassBaoJavascript.prototype.GetRadioItem = function (name) {
	var result = { index: 0, value: "", text: "" };
	var elementsList = document.getElementsByName(name);
	for (var i = 0 ; i < elementsList.length; i++) {
		if (elementsList[i].checked) {
			result.index = i;
			result.value = elementsList[i].value;
			result.text = elementsList[i].nextSibling.nodeValue;
		}
	}
	return result;
}
/*获取单选按纽(组)的值（name是radio组名称；结果：未选返回null；有选择项，返回选项值）*/
ClassBaoJavascript.prototype.GetRadioValue = function (name) {
	var radioes = document.getElementsByName(name);
	for (var i = 0; i < radioes.length; i++) {
		if (radioes[i].checked) {
			return radioes[i].value.LRTrim();
		}
	}
	return null;
}

/*通过值修改单选按钮(组)的选中状态（name是radio组名称；sRadioValue是选中项的值；结果：设置成功返回true，否则返回false）*/
ClassBaoJavascript.prototype.SetRadioValue = function (name, sRadioValue) {
	var oRadio = document.getElementsByName(name);
	for (var i = 0; i < oRadio.length; i++) //循环
	{
		if (oRadio[i].value.LRTrim() == sRadioValue) //比较值
		{
			oRadio[i].checked = true; //修改选中状态
			return true;
		}
	}
	return false;
}

/*显示文本或弹出提示框（label是label控件或者div，span等HTML元素；value是要显示的内容）*/
ClassBaoJavascript.prototype.LabelAlert = function (label, value) {
    if (label && (typeof label == "object")) {
        if (label.jquery != undefined) {
            if (label.text() != undefined) { label.text(value); } //Jquery获取的 html控件 label
            if (label.val() != undefined) { label.val(value); } //Jquery获取的 html控件 text
            if (label.attr("value", "")) { label.attr("value", value); } //填充内容
        }
        else {
            if (label.value == undefined) { //html控件 text,label等input
                if (label.innerHTML == undefined) { //html控件 div,span等
                    alert(value);
                }
                else label.innerHTML = value;
            }
            else label.value = value;
        }
    }
    else alert(value);
}

/*获得元素的绝对坐标（element是HTML元素；结果：{x:0,y:0}）*/
ClassBaoJavascript.prototype.PositionByAbsolute = function (element) {
	var result = { x: element.offsetLeft, y: element.offsetTop };
	element = element.offsetParent;
	while (element) {
		result.x += element.offsetLeft;
		result.y += element.offsetTop;
		element = element.offsetParent;
	}
	return result;
}

/*控件跟随鼠标移动（element是HTML元素；结果：{x:0,y:0}）
//调用示例：
document.onmousemove = function (e) {
    CBJS.FollowCursorHandler(e, CBJS.GetById("moveId"));
}
*/
ClassBaoJavascript.prototype.FollowCursorHandler = function (e, element) {
	if (!e || !element) return;
	try {
		with (element.style) {
			position = "absolute";
			left = ((document.layers) ? e.pageX : document.body.scrollLeft + event.clientX) + "px";
			top = ((document.layers) ? e.pageY : document.body.scrollTop + event.clientY) + "px";
		}
	}
	catch (e) { console.log(e.message); }
}
/*控件跟随光标移动
//调用示例：
CBJS.FollowCursor(CBJS.GetById("moveId"));
*/
ClassBaoJavascript.prototype.FollowCursor = function (element) {
	try {
		CBJS.AddEventHandler(document, "mousemove", function (e) {
			e = e || window.event;
			CBJS.FollowCursorHandler(e, element);
		});
	}
	catch (e) { console.log(e.message); }
}

/*隐藏（element是HTML元素）*/
ClassBaoJavascript.prototype.Hidden = function (element) {
	try {
		with (element.style) {
			display = "none";
		}
	}
	catch (e) { console.log(e.message); }
}
/*显示（element是HTML元素）*/
ClassBaoJavascript.prototype.Show = function (element) {
	try {
		with (element.style) {
			display = "block";
		}
	}
	catch (e) { console.log(e.message); }
}

/*创建元素*/
ClassBaoJavascript.prototype.createElement = function (type) { return document.createElement(type); }
/*删除指定节点*/
ClassBaoJavascript.prototype.removeChild = function (element) {
    try {
        if (element) {
            element.parentNode.removeChild(element);
        }
    }
    catch (e) {
    }
}
/*删除指定元素所有子节点*/
ClassBaoJavascript.prototype.removeChildNodes = function (element) {
    var parentNode = element;
    if (parentNode == null) {
        return;
    }
    if (parentNode.hasChildNodes()) {
        var length = parentNode.childNodes.length;
        for (var k = 0; k < length; k++) {
            parentNode.removeChild(parentNode.childNodes[0]);
        }
    }
}


/***** 浮层与遮罩 *****/
/***
*** window CSS 样式 ***
第一种：
.mask{ position:fixed;top:0px; left:0px; z-index:999;height:100%; width:100%; background:rgba(0,0,0,0.15); display:block; background-color:#000; filter: alpha(opacity=15);-moz-opacity:0.15;-khtml-opacity:0.15;opacity:0.15;}
.window{ position:fixed; z-index:1000;top:26%; left:50%; width:30%; margin-left:-15%; background-color:#fff;-moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; text-align:center; padding:10px 0;}
.window h2{ color:#f66260; font-size:18px; margin-top:10px}
.window p{ color:#5d5d5d;font-size:16px; padding:12px }
.window .btn,.window .btn_g{ color:#FFF; background-color:#00b7ee; font-size:16px; text-align:center; padding:4px 6px; margin:8px 2px; border:2px solid #00b7ee; -moz-border-radius:4px; -webkit-border-radius:4px; border-radius:4px; display:inline-block; width:150px; cursor:pointer;font-family: 'Microsoft YaHei';}
.window .btn_g{ background-color:#efefef; border:2px solid #efefef; color:#999999; padding:4px 0;font-family: 'Microsoft YaHei';}
第二种：
.mask{ position:absolute;top:0px; left:0px; z-index:100;height:100%; width:100%; background:rgba(0,0,0,0.3); display:block; background-color:#000; opacity: 0.3;}
.window{position:fixed; _position:absolute;_top:expression(eval(document.documentElement.scrollTop+200));z-index:999;top:26%; left:50%; width:280px; margin-left:-140px; background-color:#eee;-moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; text-align:center; padding:10px 20px;}
.window a.btn_window,.window a.btn_window2,.window a.btn_window3{ color:#ffffff;}
.window a:hover{ color:#FFF; text-decoration:none;}
.window .close{ width:280px; height:30px;}
.window .close a{ text-align:right; background:url(../images/close.jpg) no-repeat right; float:right;color:#ff0000; font-size:18px; width:30px; height:30px;}
.window h3{color:#143157; font-size:16px; line-height:28px;margin-bottom:20px;}
.window p.tex_l{ text-align:left}
.window p{margin-bottom:20px;}
.window p.tex_c{ color:#143157; font-size:16px; line-height:28px;}
.window p.tex_r{ text-align:right}
.btn_window,.btn_window2,.btn_window3{cursor:pointer;color:#FFF;border:0px none; background-color:#143157; font-size:16px; text-align:center;  margin:8px auto; -moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; display:block; width:110px; height:32px; line-height:32px;}
.btn_window2{ display:inline-block;}
.btn_window3{ display:inline-block; background-color:#a0a0a0;}

*** window javascript 显示与隐藏 ***
function showDlg(infoId, bgId) {
	if (!infoId) infoId = "window";
	if (!bgId) bgId = "mask";
	document.getElementById(bgId).style.filter = "alpha(opacity=30)";
	document.getElementById(bgId).style.opacity = "40/100";
	document.getElementById(bgId).style.MozOpacity = "40/100";
	document.getElementById(bgId).style.width = window.document.body.offsetWidth + "px";
	document.getElementById(bgId).style.height = window.document.body.offsetHeight + "px";
	document.getElementById(bgId).style.display = 'block';
	document.getElementById(infoId).style.display = 'block';
}
function closeDlg(infoId, bgId) {
	if (!infoId) infoId = "window";
	if (!bgId) bgId = "mask";
	document.getElementById(bgId).style.display = 'none';
	document.getElementById(infoId).style.display = 'none';
}
***/


/*弹出遮罩浮层（dialogWidth是弹出内容的宽度；dialogHeight是弹出内容的高度；dialogHtml是弹出内容的Html字符串）*/
ClassBaoJavascript.prototype.FloatingLayer = function (dialogWidth, dialogHeight, dialogHtml) {
	var _screen = CBJS.GetScreen();
	//背景遮罩
	var baseDiv = document.createElement("div");
	with (baseDiv.style) {
		zIndex = "1000";
		position = "absolute";
		margin = "0px";
		padding = "0px";
		top = "0px";
		left = "0px";
		width = _screen.width + "px";
		height = _screen.height + "px";
		//可见与隐藏
		display = "block"; //block此元素将显示为块级元素，此元素前后会带有换行符。none 此元素不会被显示。inherit规定应该从父元素继承 display 属性的值。
		//visibility = ""; //visible默认值,元素是可见的。hidden	元素是不可见的。inherit	规定应该从父元素继承 visibility 属性的值。
		overflow = "hidden";
		//透明度
		filter = "alpha(opacity=30)";
		//-moz-opacity="0.3";
		MozOpacity = "0.3";
		opacity = "0.3";
		//其它样式
		backgroundColor = "#CECECE";
		border = "0px";
	}
	//弹出内容层
	var dialogDiv = document.createElement("div");
	with (dialogDiv.style) {
		zIndex = "1001";
		position = "absolute";
		width = ((dialogWidth && dialogWidth > 0) ? (dialogWidth + "px") : "50%");
		height = ((dialogHeight && dialogHeight > 0) ? (dialogHeight + "px") : "50%");
		top = ((dialogHeight && dialogHeight > 0) ? ((_screen.height - dialogHeight) / 2 + "px") : "25%");
		left = ((dialogWidth && dialogWidth > 0) ? ((_screen.width - dialogWidth) / 2 + "px") : "25%");
		display = "block";
		//visibility = "";
		//透明度
		filter = "alpha(opacity=100)";
		//-moz-opacity="0.3";
		MozOpacity = "1";
		opacity = "1";
		//其它样式
		backgroundColor = "#FFFFFF";
		border = "solid 15px #898989";
		textAlign = "left";
	}
	dialogDiv.innerHTML = dialogHtml || "";

	document.body.appendChild(baseDiv);
	document.body.appendChild(dialogDiv);
}
/*跟随滚动条的层，始终固定在网页某个位置可见的层*/
ClassBaoJavascript.prototype.ScrollingLayer = function (layerPosition, layerWidth, layerHeight, layerHtml) {
	var _screen = CBJS.GetScreen();
	//背景遮罩
	var baseDiv = document.createElement("div");
	with (baseDiv.style) {
		zIndex = "999";
		///页面上部居中
		if (layerPosition == 1) {
			position = "fixed";
			top = "0px"; /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = _screen.top + "px";
			left = ((layerWidth && layerWidth > 0) ? ((_screen.width - layerWidth) / 2 + "px") : "25%");
		}
			///页面上部右角
		else if (layerPosition == 2) {
			position = "fixed";
			top = "0px"; /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = _screen.top + "px";
			left = ((layerWidth && layerWidth > 0) ? ((_screen.width - layerWidth) + "px") : "80%");
		}
			///页面右部居中
		else if (layerPosition == 3) {
			position = "fixed";
			top = (_screen.top + 200) + "px"; /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = (_screen.top + 200) + "px";
			left = ((layerWidth && layerWidth > 0) ? ((_screen.width - layerWidth) + "px") : "80%");
		}
			///页面底部右角
		else if (layerPosition == 4) {
			position = "fixed";
			top = ((layerHeight && layerHeight > 0) ? ((_screen.height - layerHeight) + "px") : "80%"); /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = ((layerHeight && layerHeight > 0) ? ((_screen.height - layerHeight) + "px") : "80%");
			left = ((layerWidth && layerWidth > 0) ? ((_screen.width - layerWidth) + "px") : "80%");
		}
			///页面底部居中
		else if (layerPosition == 5) {
			position = "fixed";
			top = ((layerHeight && layerHeight > 0) ? ((_screen.height - layerHeight) + "px") : "80%"); /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = ((layerHeight && layerHeight > 0) ? ((_screen.height - layerHeight) + "px") : "80%");
			left = ((layerWidth && layerWidth > 0) ? ((_screen.width - layerWidth) / 2 + "px") : "25%");
		}
			///页面底部左角
		else if (layerPosition == 6) {
			position = "fixed";
			top = ((layerHeight && layerHeight > 0) ? ((_screen.height - layerHeight) + "px") : "80%"); /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = ((layerHeight && layerHeight > 0) ? ((_screen.height - layerHeight) + "px") : "80%");
			left = "0px";
		}
			///页面左部居中
		else if (layerPosition == 7) {
			position = "fixed";
			top = (_screen.top + 200) + "px"; /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = (_screen.top + 200) + "px";
			left = "0px";
		}
			///页面上部左角
		else if (layerPosition == 8) {
			position = "fixed";
			top = "0px"; /* position fixed for IE6 */
			_position = "absolute";
			/* _top: expression(documentElement.scrollTop + "px"); */
			_top = _screen.top + "px";
			left = "0px";
		}

		padding = "0px";
		width = ((layerWidth && layerWidth > 0) ? (layerWidth + "px") : "50%");
		height = ((layerHeight && layerHeight > 0) ? (layerHeight + "px") : "10%");
		//可见与隐藏
		display = "block"; //block此元素将显示为块级元素，此元素前后会带有换行符。none 此元素不会被显示。inherit规定应该从父元素继承 display 属性的值。
		//visibility = ""; //visible默认值,元素是可见的。hidden	元素是不可见的。inherit	规定应该从父元素继承 visibility 属性的值。
		overflow = "hidden";
		//透明度
		/* filter = "alpha(opacity=30)";
        //-moz-opacity="0.3";
		MozOpacity = "0.3";
        opacity = "0.3"; */
		//其它样式
		backgroundColor = "#CECECE";
		border = "0px";
	}
	baseDiv.innerHTML = layerHtml || "";
	document.body.appendChild(baseDiv);
}

//常用正则表达式，借鉴formvalidatorregex.js源代码
ClassBaoJavascript.prototype.regexEnum =
{
	intege: "^-?[1-9]\\d*$",					//整数
	intege1: "^[1-9]\\d*$",					//正整数
	intege2: "^-[1-9]\\d*$",					//负整数
	num: "^([+-]?)\\d*\\.?\\d+$",			//数字
	num1: "^[1-9]\\d*|0$",					//正数（正整数 + 0）
	num2: "^-[1-9]\\d*|0$",					//负数（负整数 + 0）
	decmal: "^([+-]?)\\d*\\.\\d+$",			//浮点数
	decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",　　	//正浮点数
	decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",　 //负浮点数
	decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",　 //浮点数
	decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",　　 //非负浮点数（正浮点数 + 0）
	decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",　　//非正浮点数（负浮点数 + 0）

	email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	color: "^[a-fA-F0-9]{6}$",				//颜色
	url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
	ascii: "^[\\x00-\\xFF]+$",				//仅ACSII字符
	zipcode: "^\\d{6}$",						//邮编
	mobile: "^(13|15|17|18)[0-9]{9}$",				//手机
	ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
	notempty: "^\\S+$",						//非空
	picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	rar: "(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
	date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
	qq: "^[1-9]*[1-9][0-9]*$",				//QQ号码
	tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
	username: "^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter: "^[A-Za-z]+$",					//字母
	letter_u: "^[A-Z]+$",					//大写字母
	letter_l: "^[a-z]+$",					//小写字母
	idcard: "^[1-9]([0-9]{14}|[0-9]{17})$",	//身份证
	ps_username: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D_\\w]+$" //中文、字母、数字 _
};

/*中华人民共和国居民身份证组成格式“省/直辖市/自治区/特别行政区{2}+市/自治州{2}+县/区{2}+出生日期{8}+出生地派出所代码{2}+性别(第17位数字表示性别：奇数表示男性，偶数表示女性){1}+校验码{1}”*/
ClassBaoJavascript.prototype.GetBirthdayByIdCard = function (cardID) {
	var sBirthday = cardID.substr(6, 4) + "-" + Number(cardID.substr(10, 2)) + "-" + Number(cardID.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
	else return sBirthday;
}
ClassBaoJavascript.prototype.GetSexByIdCard = function (cardID) {
	return cardID.substr(16, 1) % 2 ? "男" : "女";
}
ClassBaoJavascript.prototype.isCardID = function (cardID) {
	var iSum = 0;
	var info = "";
	if (!/^\d{17}(\d|x)$/i.test(cardID)) return "您输入的身份证长度或格式错误";
	cardID = cardID.replace(/x$/i, "a");
	//if (aCity[parseInt(cardID.substr(0, 2))] == null) return "您的身份证地区非法";
	var sBirthday = cardID.substr(6, 4) + "-" + Number(cardID.substr(10, 2)) + "-" + Number(cardID.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";

	for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(cardID.charAt(17 - i), 11);
	if (iSum % 11 != 1) return "您输入的身份证号非法";
	return true;//aCity[parseInt(cardID.substr(0,2))]+","+sBirthday+","+(cardID.substr(16,1)%2?"男":"女") 
}



/***** 通用ClassBaoJavascript模拟类库·结束 *****/
/*模拟类的实例*/
var CBJS = new ClassBaoJavascript();
if (!CBJS || typeof (CBJS) == "undefined") {
    var CBJS = new ClassBaoJavascript();
}
/***** End *****/