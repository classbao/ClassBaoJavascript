/*!
 * xxhModal Library v1.0
 * http://ClassBao.com/
 *
 * Copyright 2024, xiongzaiqiren
 * Date: Thu Jun 1 16:18:21 2024 +0800
 */
; (function (window, undefined) {

	// Use the correct document accordingly with window argument (sandbox)
	var document = window.document,
		navigator = window.navigator,
		location = window.location;

	var xxhModal = {
		box: {},
		init: function () {
			this.box = {
				id: new Date().getTime(),
				className: "",
				head: {
					isEnabled: true,
					title: "提示信息",
					btnClose: true, // 是否显示关闭按钮
				},
				content: "",
				foot: {
					isEnabled: true,
					// 按钮项，顺序是从左到右
					btn: [
						{
							icon: "",
							title: "确定",
							click: function () { },
						},
						{
							icon: "",
							title: "取消",
							click: function () { },
						}
					]
				},
				maskIsEnabled: true
			};
		},
		buildMask: function () {
			if (!this.box.maskIsEnabled) {
				return "";
			}

			var mask = document.createElement("div");
			mask.id = "xxhMask" + this.box.id;
			mask.className = "xxhMask";
			mask.setAttribute('data-id', this.box.id);
			//mask.style = "display:none;";
			return mask;
		},
		buildHead: function () {
			if (!this.box.head.isEnabled) {
				return "";
			}

			// <div class="head"><span class="l title">系统信息</span><span class="r icon close">&times;</span></div>
			var html_head = "<div class=\"head\"><span class=\"l title\">" + (this.box.head.title || "提示消息") + "</span>" + (this.box.head.btnClose ? "<span class=\"r icon close\" onclick=\"CBJS.xxhModal.remove('" + this.box.id + "');\">&times;</span>" : "") + "</div>";
			return html_head;
		},
		buildFoot: function () {
			if (!this.box.foot.isEnabled || !!!this.box.foot.btn) {
				return "";
			}

			var html_foot = "";
			html_foot += "<div class=\"foot\">";
			if (!!this.box.foot.btn && 1 == this.box.foot.btn.length) {
				// 单个按钮
				// <div class="foot"><div class="l btn btnSingle Ok"><span class="icon" style="color: #02cf02;">&radic;</span>单个按钮</div></div>
				html_foot += "<div class=\"l btn btnSingle Ok\" onclick=\"CBJS.xxhModal.box.foot.btn[0].click();CBJS.xxhModal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[0].icon ? ("<span class=\"icon\" style=\"color: #02cf02;\">" + this.box.foot.btn[0].icon + "</span>") : "") + (this.box.foot.btn[0].title || "确定") + "</div>";
			}
			else {
				// 多个按钮
				for (let i = 0; i < this.box.foot.btn.length; i++) {
					if (0 == i) {
						// 第一个（最左边的）
						// <div class="l btn btnL Ok"><span class="icon" style="color: #02cf02;">&radic;</span>确定</div>
						html_foot += "<div class=\"l btn btnL Ok\" onclick=\"CBJS.xxhModal.box.foot.btn[" + i + "].click();CBJS.xxhModal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[i].icon ? ("<span class=\"icon\" style=\"color: #02cf02;\">" + this.box.foot.btn[i].icon + "</span>") : "") + (this.box.foot.btn[i].title || "确定") + "</div>";
					}
					else if (0 < i && i == this.box.foot.btn.length - 1) {
						// 最后一个（最右边的）
						// <div class="r btn btnR No"><span class="icon" style="color: orangered;">&#10005;</span>取消</div>
						html_foot += "<div class=\"r btn btnR No\" onclick=\"CBJS.xxhModal.box.foot.btn[" + i + "].click();CBJS.xxhModal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[i].icon ? ("<span class=\"icon\" style=\"color: orangered;\">" + this.box.foot.btn[i].icon + "</span>") : "") + (this.box.foot.btn[i].title || "取消") + "</div>";
					}
					else {
						// 中间的
						// <div class="l btn btnMiddle Ok"><span class="icon" style="color: #565656;">&radic;</span>中间</div>
						html_foot += "<div class=\"l btn btnMiddle Ok\" onclick=\"CBJS.xxhModal.box.foot.btn[" + i + "].click();CBJS.xxhModal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[i].icon ? ("<span class=\"icon\" style=\"color: #565656;\">" + this.box.foot.btn[i].icon + "</span>") : "") + (this.box.foot.btn[i].title || "知道了") + "</div>";
					}
				}
			}

			html_foot += "</div>";

			return html_foot;
		},
		openBase: function () {
			this.box.id = this.box.id || new Date().getTime();

			var _modal = document.createElement("div");
			_modal.id = "xxhModal" + this.box.id;
			_modal.setAttribute('data-id', this.box.id);
			_modal.className = "xxhModal " + (this.box.className || "default");
			//_modal.style = "display:none;";

			var html_modal = "";
			html_modal += this.buildHead();
			html_modal += "<div class=\"content\">" + (this.box.content || "自定义内容") + "</div>";
			html_modal += this.buildFoot();

			_modal.innerHTML = html_modal;

			if (!!this.box.maskIsEnabled) {
				document.body.appendChild(this.buildMask(this.box.id));
			}
			document.body.appendChild(_modal);
			console.log('EventListener Triggered > CBJS.xxhModal.openBase(); box.id=' + this.box.id);
		},
		Open: function (box) {
			this.box = box; // 允许按照init() 自定义 box
			this.openBase();
			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}
			console.log('EventListener Triggered > CBJS.xxhModal.Open(); box.id=' + this.box.id);
		},
		CustomOpen: function (domId) {

			console.log('EventListener Triggered > CBJS.xxhModal.CustomOpen(); box.id=' + this.box.id);
		},
		Alert: function (msg, btnTitle, callback) {
			this.init();
			this.box.head.isEnabled = false;
			this.box.content = "<br> " + msg + " <br><br>";
			this.box.foot.btn[0].icon = "";
			this.box.foot.btn[0].click = function () { if (!!callback) { callback(); } }
			this.box.foot.btn[0].title = btnTitle;
			this.box.foot.btn.splice(1, this.box.foot.btn.length - 1); // 从索引1开始（第2个元素）移除多余按钮
			this.openBase();
			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}

			console.log('EventListener Triggered > CBJS.xxhModal.Alert(); box.id=' + this.box.id);
		},
		Confirm: function (msg, btnOkTitle, callbackOk, btnCancelTitle, callbackCancel) {
			this.init();
			this.box.head.isEnabled = false;
			this.box.content = "<br> " + msg + " <br><br>";
			this.box.foot.btn[0].icon = "&radic;";
			this.box.foot.btn[0].click = function () { if (!!callbackOk) { callbackOk(); } }
			this.box.foot.btn[0].title = btnOkTitle;
			this.box.foot.btn[1].icon = "&#10005;";
			this.box.foot.btn[1].click = function () { if (!!callbackCancel) { callbackCancel(); } }
			this.box.foot.btn[1].title = btnCancelTitle;
			this.box.foot.btn.splice(2, this.box.foot.btn.length - 1); // 从索引2开始（第3个元素）移除多余按钮
			this.openBase();
			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}

			console.log('EventListener Triggered > CBJS.xxhModal.Confirm(); box.id=' + this.box.id);
		},
		Popup: function (msg, className) {
			this.init();
			this.box.className = className ? ("popup_" + className) : "";
			this.box.maskIsEnabled = false;
			this.box.head.isEnabled = false;

			this.box.content = "<br> " + msg + " <br><br>";
			this.box.content += "<!-- 动画结束后移除元素 -->";
			this.box.content += "<script>document.querySelector('#xxhModal" + this.box.id + ".xxhModal').addEventListener('animationend', function() {CBJS.xxhModal.remove('" + this.box.id + "');});</script>";

			this.box.foot.isEnabled = false;
			this.box.foot.btn = []; // 清空全部按钮
			this.openBase();
			// CSS动画：滑入停留再滑出消失
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in-out');
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').addEventListener('animationend', function () {
				var _modal = document.getElementsByClassName("SlideUp-in-out");
				document.body.removeChild(_modal[_modal.length - 1]);
			}
			);

			console.log('EventListener Triggered > CBJS.xxhModal.Popup(); box.id=' + this.box.id);
		},
		close: function (id) {
			console.log('EventListener Triggered > CBJS.xxhModal.close(); box.id=' + id);
			var _modal = document.querySelector('#xxhModal' + id + '.xxhModal');
			var _mask = document.querySelector('#xxhMask' + id + '.xxhMask');
			if (!!_modal && typeof (_modal) == "object") {
				_modal.classList.remove('SlideUp-in');
			}
			if (!!_mask && typeof (_mask) == "object") {
				_mask.style.display = 'none';
			}

			console.log('EventListener Triggered > CBJS.xxhModal.close(); box.id=' + id);
		},
		remove: function (id) {
			console.log('EventListener Triggered > CBJS.xxhModal.remove(); box.id=' + id);
			var _modal = document.querySelector('#xxhModal' + id + '.xxhModal');
			var _mask = document.querySelector('#xxhMask' + id + '.xxhMask');

			if (!!_modal && typeof (_modal) == "object") {
				_modal.classList.remove('SlideUp-in');
			}
			if (!!_mask && typeof (_mask) == "object") {
				_mask.style.display = 'none';
			}

			if (!!_modal && typeof (_modal) == "object") {
				document.body.removeChild(_modal);
			}
			if (!!_mask && typeof (_mask) == "object") {
				document.body.removeChild(_mask);
			}

			console.log('EventListener Triggered > CBJS.xxhModal.remove(); box.id=' + id);
		}

	}



	// Expose xxhModal to the global object
	if (!!CBJS && !!CBJS.prototype) {
		CBJS.prototype = xxhModal;
	}
	else {
		window.CBJS.xxhModal = window.xxhModal || xxhModal;
	}

})(window);
