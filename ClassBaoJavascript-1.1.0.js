﻿/***
* explain: Common JavaScript extension library,Completely free of charge.Development and maintenance by ClassBao team.
* version: V1.0.0
* Copyright: classbao.com
* Author: xiongzaiqiren
* Version source: https://github.com/classbao/ClassBaoJavascript
* First modified: xiongzaiqiren
* First modified time: 2018-11-28 15:54
* Last modified: xiongzaiqiren
* Last modified time: 2023-08-18 23:54
***/
; (function (window, undefined) {

    /***** 通用ClassBaoJavascript模拟类库·开始 *****/
    function ClassBaoJavascript() {
        /*根据id获取元素（唯一元素）*/
        this.getById = function (id) {
            if (id && document) return document.getElementById(id) || null;
            return null;
        };
        /*根据className获取元素（元素数组）*/
        this.getByClass = function (className) {
            var classElements = [], allElements = document.all ? document.all : document.getElementsByTagName('*');
            for (var i = 0; i < allElements.length; i++) {
                if (allElements[i].className == className) {
                    classElements.push(allElements[i]);
                }
            }
            return classElements;
        };
        /*检测浏览器类型与版本*/
        this.getBrowser = function () {
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
            else if (ua.indexOf("trident") > -1) { //IE内核
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

            //移动端与PC端判断
            var u = navigator.userAgent;
            if (/iphone/ig.test(u)) {
                result.hardware = "iPhone";
                result.isPC = false;
            }
            else if (/ipad/ig.test(u)) {
                result.hardware = "iPad";
                result.isPC = false;
            }
            else if (/ipod/ig.test(u)) {
                result.hardware = "iPod";
                result.isPC = false;
            }
            else if (/android/ig.test(u)) {
                result.hardware = "Android";
                result.isPC = false;
            }
            else if (/linux/ig.test(u)) {
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
            else if (!!u.match(/Windows NT ([\d.]+)/ig)) {
                result.hardware = u.match(/Windows NT ([\d.]+)/ig)[0];
                var _WOW = u.match(/(WOW\d+)/ig);
                if (!!_WOW) {
                    result.WOW = u.match(/(WOW\d+)/ig)[0];
                }
                result.isPC = true;
            }
            else {
            }

            result.language = (navigator.browserLanguage || navigator.language);
            result.platform = navigator.platform;
            if (!!navigator.platform) {
                var system = {};
                var p = navigator.platform;
                system.win = p.indexOf("Win") == 0;
                system.mac = p.indexOf("Mac") == 0;
                system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
                if (system.win || system.mac || system.xll) {
                    /* 电脑端 */
                    result.isPC = true;
                } else {
                    /* 手机端 */
                    result.isPC = false;
                }
            }

            result.isWeixin = /MicroMessenger/ig.test(u);

            return result;
        };
        /*地理定位*/
        this.Geolocation = function () {
            var result = { longitude: "", latitude: "", accuracy: "" };
            if ("geolocation" in navigator) {
                // geolocation is available
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log("Latitude is :", position.coords.latitude);
                    console.log("Longitude is :", position.coords.longitude);
                    console.log("Accuracy is :", position.coords.accuracy);
                    result.longitude = position.coords.longitude;
                    result.latitude = position.coords.latitude;
                    result.accuracy = position.coords.accuracy;
                    return result;
                }, function (error) {
                    // 获取位置失败
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            alert("用户拒绝对地理位置信息的请求。");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("位置信息是不可用的。");
                            break;
                        case error.TIMEOUT:
                            alert("请求用户地理位置超时。");
                            break;
                        case error.UNKNOWN_ERROR:
                            alert("未知错误。");
                            break;
                        default:
                            console.error("Error code :", error.code);
                            console.error("Error message :", error.message);
                            break;
                    }
                    return result;
                });
            } else {
                // geolocation is not supported
                console.log("Geolocation is not supported by this browser.");
                return result;
            }

        };
        /* 获得当前浏览器JS的版本 */
        this.JavascriptVersion = function () {
            var n = navigator;
            var u = n.userAgent;
            var apn = n.appName;
            var v = n.appVersion;
            var ie = v.indexOf('MSIE ');
            if (ie > 0) {
                apv = parseInt(i = v.substring(ie + 5));
                if (apv > 3) {
                    apv = parseFloat(i);
                }
            } else {
                apv = parseFloat(v);
            }
            var isie = (apn == 'Microsoft Internet Explorer');
            var ismac = (u.indexOf('Mac') >= 0);
            var javascriptVersion = "1.0";
            if (String && String.prototype) {
                javascriptVersion = '1.1';
                if (javascriptVersion.match) {
                    javascriptVersion = '1.2';
                    var tm = new Date;
                    if (tm.setUTCDate) {
                        javascriptVersion = '1.3';
                        if (isie && ismac && apv >= 5) javascriptVersion = '1.4';
                        var pn = 0;
                        if (pn.toPrecision) {
                            javascriptVersion = '1.5';
                            a = new Array;
                            if (a.forEach) {
                                javascriptVersion = '1.6';
                                i = 0;
                                o = new Object;
                                tcf = new Function('o', 'var e,i=0;try{i=new Iterator(o)}catch(e){}return i');
                                i = tcf(o);
                                if (i && i.next) {
                                    javascriptVersion = '1.7';
                                }
                            }
                        }
                    }
                }
            }
            return javascriptVersion;
        };
        /*获取当前屏幕；结果：{ top: top, left: left, height: height, width: width }*/
        this.getScreen = function () {
            var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            var left = Math.max(document.body.scrollLeft, document.documentElement.scrollLeft);
            var width = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
            var height = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
            width = Math.max(width, window.document.body.offsetWidth);
            height = Math.max(height, window.document.body.offsetHeight);

            if (!width) { width = screen.availWidth; }
            if (!height) { height = screen.availHeight }

            return { top: top, left: left, height: height, width: width };
        };
        /* 获取窗口可视范围的高度 */
        this.getClientHeight = function () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
            return clientHeight;
        };
        /* 获取窗口滚动条高度 */
        this.getScrollTop = function () {
            var scrollTop = 0;
            if (!!window.pageYOffset) {
                //window.pageYOffset 被所有浏览器支持除了 IE 6, IE 7, IE 8, 不关doctype的事， 注IE9 开始支持此属性。
                scrollTop = window.pageYOffset;
            }
            else if (!!document.documentElement && !!document.documentElement.scrollTop) {
                //IE678 的非quirk模式
                scrollTop = document.documentElement.scrollTop;
            } else if (!!document.body) {
                //IE678 的quirk模式
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        };
        /* 获取文档内容实际高度 */
        this.getScrollHeight = function () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        };

        /* 判断设备类型 */
        this.getDeviceType = function () {
            const width = window.innerWidth;
            // const userAgent = navigator.userAgent;
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            if (width < 768 || (isTouchDevice && width < 992)) {
                return 'mobile'; // 这是移动设备
            } else if (width >= 992 && !isTouchDevice) {
                return 'desktop'; // 这是桌面设备
            } else {
                return 'tablet'; // 可能是平板设备
            }
        };
        /*
        // 使用示例
        const deviceType = getDeviceType();
        console.log(`当前设备类型: ${deviceType}`);
        */

        /* 判断设备网络类型 */
        this.Network = {
            /* 使用 Navigator.connection API (推荐) 现代浏览器提供了 Network Information API，可以获取详细的网络信息： */
            getNetworkType: function () {
                // 检查浏览器是否支持
                if (!navigator.connection) {
                    return 'unknown';
                }
                if (!navigator.onLine) return '无网络';

                const connection = navigator.connection;

                // 可能的类型值
                const types = {
                    'slow-2g': '2G',
                    '2g': '2G',
                    '3g': '3G',
                    '4g': '4G',
                    '5g': '5G',
                    'wifi': 'WiFi',
                    'ethernet': '有线网络',
                    'cellular': '蜂窝网络',
                    'none': '无网络'
                };

                // 从effectiveType获取网络类型
                if (connection.effectiveType) {
                    return types[connection.effectiveType] || connection.effectiveType;
                }

                // 从type属性获取
                if (connection.type) {
                    return types[connection.type] || connection.type;
                }

                return 'unknown';
            },

            /*
            // 使用示例
            console.log('当前网络类型:', getNetworkType());
            
            // 监听网络变化
            navigator.connection.addEventListener('change', () => {
              console.log('网络类型变化:', getNetworkType());
            });
            */

            /*
            // 监听在线/离线状态
            window.addEventListener('online', () => {
                console.log('网络已连接');
                getNetworkType().then(type => console.log('当前网络:', type));
            });
            
            window.addEventListener('offline', () => {
                console.log('网络已断开');
            });
            
            // 监听connection变化
            if (navigator.connection) {
                navigator.connection.addEventListener('change', () => {
                console.log('网络类型变化:', getNetworkType());
                });
            }
            */


            /* 通过网速估算判断网络类型：如果浏览器不支持 Network Information API，可以通过下载速度估算： */
            estimateNetworkType: async function () {
                const testUrl = 'https://httpbin.org/stream-bytes/1024'; // 1KB测试文件
                const startTime = performance.now();

                try {
                    const response = await fetch(testUrl);
                    await response.arrayBuffer();
                    const duration = (performance.now() - startTime) / 1000; // 秒
                    const speed = 8 / duration; // 转换为Mbps (1KB = 8Kb)

                    if (speed > 10) return 'WiFi/有线网络';
                    if (speed > 5) return '4G';
                    if (speed > 1) return '3G';
                    return '2G/慢速网络';
                } catch {
                    return '无网络';
                }
            },

            /*
            // 使用示例
            estimateNetworkType().then(type => {
              console.log('估算网络类型:', type);
            });
            */

            /* 最佳实践建议 */
            // 综合方案
            detectNetwork: async function () {
                try {
                    // 优先使用标准API
                    if (navigator.connection?.effectiveType) {
                        return {
                            type: getNetworkType(),
                            downlink: navigator.connection.downlink, // Mbps
                            rtt: navigator.connection.rtt, // 往返延迟(ms)
                            saveData: navigator.connection.saveData // 省流模式
                        };
                    }

                    // 备用方案
                    return {
                        type: await estimateNetworkType(),
                        downlink: 'unknown',
                        rtt: 'unknown'
                    };
                } catch (error) {
                    return {
                        type: 'unknown',
                        error: error.message
                    };
                }
            }

            /*
            // 使用示例
            detectNetwork().then(info => {
              console.log('网络信息:', info);
              if (info.type === '2G' || info.type === '3G') {
                // 慢速网络优化逻辑
                loadLiteVersion();
              }
            });
            */

        };


        /*检测是否支持Html5元素Canvas*/
        this.supportCanvas = function () {
            return !!document.createElement("canvas").getContext;
        };

        /*隐藏（element是HTML元素）*/
        this.hidden = function (id) {
            var element = null;
            if ("string" == typeof (id)) {
                element = this.getById(id);
            }
            else if ("object" == typeof (id)) {
                element = id;
            }
            if (!!element)
                element.style.display = "none";
        };
        /*显示（element是HTML元素）*/
        this.show = function (id) {
            var element = null;
            if ("string" == typeof (id)) {
                element = this.getById(id);
            }
            else if ("object" == typeof (id)) {
                element = id;
            }
            if (!!element)
                element.style.display = "block";/* display="inline" */
        };

        /*创建新的Guid*/
        this.NewGuid = function (mode) {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            }

            if (!!mode && "N" === mode.toUpperCase().Trim()) {
                return (S4() + S4() + "" + S4() + "" + S4() + "" + S4() + "" + S4() + S4() + S4());
            }
            else {
                return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
            }
        };

        this.isEmptyArray = function (value) {
            return Array.isArray(value) && value.length === 0;
        };
        this.isEmptyObject = function (value) {
            return value !== null &&
                typeof value === 'object' &&
                !Array.isArray(value) &&
                Object.keys(value).length === 0;
        };
        this.isNullOrUndefined = function (value) {
            return value === null || value === undefined;
        };
        this.isString = function (value) {
            return typeof value === 'string' || value instanceof String;
        };
        this.isNullOrWhiteSpace = function (value) {
            return (
                value === null ||          // 检查null
                value === undefined ||     // 检查undefined
                (typeof value === 'string' && value.trim().length === 0) ||  // 检查空字符串或全空格
                (typeof value === 'object' && value.toString().trim().length === 0)  // 处理String对象
            );
        };

        /*转换成Boolean*/
        this.toBoolean = function (value, defaultValue = false) {
            if (0 === value || -0 === value || 0n === value) { return defaultValue; }
            else if (Array.isArray(value) && value.length === 0) { return defaultValue; } // 判断空数组 []
            else if (value !== null && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) { return defaultValue; } // 判断空对象 {}
            else if (isNaN(value) || Number.isNaN(value)) { return defaultValue; } // 判断是NaN
            else if (typeof value === 'string' || value instanceof String) {
                let _s = value.toLowerCase().trim();
                return ('false' == _s || '0' == _s || '' == _s) ? false : true;
            }

            return (undefined !== value && null !== value) ? !!value : defaultValue;
        };


        /*创建元素*/
        this.createElement = function (type) { return document.createElement(type); };
        /*删除指定节点*/
        this.removeChild = function (element) {
            try {
                if (element) {
                    element.parentNode.removeChild(element);
                }
            }
            catch (e) {
            }
        };
        /*删除指定元素所有子节点*/
        this.removeChildNodes = function (element) {
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
        };



        /*页面及窗体通用功能*/
        this.Window = {
            /*跳转到链接*/
            goToLocation: function (url) {
                if (!!url && null != url && undefined !== url) { window.location = url; }
            },
            /*从最顶层窗口跳转链接*/
            TopLocation: function (url) {
                if (!!url && null != url && undefined !== url) {
                    if (window.top != window.self) { window.top.location = url; }
                    else { window.location = url; }
                }
            },
            /*从父窗口窗口跳转链接。注：如果窗口本身是顶层窗口，parent属性返回的是对自身的引用。在框架网页中，一般父窗口就是顶层窗口，但如果框架中还有框架，父窗口和顶层窗口就不一定相同了。*/
            ParentLocation: function (url) {
                if (!!url && null != url && undefined !== url) {
                    if (window.parent != window.self) { window.parent.location = url; }
                    else { window.location = url; }
                }
            },

            /*强制刷新页面*/
            reload: function () {
                try { window.history.go(0); }
                catch (e) { window.location.reload(); }
            },

            /*** 前进 ***/
            /*frame窗体“前进”（name是frame窗体名称）*/
            goToForward: function (name) {
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
            },
            /*当前窗体前进页面*/
            goToForward: function () {
                try { window.history.go(1); }
                catch (e) { window.history.forward(); }
            },
            /*** 后退 ***/
            /*frame窗体“后退”（name是frame窗体名称）*/
            goToBack: function (name) {
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
            },
            /*当前窗体后退页面*/
            goToBack: function () {
                try {
                    window.history.go(-1);
                }
                catch (e) {
                    window.history.back();
                    //history.go(-1);
                    //window.history.back(-1);
                }
            },

            /*** 刷新 ***/
            /*frame窗体“刷新”（name是frame窗体名称）*/
            reload: function (name) {
                if (name && window.frames[name]) {
                    if (window.frames[name].location) {
                        window.frames[name].location.reload();
                    }
                    else if (window.frames[name].contentWindow.location) {
                        window.frames[name].contentWindow.location.reload();
                    }
                }
            },
            /*当前窗体强制刷新页面*/
            reload: function () {
                try { window.history.go(0); }
                catch (e) { window.location.reload(); }
            },

            /*获取域名URL。（例如：http://www.classbao.com）*/
            getDomainUrl: function () {
                if (window && window.location)
                    return window.location.protocol + "//" + window.location.host; //http://www.classbao.com
                else
                    return "";
            }
        };
        /*获取参数值（类似URL，Cookie等格式的参数文本）（ParamName是参数名称；PaeramText是完整参数文本（例如：FromUser=o--NRtx58MS4JX9ilO_BV-VjBAGU&Latitude=39.972054&Longitude=116.312386&Precision=40）；BetweenOfChar是参数间隔符（例如：“&”，“;”））*/
        this.getParamValue = function (ParamName, ParamText, BetweenOfChar) {
            if (!ParamName || !ParamText) return null;
            var textstring = ParamText.toString();
            var start = textstring.indexOf(ParamName + "=");
            if (start == -1) return null;
            start += ParamName.length + 1;
            var end = textstring.indexOf(BetweenOfChar, start);
            if (end == -1) return textstring.substring(start);
            return textstring.substring(start, end);
        };
        /*获取页面GET请求URL参数值*/
        this.getUrlParamValue = function (name) {
            var searchStr = decodeURIComponent(window.location.search);
            return this.getParamValue(name, searchStr, "&");
        };
        this.getQueryString = function (name, url) {
            if (!name) return null;
            url = url || window.location.search
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = url.substr(1).match(reg);
            if (r != null) return decodeURIComponent(r[2]); return null;
        };

        /* Ajax 请求 */
        this.ajax = function (args) {
            var self = this;
            this.options = {
                type: 'GET',
                async: true,
                contentType: 'application/x-www-form-urlencoded',
                url: 'about:blank',
                data: null,
                success: {},
                error: {}
            };
            this.getXmlHttp = function () {
                var xmlHttp;
                try {
                    xmlhttp = new XMLHttpRequest();
                }
                catch (e) {
                    try {
                        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                    }
                    catch (e) {
                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }
                if (!xmlhttp) {
                    alert('你的浏览器不支持AJAX');
                    return false;
                }
                return xmlhttp;
            };
            this.send = function () {
                for (var i in self.options) {
                    self.options[i] = (args[i] == null) ? val : args[i];
                }
                var xmlHttp = new self.getXmlHttp();
                if (self.options.type.toUpperCase() == 'GET') {
                    xmlHttp.open(self.options.type, self.options.url + (self.options.data == null ? "" : ((/[?]$/.test(self.options.url) ? '&' : '?') + self.options.data)), self.options.async);
                }
                else {
                    xmlHttp.open(self.options.type, self.options.url, self.options.async);
                    xmlHttp.setRequestHeader('Content-Length', self.options.data.length);
                }
                xmlHttp.setRequestHeader('Content-Type', self.options.contentType);
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4) {
                        if (xmlHttp.status == 200 || xmlHttp.status == 0) {
                            if (typeof self.options.success == 'function') self.options.success(xmlHttp.responseText);
                            xmlHttp = null;
                        }
                        else {
                            if (typeof self.options.error == 'function') self.options.error('Server Status: ' + xmlHttp.status);
                        }
                    }
                };
                xmlHttp.send(self.options.type.toUpperCase() == 'POST' ? self.options.data.toString() : null);
            };
            this.send();
        };
        /* //示例：
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        CBJS.RequestState(XMLHttpRequest, textStatus, errorThrown);
        }
        */
        /*ajax请求错误的状态解读*/
        this.RequestState = function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus != null) {
                var errorMsg = "";
                if (textStatus == "timeout") { errorMsg = "对不起，请求超时！"; }
                else if (textStatus == "parsererror") { errorMsg = "对不起，请求数据发生解析器错误！请检查参数个数或接收数据格式。"; }
                else { errorMsg = "对不起，请求发生了错误！"; }
                //alert(errorMsg + "\n 请求状态：\n textStatus= " + textStatus + "\n XMLHttpRequest.status= " + XMLHttpRequest.status + "\n XMLHttpRequest.readyState= " + XMLHttpRequest.readyState);
                return errorMsg + "<br /> 请求状态：<br /> textStatus= " + textStatus + "<br /> XMLHttpRequest.status= " + XMLHttpRequest.status + "<br /> XMLHttpRequest.readyState= " + XMLHttpRequest.readyState;
            }
        };

        /* Cookie通用功能 */
        this.Cookie = {
            /*当前浏览器Cookie是否启用*/
            CookieEnabled: function () {
                var result = false;
                if (navigator.cookieEnabled && typeof (document.cookie) != "undefined") {
                    var date = new Date();
                    date.setTime(date.getTime() + 10 * 1000); //10秒
                    document.cookie = "testcookie=yes; expires=" + date.toGMTString();
                    var _cookie = document.cookie;
                    if (_cookie.indexOf("testcookie=yes") > -1)
                        result = true;
                }
                return result;
            },
            /*设置Cookie，返回值类型:Boolean,传入参数:（name是名称；value是值；days是过期时间（天）；path是路径（可以是一个目录，或者是一个路径。path属性设置成“/”，凡是来自同一服务器（或者多级域名之间），URL里有相同路径的所有WEB页面都可以共享cookies。）；domain是域（值是域名，这是对path路径属性的一个延伸。如果我们想让 catalog.mycompany.com 能够访问shoppingcart.mycompany.com设置的cookies，该怎么办? 我们可以把domain属性设置成“mycompany.com”，并把path属性设置成“/”。不能把cookies域属性设置成与设置它的服务器的 所在域不同的值。）；isSecure是传输安全（如果一个cookie标记为secure，那么它与WEB服务器之间就通过HTTPS或者其它安全协议传递数据。把cookie设置为secure，只保证cookie与WEB服务器之间的数据传输过程加密，而保存在本地的 cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。）；）*/
            setCookie: function (name, value, days, path, domain, isSecure) {
                try {
                    if (!!document.cookie) return false;
                    if (!name) return;
                    value = value || "";
                    days = days || 7;
                    path = path || "/";
                    var exp = new Date;
                    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
                    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=" + path + (domain ? ";domain=" + domain : "") + (isSecure ? ";secure" : "");
                    /*
                     document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/; domain=classbao.com; secure";
                    */
                    return true;
                }
                catch (e) {
                    throw e;
                }
                return false;
            },
            /*设置Cookie（name是名称；value是值；days是过期时间（天））*/
            setCookie: function (name, value, days) {
                try {
                    if (!!document.cookie) return false;
                    if (!name) return;
                    value = value || "";
                    days = days || 7;
                    var exp = new Date;
                    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
                    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + "; path=/";
                    return true;
                }
                catch (e) {
                    throw e;
                }
                return false;
            },

            /*获取Cookie（name是名称）*/
            getCookie: function (name) {
                if (!!document.cookie) return null;
                return this.getParamValue(name, decodeURIComponent(document.cookie), ";");
            },
            /*获取垂直线分隔的Cookie（name是名称）*/
            getCookieByVerticalLine: function (name) {
                if (!!document.cookie) return null;
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) return decodeURIComponent(arr[2]); return null;
            },

            /*删除Cookie（name是名称）*/
            deleteCookie: function (name) {
                if (!!document.cookie) return;
                var exdate = new Date();
                exdate.setTime(exdate.getTime() - 1000);
                document.cookie = name + "=; expires=" + exdate.toGMTString();
            }
        };
        /***** 常用实例方法扩展·sessionStorage·开始 *****/
        this.handleSessionStorage = {
            check: function () {
                if (!window.sessionStorage) {
                    console.log("This browser does not support sessionStorage.");
                    return false;
                }
                else {
                    return true;
                }
            }
            , setItem: function (name, value) {
                if ('string' == typeof (value)) { sessionStorage.setItem(name, value); }
                else { sessionStorage.setItem(name, JSON.stringify(value)); }
            }
            , getItem: function (name) {
                var value = sessionStorage.getItem(name);
                if ('string' == typeof (value)) { return JSON.parse(value); }
                else { return value; }
            }
            , removeItem: function (name) {
                return sessionStorage.removeItem(name);
            }
            , clearAll: function () {
                return sessionStorage.clear();
            }
        };
        /***** 常用实例方法扩展·sessionStorage·结束 *****/
        /***** 常用实例方法扩展·LocalStorage·开始 *****/
        this.handleLocalStorage = {
            check: function () {
                if (!window.localStorage) {
                    console.log("This browser does not support localStorage.");
                    return false;
                }
                else {
                    return true;
                }
            }
            , setItem: function (name, value) {
                if ('string' == typeof (value)) { localStorage.setItem(name, value); }
                else { localStorage.setItem(name, JSON.stringify(value)); }
            }
            , getItem: function (name) {
                var value = localStorage.getItem(name);
                if ('string' == typeof (value)) { return JSON.parse(value); }
                else { return value; }
            }
            , removeItem: function (name) {
                return localStorage.removeItem(name);
            }
            , clearAll: function () {
                return localStorage.clear();
            }
        };
        /***** 常用实例方法扩展·LocalStorage·结束 *****/


        /*编码Html源代码*/
        this.encodingHTML = function (text) {
            if (!!!text || text.length < 1) return '';
            var _text = text || '';
            _text = _text.replace(/&/g, "&amp;");
            _text = _text.replace(/"/g, "&quot;");
            _text = _text.replace(/</g, "&lt;");
            _text = _text.replace(/>/g, "&gt;");
            _text = _text.replace(/'/g, "&#146;");
            return _text;
        };
        /*解码Html源代码*/
        this.decodingHTML = function (text) {
            if (!!!text || text.length < 1) return '';
            var _text = text || '';
            _text = _text.replace(/&amp;/g, "&");
            _text = _text.replace(/&quot;/g, "\"");
            _text = _text.replace(/&lt;/g, "<");
            _text = _text.replace(/&gt;/g, ">");
            _text = _text.replace(/&#146;/g, "'");
            return _text;
        };
        /*移除字符串中的Html标签*/
        this.removeHtmlTag = function (text) {
            if (!!!text || text.length < 1) return '';
            return text.toString().replace(/<[^>]+>|<\/[^>]+>/g, "");
        };

        /*Unicode（编码）转义(\uXXXX)的编码和解码*/
        this.encoding2Unicode = function (text) {
            if (!!!text || text.length < 1) return '';
            let unicode = "";
            for (let i = 0; i < text.length; i++) {
                unicode += '\\u' + text.charCodeAt(i).toString(16);
            }
            return unicode;
        };
        // 示例：CBJS.encoding2Unicode('我是中国人；我爱中国！'); 输出：\\u6211\\u662f\\u4e2d\\u56fd\\u4eba\\uff1b\\u6211\\u7231\\u4e2d\\u56fd\\uff01
        /*Unicode（解码）转义(\uXXXX)的编码和解码*/
        this.decoding2Unicode = function (unicode) {
            if (!!!unicode || unicode.length < 1) return '';
            return unicode.replace(/\\(u[0-9a-fA-F]{4})/gm, function ($0, $1, $2) {
                return $1 && String.fromCharCode($2);
            });
        };
        // 示例：CBJS.decoding2Unicode('\u6211\u662f\u4e2d\u56fd\u4eba\uff1b\u6211\u7231\u4e2d\u56fd\uff01'); 输出：我是中国人；我爱中国！

        /*Unicode（编码）转义(\uXXXX)的编码和解码*/
        this.encodingUnicode = function (text) {
            if (!!!text || text.length < 1) return '';
            return escape(text).replace(/%(u[0-9A-F]{4})|(%[0-9A-F]{2})/gm, function ($0, $1, $2) {
                return $1 && '\\' + $1.toLowerCase() || unescape($2);
            });
        };
        /*Unicode（解码）转义(\uXXXX)的编码和解码*/
        this.decodingUnicode = function (text) {
            if (!!!text || text.length < 1) return '';
            return unescape(text.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
        };

        /*转义单引号（基于Sql规范）*/
        this.escapeSingleQuotesForSQL = function (text) {
            if (!!!text || text.length < 1) return '';
            return text.replace(/'/ig, "''");
        };
        /*转义单引号（基于JavaScript规范）*/
        this.escapeSingleQuotesForJS = function (text) {
            if (!!!text || text.length < 1) return '';
            return text.replace(/\'/g, "\\\'");
        };

        /*字符串长度（字节长度，真实字节长度）*/
        this.realLength = function (str) {
            if (!!!str) { return 0; }
            var _str = ("string" == typeof (str)) ? str : str.toString();
            var len = 0;
            for (var i = 0; i < _str.length; i++) {
                if (_str.charCodeAt(i) > 255) {
                    len += 2;
                }
                else {
                    len++;
                }
            }
            return len;
        };
        /*按字节数截取字符串（从位置0开始；str是原始字符串；len是要截取长度（字节数）；suffix是后缀）*/
        this.subString = function (str, len, suffix) {
            if (!!!str || !!!len) return '';
            var _str = ("string" == typeof (str)) ? str : str.toString();
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
        };
        /* 关键词高亮显示，多个关键词请用空格分隔 */
        this.highlightKeyword = function (text, keyword, color) {
            if (!!!text) { return ''; }
            if (!!!keyword) { return text; }
            color = !!color ? color : 'red';

            let highlightedText = text;
            let keywords = keyword.split(' ').filter(Boolean); // 过滤掉空字符串，空格分隔的多个关键词都提取出来
            keywords.forEach(kw => {
                const regex = new RegExp(kw, 'gi'); // 'g' for global, 'i' for case insensitive
                highlightedText = highlightedText.replace(regex, `<span style="color: ${color};">${kw}</span>`);
            });
            return highlightedText;
            // const regex = new RegExp(keyword, 'gi'); // 'g' for global, 'i' for case-insensitive
            // return text.replace(regex, `<span style="color: ${color}">${keyword}</span>`);
        };
        /*移除URL末尾的空格、格式符号、“&”、“?”*/
        this.clearURLEnd = function (url) {
            if (!!!url || url.length < 1) return '';
            return url.toString().replace(/(&|\?|\s)+$/g, "");
        };

        /*获取值域为[minValue, maxValue]的随机数（可以取到最大值和最小值，均衡分布）*/
        this.getRandom = function (minValue, maxValue) {
            /*
            * 也就是说，如果要创建一个从x到y的随机数，就可以这样写：
            * Math.round(Math.random() * (y - x)) + x;
            * x和y可以是任何的数值，即使是负数也一样。
            */
            // return Math.round(Math.random() * (maxValue - minValue)) + minValue;
            return Math.trunc(Math.random() * (maxValue - minValue + 1)) + minValue;
        };
        this.copyToClipboard = function (text) {
            try {
                navigator.clipboard.writeText(text);
                console.log('文本已复制到剪贴板');
                // 可以选择在这里通知用户
                alert('文本已成功复制到剪贴板');
            } catch (e) {
                console.error('无法复制文本: ', e);
                // 处理错误，比如向用户显示错误信息
                alert('复制失败，请检查浏览器权限设置');
            }
        };

        this.copyContentToClipboard = function (content) {
            try {
                // 创建一个临时的输入框来存储内容
                const input = document.createElement('input');
                input.value = content;
                // 将输入框添加到页面，并选中内容
                document.body.appendChild(input);
                input.select();
                //copyText.setSelectionRange(0, 99999); /* 为移动设备设置 */

                // 执行复制命令
                document.execCommand('copy');
                // 移除临时输入框
                document.body.removeChild(input);

                console.log('文本已复制到剪贴板');
                // 可以选择在这里通知用户
                alert('文本已成功复制到剪贴板');
            } catch (e) {
                console.error('无法复制文本: ', e);
                // 处理错误，比如向用户显示错误信息
                alert('复制失败，请检查浏览器权限设置');
            }
        };

        /*数组操作*/
        this.Array = {
            /*根据索引移除数组中指定项（index表示数组下标索引，从0开始）*/
            removeByIndex: function (array, index) {
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
            },
            /*移除数组中指定项*/
            removeByItem: function (array, removeItem) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == removeItem) {
                        array = this.Array.removeByIndex(array, i);
                        i--;
                    }
                }
                return array;
            }
        };


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

        /*密码复杂度。密码长度权重是1，密码连续3个相同元素权重是-1，密码物种权重是10。对于6-18位密码来说：12-28为低级，28-38为中低级，38-48为中高级，48以上为高级*/
        this.PasswordComplexity = function (password) {
            if (!!!password || password.length < 1) return 0;
            var complexity = 0;

            var reg_empty = /^\s*$/;
            var reg_digital = /([0-9])+/;
            var reg_lowercase = /([a-z])+/;
            var reg_capitalletters = /([A-Z])+/;
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

            return complexity;
        };
        /*文本搜索。参数：sourceString是源字符串，searchWords是搜索词或空格隔开的词组，HandleFunction自定义对已匹配的单个词组处理方法。*/
        this.TextSearch = function (sourceString, searchWords, HandleFunction) {
            var searchWords = searchWords.Trim().replace(/\s+/ig, ' ');
            var wordArray = this.Regex.Split(searchWords, /\s+/ig);
            wordArray.forEach(function (value, index, array) {
                var reg = new RegExp(value, "ig"); //动态创建一个正则表达式
                sourceString = sourceString.replace(reg, function (a) {
                    return !!HandleFunction ? HandleFunction(a) : a.fontcolor('red');
                });
            }, sourceString);

            return sourceString;
        };

        /*中国身份证号码常用方法*/
        this.ChinaIDCard = {
            /*中华人民共和国居民身份证组成格式“省/直辖市/自治区/特别行政区{2}+市/自治州{2}+县/区{2}+出生日期{8}+出生地派出所代码{2}+性别(第17位数字表示性别：奇数表示男性，偶数表示女性){1}+校验码{1}”*/
            GetBirthdayByIDCard: function (cardID) {
                var sBirthday = cardID.substr(6, 4) + "-" + Number(cardID.substr(10, 2)) + "-" + Number(cardID.substr(12, 2));
                var d = new Date(sBirthday.replace(/-/g, "/"));
                if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return null;
                else return sBirthday;
            },
            GetSexByIDCard: function (cardID) {
                return cardID.substr(16, 1) % 2 ? "男" : "女";
            },
            IsIDCard: function (cardID) {
                if (!!!cardID || cardID.length < 15) return false;
                if (!/^\d{17}(\d|x)$/i.test(cardID)) return false;

                var _cardID = cardID.replace(/x$/i, "a");
                //if (aCity[parseInt(_cardID.substr(0, 2))] == null) return "你的身份证地区非法";
                var sBirthday = _cardID.substr(6, 4) + "-" + Number(_cardID.substr(10, 2)) + "-" + Number(_cardID.substr(12, 2));
                var d = new Date(sBirthday.replace(/-/g, "/"));
                if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return false;

                var iSum = 0;
                for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(_cardID.charAt(17 - i), 11);
                if (iSum % 11 != 1) return false;
                return true;
            }
        };

        /* 调用示例：
            document.onkeydown = function (e) {
                if (CBJS.GetKeyCode(e) == 13) { CBJS.LabelAlert(null, '你按下了回车键'); return true; }
            }
        */
        /*获取键盘按键代码（event是按键事件）兼容IE，FireFox，Chrome，Opera等*/
        this.GetKeyCode = function (event) {
            var theEvent = event || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            return code;
        };
        /*可跨浏览器的事件处理程序，构造EventUtil对象，为其添加可兼容各浏览器的事件处理方法*/
        this.EventUtil = {
            /*添加事件处理程序*/
            /*示例：CBJS.EventUtil.addEventListener(document, "keydown", function (e) { if (CBJS.GetKeyCode(e) == 13) { CBJS.LabelAlert(null, '你按下了回车键'); return true; } } );*/
            addEventListener: function (element, type, handler) {
                if (element.addEventListener) {
                    addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    attachEvent("on" + type, handler);
                } else {
                    element["on" + type] = handler;
                }
            },
            /*移除事件处理程序*/
            removeEventListener: function (element, type, handler) {
                if (element.removeEventListener) {
                    removeEventListener(type, handler, false);
                } else if (element.detachEvent) {
                    detachEvent("on" + type, handler);
                } else {
                    element["on" + type] = null;
                }
            },
            /*获得事件对象*/
            getEvent: function (event) {
                return event ? event : window.event;
            },
            /*获得事件对象*/
            getEvent: function () {
                if (document.all) {
                    return window.event; //如果是ie
                }
                var func = this.getEvent.caller;
                while (func != null) {
                    var arg0 = func.arguments[0];
                    if (arg0) {
                        if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
                            || (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
                            return arg0;
                        }
                    }
                    func = func.caller;
                }
                return null;
            },
            /*获得按键值*/
            getKeyCode: function (event) {
                var theEvent = event || window.event;
                var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
                return code;
            },
            /*获得事件的目标*/
            getTarget: function (event) {
                return event.target || event.scrElement;
            },
            /*取消事件的默认行为*/
            preventDefault: function (event) {
                if (event.preventDefault) {
                    event.preventDefault;
                } else {
                    event.returValue = false;
                }
            },
            /*阻止事件进一步冒泡*/
            stopPropagation: function (event) {
                if (event.stopPropagation) {
                    event.stopPropagation;
                } else {
                    event.cancelBubble = true;
                }
            }
        };
        this.addEventListener = function (element, type, handler) { this.EventUtil.addEventListener(element, type, handler); }
        this.removeEventListener = function (element, type, handler) { this.EventUtil.removeEventListener(element, type, handler); }
        this.getEvent = function (event) { this.EventUtil.getEvent(event); }
        this.getEvent = function () { this.EventUtil.getEvent(); }
        this.getKeyCode = function (event) { this.EventUtil.getKeyCode(event); }

        /* HTML5的canvas相关插件 */
        this.canvas = {
            context: null
            /* CanvasRenderingContext2D */
            , getContext: function (canvasId) {
                if (!!this.context && "CanvasRenderingContext2D" === this.context.constructor.name) {
                    return this.context;
                }

                var c = document.getElementById(canvasId || "myCanvas");
                this.context = c.getContext("2d");
                return this.context;
            }
            /* canvas把正方形图片绘制成圆形。ctx是CanvasRenderingContext2D，img是Image对象、或http/https图片，x，y是左上角坐标，r是圆半径 */
            , circleImg: function (ctx, img, x, y, r) {
                ctx.save();
                var d = 2 * r;
                var cx = x + r;
                var cy = y + r;
                ctx.beginPath(); //开始绘制
                //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
                ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                //画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因
                ctx.clip();
                // 推进去图片，必须是http/https图片
                ctx.drawImage(img, x, y, d, d);
                //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
                ctx.restore();
                //可将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
                //ctx.draw();
            }

            /*调用示例： downloadFile(canvas.toDataURL("image/png"), 'ship.png'); */
            , downloadFile: function (content, fileName) {

                var aLink = document.createElement('a');
                var blob = this.base64Img2Blob(content); //new Blob([content]);

                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("click", false, false);//initEvent 不加后两个参数在FF下会报错
                aLink.download = fileName || ('下载图片名称' + new Date().toLocaleDateString());
                aLink.href = URL.createObjectURL(blob);

                aLink.dispatchEvent(evt);
            }
            , base64Img2Blob: function (code) {
                var parts = code.split(';base64,');
                var contentType = parts[0].split(':')[1];
                var raw = window.atob(parts[1]);
                var rawLength = raw.length;

                var uInt8Array = new Uint8Array(rawLength);

                for (var i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }

                return new Blob([uInt8Array], { type: contentType });
            }

            /*调用示例： downloadIamge(document.getElementById('tulip').src, "fileName"); */
            , downloadIamge: function (imageSrc, fileName) {
                var image = new Image();
                // 解决跨域 Canvas 污染问题
                image.setAttribute('crossOrigin', 'anonymous');
                image.onload = function () {
                    var canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;

                    var context = canvas.getContext('2d');
                    context.drawImage(image, 0, 0, image.width, image.height);
                    var url = canvas.toDataURL('image/png');

                    //将图片保存到本地
                    var saveFile = function (imgdata, fileName) {
                        // 生成一个a元素
                        var a = document.createElement('a');
                        // 创建一个单击事件
                        var event = new MouseEvent('click');

                        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
                        a.download = fileName || ('下载图片名称' + new Date().toLocaleDateString());
                        // 将生成的URL设置为a.href属性
                        a.href = imgdata;

                        // 触发a的单击事件
                        a.dispatchEvent(event);
                    }
                    saveFile(url, fileName);
                }
                image.src = imageSrc;
            }

            /* 图片下载操作，指定图片类型。调用示例： download(document.getElementById('canvas1'), 'png' , 'fileName'); */
            , downloadCanvas: function (canvas, type, fileName) {
                //设置保存图片的类型
                var imgdata = canvas.toDataURL(type);
                //将mime-type改为image/octet-stream,强制让浏览器下载
                var fixtype = function (type) {
                    type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
                    var r = type.match(/png|jpeg|bmp|gif/)[0];
                    return 'image/' + r;
                }
                imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
                //将图片保存到本地
                var saveFile = function (data, filename) {
                    var link = document.createElement('a');
                    link.href = data;
                    link.download = filename;
                    var event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    link.dispatchEvent(event);
                }
                filename = fileName || ('下载图片名称' + new Date().toLocaleDateString());
                saveFile(imgdata, filename + '.' + type);
            }

            /*生成IMG标签*/
            , genImage: function (strData) {
                var img = document.createElement('img');
                img.src = strData;
                return img;
            }
            /*canvas生成IMG标签*/
            , convertToImage: function (canvas, type, fileName) {
                var strData = canvas.toDataURL(type);
                return CBJ.canvas.genImage(strData);
            }
            ////////////////////////////////////////
        };

        // 使用方法：截取id为"target"的元素并保存为"screen.png"
        // takeScreenshot(document.getElementById('target'), 'screen.png');
        this.takeScreenshot = function (targetElement, filename) {
            // 创建一个Canvas元素
            var canvas = document.createElement('canvas');
            canvas.width = targetElement.offsetWidth;
            canvas.height = targetElement.offsetHeight;
            var ctx = canvas.getContext('2d');

            // 将目标元素绘制到Canvas上
            var data = ctx.getImageData(0, 0, targetElement.offsetWidth, targetElement.offsetHeight);
            canvas.width = data.width;
            canvas.height = data.height;
            ctx.putImageData(data, 0, 0);

            // 将Canvas转换为图片并下载
            var img = canvas.toDataURL('image/png');
            var a = document.createElement('a');
            a.href = img;
            a.download = filename || 'screenshot.png';
            a.click();
            /* 在JavaScript中，没有直接的方式来进行屏幕截图并保存为图片。但是，你可以使用HTML5 Canvas配合一些浏览器API来实现截图功能。以下是一个简单的示例，演示如何将网页中的某个元素截图并保存为图片。 */
        };

    };
    /***** 通用 ClassBaoJavascript() 主类库·结束 *****/


    /***** 常用实例方法扩展·日期与时间·开始 *****/
    /*获得Unix Timestamp时间戳（秒）*/
    ClassBaoJavascript.prototype.UnixTimestamp = function (time) {
        if (!!time) {
            if (typeof (time) == 'string' || typeof (time) == 'number') {
                return Math.round(new Date(time).getTime() / 1000);
            }
            else {
                return Math.round(time.getTime() / 1000);
            }
        }
        else
            return Math.round(new Date().getTime() / 1000);
    };
    /*获得Unix Timestamp时间戳（毫秒）*/
    ClassBaoJavascript.prototype.UnixTimestampMilliseconds = function (time) {
        if (!!time) {
            if (typeof (time) == 'string' || typeof (time) == 'number') {
                return Math.round(new Date(time).getTime());
            }
            else {
                return Math.round(time.getTime());
            }
        }
        else
            return Math.round(new Date().getTime());
    };

    /*获得时间对象，来自Unix Timestamp时间戳（秒/毫秒都行）*/
    ClassBaoJavascript.prototype.GetDate = function (_UnixTimestamp) {
        if (!!_UnixTimestamp) {
            if (/^[1-9]\d{12,}$/.test(_UnixTimestamp.toString())) return (new Date(parseInt(_UnixTimestamp)));
            else if (/^[1-9]\d{9}$/.test(_UnixTimestamp.toString())) return (new Date(parseInt(_UnixTimestamp) * 1000));
        }
        return null;
    };

    /*获得时间对象，来自Unix Timestamp时间戳（毫秒）*/
    ClassBaoJavascript.prototype.GetDateFromMilliseconds = function (_UnixTimestamp) {
        if (!!_UnixTimestamp) {
            if (/^[1-9]\d{12,}$/.test(_UnixTimestamp.toString())) return (new Date(parseInt(_UnixTimestamp)));
        }
        return null;
    };

    /*获得时间对象，来自json时间"/Date(1507617025040)/"字符串*/
    ClassBaoJavascript.prototype.GetDateByJson = function (datetime) {
        if (!datetime) return null;
        if ("string" == typeof (datetime)) {
            /* "/Date(1507617025040)/" */
            if (datetime.indexOf("/Date(") >= 0) { return new Date(parseInt(datetime.replace("/Date(", '').replace(")/", ''), 10)); }
            else { return new Date(datetime.replace(/T/ig, ' ').replace(/Z/ig, '').replace(/\-/ig, '/')); };
        }
        else { return this.GetDateByJson(datetime.toString()); }
    };

    /*时间格式化扩展*/
    Date.prototype.Format = function (fmt) {
        if (!this || this.getFullYear() <= 1) return '';
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
        const reg_y = /(y+)/;
        if (reg_y.test(fmt)) {
            fmt = fmt.replace(reg_y.exec(fmt)[1], (this.getFullYear() + "").slice(4 - reg_y.exec(fmt)[1].length));
        }
        const reg_E = /(E+)/;
        if (reg_E.test(fmt)) {
            fmt = fmt.replace(reg_E.exec(fmt)[1], ((reg_E.exec(fmt)[1].length > 1) ? (reg_E.exec(fmt)[1].length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            const reg_k = new RegExp("(" + k + ")");
            if (reg_k.test(fmt)) {
                const t = reg_k.exec(fmt)[1];
                fmt = fmt.replace(t, (t.length == 1) ? (o[k]) : (("00" + o[k]).slice(("" + o[k]).length)));
            }
        }
        return fmt;
    };
    /* 任意可以转换为Date对象的参数（时间戳或时间字符串等），转换为目标格式 */
    ClassBaoJavascript.prototype.DateFormat = function (date, format) {
        if (!date) { return ''; }
        if (!format) { format = 'yyyy/MM/dd HH:mm:ss'; }
        if ("number" == typeof (date)) {
            if (1000000000000 > date) {
                return (new Date(date * 1000)).Format(format); // 秒
            }
            else {
                return (new Date(date)).Format(format); // 毫秒
            }
        }
        if ("string" == typeof (date)) {
            if (date.includes("/Date(")) {
                return this.GetDateByJson(date).Format(format);
            }
            else {

            }
        }
        if ("object" == typeof (date)) { return date.Format(format); }
        else { return (new Date(date)).Format(format); }
    };

    /*在原有日期基础上增加Milliseconds毫秒数，默认增加1毫秒*/
    Date.prototype.addMilliseconds = function (milliseconds) {
        if (!milliseconds || milliseconds == '') {
            milliseconds = 1;
        }
        this.setMilliseconds(this.getMilliseconds() + parseFloat(milliseconds));
        return this;
    };
    /*在原有日期基础上增加Seconds秒钟数，默认增加1秒钟*/
    Date.prototype.addSeconds = function (seconds) {
        if (!seconds || seconds == '') {
            seconds = 1;
        }
        this.setSeconds(this.getSeconds() + parseFloat(seconds));
        return this;
    };
    /*在原有日期基础上增加Minutes分钟数，默认增加1分钟*/
    Date.prototype.addMinutes = function (minutes) {
        if (!minutes || minutes == '') {
            minutes = 1;
        }
        this.setMinutes(this.getMinutes() + parseFloat(minutes));
        return this;
    };
    /*在原有日期基础上增加Hours小时数，默认增加1小时*/
    Date.prototype.addHours = function (hours) {
        if (!hours || hours == '') {
            hours = 1;
        }
        this.setHours(this.getHours() + parseFloat(hours));
        return this;
    };
    /*在原有日期基础上增加days天数，默认增加1天*/
    Date.prototype.addDate = function (days) {
        if (!days || days == '') {
            days = 1;
        }
        this.setDate(this.getDate() + parseFloat(days));
        return this;
    };
    /*在原有日期基础上增加months月数，默认增加1月*/
    Date.prototype.addMonth = function (months) {
        if (!months || months == '') {
            months = 1;
        }
        this.setMonth(this.getMonth() + parseFloat(months));
        return this;
    };
    /*在原有日期基础上增加FullYears年数，默认增加1年*/
    Date.prototype.addFullYear = function (FullYears) {
        if (!FullYears || FullYears == '') {
            FullYears = 1;
        }
        this.setFullYear(this.getFullYear() + parseFloat(FullYears));
        return this;
    };

    /*短时间，形如 (13:04:06)*/
    ClassBaoJavascript.prototype.isTime = function (str) {
        var m = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
        if (m == null) { return false }
        if (m[1] > 24 || m[3] > 60 || m[4] > 60) {
            return false;
        }
        return true;
    }
    /*短日期，形如 (2003-12-05)*/
    ClassBaoJavascript.prototype.isDate = function (str) {
        var m = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (m == null) return false;
        var d = new Date(m[1], m[3] - 1, m[4]);
        return (d.getFullYear() == m[1] && (d.getMonth() + 1) == m[3] && d.getDate() == m[4]);
    }
    /*长时间，形如 (2003-12-05 13:04:06)*/
    ClassBaoJavascript.prototype.isDateTime = function (str) {
        var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var m = str.match(reg);
        if (m == null) return false;
        var d = new Date(m[1], m[3] - 1, m[4], m[5], m[6], m[7]);
        return (d.getFullYear() == m[1] && (d.getMonth() + 1) == m[3] && d.getDate() == m[4] && d.getHours() == m[5] && d.getMinutes() == m[6] && d.getSeconds() == m[7]);
    }
    /***** 常用实例方法扩展·日期与时间·结束 *****/


    /***** 常用实例方法扩展·百分数/小数处理·开始 *****/
    /*百分数转化为小数*/
    String.prototype.toPoint = function () {
        var str = this.replace("%", "");
        str = str / 100;
        return str;
    }
    /*小数转化为百分数*/
    Number.prototype.toPercent = function (fractionDigits) {
        fractionDigits = fractionDigits || 1;
        var str = Number(this * 100).toFixed(fractionDigits);
        str += "%";
        return str;
    }

    /*获取小数点后的位数*/
    ClassBaoJavascript.prototype.getDecimalPointLength = function (value) {
        if (!value || value.length < 1)
            return -1;
        var y = String(value).indexOf(".") + 1; //获取小数点的位置
        var count = String(value).length - y; //获取小数点后的个数
        if (y > 0) {
            //alert("这个数字是小数，有" + count + "位小数");
            return count;
        } else {
            //alert("不是小数");
            return -1;
        }
    }
    /*保留N位小数*/
    ClassBaoJavascript.prototype.toFixed = function (value, pointLength) {
        var oldPointLength = this.getDecimalPointLength(value);
        if (oldPointLength < 1 || oldPointLength < pointLength) {
            return value;
        }

        if (typeof (value) === "number") {
            return parseFloat(value.toFixed(pointLength));
        }
        else {
            return parseFloat(parseFloat(value).toFixed(pointLength));
        }

    }
    /***** 常用实例方法扩展·百分数/小数处理·结束 *****/


    /***** 常用实例方法扩展·枚举/对象/下拉框option标签·开始 *****/
    //var VersionNumber = {
    //    Enum: {
    //        V1_2: { value: 1.2, text: "V1.2" },
    //        V1_1: { value: 1.1, text: "V1.1" }
    //    },
    //    getText: function (obj) {
    //        if (!obj) return '';
    //        var _obj = parseFloat(obj);
    //        return CBJS.getEnumTextByValue(this.Enum, _obj);
    //    },
    //    initSelectOption: function () {
    //        return CBJS.getSelectOptionByEnum(this.Enum);
    //    }
    //};
    /*枚举对象根据value获取text*/
    ClassBaoJavascript.prototype.getEnumTextByValue = function (obj, value) {
        if (!obj) return '';
        if (undefined == value || null == value || NaN == value) return '';
        for (var i in obj) {
            if (!!obj[i] && "object" == typeof obj[i] && {} != obj[i] && [] != obj[i]) {
                if (obj[i].hasOwnProperty("value") && obj[i].hasOwnProperty("text")) {
                    if (value == obj[i].value) {
                        return obj[i].text;
                    }
                }
            }
        }
        return '';
    };
    /*枚举对象根据value，text生成option标签*/
    ClassBaoJavascript.prototype.getSelectOptionByEnum = function (obj) {
        if (!obj) return '';
        var option = '';
        for (var i in obj) {
            if (!!obj[i] && "object" == typeof obj[i] && {} != obj[i] && [] != obj[i]) {
                if (obj[i].hasOwnProperty("value") && obj[i].hasOwnProperty("text")) {
                    option += "<option value='" + obj[i].value + "'>" + obj[i].text + "</option>";
                }
            }
        }
        return option;
    };
    /***** 常用实例方法扩展·枚举/对象/下拉框option标签·结束 *****/


    /***** 常用实例方法扩展·DOM常用操作·开始 *****/
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
        var dom = this.getById(id);
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
        var dom = this.getById(id);
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
        var dom = this.getById(id);
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
        var dom = this.getById(id);
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
        for (var i = 0; i < elementsList.length; i++) {
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
                return radioes[i].value.Trim();
            }
        }
        return null;
    }

    /*通过值修改单选按钮(组)的选中状态（name是radio组名称；sRadioValue是选中项的值；结果：设置成功返回true，否则返回false）*/
    ClassBaoJavascript.prototype.SetRadioValue = function (name, sRadioValue) {
        var oRadio = document.getElementsByName(name);
        for (var i = 0; i < oRadio.length; i++) //循环
        {
            if (oRadio[i].value.Trim() == sRadioValue) //比较值
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
    /***** 常用实例方法扩展·DOM常用操作·结束 *****/


    /***** 常用实例方法扩展·界面坐标/定位·开始 *****/
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
        CBJS.FollowCursorHandler(e, CBJS.getById("moveId"));
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
    CBJS.FollowCursor(CBJS.getById("moveId"));
    */
    ClassBaoJavascript.prototype.FollowCursor = function (element) {
        try {
            ClassBaoJavascript.addEventListener(document, "mousemove", function (e) {
                e = e || window.event;
                ClassBaoJavascript.FollowCursorHandler(e, element);
            });
        }
        catch (e) { console.log(e.message); }
    }
    /***** 常用实例方法扩展·界面坐标/定位·结束 *****/


    /*** 自定义弹出框提示·开始 ***/
    ClassBaoJavascript.prototype.popup = {
        init: function () {
            this.box = {
                id: "",
                title: "",
                content: "",
                btn: [
                    {
                        title: "确定",
                        click: function () { },
                        isEnabled: true,
                    },
                    {
                        title: "取消",
                        click: function () { },
                        isEnabled: true,
                    }
                ],
            };
        },
        box: {},
        openBase: function () {
            this.box.id = !!this.box.id || new Date().getTime();
            var mask = document.createElement("div");
            mask.id = "mask" + this.box.id;
            mask.className = "mask";
            //mask.style = "display:none;";

            var window = document.createElement("div");
            window.id = "window" + this.box.id;
            window.className = "window";
            //window.style = "display:none;";

            var htmlWindow = "";
            htmlWindow += "<h2>" + (this.box.title || "提示消息") + "</h2>";
            htmlWindow += "<p class=\"content\">" + (this.box.content || "自定义内容") + "</p>";
            htmlWindow += "<div>";
            if (!!this.box.btn[0].isEnabled) {
                htmlWindow += "<a class=\"btn\" onclick=\"CBJS.popup.box.btn[0].click();CBJS.popup.close();\">" + (this.box.btn[0].title || "确定") + "</a>";
            }
            if (!!this.box.btn[1].isEnabled) {
                htmlWindow += "<a class=\"btn btn_g\" onclick=\"CBJS.popup.box.btn[1].click();CBJS.popup.close();\">" + (this.box.btn[1].title || "取消") + "</a>";
            }
            htmlWindow += "</div>";

            window.innerHTML = htmlWindow;

            document.body.appendChild(mask);
            document.body.appendChild(window);
        },
        open: function (box) {
            this.box = box; this.openBase();
        },
        openAlert: function (msg, btnTitle, callback) {
            this.init();
            this.box.content = msg;
            this.box.btn[0].click = function () { if (!!callback) { callback(); } }
            this.box.btn[0].title = btnTitle;
            this.box.btn[1].isEnabled = false;
            this.openBase();
        },
        openConfirm: function (msg, btnOkTitle, callbackOk, btnCancelTitle, callbackCancel) {
            this.init();
            this.box.content = msg;
            this.box.btn[0].click = function () { if (!!callbackOk) { callbackOk(); } }
            this.box.btn[0].title = btnOkTitle;
            this.box.btn[1].click = function () { if (!!callbackCancel) { callbackCancel(); } }
            this.box.btn[1].title = btnCancelTitle;
            this.openBase();
        },
        close: function () {
            document.body.removeChild(document.getElementById("mask" + this.box.id));
            document.body.removeChild(document.getElementById("window" + this.box.id));
        }
    };
    /**** window CSS 样式 ***/
    // .mask{position:fixed;top:0px;left:0px;z-index:999;display:block;height:100%;width:100%;background-color:#000;background-color:rgba(0,0,0,0.15); filter: alpha(opacity=25);opacity:0.25;-o-opacity:0.25;-ms-opacity:0.25;-moz-opacity:0.25;-webkit-opacity:0.25;-khtml-opacity:0.25;}
    // .window{position:fixed;top:26%; left:5%;z-index:1000; width:90%;text-align:center;padding:10px 0;background-color:#fff;border-radius:5px;-o-border-radius:5px;-ms-border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;-khtml-border-radius:5px;}
    // /* 移动端CSS样式 */
    // @media screen and (max-width: 767px) {.window {left:5%; width:90%;}}
    // /* PC端CSS样式 */
    // @media screen and (min-width: 768px) {.window {left:30%; width:30%;}}
    // .window h2{color:#143157;font-size:18px;margin-top:10px}
    // .window p{color:#5d5d5d;font-size:16px;padding:12px;text-align: center;display: inline-flex}
    // .window .btn,.window .btn_g{display:inline-block;width:150px;text-align:center;font-size:16px;padding:4px 6px;margin:8px 2px;color:#FFF;background-color:#00b7ee;border:2px solid #00b7ee;border-radius:4px;-o-border-radius:4px;-ms-border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;-khtml-border-radius:4px;transition: all 0.2s;-o-transition: all 0.2s;-ms-transition: all 0.2s;-moz-transition: all 0.2s;-webkit-transition: all 0.2s;-khtml-transition: all 0.2s;cursor:pointer;font-family: 'Microsoft YaHei';}
    // .window .btn_g{color:#999999;background-color:#efefef;border-color:#efefef;}
    // .window .btn:hover,.window .btn_g:hover,.window .btn:active, .window .btn:focus,.window .btn_g:active, .window .btn_g:focus {width: 150px;display: inline-block;font-size: 16px;padding: 4px 6px;margin: 8px 2px;border-radius: 4px;-o-border-radius: 4px;-ms-border-radius: 4px;-moz-border-radius: 4px;-webkit-border-radius: 4px;-khtml-border-radius: 4px;text-align: center;cursor: pointer;font-family: 'Microsoft YaHei';color: #FFF;background-color: #00c4ff;border: 2px solid #00c4ff;}
    // .window .btn_g:hover {color: #999999;background-color: #ebebeb;border: 2px solid #ebebeb;}
    // .window .btn_g:active, .window .btn_g:focus {color: #999999;background-color: #ebebeb;border: 2px solid #ebebeb;}
    // .window .btn:active, .window .btn:focus,.window .btn_g:active, .window .btn_g:focus {box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15);-o-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15);-ms-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15);-moz-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15);-webkit-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15);-khtml-box-shadow: 0px 0px 3px 3px rgba(0, 0, 0, 0.15);}
    /*** 自定义弹出框提示·结束 ***/


    /***** 浮层与遮罩 *****/
    /***
    *** window CSS 样式 ***
    第一种：
    .mask{ position:fixed;top:0px; left:0px; z-index:999;height:100%; width:100%; background:rgba(0,0,0,0.15); display:block; background-color:#000; filter: alpha(opacity=25);-moz-opacity:0.25;-khtml-opacity:0.25;opacity:0.25;}
    .window{ position:fixed; z-index:1000;top:26%; left:50%; width:30%; margin-left:-15%; background-color:#fff;-moz-border-radius:5px; -webkit-border-radius:5px; border-radius:5px; text-align:center; padding:10px 0;}
    @media screen and (max-width: 767px) {
        移动端CSS样式 
        .window {left:5%; width:90%;}
    }
    @media screen and (min-width: 768px) {
         PC端CSS样式 
        .window {left:30%; width:30%;}
    }
    .window h2{ color:#143157; font-size:18px; margin-top:10px}
    .window p{ color:#5d5d5d;font-size:16px; padding:12px }
    .window .btn,.window .btn_g{ color:#FFF; background-color:#00b7ee; font-size:16px; text-align:center; padding:4px 6px; margin:8px 2px; border:2px solid #00b7ee; -moz-border-radius:4px; -webkit-border-radius:4px; border-radius:4px; display:inline-block; width:150px; cursor:pointer;font-family: 'Microsoft YaHei';}
    .window .btn_g{ background-color:#efefef; border:2px solid #efefef; color:#999999; padding:4px 0;font-family: 'Microsoft YaHei';}
    <!-- 第一种的HTML示例：-->
        <div id="mask" class="mask" style="display:none;"></div>
        <div id="window" class="window" style="display:none;">
            <h2>提示消息</h2>
            <p class="content">内容啊</p>
            <div>
                <a class="btn">确定</a>
                <a class="btn btn_g">取消</a>
            </div>
        </div>
    
    第二种：
    .mask{ position:absolute;top:0px; left:0px; z-index:100;height:100%; width:100%; background:rgba(0,0,0,0.3); display:block; background-color:#000; filter: alpha(opacity=25);-moz-opacity:0.25;-khtml-opacity:0.25;opacity:0.25;}
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
    <!-- 第二种的HTML示例：-->
    <div id="mask" class="mask"></div>
    <div id="window" class="window">
        <span class="close"><a></a></span>
        <h3>提示消息</h3>
        <p class="content">内容啊</p>
        <p class="tex_c">
            <a class="btn_window2">确定</a>
            <a class="btn_window3">取消</a>
        </p>
    </div>
    
    
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
        var _screen = ClassBaoJavascript.getScreen();
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
        var _screen = ClassBaoJavascript.getScreen();
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

    /*弹出加载中*/
    ClassBaoJavascript.prototype.LoadingLayer = {
        Icon: ["data:image/gif;base64,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",
            "../images/Loading.gif"],
        lastIndex: '',
        Open: function () {
            var index = '0';

            this.lastIndex = index;
            return index;
        },
        Close: function () {
            this.Close(this.lastIndex);
        },
        Close: function (index) {
            alert(index);
        }
    };
    /*** 自定义弹出框提示·结束 ***/

    /*** 正则表达式·开始 ***/
    ClassBaoJavascript.prototype.Regex = {
        /*常用正则表达式，借鉴formvalidatorregex.js源代码*/
        Enum: {
            //整数
            intege: /^-?[1-9]\d*$/,
            //正整数
            intege1: /^[1-9]\d*$/,
            //负整数
            intege2: /^-[1-9]\d*$/,
            //数字
            num: /^([+-]?)\d*\.?\d+$/,
            //正数（正整数 + 0）
            num1: /^[1-9]\d*|0$/,
            //负数（负整数 + 0）
            num2: /^-[1-9]\d*|0$/,
            //浮点数
            decmal: /^([+-]?)\d*\.\d+$/,
            //正浮点数
            decmal1: /^[1-9]\d*.\d*|0.\d*[1-9]\d*$/,
            //负浮点数
            decmal2: /^-([1-9]\d*.\d*|0.\d*[1-9]\d*)$/,
            //浮点数
            decmal3: /^-?([1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0)$/,
            //非负浮点数（正浮点数 + 0）
            decmal4: /^[1-9]\d*.\d*|0.\d*[1-9]\d*|0?.0+|0$/,
            //非正浮点数（负浮点数 + 0）
            decmal5: /^(-([1-9]\d*.\d*|0.\d*[1-9]\d*))|0?.0+|0$/,

            //邮件
            email: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            //颜色（6位十六进制表示法）
            color: /^[a-fA-F0-9]{6}$/,
            //url
            url: /^http[s]?:\/\/([\w-]+\.)+[\w-]+([\w-./?%&=]*)?$/,
            //仅中文
            chinese: /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
            //仅ACSII字符
            ascii: /^[\x00-\xFF]+$/,
            //邮编
            zipcode: /^\d{6}$/,
            //手机
            mobile: /^(13|15|17|18)[0-9]{9}$/,
            //ip(ip4)地址
            ip4: /^(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)$/,
            //非空
            notempty: /^\S+$/,
            //图片
            picture: /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,
            //压缩文件
            rar: /(.*)\.(rar|zip|7zip|tgz)$/,
            //日期
            date: /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/,
            //QQ号码
            qq: /^[1-9]*[1-9][0-9]*$/,
            //电话号码的函数(包括验证国内区号,国际区号,分机号)
            tel: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/,
            //用户名/登录名(字母开头，允许字母数字下划线，长度5-16字节)
            username: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
            //字母
            letter: /^[A-Za-z]+$/,
            //大写字母
            letter_u: /^[A-Z]+$/,
            //小写字母
            letter_l: /^[a-z]+$/,
            //身份证
            idcard: /^[1-9]([0-9]{14}|[0-9]{17})$/,
            //中文、字母、数字 _
            ps_username: /^[\u4E00-\u9FA5\uF900-\uFA2D_\w]+$/
        },
        ExtendEnum: {
            /*匹配空字符串的正则表达式*/
            empty: /^\s*$/,
            /*匹配Email的正则表达式*/
            email: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/i, //或者：/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
            /*匹配座机号码的正则表达式*/
            telephone: /^(([\(（]?\d{3,4}[-#\)）]{1})?\d{7,8}([-#\(（]{1}\d+[\)）]?)?)$/, //010-62515008#8002
            /*匹配移动电话号码的正则表达式*/
            mobilephone: /^(([\+\(（]?\d{2,5}[-#\)）]{1})?1[3|5|7|8|9]\d{9})$/, //+86#15311212118
            /*匹配中国邮政编码*/
            postalcode: /^[1-9]{1}(\d+){5}$/, //465513
            /*匹配中国居民身份证（18位或者15位字符）*/
            IDCard: /^\d{17}(\d|X)|\d{14}(\d|X)$/,
            /*匹配汉字的正则表达式  Special.lastIndex = 0; */
            chinese: /^[\u4E00-\u9FA5]+$/ig,
            /*匹配双字节字符串(汉字)的正则表达式   Special.lastIndex = 0; */
            chinese: /^[^\x00-\xff]+$/ig,

            /*
            * 字符串中包含中文，英文字母，链接符横线，链接符点，以及空格，最少一个字符。（例如：贝拉克·侯赛因·奥巴马，Barack·Hussein·Obama）
            * 主要用于验证真实姓名，公司名等个人信息修改
            */
            Name: /^[·\s\-/#a-zA-Z\u4E00-\u9FA5]+$/i,
            /* 在上面基础上增加了允许数字 */
            Name1: /^[·\s\-/#0-9a-zA-Z\u4E00-\u9FA5]+$/i,
            /*
            * 字符串中包含中文，英文字母，中文括号，英文括号，链接符横线，链接符点，以及空格，最少一个字符。
            * 主要用于验证地址。（例如：北京市/海淀(区)（中关村大街）#44-45号）
            */
            Address: /^[()（）·\s\-~/#0-9a-zA-Z\u4E00-\u9FA5]+$/i,
            /*
            * 验证字符串包含特殊符号（非中文，英文，中文标点符号，英文标点符号，键盘特殊符号）的正则表达式
            * Special.lastIndex = 0;
            */
            Special: /[^\u4E00-\u9FA5\w·~！@#￥%……&*（）——+\-={}【】\|、：；“”‘《，》。？、\./`\!\$\^\(\)\\\[\]\:;"'<,>\?\s\n\r]/gi,

            /*匹配分号间隔字符串的正则表达式  Special.lastIndex = 0; */
            splitSemicolon: /\s*(;|；)\s*/ig,
            /*匹配逗号间隔字符串的正则表达式  Special.lastIndex = 0; */
            splitComma: /\s*(,|，)\s*/ig,
            /*逗号间隔数字格式（例如1,2,3）  Special.lastIndex = 0; */
            Reg_CommasBetweenDigital: /(^\d+$)|(^\d+,\d+$)|(^\d+(,\d+,)+\d+$)/ig,
            /*匹配字符串首尾分号或空格的正则表达式  Special.lastIndex = 0; */
            semicolonByHeadAndTail: /(^((\s*(;|；)+\s*)|(\s+)))|(((\s*(;|；)+\s*)|(\s+))$)/ig,
            /*匹配Guid格式的正则表达式*/
            guid: /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/,

            /*密码格式（由数字字母下划线，英文标点符号组成，6-18位字符）*/
            password: /^[0-9a-zA-Z~`\!@#\$%\^&\*\(\)_\-+={\[}\]\|\:;"'<,>\\\.\?/]{6,18}$/,
            /*强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-20 之间)*/
            strongPwdA: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/,
            /*强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-20之间)*/
            strongPwdB: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,

            /*验证码（由数字字母组成，4-6位字符）*/
            ValidateCode: /^[A-Za-z0-9]{4,6}$/
        },
        /*判断一个字符串是否全是空格*/
        IsEmpty: function (text) { return (!!this.Regex.ExtendEnum.empty.test(text)); },
        /*检查Email的格式是否正确*/
        IsEmail: function (email) { return (!!this.Regex.ExtendEnum.email.test(email)); },
        /*检查固定电话号码的格式是否正确*/
        IsTelePhone: function (telephone) { return (!!this.Regex.ExtendEnum.telephone.test(telephone)); },
        /*检查手机号码的格式是否正确*/
        IsMobilePhone: function (mobilephone) { return (!!this.Regex.ExtendEnum.mobilephone.test(mobilephone)) },
        /*判断是否为汉字字符串*/
        IsChinese: function (text) { return (!!this.Regex.ExtendEnum.chinese.test(text)) },
        /* 判断是否为用户名格式（中文、字母、数字 _）*/
        IsPs_Username: function (text) { return (!!this.Regex.Enum.ps_username.test(text)) },
        /*判断是否为单个汉字*/
        IsChineseByChar: function (_char) { return (_char.charCodeAt(0) <= 255) ? false : true; },

        /*正则表达式分割字符串为数组*/
        Split: function (splitString, regexFormat) {
            if (!!!splitString) return [];
            var stringArray = splitString.toString().split(regexFormat);
            if (!stringArray || stringArray.length < 1) return [];
            var length = stringArray.length;
            var arr = new Array();
            for (var i = 0; i < length; i++) {
                if (!!!stringArray[i] || regexFormat.test(stringArray[i])) continue;
                arr.push(stringArray[i]);
            }
            return arr;
        }
    };
    /*** 正则表达式·结束 ***/



    /*模拟类的实例*/
    var CBJS = new ClassBaoJavascript();
    if (!CBJS || typeof (CBJS) != "object") {
        CBJS = new ClassBaoJavascript();
    };
    window.CBJS = CBJS;
    /***** End *****/

})(window);
/***** 通用 window.CBJS 类库·结束 *****/


/***** String对象常用方法扩展 *****/
/*JS移除字符串首尾空格*/
String.prototype.Trim = function () { return this.replace(/(^\s*)|(\s*$)/g, ""); }
/*JS移除字符串左边空格*/
String.prototype.LTrim = function () { return this.replace(/(^\s*)/g, ""); }
/*JS移除字符串右边空格*/
String.prototype.RTrim = function () { return this.replace(/(\s*$)/g, ""); }
/*JS移除字符串首尾&符号*/
String.prototype.TrimLRbyAnd = function () { return this.replace(/(^&*)|(&*$)/g, ""); }
/*JS移除字符串首尾?问号*/
String.prototype.TrimLRbyQuestion = function () { return this.replace(/(^\?*)|(\?*$)/g, ""); }

/* 关键词高亮显示 */
String.prototype.highlightKeyword = function (keyword, color) { return CBJS.highlightKeyword(this, keyword, color); }
/*换行转义字符转换成HTML换行标签*/
String.prototype.ReplaceNewlineToBr = function () { return this.replace(/(\\n\\r|\\r\\n|\\n|\\f|\\r)/g, "<br />"); }
/*JS移除字符串首尾中文/英文逗号*/
String.prototype.LRTrimComma = function () { return this.replace(/(^(,|，|\s)*)|((,|，|\s)*$)/ig, ""); }
/*JS移除字符串首尾中文/英文分号*/
String.prototype.LRTrimSemicolon = function () { return this.replace(/(^(;|；|\s)*)|((;|；|\s)*$)/ig, ""); }
/*文本搜索。参数：sourceString是源字符串，searchWords是搜索词或空格隔开的词组，HandleFunction自定义对已匹配的单个词组处理方法。*/
String.prototype.TextSearch = function (searchWords, HandleFunction) { return CBJS.TextSearch(this, searchWords, HandleFunction); }

/* JS StringBuilder 用法 */
function StringBuilder() {
    this.buffer = [];
    this.currentChunk = '';
    this.chunkSize = 8192; // 8KB分块
};
StringBuilder.prototype.append = function (str) {
    if (str == null) return this;

    str = String(str);
    this.currentChunk += str;

    if (this.currentChunk.length > this.chunkSize) {
        this.buffer.push(this.currentChunk);
        this.currentChunk = '';
    }
    return this;
};
StringBuilder.prototype.toString = function () {
    if (this.currentChunk) {
        this.buffer.push(this.currentChunk);
        this.currentChunk = '';
    }
    return this.buffer.join('');
};

/***** Object对象常用方法扩展 *****/
// 注意：下面这段与jQuery有冲突！
// Object.prototype.isEmptyArray = function () { return CBJS.isEmptyArray(this); }
// Object.prototype.isEmptyObject = function () { return CBJS.isEmptyObject(this); }
// Object.prototype.isNullOrUndefined = function () { return CBJS.isNullOrUndefined(this); }
// Object.prototype.isString = function () { return CBJS.isString(this); }
// Object.prototype.isNullOrWhiteSpace = function () { return CBJS.isNullOrWhiteSpace(this); }
// Object.prototype.toBoolean = function (defaultValue = false) { return CBJS.toBoolean(this, defaultValue); }
// 注意：扩展原生对象的原型通常不被推荐，因为它可能导致与其他库的冲突或意外的行为。

// 更安全的原型扩展方式
Object.defineProperty(Array.prototype, 'isEmptyArray', {
    value: function () {
        return CBJS.isEmptyArray(this);
    },
    enumerable: false // 使其不可枚举
});
Object.defineProperty(Object.prototype, 'isEmptyObject', {
    value: function () {
        return CBJS.isEmptyObject(this);
    },
    enumerable: false // 使其不可枚举
});
Object.defineProperty(Object.prototype, 'isNullOrUndefined', {
    value: function () {
        return CBJS.isNullOrUndefined(this);
    },
    enumerable: false // 使其不可枚举
});
Object.defineProperty(Object.prototype, 'isString', {
    value: function () {
        return CBJS.isString(this);
    },
    enumerable: false // 使其不可枚举
});
Object.defineProperty(Object.prototype, 'isNullOrWhiteSpace', {
    value: function () {
        return CBJS.isNullOrWhiteSpace(this);
    },
    enumerable: false // 使其不可枚举
});
Object.defineProperty(Object.prototype, 'toBoolean', {
    value: function (defaultValue = false) {
        return CBJS.toBoolean(this, defaultValue);
    },
    enumerable: false // 使其不可枚举
});

/***** Window对象常用方法扩展 *****/
Window.prototype.getDeviceType = function () { return CBJS.getDeviceType(this); }
Window.prototype.Network = CBJS.Network;

/***** Other Start *****/

/*window.requestAnimationFrame 的兼容*/
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return setTimeout(callback, Math.floor(1000 / 60));
        }
    );
};
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        function (id) {
            return clearTimeout(id);
        }
    );
};
///* 调用示例：
// let animationId;
// function animate(time) {
//     console.log('Animating...');
//     // TODO：动画逻辑，更新动画状态 ... 

//     // 判断是否需要停止动画
//     if (/* 需要停止的条件 */) {
//         cancelAnimationFrame(animationId);
//     } else {
//         // 继续循环
//         animationId = requestAnimationFrame(animate);
//     }
// }

// // 开始动画
// animationId = requestAnimationFrame(animate);

// // 停止动画（示例）
// cancelAnimationFrame(animationId);
// */

/***
// 移动端(ios)键盘收起页面空白问题·开始
var oldScrollTop = CBJS.getScrollTop() || 0;
document.body.addEventListener('focusin', () => {  //软键盘弹起事件
    //console.log("键盘弹起");
    //alert("oldScrollTop=" + oldScrollTop);
    //document.title = "键盘弹起" + $(".weui-dialog").css("position") + CBJS.getScrollTop() + $(".weui-dialog").css("top");
});
document.body.addEventListener('focusout', () => { //软键盘关闭事件
    //console.log("键盘收起");
    //alert("oldScrollTop=" + oldScrollTop);
    //document.title = "键盘收起" + $(".weui-dialog").css("position") + CBJS.getScrollTop() + $(".weui-dialog").css("top");
    setFocusOut();
});

//一些特殊的事件延迟到焦点失去之后才触发
function setFocusOut() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0) { //键盘收起页面空白问题
        document.body.scrollTop = oldScrollTop;
        document.documentElement.scrollTop = oldScrollTop;
    }
};

//js动态生成的html设置行级 onfocus=\"javascript:getScrollTop();\"
function getScrollTop() {
    oldScrollTop = CBJS.getScrollTop() || 0;
};
$("input,textarea,select").on('focus', function () {
    getScrollTop();
    //alert("oldScrollTop=" + oldScrollTop);
});
// 移动端(ios)键盘收起页面空白问题·结束

或者，可以通过监听输入框的focus和blur事件来控制滚动行为。例如：
const input = document.getElementsByTagName('input');
let interval;
input.onfocus = () => {
    interval = setInterval(() => {
        input.scrollIntoViewIfNeeded(); // 当软键盘弹起时，可以使用Element.scrollIntoViewIfNeeded()方法将输入框滚动到可视区域。
    }, 400);
};
input.onblur = () => {
    clearInterval(interval);
};

***/

/*
//监听变化事假（兼容append动态添加元素）
$("#parentNode").on("input propertychange","#myNode",function(){
    console.info("原来这样才有用"+ $(this).attr("name"));
});
*/

/* 或者 */
/*
// 为输入框添加propertychange事件监听器
function addPropertyChangeListener(inputElement, handlePropertyChange) {
    inputElement.addEventListener('input', handlePropertyChange);
    // 为了兼容IE8及以下，添加propertychange事件监听
    inputElement.addEventListener('propertychange', handlePropertyChange);
}
 
// 事件处理函数
function handlePropertyChange(event) {
    var target = event.target || event.srcElement; // 兼容不同浏览器
    console.log('值已改变：', target.value);
}
 
// 假设有一个ID为'myInput'的输入框
var inputElement = document.getElementById('myInput');
addPropertyChangeListener(inputElement, handlePropertyChange);
*/
/***** Other End *****/