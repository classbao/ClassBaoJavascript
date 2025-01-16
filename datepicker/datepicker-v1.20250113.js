/*!
 * datepicker Library v1.0
 * http://ClassBao.com/
 *
 * Copyright 2025, xiongzaiqiren
 * Date: Mon Jan 13 2025 11:27:27 GMT+0800 (中国标准时间)
 */
; (function () {
    var datepicker = {
        paramsDate: function (inputElement, targetFormat) {
            this.inputElement = inputElement; // 当前输入框
            this.targetFormat = targetFormat || 'yyyy/MM/dd HH:mm:ss'; // 目标日期时间格式
            this.monthData = {}; // 绘制日历组件的数据源
            this.sureTime = { year: 0, month: 0, date: 0, hour: -1, minute: -1, second: -1 }; // 确定的选中的日期时间，或者初始化到某个时刻，或者是初始化到当前时刻。这里时分秒必需初始化小于0,后米面才好判断是否要构建时分秒控件
        },
        getMonthDate: function (year, month) {
            var ret = [];
            if (!year || !month) {
                var today = new Date();
                year = today.getFullYear();
                month = today.getMonth() + 1;
            }
            var firstDay = new Date(year, month - 1, 1);//获取当月第一天
            var firstDayWeekDay = firstDay.getDay();//获取星期几，才好判断排在第几列
            if (0 === firstDayWeekDay) {//周日
                firstDayWeekDay = 7;
            }

            year = firstDay.getFullYear();
            month = firstDay.getMonth() + 1;

            var lastDayOfLastMonth = new Date(year, month - 1, 0);//获取最后一天
            var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

            var preMonthDayCount = firstDayWeekDay - 1;
            var lastDay = new Date(year, month, 0);
            var lastDate = lastDay.getDate();

            for (var i = 0; i < 7 * 6; i++) {
                var date = i + 1 - preMonthDayCount;
                var showDate = date;
                var thisMonth = month;
                //上一月
                if (0 >= date) {
                    thisMonth = month - 1;
                    showDate = lastDateOfLastMonth + date;
                } else if (date > lastDate) {
                    //下一月
                    thisMonth = month + 1;
                    showDate = showDate - lastDate;
                }
                if (0 === thisMonth) {
                    thisMonth = 12;
                }
                if (13 === thisMonth) {
                    thisMonth = 1;
                }
                ret.push({
                    month: thisMonth,
                    date: date,
                    showDate: showDate
                })

            }
            return {
                year: year,
                month: month,
                days: ret
            };
        }
    };


    // window.datepicker = datepicker;//该函数唯一暴露的对象
    // Expose datepicker to the global object
    if (!!CBJS && !!CBJS.prototype) {
        CBJS.prototype.datepicker = datepicker;
    }
    else {
        window.CBJS.datepicker = window.datepicker || datepicker;
    }

})();

