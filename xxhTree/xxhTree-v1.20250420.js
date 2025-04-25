/*!
 * xxhTree Library v1.0
 * http://ClassBao.com/
 *
 * Copyright 2025, xiongzaiqiren
 * Date: Mon Jan 13 2025 11:27:27 GMT+0800 (中国标准时间)
 */
; (function () {
    var xxhTree = {
        // 渲染树
        renderTree: function (data, parentElement) {
            data.forEach(item => {
                const nodeElement = this.createTreeNode(item);
                parentElement.appendChild(nodeElement);

                if (item.children && item.children.length > 0) {
                    const childrenContainer = document.createElement('div');
                    childrenContainer.className = 'tree-node-children';
                    nodeElement.appendChild(childrenContainer);
                    this.renderTree(item.children, childrenContainer);

                    // 如果有子节点，添加展开/折叠功能
                    const toggle = nodeElement.querySelector('.tree-node-toggle');
                    toggle.style.visibility = 'visible';
                }
            });
        },

        // 创建树节点
        createTreeNode: function (item) {
            const nodeElement = document.createElement('div');
            nodeElement.className = 'tree-node';
            nodeElement.dataset.id = item.id;

            const nodeContent = document.createElement('div');
            nodeContent.className = 'tree-node-content';

            // 展开/折叠按钮
            const toggle = document.createElement('span');
            toggle.className = 'tree-node-toggle';
            toggle.style.visibility = item.children && item.children.length > 0 ? 'visible' : 'hidden';
            toggle.addEventListener('click', CBJS.xxhTree.toggleExpand);

            // 复选框
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'tree-node-checkbox';
            checkbox.checked = item.checked;
            checkbox.addEventListener('change', function () {
                item.checked = this.checked;
                CBJS.xxhTree.updateChildrenCheckbox(nodeElement, this.checked);
                CBJS.xxhTree.updateParentCheckbox(nodeElement);
            });

            // 标签
            const label = document.createElement('span');
            label.className = 'tree-node-label';
            label.textContent = item.label;
            label.addEventListener('click', function () {
                checkbox.checked = !checkbox.checked;
                item.checked = checkbox.checked;
                CBJS.xxhTree.updateChildrenCheckbox(nodeElement, checkbox.checked);
                CBJS.xxhTree.updateParentCheckbox(nodeElement);
            });

            // 输入框 (编辑时显示)
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'tree-node-input';
            input.value = item.label;

            // 操作按钮
            const actions = document.createElement('div');
            actions.className = 'tree-node-actions';

            // 编辑按钮
            const editBtn = document.createElement('button');
            editBtn.textContent = '编辑';
            editBtn.addEventListener('click', function () {
                nodeElement.classList.add('editing');
                input.focus();
            });

            // 删除按钮
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '删除';
            deleteBtn.addEventListener('click', function () {
                if (confirm('确定要删除这个菜单吗？')) {
                    const parent = nodeElement.parentNode;
                    parent.removeChild(nodeElement);

                    // 从数据中删除
                    const parentData = CBJS.xxhTree.findParentData(treeData, item.id);
                    if (parentData) {
                        const index = parentData.children.findIndex(child => child.id === item.id);
                        if (index !== -1) {
                            parentData.children.splice(index, 1);
                        }
                    } else {
                        // 如果是顶级节点
                        const index = treeData.findIndex(node => node.id === item.id);
                        if (index !== -1) {
                            treeData.splice(index, 1);
                        }
                    }
                }
            });

            // 添加子菜单按钮
            const addChildBtn = document.createElement('button');
            addChildBtn.textContent = '添加子项';
            addChildBtn.addEventListener('click', function () {
                const newId = CBJS.xxhTree.generateId();
                const newItem = {
                    id: newId,
                    label: '新菜单',
                    checked: false,
                    children: []
                };

                if (!item.children) {
                    item.children = [];
                }

                item.children.push(newItem);

                let childrenContainer = nodeElement.querySelector('.tree-node-children');
                if (!childrenContainer) {
                    childrenContainer = document.createElement('div');
                    childrenContainer.className = 'tree-node-children';
                    nodeElement.appendChild(childrenContainer);
                    toggle.style.visibility = 'visible';
                }

                const newNode = CBJS.xxhTree.createTreeNode(newItem);
                childrenContainer.appendChild(newNode);

                // 展开父节点
                nodeElement.classList.add('expanded');
            });

            // 保存按钮 (编辑时显示)
            const saveBtn = document.createElement('button');
            saveBtn.textContent = '保存';
            saveBtn.style.display = 'none';
            saveBtn.addEventListener('click', function () {
                item.label = input.value;
                label.textContent = input.value;
                nodeElement.classList.remove('editing');
            });

            // 取消按钮 (编辑时显示)
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = '取消';
            cancelBtn.style.display = 'none';
            cancelBtn.addEventListener('click', function () {
                input.value = item.label;
                nodeElement.classList.remove('editing');
            });

            // 输入框事件
            input.addEventListener('keyup', function (e) {
                if (e.key === 'Enter') {
                    item.label = input.value;
                    label.textContent = input.value;
                    nodeElement.classList.remove('editing');
                } else if (e.key === 'Escape') {
                    input.value = item.label;
                    nodeElement.classList.remove('editing');
                }
            });

            // 监听编辑状态变化
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === 'class') {
                        const isEditing = nodeElement.classList.contains('editing');
                        editBtn.style.display = isEditing ? 'none' : 'inline-block';
                        deleteBtn.style.display = isEditing ? 'none' : 'inline-block';
                        addChildBtn.style.display = isEditing ? 'none' : 'inline-block';
                        saveBtn.style.display = isEditing ? 'inline-block' : 'none';
                        cancelBtn.style.display = isEditing ? 'inline-block' : 'none';
                    }
                });
            });

            observer.observe(nodeElement, {
                attributes: true
            });

            // 组装节点
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            actions.appendChild(addChildBtn);
            actions.appendChild(saveBtn);
            actions.appendChild(cancelBtn);

            nodeContent.appendChild(toggle);
            nodeContent.appendChild(checkbox);
            nodeContent.appendChild(label);
            nodeContent.appendChild(input);
            nodeContent.appendChild(actions);

            nodeElement.appendChild(nodeContent);
            return nodeElement;
        },

        // 展开/折叠节点
        toggleExpand: function (e) {
            e.stopPropagation();
            const nodeElement = this.closest('.tree-node');
            nodeElement.classList.toggle('expanded');
        },

        // 更新子节点的复选框状态
        updateChildrenCheckbox: function (nodeElement, checked) {
            const checkboxes = nodeElement.querySelectorAll('.tree-node-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = checked;
            });

            // 更新数据
            const itemId = parseInt(nodeElement.dataset.id);
            const item = this.findItem(treeData, itemId);
            if (item) {
                this.setChildrenChecked(item, checked);
            }
        },

        // 递归设置子节点的选中状态
        setChildrenChecked: function (item, checked) {
            item.checked = checked;
            if (item.children) {
                item.children.forEach(child => {
                    this.setChildrenChecked(child, checked);
                });
            }
        },

        // 更新父节点的复选框状态
        updateParentCheckbox: function (nodeElement) {
            const parentNode = nodeElement.parentNode.closest('.tree-node');
            if (!parentNode) return;

            const parentCheckbox = parentNode.querySelector('.tree-node-checkbox');
            const siblings = parentNode.querySelector('.tree-node-children').querySelectorAll('.tree-node-checkbox');

            let allChecked = true;
            let noneChecked = true;

            siblings.forEach(checkbox => {
                if (checkbox.checked) {
                    noneChecked = false;
                } else {
                    allChecked = false;
                }
            });

            if (allChecked) {
                parentCheckbox.checked = true;
                parentCheckbox.indeterminate = false;
            } else if (noneChecked) {
                parentCheckbox.checked = false;
                parentCheckbox.indeterminate = false;
            } else {
                parentCheckbox.checked = false;
                parentCheckbox.indeterminate = true;
            }

            // 更新数据
            const parentId = parseInt(parentNode.dataset.id);
            const parentItem = this.findItem(treeData, parentId);
            if (parentItem) {
                parentItem.checked = parentCheckbox.checked;
            }

            // 递归更新上级节点
            this.updateParentCheckbox(parentNode);
        },

        // 在树数据中查找项目
        findItem: function (data, id) {
            for (const item of data) {
                if (item.id === id) return item;
                if (item.children) {
                    const found = this.findItem(item.children, id);
                    if (found) return found;
                }
            }
            return null;
        },

        // 查找父级数据
        findParentData: function (data, id, parentData = null) {
            for (const item of data) {
                if (item.id === id) return parentData;
                if (item.children) {
                    const found = this.findParentData(item.children, id, item);
                    if (found) return found;
                }
            }
            return null;
        },

        // 生成唯一ID
        generateId: function () {
            return Date.now();
        }

    };

    // window.xxhTree = xxhTree;//该函数唯一暴露的对象
    // Expose xxhTree to the global object
    if (!!CBJS && !!CBJS.prototype) {
        CBJS.prototype.xxhTree = xxhTree;
    }
    else {
        window.CBJS.xxhTree = window.xxhTree || xxhTree;
    }

})();
