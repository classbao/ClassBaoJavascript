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
		// 调试模式在控制台输出日志
		DebugMode: false,
		buildID: function (id) {
			function getTruncRandom(min, max) {
				return Math.trunc(Math.random() * (max - min + 1)) + min;
			}
			var n = new Date().getTime() + '_' + getTruncRandom(10, 10000);
			return !!id ? (id + '_' + n) : n;
		},
		box: {},
		init: function () {
			this.box = {
				id: this.buildID(),
				className: '',
				head: {
					isEnabled: true,
					title: '提示信息',
					btnClose: true // 是否显示关闭按钮
				},
				leftIcon: {
					isEnabled: false,
					icon: 'i'
				},
				content: '',
				foot: {
					isEnabled: true,
					// 按钮项，顺序是从左到右
					btn: [
						{
							icon: '',
							title: '确定',
							click: function (event) { }
						},
						{
							icon: '',
							title: '取消',
							click: function (event) { }
						}
					]
				},
				maskIsEnabled: true
			};
		},
		buildMask: function (id) {
			if (!this.box.maskIsEnabled) {
				return '';
			}

			var mask = document.createElement('div');
			mask.id = !!id ? id : ('xxhMask' + this.box.id);
			mask.className = 'xxhMask';
			mask.setAttribute('data-id', mask.id);
			//mask.style = 'display:none;';
			return mask;
		},
		buildHead: function () {
			if (!!!this.box.head || !this.box.head.isEnabled) {
				return '';
			}

			// <div class="head"><span class="l title">系统信息</span><span class="r icon close">&times;</span></div>
			var html_head = '<div class="head"><span class="l title">' + (this.box.head.title || '提示消息') + '</span>' + (this.box.head.btnClose ? "<span class=\"r icon close\" onclick=\"CBJS.modal.remove('" + this.box.id + "');\">&times;</span>" : '') + '</div>';
			return html_head;
		},
		buildLeftIcon: function () {
			if (!!!this.box.leftIcon || !this.box.leftIcon.isEnabled) {
				return '';
			}

			var html_leftside = '<div class="leftside"><div class="leftside-icon">' + this.box.leftIcon.icon + '</div></div>';
			return html_leftside;
		},
		buildFoot: function () {
			if (!!!this.box.foot || !this.box.foot.isEnabled || !!!this.box.foot.btn) {
				return '';
			}

			var html_foot = '';
			html_foot += '<div class="foot">';
			if (!!this.box.foot.btn && 1 == this.box.foot.btn.length) {
				// 单个按钮
				// <div class="foot"><div class="l btn btnSingle Ok"><span class="icon" style="color: #02cf02;">&radic;</span>单个按钮</div></div>
				html_foot += "<div class=\"l btn btnSingle Ok\" onclick=\"CBJS.modal.box.foot.btn[0].click(event);CBJS.modal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[0].icon ? ('<span class="icon" style="color: #02cf02;">' + this.box.foot.btn[0].icon + '</span>') : '') + (this.box.foot.btn[0].title || '确定') + '</div>';
			}
			else {
				// 多个按钮
				for (let i = 0; i < this.box.foot.btn.length; i++) {
					if (0 == i) {
						// 第一个（最左边的）
						// <div class="l btn btnL Ok"><span class="icon" style="color: #02cf02;">&radic;</span>确定</div>
						html_foot += "<div class=\"l btn btnL Ok\" onclick=\"CBJS.modal.box.foot.btn[" + i + "].click(event);CBJS.modal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[i].icon ? ('<span class="icon" style="color: #02cf02;">' + this.box.foot.btn[i].icon + '</span>') : '') + (this.box.foot.btn[i].title || '确定') + '</div>';
					}
					else if (0 < i && i == this.box.foot.btn.length - 1) {
						// 最后一个（最右边的）
						// <div class="r btn btnR No"><span class="icon" style="color: orangered;">&#10005;</span>取消</div>
						html_foot += "<div class=\"r btn btnR No\" onclick=\"CBJS.modal.box.foot.btn[" + i + "].click(event);CBJS.modal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[i].icon ? ('<span class="icon" style="color: orangered;">' + this.box.foot.btn[i].icon + '</span>') : '') + (this.box.foot.btn[i].title || '取消') + '</div>';
					}
					else {
						// 中间的
						// <div class="l btn btnMiddle Ok"><span class="icon" style="color: #565656;">&radic;</span>中间</div>
						html_foot += "<div class=\"l btn btnMiddle Ok\" onclick=\"CBJS.modal.box.foot.btn[" + i + "].click(event);CBJS.modal.remove('" + this.box.id + "');\">" + (this.box.foot.btn[i].icon ? ('<span class="icon" style="color: #565656;">' + this.box.foot.btn[i].icon + '</span>') : '') + (this.box.foot.btn[i].title || '知道了') + '</div>';
					}
				}
			}

			html_foot += '</div>';

			return html_foot;
		},
		openBase: function () {
			this.box.id = this.box.id || this.buildID();

			var _modal = document.createElement('div');
			_modal.id = 'xxhModal' + this.box.id;
			_modal.setAttribute('data-id', _modal.id);
			_modal.className = 'xxhModal ' + (this.box.className || 'default');
			//_modal.style = 'display:none;';

			var html_modal = '';
			html_modal += this.buildHead();
			html_modal += this.buildLeftIcon();
			html_modal += '<div class="content">' + (this.box.content || '自定义内容') + '</div>';
			html_modal += this.buildFoot();

			_modal.innerHTML = html_modal;

			if (!!this.box.maskIsEnabled) {
				document.body.appendChild(this.buildMask('xxhMask' + this.box.id));
			}
			document.body.appendChild(_modal);

			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.openBase(); box.id=' + this.box.id);
			}
		},
		Loading: function () {
			this.init();
			this.box.className = '';
			this.box.maskIsEnabled = true;
			this.box.head.isEnabled = false;
			this.box.leftIcon.isEnabled = false;

			let img = '<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPgogIDxjaXJjbGUgY3g9IjE2IiBjeT0iNTAiIHI9IjEwIiBmaWxsPSIjMDAwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjIiIGR1cj0iMXMiIGJlZ2luPSIwIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogIDwvY2lyY2xlPgogIDxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjEwIiBmaWxsPSIjMDAwIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwLjIiIGR1cj0iMXMiIGJlZ2luPSIwLjIiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgPC9jaXJjbGU+CiAgPGNpcmNsZSBjeD0iODQiIGN5PSI1MCIgcj0iMTAiIGZpbGw9IiMwMDAiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgZnJvbT0iMSIgdG89IjAuMiIgZHVyPSIxcyIgYmVnaW49IjAuNCIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICA8L2NpcmNsZT4KPC9zdmc+" title="Loading..." alt="Loading...">';
			this.box.content = ' ' + img + ' ';

			this.box.foot.isEnabled = false;
			this.box.foot.btn = []; // 清空全部按钮
			this.openBase();

			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}

			if (!!this.DebugMode) {
				console.log('CBJS.modal.Loading(); box.id=' + this.box.id);
			}
			return this.box.id;
		},
		Open: function (box, callback) {
			this.box = box; // 允许按照init() 自定义 box
			this.openBase();

			// 避免内容太高太宽超出屏幕
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal .content').style.maxHeight = (Math.min(window.innerHeight, document.documentElement.clientHeight) * 0.8) + "px";
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal .content').style.maxWidth = (Math.min(window.innerWidth, document.documentElement.clientWidth) * 0.8) + "px";

			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}

			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.Open(); box.id=' + this.box.id);
			}

			if (!!callback) { callback(); }
		},
		CustomOpen: function (ModalId, MaskId, callback) {
			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.CustomOpen(); ModalId=' + ModalId + '，MaskId=' + MaskId);
			}

			// 避免内容太高太宽超出屏幕
			document.querySelector(ModalId + ' .content').style.maxHeight = (Math.min(window.innerHeight, document.documentElement.clientHeight) * 0.8) + "px";
			document.querySelector(ModalId + ' .content').style.maxWidth = (Math.min(window.innerWidth, document.documentElement.clientWidth) * 0.8) + "px";

			// 显示出来
			document.querySelector(MaskId).style.display = 'block';
			document.querySelector(ModalId).style.display = '';
			document.querySelector(ModalId).classList.add('SlideUp-in');

			if (!!callback) { callback(); }
		},
		CustomClose: function (ModalId, MaskId, callback) {
			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.CustomClose(); ModalId=' + ModalId + '，MaskId=' + MaskId);
			}

			document.querySelector(ModalId).style.display = 'none';
			document.querySelector(ModalId).classList.remove('SlideUp-in');
			document.querySelector(MaskId).style.display = 'none';

			if (!!callback) { callback(); }
		},
		Alert: function (msg, btnTitle, callback) {
			this.init();
			this.box.head.isEnabled = false;
			this.box.content = '<br> ' + msg + ' <br><br>';
			this.box.foot.btn[0].icon = '';
			this.box.foot.btn[0].click = function (event) { if (!!callback) { callback(event); } }
			this.box.foot.btn[0].title = btnTitle;
			this.box.foot.btn.splice(1, this.box.foot.btn.length - 1); // 从索引1开始（第2个元素）移除多余按钮
			this.openBase();
			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}

			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.Alert(); box.id=' + this.box.id);
			}
		},
		Confirm: function (msg, btnOkTitle, callbackOk, btnCancelTitle, callbackCancel) {
			this.init();
			this.box.head.isEnabled = false;
			this.box.content = '<br> ' + msg + ' <br><br>';
			this.box.foot.btn[0].icon = '&#10003;';
			this.box.foot.btn[0].click = function (event) { if (!!callbackOk) { callbackOk(event); } }
			this.box.foot.btn[0].title = btnOkTitle;
			this.box.foot.btn[1].icon = '&#10007;';
			this.box.foot.btn[1].click = function (event) { if (!!callbackCancel) { callbackCancel(event); } }
			this.box.foot.btn[1].title = btnCancelTitle;
			this.box.foot.btn.splice(2, this.box.foot.btn.length - 1); // 从索引2开始（第3个元素）移除多余按钮
			this.openBase();
			// CSS动画：滑入
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			if (!!this.box.maskIsEnabled) {
				document.querySelector('#xxhMask' + this.box.id + '.xxhMask').style.display = 'block';
			}

			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.Confirm(); box.id=' + this.box.id);
			}
		},
		Popup: function (msg, className, icon) {
			this.init();
			this.box.className = !!className ? ('popup_' + className) : '';
			this.box.maskIsEnabled = false;
			this.box.head.isEnabled = false;
			if (!!icon) {
				this.box.leftIcon.icon = icon;
				this.box.leftIcon.isEnabled = 1;
			}

			this.box.content = ' ' + msg + ' ';
			this.box.content += '<!-- 动画结束后移除元素 -->';
			this.box.content += "<script>CBJS.modal.addEventListener(document.querySelector('#xxhModal" + this.box.id + ".xxhModal'),'animationend', function(event) {CBJS.modal.remove('" + this.box.id + "');},false);</script>";

			this.box.foot.isEnabled = false;
			this.box.foot.btn = []; // 清空全部按钮
			this.openBase();
			// CSS动画：滑入停留再滑出消失
			//document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in');
			document.querySelector('#xxhModal' + this.box.id + '.xxhModal').classList.add('SlideUp-in-out');
			this.addEventListener(document.querySelector('#xxhModal' + this.box.id + '.xxhModal'), 'animationend', function (event) {
				if (!!this.DebugMode) {
					console.log(event.target.closest('.xxhModal').id + ' animationend EventListener Triggered > ' + event.target.innerText);
				}

				var _modal = document.getElementsByClassName('SlideUp-in-out');
				document.body.removeChild(_modal[_modal.length - 1]);
			}, false);

			if (!!this.DebugMode) {
				console.log('CBJS.modal.Popup(); box.id=' + this.box.id);
			}
		},
		PopupDefault: function (msg) {
			// this.Popup(msg, 'default', 'i');
			this.Popup(msg, 'default', '&#128172;');
		},
		PopupPrimary: function (msg) {
			// this.Popup(msg, 'primary', 'i');
			this.Popup(msg, 'primary', '&#128276;');
		},
		PopupInfo: function (msg) {
			// this.Popup(msg, 'info', '&#128226;');
			this.Popup(msg, 'info', '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" stroke-width="1"/><path d="M13 18V13M13 9H13.01" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>');
		},
		PopupNotice: function (msg) {
			this.Popup(msg, 'default', '&#128161;');
		},
		PopupSuccess: function (msg) {
			// this.Popup('<span class="icon" style="vertical-align:sub; color: #fff;">&#10003;</span> ' + msg, 'success');
			this.Popup(msg, 'success', '&#10004;');
			// this.Popup(msg, 'success', '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 14L11 17L18 10" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
		},
		PopupDanger: function (msg) {
			// this.Popup('<span class="icon" style="vertical-align:sub; color: #f0f0f0;">&#9938;</span> ' + msg, 'danger');
			this.Popup(msg, 'danger', '&#10008;');
			// this.Popup(msg, 'danger', '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 8L18 18M8 18L18 8" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>');
		},
		PopupWarning: function (msg) {
			// this.Popup('<span class="icon" style="vertical-align:sub; color: #565656;">&#9888;</span> ' + msg, 'warning');
			// this.Popup(msg, 'warning', '&#9888;');
			this.Popup(msg, 'warning', '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg"><!-- 三角形边框 (使用polygon) --><polygon points="13,5 21,21 5,21" stroke="#FAAD14" stroke-width="1.5" stroke-linejoin="round" fill="none" stroke="currentColor"/><!-- 感叹号 (使用path) --><path d="M13 10V14M13 17H13.01" stroke="#FAAD14" stroke-width="2" stroke-linecap="round" fill="currentColor" stroke="currentColor"/></svg>');
		},
		PopupGold: function (msg) {
			this.Popup(msg, 'gold', '&#9882;');
		},
		PopupCostly: function (msg) {
			this.Popup(msg, 'costly', '&#9882;');
		},
		PopupGray: function (msg) {
			this.Popup(msg, 'gray', '&#9872;');
		},
		PopupBlack: function (msg) {
			this.Popup(msg, 'black', '&#127987;');
		},
		PopupV: function (msg) {
			this.Popup(msg, 'costly', 'V');
		},
		PopupVIP: function (msg) {
			this.Popup(msg, 'costly', 'VIP');
		},
		PopupOther: function (msg) {
			// this.Popup(msg, 'other', '&#128161;');
			this.Popup(msg, 'other', '<svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="none" xmlns="http://www.w3.org/2000/svg"><circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="13" cy="13" r="8" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="13" cy="13" r="4" fill="none" stroke="currentColor" stroke-width="1"/><path d="M8 13H18M13 8V18" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>');
		},
		close: function (id) {
			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.close("' + id + '");');
			}

			var _modal = document.querySelector('#xxhModal' + id + '.xxhModal');
			var _mask = document.querySelector('#xxhMask' + id + '.xxhMask');
			if (!!_modal && typeof (_modal) == 'object') {
				_modal.classList.remove('SlideUp-in');
			}
			if (!!_mask && typeof (_mask) == 'object') {
				_mask.style.display = 'none';
			}

			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.close("' + id + '");');
			}
		},
		remove: function (id) {
			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.remove("' + id + '");');
			}
			var _modal = document.querySelector('#xxhModal' + id + '.xxhModal');
			var _mask = document.querySelector('#xxhMask' + id + '.xxhMask');

			if (!!_modal && typeof (_modal) == 'object') {
				_modal.classList.remove('SlideUp-in');
			}
			if (!!_mask && typeof (_mask) == 'object') {
				_mask.style.display = 'none';
			}

			if (!!_modal && typeof (_modal) == 'object') {
				document.body.removeChild(_modal);
			}
			if (!!_mask && typeof (_mask) == 'object') {
				document.body.removeChild(_mask);
			}

			if (!!this.DebugMode) {
				console.log('EventListener Triggered > CBJS.modal.remove("' + id + '");');
			}
		},
		/* 定义一个函数，用于添加事件监听器，现代浏览器还是旧版IE浏览器。 */
		addEventListener: function (el, eventName, callback, useCapture) {
			if (el.addEventListener) {
				el.addEventListener(eventName, callback, useCapture);
			} else if (el.attachEvent) {
				el.attachEvent('on' + eventName, callback);
			}
		}
		/*
		 // 使用定义的函数来添加animationend事件的监听器，确保兼容不同浏览器
		addEventListener(document.getElementById('myElement'), 'animationend', function(event) {
		  console.log('动画结束', event);
		}, false);
		 */
	};


	// Expose xxhModal to the global object
	if (!!CBJS && !!CBJS.prototype) {
		CBJS.prototype.modal = xxhModal;
	}
	else {
		window.CBJS.modal = window.xxhModal || xxhModal;
	}

	if (!!CBJS) {
		CBJS.Loading = function () { return xxhModal.Loading(); }
		CBJS.Open = function (box) { xxhModal.Open(box); }
		CBJS.CustomOpen = function (ModalId, MaskId) { xxhModal.CustomOpen(ModalId, MaskId); }
		CBJS.CustomClose = function (ModalId, MaskId) { xxhModal.CustomClose(ModalId, MaskId); }
		CBJS.Alert = function (msg, btnTitle, callback) { xxhModal.Alert(msg, btnTitle, callback); }
		CBJS.Confirm = function (msg, btnOkTitle, callbackOk, btnCancelTitle, callbackCancel) { xxhModal.Confirm(msg, btnOkTitle, callbackOk, btnCancelTitle, callbackCancel); }
		CBJS.Popup = function (msg, className, icon) { xxhModal.Popup(msg, className, icon); }
		CBJS.PopupDefault = function (msg) { xxhModal.PopupDefault(msg); }
		CBJS.PopupPrimary = function (msg) { xxhModal.PopupPrimary(msg); }
		CBJS.PopupInfo = function (msg) { xxhModal.PopupInfo(msg); }
		CBJS.PopupNotice = function (msg) { xxhModal.PopupNotice(msg); }
		CBJS.PopupSuccess = function (msg) { xxhModal.PopupSuccess(msg); }
		CBJS.PopupDanger = function (msg) { xxhModal.PopupDanger(msg); }
		CBJS.PopupWarning = function (msg) { xxhModal.PopupWarning(msg); }
		CBJS.PopupGold = function (msg) { xxhModal.PopupGold(msg); }
		CBJS.PopupCostly = function (msg) { xxhModal.PopupCostly(msg); }
		CBJS.PopupGray = function (msg) { xxhModal.PopupGray(msg); }
		CBJS.PopupBlack = function (msg) { xxhModal.PopupBlack(msg); }
		CBJS.PopupV = function (msg) { xxhModal.PopupV(msg); }
		CBJS.PopupVIP = function (msg) { xxhModal.PopupVIP(msg); }
		CBJS.PopupOther = function (msg) { xxhModal.PopupOther(msg); }
	}

})(window);
