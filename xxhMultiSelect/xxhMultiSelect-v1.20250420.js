/*!
 * xxhMultiSelect Library v1.0
 * http://ClassBao.com/
 *
 * Copyright 2025, xiongzaiqiren
 * Date: Mon Jan 13 2025 11:27:27 GMT+0800 (中国标准时间)
 */
; (function () {
    var xxhMultiSelect = {
        // 示例数据 - 可以替换为实际数据
        options: [
            // { id: 1, text: '选项1' },
            // { id: 2, text: '选项2' },
            // { id: 3, text: '选项3' },
            // { id: 4, text: '选项4' },
            // { id: 5, text: '选项5' },
            // { id: 6, text: '选项6' }
        ],
        /* 关键词高亮显示，多个关键词请用空格分隔 */
        highlightKeyword: function (text, keyword, color) {
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
        },
        xxhMultiSelectID: '',
        AsyncOptionsDataFunction: null,
        // 初始化下拉选项
        buildDropdown: function (domID, data, keyword) {
            domID = domID || this.xxhMultiSelectID;
            if (!!data && Array.isArray(data)) {
                this.options = data;
            }

            const dropdown_options = document.querySelector(domID + '.xxh-multi-select-container .dropdown-options');
            dropdown_options.innerHTML = '';
            this.getSelectedOptions(domID);

            this.options.forEach(option => {
                const optionElement = document.createElement('div');
                optionElement.className = 'option-item';
                // optionElement.textContent = option.text; // 搜索词不高亮显示
                optionElement.innerHTML = !!keyword ? this.highlightKeyword(option.text, keyword) : option.text; // 匹配搜索词高亮显示
                optionElement.dataset.id = option.id;

                // 检查是否已选中
                if (this.selectedOptions.some(item => item.id == option.id)) {
                    optionElement.classList.add('selected');
                }

                optionElement.addEventListener('click', function () {
                    CBJS.xxhMultiSelect.toggleOption(option);
                });

                dropdown_options.appendChild(optionElement);
            });
        },
        initSearchInput: function () {
            const searchInput = document.querySelector(this.xxhMultiSelectID + '.xxh-multi-select-container .search-input');
            searchInput.addEventListener('input', function (e) {
                const searchWord = this.value;
                // 根据搜索框输入值变化自动处理选择项
                // // const dropdown_options = document.querySelector(this.xxhMultiSelectID + '.xxh-multi-select-container .dropdown-options');
                // const dropdown_options = this.parentNode.nextElementSibling;
                // const optionItems = dropdown_options.querySelectorAll('.option-item');
                // optionItems.forEach(item => {
                //     const text = item.textContent.toLowerCase();
                //     item.style.display = text.includes(searchWord) ? 'block' : 'none';
                // });
                CBJS.xxhMultiSelect.AsyncOptionsDataFunction(searchWord);
            });
        },
        // 切换选项选中状态
        toggleOption: function (option) {
            const index = this.selectedOptions.findIndex(item => item.id == option.id);
            if (-1 === index) {
                // 未选中，添加到选中列表
                this.selectedOptions.push(option);
            } else {
                // 已选中，从列表中移除
                this.selectedOptions.splice(index, 1);
            }
            // 更新输入框显示
            this.updateInputDisplay();
            // 重新渲染下拉选项以更新选中状态
            this.buildDropdown();
        },
        // 更新输入框显示
        updateInputDisplay: function () {
            const selectInput = document.querySelector(this.xxhMultiSelectID + '.xxh-multi-select-container .multiSelectInput');
            if (0 === this.selectedOptions.length) {
                selectInput.innerHTML = '请选择...';
            } else {
                selectInput.innerHTML = '';
                this.selectedOptions.forEach(item => {
                    const optionElement = document.createElement('label');
                    optionElement.className = '';
                    optionElement.textContent = item.text;
                    optionElement.dataset.id = item.id;
                    selectInput.append(optionElement);
                    optionElement.addEventListener('click', function (e) {
                        e.stopPropagation();
                        const id = this.dataset.id;
                        this.xxhMultiSelectID = '#' + this.closest('.xxh-multi-select-container').id;

                        // const _selectInput = this.closest('.multiSelectInput');
                        const _selectedOptions = CBJS.xxhMultiSelect.getSelectedOptions(this.xxhMultiSelectID); // _selectInput
                        const index = _selectedOptions.findIndex(item => item.id == id);
                        _selectedOptions.splice(index, 1); // 移除选中项
                        this.remove();

                        const dropdown = document.querySelector(this.xxhMultiSelectID + '.xxh-multi-select-container .dropdown-options');
                        const optionItems = dropdown.querySelectorAll('.option-item');
                        optionItems.forEach(optionItem => {
                            if (optionItem.dataset.id == id) {
                                optionItem.classList.remove('selected');
                            }
                        });

                    });
                });
            }
        },
        buildUi: function (domID, data) {
            const inputWrapper = document.querySelector(this.xxhMultiSelectID + '.xxh-multi-select-container .input-wrapper');
            const dropdown = document.querySelector(this.xxhMultiSelectID + '.xxh-multi-select-container .dropdown-wrapper');
            // 点击输入框显示/隐藏下拉菜单
            inputWrapper.addEventListener('click', function (e) {
                e.stopPropagation();
                //可以Ajax异步加载默认的下拉选项
                dropdown.classList.toggle('show');
            });

            // 点击页面其他位置关闭下拉菜单
            document.addEventListener('click', function () {
                dropdown.classList.remove('show');
            });

            // 阻止下拉菜单内部的点击事件冒泡
            dropdown.addEventListener('click', function (e) {
                e.stopPropagation();
            });

            this.buildDropdown(domID, data);
        },
        // 暂存选中项
        selectedOptions: [],
        // 收集选中项
        getSelectedOptions: function (domID) {
            let selectInput = null;
            if (!!domID && 'string' == typeof (domID)) {
                selectInput = document.querySelector(domID + '.xxh-multi-select-container .multiSelectInput');
            }
            else if (!!domID && 'object' == typeof (domID)) {
                selectInput = domID;
            }

            this.selectedOptions = [];
            selectInput.querySelectorAll('label').forEach(item => {
                const option = { id: item.dataset.id, text: item.textContent };
                const index = this.selectedOptions.findIndex(x => x.id == option.id);
                if (-1 === index) {
                    // 未选中，添加到选中列表
                    this.selectedOptions.push(option);
                } else {
                    // 已选中，不重复添加
                }
            });
            return this.selectedOptions;
        },

        initOptions: function (domID, inputWord, callback) {
            if (!!this.AsyncOptionsDataFunction) {
                return this.AsyncOptionsDataFunction(inputWord);
            }
            else {
                return this.options;
            }
        },
        init: function (domID, inputWord, callback) {
            this.xxhMultiSelectID = domID;
            this.AsyncOptionsDataFunction = callback;
            this.initOptions(inputWord);
            this.buildUi(domID, this.options);
            this.initSearchInput();
        }

    };

    // window.xxhMultiSelect = xxhMultiSelect;//该函数唯一暴露的对象
    // Expose xxhMultiSelect to the global object
    if (!!CBJS && !!CBJS.prototype) {
        CBJS.prototype.xxhMultiSelect = xxhMultiSelect;
    }
    else {
        window.CBJS.xxhMultiSelect = window.xxhMultiSelect || xxhMultiSelect;
    }

})();
