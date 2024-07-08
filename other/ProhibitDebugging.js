// ;(function myDebugger(){
//     debugger;
//     myDebugger();
// })();


/* 如果将 setInterval 中的代码写在一行，就能禁止用户断点，即使添加 logpoint 为 false 也无用，当然即使有些人想到用左下角的格式化代码，将其变成多行也是没用的。 */
// (() => {
// 	function ban() {
// 	  setInterval(() => { debugger; }, 50);
// 	}
// 	try {
// 	  ban();
// 	} catch (err) { }
//   })();


/* 禁止开发者工具：这里有2种实现思路：开发者工具打开后改变页面dom及url、无限debugger */
let userAgent = navigator.userAgent;
if (userAgent.indexOf("Firefox") > -1) {
    // Firefox浏览器特定操作
    let checkStatus;
    let devtools = /./;
    devtools.toString = function() {
        checkStatus = "on";
    };
    setInterval(function() {
        checkStatus = "off";
        console.log(devtools);
        console.log(checkStatus);
        console.clear();
        if (checkStatus === "on") {
            try {
                window.open("about:blank", "_self");
            } catch (err) {
                let a = document.createElement("button");
                a.onclick = function() {
                    window.open("about:blank", "_self");
                };
                a.click();
            }
        }
    }, 200);
} else {
    // 非Firefox浏览器特定操作
    let ConsoleManager = {
        onOpen: function() {
            alert("Console is opened");
        },
        onClose: function() {
            alert("Console is closed");
        },
        init: function() {
            let self = this;
            let x = document.createElement("div");
            let isOpening = false,
                isOpened = false;
            Object.defineProperty(x, "id", {
                get: function() {
                    if (!isOpening) {
                        self.onOpen();
                        isOpening = true;
                    }
                    isOpened = true;
                    return true;
                }
            });
            setInterval(function() {
                isOpened = false;
                console.info(x);
                console.clear();
                if (!isOpened && isOpening) {
                    self.onClose();
                    isOpening = false;
                }
            }, 200);
        }
    };
    ConsoleManager.onOpen = function() {
        // 打开控制台，跳转
        try {
            window.open("about:blank", "_self");
        } catch (err) {
            let a = document.createElement("button");
            a.onclick = function() {
                window.open("about:blank", "_self");
            };
            a.click();
        }
    };
    ConsoleManager.onClose = function() {
        alert("Console is closed!");
    };
    ConsoleManager.init();
}


/* 终极增强防调试代码 */
(() => {
	function block() {
	  if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
		document.body.innerHTML = "检测到非法调试,请关闭后刷新重试!";
	  }
	  setInterval(() => {
		(function () {
		  return false;
		}
		['constructor']('debugger')
		['call']());
	  }, 50);
	}
	try {
	  block();
	} catch (err) { }
  })();