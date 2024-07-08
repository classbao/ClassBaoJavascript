/***
* explain: Common JavaScript extension library,Completely free of charge.Development and maintenance by ClassBao team.
* version: V1.0.0
* Copyright: classbao.com
* Author: xiongzaiqiren
* Blog: http://xiongzaiqiren.blog.163.com/
* E-mail: xiongzaiqiren@163.com
* Last modified: xiongzaiqiren
* Last modified time: 2018-11-28 15:54
* Version source: https://github.com/classbao/ClassBaoJavascript
***/

/***** 通用ClassBaoAnimation模拟类库·开始 *****/
var ClassBaoAnimation = {
    GlobalConfig: {
        width: 0,
        height: 0,
        usedtime: 0, //用时
        isRuning: false, //正在运行
        interval: null, //计时器
        referee: 0, //裁判结果0输；1赢
        /*面板初始化*/
        Init: function (myCanvasId) {
            this.width = document.getElementById(myCanvasId).getAttribute("width");
            this.height = document.getElementById(myCanvasId).getAttribute("height");
            this.usedtime = 0;
            ClassBaoAnimation.canvas.getContext(myCanvasId);
        },
        /*启动引擎*/
        StartEngine: function (callback) {
            if (!!this.interval) { return false; }
            if (this.isRuning) { return false; }

            console.log('StartEngine ^_^');
            this.isRuning = true;
            this.interval = requestAnimationFrame(function fn() {
                if (!!ClassBaoAnimation.GlobalConfig.isRuning) {
                    requestAnimationFrame(fn);
                }
                else {
                    cancelAnimationFrame(ClassBaoAnimation.GlobalConfig.interval);
                    console.log('Turn off the engine: ClassBaoAnimation.GlobalConfig.interval=' + ClassBaoAnimation.GlobalConfig.interval);
                }

                /* 回调自定义的动画逻辑/帧 */
                callback();
            });
        }
    },

    /* HTML5的canvas相关插件 */
    canvas: {
        setCanvas: function (myCanvasId, width, height) {
            document.getElementById(myCanvasId).setAttribute("width", width);
            document.getElementById(myCanvasId).setAttribute("height", height);
        }
        , context: null
        /* CanvasRenderingContext2D */
        , getContext: function (myCanvasId) {
            if (!!this.context && "CanvasRenderingContext2D" === this.context.constructor.name) {
                return this.context;
            }

            var c = document.getElementById(myCanvasId || "myCanvas");
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
    },


    /* 调用示例：
        document.onkeydown = function (e) {
            if (ClassBaoAnimation.GetKeyCode(e) == 13) { ClassBaoAnimation.LabelAlert(null, '您按下了回车键'); return true; }
        }
    */
    /*获取键盘按键代码（event是按键事件）兼容IE，FireFox，Chrome，Opera等*/
    GetKeyCode: function (event) {
        return this.EventUtil.getKeyCode(event);
    },
    /*可跨浏览器的事件处理程序，构造EventUtil对象，为其添加可兼容各浏览器的事件处理方法*/
    EventUtil: {
        /*添加事件处理程序*/
        /*示例：ClassBaoAnimation.EventUtil.addHandler(document, "keydown", function (e) { if (ClassBaoAnimation.GetKeyCode(e) == 13) { ClassBaoAnimation.LabelAlert(null, '您按下了回车键'); return true; } } );*/
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                attachEvent("on" + type, handler);
            } else {
                element["on" + type] = handler;
            }
        },
        /*移除事件处理程序*/
        removeHandler: function (element, type, handler) {
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
        /*获取键盘按键代码（event是按键事件）兼容IE，FireFox，Chrome，Opera等*/
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
    },
    /* */
    OnTouch: {
        /* 【Touch事件说明】pc上的web页面鼠 标会产生onmousedown、onmouseup、onmouseout、onmouseover、onmousemove的事件，但是在移动终端如 iphone、ipod  Touch、ipad上的web页面触屏时会产生ontouchstart、ontouchmove、ontouchend、ontouchcancel 事件，分别对应了触屏开始、拖拽及完成触屏事件和取消。*/
        /* 当按下手指时，触发ontouchstart；
        当移动手指时，触发ontouchmove；
        当移走手指时，触发ontouchend。
        当一些更高级别的事件发生的时候（如电话接入或者弹出信息）会取消当前的touch操作，即触发ontouchcancel。一般会在ontouchcancel时暂停游戏、存档等操作。
        */

        /* 【Touch事件与Mouse事件的触发关系】：在触屏操作后，手指提起的一刹那（即发生ontouchend后），系统会判断接收到事件的element的内容是否被改变，如果内容被改变，接下来的事件都不会触发；如果没有改变，会按照mousedown，mouseup，click的顺序触发事件。特别需要提到的是，只有再触发一个触屏事件时，才会触发上一个事件的mouseout事件。 */
        // http://www.noobyard.com/article/p-kwcgxtdj-bx.html
        // https://www.cnblogs.com/zourong/p/3913446.html

        /* 目前移动端浏览器均支持这4个触摸事件，包括IE。由于触屏也支持MouseEvent，因此他们的顺序是需要注意的：touchstart → mouseover → mousemove → mousedown → mouseup → click */
        // https://blog.51cto.com/u_14405/6598014
        // http://www.manongjc.com/detail/64-uoexwxoofmekkbi.html

        /* 每个触摸事件被触发后，会生成一个event对象，event对象里额外包括以下三个触摸列表
 
 touches:     //当前屏幕上所有手指的列表
 
 targetTouches:      //当前dom元素上手指的列表，尽量使用这个代替touches
 
 changedTouches:     //涉及当前事件的手指的列表，尽量使用这个代替touches
 
 这些列表里的每次触摸由touch对象组成，touch对象里包含着触摸信息，主要属性如下：
 
 clientX / clientY:      //触摸点相对浏览器窗口的位置
 
 pageX / pageY:       //触摸点相对于页面的位置
 
 screenX  /  screenY:    //触摸点相对于屏幕的位置
 
 identifier:        //touch对象的ID
 
 target:       //当前的DOM元素 */

        /* 注意：
        
        手指在滑动整个屏幕时，会影响浏览器的行为，比如滚动和缩放。所以在调用touch事件时，要注意禁止缩放和滚动。
        
        1.禁止缩放
        
        通过meta元标签来设置。
        
        <meta name="viewport" content="target-densitydpi=320,width=640,user-scalable=no">
        
        2.禁止滚动
        
        preventDefault是阻止默认行为，touch事件的默认行为就是滚动。
        
        event.preventDefault(); */

        /*
        event.screenX
        event.screenY
        event.clientX
        event.clientY
        event.offsetX
        event.offsetY
        event.movementX
        event.movementY
        event.x
        event.y
        event.currentTarget.type
        event.timeStamp
        event.pointerType
     */

        /*判断设备是否支持touch事件*/
        SupportTouch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
        /* 手指放到屏幕上时触发手指放到屏幕上时触发 */
        touchStart: function (element, handler) {
            if (!!element && !!ClassBaoAnimation.OnTouch.SupportTouch) { ClassBaoAnimation.EventUtil.addHandler(element, 'touchstart', handler); }
        },
        /* 手指在屏幕上滑动式触发 */
        touchMove: function (element, handler) {
            if (!!element && !!ClassBaoAnimation.OnTouch.SupportTouch) { ClassBaoAnimation.EventUtil.addHandler(element, 'touchmove', handler); }
        },
        /* 手指离开屏幕时触发 */
        touchEnd: function (element, handler) {
            if (!!element && !!ClassBaoAnimation.OnTouch.SupportTouch) { ClassBaoAnimation.EventUtil.addHandler(element, 'touchend', handler); }
        },
        /* 系统取消touch事件的时候触发，这个好像比较少用 */
        touchCancel: function (element, handler) {
            if (!!element && !!ClassBaoAnimation.OnTouch.SupportTouch) { ClassBaoAnimation.EventUtil.addHandler(element, 'touchcancel', handler); }
        }

    },

    /*获得元素的绝对坐标（element是HTML元素；结果：{x:0,y:0}）*/
    PositionByAbsolute: function (element) {
        var result = { x: element.offsetLeft, y: element.offsetTop };
        element = element.offsetParent;
        while (element) {
            result.x += element.offsetLeft;
            result.y += element.offsetTop;
            element = element.offsetParent;
        }
        return result;
    },

    /*控件跟随鼠标移动（element是HTML元素；结果：{x:0,y:0}）
    //调用示例：
    document.onmousemove = function (e) {
        ClassBaoAnimation.FollowCursorHandler(e, ClassBaoAnimation.getById("moveId"));
    }
    */
    FollowCursorHandler: function (e, element) {
        if (!e || !element) return;
        try {
            with (element.style) {
                position = "absolute";
                left = ((document.layers) ? e.pageX : document.body.scrollLeft + event.clientX) + "px";
                top = ((document.layers) ? e.pageY : document.body.scrollTop + event.clientY) + "px";
            }
        }
        catch (e) { console.log(e.message); }
    },
    /*控件跟随光标移动
    //调用示例：
    ClassBaoAnimation.FollowCursor(ClassBaoAnimation.getById("moveId"));
    */
    FollowCursor: function (element) {
        try {
            ClassBaoAnimation.AddEventHandler(document, "mousemove", function (e) {
                e = e || window.event;
                ClassBaoAnimation.FollowCursorHandler(e, element);
            });
        }
        catch (e) { console.log(e.message); }
    }



};


