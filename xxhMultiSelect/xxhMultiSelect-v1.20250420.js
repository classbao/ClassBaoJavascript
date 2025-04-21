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
        options : [
            { id: 1, text: '选项1' },
            { id: 2, text: '选项2' },
            { id: 3, text: '选项3' },
            { id: 4, text: '选项4' },
            { id: 5, text: '选项5' },
            { id: 6, text: '选项6' }
        ],
        xxhMultiSelectID:'',
        AsyncOptionsDataFunction:null,
        bindOptions:function(data){
            this.options=data;
            
        },
        // 暂存选中项
        selectedOptions: [],
        // 获取选中项
        getSelectedOptions: function () {
            return this.selectedOptions;
        },
        initOptions: function (inputWord) {
            if (!!this.AsyncOptionsDataFunction) {
                return this.AsyncOptionsDataFunction(inputWord);
            }
            else {
                return this.options;
            }
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