/***** main.js *****/
(function () {
    // var datepicker = window.datepicker;
    var datepicker = CBJS.datepicker || window.datepicker;

    var $datepicker_wrapper;
    //渲染函数，由于没有使用第三方插件或库，所以使用的是模板拼接的方法
    datepicker.buildUi = function (monthData, sureTime) {
        // monthData = datepicker.getMonthDate(year, month); // year, month, monthData 是面板需要绘画的日期时间集合
        var html = '<div class="ui-datepicker-header">' +
            '<a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-prevYear-btn">&#8810;</a>' +
            '<a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-nextYear-btn">&#8811;</a>' +
            '<a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +
            '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>\u4e00</th>' +
            '<th>\u4e8c</th>' +
            '<th>\u4e09</th>' +
            '<th>\u56db</th>' +
            '<th>\u4e94</th>' +
            '<th>\u516d</th>' +
            '<th>\u65e5</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        function coreMonth(coreMonth, month) {
            return coreMonth == month;
        }
        function isToday(year, month, date) {
            const _today = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate();
            return (year + '/' + month + '/' + date) == _today;
        }
        function sureTimeIsToday(year, month, date, sureTime) {
            return (!!sureTime && (sureTime.year === year && sureTime.month === month && sureTime.date === date));
        }


        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];
            if (i % 7 === 0) {
                html += '<tr>';
            }

            html += '<td class="' +
                ((i % 7 === 5 || i % 7 === 6) ? 'weekend' : '') +
                (coreMonth(monthData.month, date.month) ? '' : ' notmonth') +
                (isToday(monthData.year, date.month, date.showDate) ? ' today' : '') +
                (sureTimeIsToday(monthData.year, date.month, date.showDate, sureTime) ? ' active' : '') +

                '" data-date="' + date.date + '">' + date.showDate + '</td>';
            if (i % 7 === 6) {
                html += '</tr>';
            }
        }

        html += '</tbody>' +
            '</table>' +
            '</div>';

        function buildTimeOptions(max) {
            let _s = '';
            for (i = 0; i <= max; i++) {
                let _n = i < 10 ? ('0' + i) : i;
                _s += '<option value="' + _n + '">' + _n + '</option>';
            }
            return _s;
        }

        html += '<div class="ui-datepicker-footer">' +
            '<a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-today-btn">\u4eca\u5929</a>';
        if (!!sureTime && (0 <= sureTime.hour && 0 <= sureTime.minute && 0 <= sureTime.second)) {
            html += '<select class="hour">' + buildTimeOptions(23) + '</select>' +
                '<select class="minute">' + buildTimeOptions(59) + '</select>' +
                '<select class="second">' + buildTimeOptions(59) + '</select>';
        }
        html += '<a href="javascript:void(0);" class="ui-datepicker-btn ui-datepicker-ok-btn">\u786e\u5b9a</a>' +
            '</div>';
        return html;
    };
    //日历渲染函数
    datepicker.render = function (paramsDate, direction) {
        var year, month;
        if (!!paramsDate.monthData && 0 < paramsDate.monthData.year) {
            year = paramsDate.monthData.year;
            month = paramsDate.monthData.month;
        }
        else if (!!paramsDate.sureTime && (0 < paramsDate.sureTime.year && 0 < paramsDate.sureTime.month)) {
            // 根据输入框的值初始化确定日期
            year = paramsDate.sureTime.year;
            month = paramsDate.sureTime.month;
        }

        if ('prev' === direction) {
            month--;
            if (month < 1) {
                year--;
                month = 12;
            }
        }
        else if ('next' === direction) {
            month++;
        }
        else if ('prevYear' === direction) {
            year--;
        }
        else if ('nextYear' === direction) {
            year++;
        }
        else if ('today' === direction) {
            let t = new Date();
            year = t.getFullYear();
            month = t.getMonth() + 1;

            paramsDate.sureTime.year = year;
            paramsDate.sureTime.month = month;
            paramsDate.sureTime.date = t.getDate();
            if (0 <= paramsDate.sureTime.hour && 0 <= paramsDate.sureTime.minute && 0 <= paramsDate.sureTime.second) {
                paramsDate.sureTime.hour = t.getHours();
                paramsDate.sureTime.minute = t.getMinutes();
                paramsDate.sureTime.second = t.getSeconds();
            }
        }

        paramsDate.monthData = datepicker.getMonthDate(year, month); // year, month, monthData 是面板需要绘画的日期时间集合
        var html = datepicker.buildUi(paramsDate.monthData, paramsDate.sureTime);

        $datepicker_wrapper = document.querySelector('.ui-datepicker-wrapper');

        if (!$datepicker_wrapper) {
            $datepicker_wrapper = document.createElement('div');
            $datepicker_wrapper.className = 'ui-datepicker-wrapper';
        }

        $datepicker_wrapper.innerHTML = html;

        document.body.appendChild($datepicker_wrapper);
        // 绘画完了，初始化选中时间
        if (!!paramsDate.sureTime && (0 <= paramsDate.sureTime.hour && 0 <= paramsDate.sureTime.minute && 0 <= paramsDate.sureTime.second)) {
            setSelectedByValue('.ui-datepicker-wrapper select.hour', paramsDate.sureTime.hour);
            setSelectedByValue('.ui-datepicker-wrapper select.minute', paramsDate.sureTime.minute);
            setSelectedByValue('.ui-datepicker-wrapper select.second', paramsDate.sureTime.second);
        }

    };
    //初始换函数
    datepicker.main = function (paramsDate) {
        var $targetFormat = paramsDate.targetFormat;
        var $input = paramsDate.inputElement;
        // 根据输入框的值初始化控件的值
        let initInputdate = new Date($input.value);
        if (!!initInputdate && initInputdate.getFullYear() > 0) {
            paramsDate.sureTime.year = initInputdate.getFullYear();
            paramsDate.sureTime.month = initInputdate.getMonth() + 1;
            paramsDate.sureTime.date = initInputdate.getDate();
            if (/([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])/gi.test($input.value)) {
                // 校验时分秒：格式：HH:mm:ss
                paramsDate.sureTime.hour = initInputdate.getHours();
                paramsDate.sureTime.minute = initInputdate.getMinutes();
                paramsDate.sureTime.second = initInputdate.getSeconds();
            }
        }

        if (0 > paramsDate.sureTime.hour || 0 > paramsDate.sureTime.minute || 0 > paramsDate.sureTime.second) {
            if (!!$targetFormat && ($targetFormat.toLocaleLowerCase().includes('hh:mm:ss'))) {
                // 将展示时分秒控件
                paramsDate.sureTime.hour = 0;
                paramsDate.sureTime.minute = 0;
                paramsDate.sureTime.second = 0;
            }
            else {
                // 不展示时分秒控件
                paramsDate.sureTime.hour = -1;
                paramsDate.sureTime.minute = -1;
                paramsDate.sureTime.second = -1;
            }
        }

        // 在初始化控件之前，清理掉以前的日期时间控件
        const divsToRemove = document.querySelectorAll('.ui-datepicker-wrapper');
        divsToRemove.forEach(div => div.remove());

        datepicker.render(paramsDate);

        var isOpen = false;
        if (isOpen) {
            $datepicker_wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;
        } else {
            $datepicker_wrapper.classList.add('ui-datepicker-wrapper-show');

            var left = $input.offsetLeft;
            var top = $input.offsetTop;
            var height = $input.offsetHeight;

            $datepicker_wrapper.style.top = top + height + 2 + 'px';
            $datepicker_wrapper.style.left = left + 'px';

            isOpen = true;
        }


        //给按钮添加点击事件
        datepicker.addEventListener($datepicker_wrapper, 'click', function (e) {
            var $target = e.target;
            //上一月,下一月
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render(paramsDate, 'prev');
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render(paramsDate, 'next');
            }
            //上一年,下一年
            else if ($target.classList.contains('ui-datepicker-prevYear-btn')) {
                datepicker.render(paramsDate, 'prevYear');
            } else if ($target.classList.contains('ui-datepicker-nextYear-btn')) {
                datepicker.render(paramsDate, 'nextYear');
            }
            //今天
            else if ($target.classList.contains('ui-datepicker-today-btn')) {
                datepicker.render(paramsDate, 'today');
            }

            if ($target.tagName.toLocaleLowerCase() === 'td') {
                // 移除其他日期选中状态
                document.querySelectorAll('.ui-datepicker-wrapper td').forEach(function (td) {
                    if (td.classList.contains('active')) {
                        td.classList.remove('active');
                    }
                });

                // 通过classname 设置选中日期
                $target.classList.add('active');
            }

            if (!$target.classList.contains('ui-datepicker-ok-btn')) {
                return true;
            }
            // 以下是点击“确定”之后的代码 
            var selected_date;
            var selectedTd = document.querySelector('.ui-datepicker-wrapper td.active');
            if (!!selectedTd) {
                selected_date = selectedTd.dataset.date || 0;
            }

            if (3 === document.querySelectorAll('.ui-datepicker-wrapper select').length) {
                var selectElementHour = document.querySelector('.ui-datepicker-wrapper select.hour');
                paramsDate.sureTime.hour = selectElementHour.options[selectElementHour.selectedIndex].value || 0;

                var selectElementMinute = document.querySelector('.ui-datepicker-wrapper select.minute');
                paramsDate.sureTime.minute = selectElementMinute.options[selectElementMinute.selectedIndex].value || 0;

                var selectElementSecond = document.querySelector('.ui-datepicker-wrapper select.second');
                paramsDate.sureTime.second = selectElementSecond.options[selectElementSecond.selectedIndex].value || 0;
            }

            if (1 <= selected_date && selected_date <= 31) {
                // 至少选中到天
                let date;
                if (0 <= paramsDate.sureTime.hour) {
                    date = new Date(paramsDate.monthData.year, paramsDate.monthData.month - 1, selected_date, paramsDate.sureTime.hour, paramsDate.sureTime.minute, paramsDate.sureTime.second);
                }
                else {
                    date = new Date(paramsDate.monthData.year, paramsDate.monthData.month - 1, selected_date);
                }

                $input.value = dateFormat(date, $targetFormat);
            }

            $datepicker_wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;

        }, false);

    };



    /* 定义一个函数，用于添加事件监听器，现代浏览器还是旧版IE浏览器。 */
    datepicker.addEventListener = function (el, eventName, callback, useCapture) {
        if (el.addEventListener) {
            el.addEventListener(eventName, callback, useCapture);
        } else if (el.attachEvent) {
            el.attachEvent('on' + eventName, callback);
        }
    };
    // 给输入框绑定点击事件
    datepicker.init = function (input, targetFormat) {
        this.addEventListener(document.querySelector(input), 'click', function (e) {
            let $paramsDate = new datepicker.paramsDate(e.target, targetFormat);
            datepicker.main($paramsDate);
        });
    };

    // 通过value设置选中项
    function setSelectedByValue(selectors, value) {
        var select = document.querySelector(selectors);
        if (!!!select || !!!select.options) {
            return false;
        }
        for (var i = 0; i < select.options.length; i++) {
            if (parseInt(select.options[i].value) == value) {
                select.options[i].selected = true;
                break;
            }
        }
    };
    /* 日期时间格式化·开始 */
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
    function dateFormat(date, format) {
        if (!date) return '';
        if (!format) format = 'yyyy/MM/dd HH:mm:ss';
        if ("object" == typeof (date)) return date.Format(format);
        else { return (new Date(date)).Format(format); }
    };
    /* 日期时间格式化·结束 */

})();