/***** Other Start *****/

/*
【使用】
使用
requestAnimationFrame 的用法与 settimeout 很相似，只是不需要设置时间间隔而已。requestAnimationFrame 使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。它返回一个整数，表示定时器的编号，这个值可以传递给 cancelAnimationFrame 用于取消这个函数的执行。
示例：
requestID = requestAnimationFrame(callback); //控制台输出1和0 
var timer = requestAnimationFrame(function(){    console.log(0);}); console.log(timer);//1

cancelAnimationFrame 方法用于取消定时器：
//控制台什么都不输出 var timer = requestAnimationFrame(function(){    console.log(0);}); cancelAnimationFrame(timer);

也可以直接使用返回值进行取消：
var timer = requestAnimationFrame(function(){    console.log(0);}); cancelAnimationFrame(1);
*/
/* requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
在隐藏或不可见的元素中，requestAnimationFrame 将不会进行重绘或回流，这当然就意味着更少的 CPU、GPU 和内存使用量
requestAnimationFrame 是由浏览器专门为动画提供的 API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了 CPU 开销。 */
/*window.requestAnimationFrame 的兼容*/
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRquestAniamtionFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            /* 大多数电脑显示器的刷新频率是 60Hz，大概相当于每秒钟重绘 60 次。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此最平滑动画的最佳循环间隔是1000ms/60，约等于 16.6ms */
            return setTimeout(callback, Math.floor(1000 / 60));
        }
    );
};
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (
        window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
        window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
        window.msCancelAniamtionFrame || window.msCancelRequestAniamtionFrame ||
        window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame ||
        function (id) {
            clearTimeout(id);
        }
    );
};
