class CaseTreeController {
    constructor($state, caseService, $scope, uiAlert, uiNotification, $q) {
        this.$state = $state;
        this.title = "";
        //当前tree节点Id
        this.nodeId = "";
        this.$q = $q;
        //当前tree节点
        this.node = "";
        this.$scope = $scope;
        this.caseService = caseService;
        this.uiNotification = uiNotification;
        this.params = '123';
        this.name = "";
        this.uiAlert = uiAlert;
        //在页面加载的时候，只获取根节点内容，并通过异步加载方式展开该节点
        caseService.getTreeNode().then(function(data){
            caseService.treeNodes=data;
            if(caseService.treeNodes.length>0){
                let parentNode=caseService.treeNodes[0];
                let newNode;
                caseService.getTreeNode(parentNode.id).then(function (data) {
                    if(data.length>0){
                        for(let i=0;i<data.length;i++){
                            newNode=data[i];
                            if (parentNode.children.push(newNode)) {
                                parentNode.expanded = true;
                            }
                        }
                    }
                });
            }
        });
        //增加 修改 删除treeNode的通知
        this.options = {
            message: '操作成功',
            positionX: 'left',
            positionY: 'bottom',
            method: 'primary',
            closeOnClick: true,
            onClose: undefined,
            delay: 2000
        }

    }
    //异步加载节点
    loadData(node) {
        return this.caseService.getTreeNode(node.id);
    }
    //点击节点
    onSelect(node) {
        this.node = node;
        this.title = node.title;
        this.nodeId = node.id;
        node.expaned = true;
        /*
       只有第三层，才增加用例或者修改用例
       根据节点id查找用例，如果返回当前id的用例说明用例存在则跳转到修改用例页面
       */
        let s = this.$state;
        this.caseService.getTestCase(node.id).then(
            (data) => {
                if (data.caseId == node.id) {
                    s.go('home.case.updateCase', {nodeId: node.id, nodeTitle: node.title});
                }
                else {
                    if (node.id.split('-').length == 3) {
                        s.go('home.case.addCase', {nodeId: node.id, nodeTitle: node.title});
                    }
                    else if (node.id.split('-').length == 2) {
                        s.go('home.case.showCase', {nodeId: node.id, nodeTitle: node.title});
                    }
                    else {
                        s.go('home.case', {nodeId: node.id, nodeTitle: node.title});
                    }
                }
            }, (data) => {
                console.error('获取文件失败');
            }
        );
        console.log(this.title, this.nodeId);

    }
    //增加节点
    addNode(ctc) {
        //弹出对话框
        ctc.uiAlert.prompt('请输入标题').then(function (name) {
            ctc.name = name;
            if (ctc.name) {
                let parentId = ctc.nodeId;
                //默认增加的是项目
                if (parentId == "") {
                    //获取的是最后一个元素的id
                    let lastId = ctc.caseService.treeNodes.length ? ctc.caseService.treeNodes[ctc.caseService.treeNodes.length - 1].id : 0;
                    let newId = Number.parseInt(lastId) + 1 + "";
                    let newTreeNode = {
                        'id': newId,
                        'title': ctc.name,
                        'children': []
                    }
                    //将node节点，加入到后台
                    /*
                        let newNode = {
                            nodeId: newId,
                            title: ctc.name,
                            parentId: '0'
                        }
                        ctc.caseService.addTreeNode(newNode).then(
                            function (data) {
                                if (data.code == '1') {
                                    ctc.caseService.treeNodes.push(newTreeNode);
                                    ctc.nodeId = "";
                                    ctc.title="";
                                    ctc.options.message='增加成功';
                                    ctc.uiNotification.primary(ctc.options);
                                }
                                else{
                                  console.error(data.message);
                                  ctc.options.message='增加失败';
                                  ctc.uiNotification.error(ctc.options);
                                }
                            }, function (data) {
                                 console.error(data.message);
                                 ctc.options.message='增加失败';
                                 ctc.uiNotification.error(ctc.options);
                            }
                        );
                    */
                    ctc.caseService.treeNodes.push(newTreeNode);
                    ctc.nodeId = "";
                }
                else {
                    let parentIdStr = parentId.split('-');
                    let newId, childNode;
                    if (parentIdStr.length == 1) {
                        //模块
                        //获取parentIdStr[0]的index0;
                        let index0 = ctc.caseService.getIndexOf(ctc.caseService.treeNodes, parentIdStr[0]);
                        //获取孩子节点
                        childNode = ctc.caseService.treeNodes[index0].children;
                        //获取孩子节点的最后一个孩子的id;
                        newId = parentIdStr[0] + '-' + (ctc.caseService.getLastId(childNode) + 1);
                        let newTreeNode = {
                            'id': newId,
                            'title': ctc.name,
                            'children': []

                        }
                        //将node节点，加入到后台
                        /*
                       let newNode = {
                            nodeId: newId,
                            title: ctc.name,
                            parentId: parentId,
                        }
                        ctc.caseService.addTreeNode(newNode).then(
                            function (data) {
                                if (data.code == '1'){
                                    if (childNode.push(newTreeNode)) {
                                        ctc.node.expanded = true;
                                      }
                                     ctc.options.message='增加成功';
                                     ctc.uiNotification.primary(ctc.options);
                                     ctc.nodeId = "";
                                     ctc.title="";
                                }
                                else{
                                 console.error(data.message);
                                 ctc.options.message='增加失败';
                                 ctc.uiNotification.error(ctc.options);
                                }
                            }, function (data) {
                                 console.error(data.message);
                                 ctc.options.message='增加失败';
                                 ctc.uiNotification.error(ctc.options);
                            }
                        );
                */
                        if (childNode.push(newTreeNode)) {
                            ctc.node.expanded = true;
                        }
                        ctc.nodeId = "";
                    }
                    //用例
                    if (parentIdStr.length == 2) {
                        //获取parentIdStr[0]的index0;
                        let index0 = ctc.caseService.getIndexOf(ctc.caseService.treeNodes, parentIdStr[0]);
                        let index1 = ctc.caseService.getIndexOf(ctc.caseService.treeNodes[index0].children, parentIdStr[0] + '-' + parentIdStr[1]);
                        //获取孩子节点
                        childNode = ctc.caseService.treeNodes[index0].children[index1].children;
                        newId = parentIdStr[0] + '-' + parentIdStr[1] + '-' + (ctc.caseService.getLastId(childNode) + 1);
                        let newTreeNode = {
                            'id': newId,
                            'title': ctc.name
                        }
                        //将node节点，加入到后台
                        /*
                                                let newNode = {
                                                    nodeId: newId,
                                                    title: ctc.name,
                                                    parentId: parentId
                                                }
                                                ctc.caseService.addTreeNode(newNode).then(
                                                    function (data) {
                                                        if (data.code == '1'){
                                                            if (childNode.push(newTreeNode)) {
                                                                ctc.node.expanded = true;

                                                            }
                                                        ctc.parentId = ctc.node.nodeId;
                                                        ctc.options.message='增加成功';
                                                        ctc.uiNotification.primary(ctc.options);
                                                        }
                                                        else{
                                                        console.error(data.message);
                                                         ctc.options.message='增加失败';
                                                        ctc.uiNotification.error(ctc.options);
                                                        }
                                                    }, function (data) {
                                                         console.error(data.message);
                                                         ctc.options.message='增加失败';
                                                         ctc.uiNotification.error(ctc.options);
                                                    }
                                                );

                        */
                        if (childNode.push(newTreeNode)) {
                            ctc.node.expanded = true;
                        }
                        ctc.nodeId = "";
                    }
                }
            }
            else {
                ctc.options.message = '标题不能为空';
                ctc.uiNotification.warning(ctc.options);
            }
        });
    }
    //删除节点，那么测试用例也要删除
    //链式调用版本
    deleteNode(ctc) {
        let deferred = ctc.$q.defer();
        let errdata = {};
        errdata.message = '删除失败';
        deferred.reject(errdata);
        if (ctc.nodeId) {
            ctc.uiAlert.confirm('确定删除吗？').then(function () { //后端删除测试用例
                return ctc.caseService.deleteTestCase(ctc.nodeId);
            }).then(function (data) { //后端删除节点
                if (data.code == 1) {
                    return ctc.caseService.deleteTreeNode(ctc.nodeId);
                }
                else {
                    return deferred.promise;
                }
            }).then(function (data) { //前端删除节点
                if (data.code == 1) {
                    ctc.deleteTreeNode(ctc);
                }
                else {
                    return deferred.promise;
                }
            }).catch(function (data) {
                if (data.message) {

                    ctc.options.message = data.message;
                    ctc.uiNotification.error(ctc.options);
                }
                console.error(data.message);
            });

        }
        else {
            ctc.options.message = '请选中要删除的文件';
            ctc.uiNotification.warning(ctc.options);
        }
    }
    //嵌套版本
    deleteNode1(ctc) {
        //弹出确认框
        if (ctc.nodeId) {
            ctc.uiAlert.confirm('确定删除吗？').then(function () {
                //后端删除节点
                ctc.caseService.deleteTestCase(ctc.nodeId).then(function (data) {
                    if (data.code == 1) {
                        ctc.caseService.deleteTreeNode(ctc.nodeId).then(function (data) {
                            if (data.code == 1) {
                                ctc.deleteTreeNode(ctc);
                            }
                            else {
                                console.error(data.message);
                                ctc.options.message = data.message;
                                ctc.uiNotification.error(ctc.options);
                            }
                        }, function (data) {
                            console.error(data.message);
                            ctc.options.message = data.message;
                            ctc.uiNotification.error(ctc.options);
                        })
                    }
                    else {
                        console.error(data.message);
                        ctc.options.message = data.message;
                        ctc.uiNotification.error(ctc.options);
                    }
                }, function (data) {
                    console.error(data.message);
                    ctc.options.message = data.message;
                    ctc.uiNotification.error(ctc.options);
                });


            }).catch(function () {
                //ctc.alertConfirmText='已取消';
            });
        }
        else {
            ctc.options.message = '请选中要删除的文件';
            ctc.uiNotification.warning(ctc.options);
        }
    }
    //修改节点，测试用例的标题也要修改
    //链式调用版本
    updateNode(ctc) {
        if (ctc.nodeId) {
            let deferred = ctc.$q.defer();
            let errdata = {};
            errdata.message = '修改失败';
            deferred.reject(errdata);
            ctc.uiAlert.prompt('请输入修改后的标题').then(function (name) {
                if (name) {
                    ctc.name = name;
                    ctc.nodeTitle = ctc.name;
                    //更新后端tree节点
                    return ctc.caseService.updateTreeNode(ctc.nodeId, ctc.name);
                }
                else {
                    errdata.message = '标题不能为空';
                    deferred.reject(errdata);
                    return deferred.promise;
                }
            }).then(function (data) {
                if (data.code == 1) {
                    //查询是否存在测试用例
                    return ctc.caseService.getTestCase(ctc.nodeId);
                }
                else {
                    return deferred.promise;
                }
            }).then(function (data) {
                //如果存在测试用例，则更新该测试用例
                if (!ctc.caseService.isEmptyObject(data)) {
                    let res = data;
                    res.caseTitle = ctc.name;
                    return ctc.caseService.updateTestCase(res);
                }
                //不存在则直接更新前端tree节点，并返回false，结束链式调用
                else {
                    ctc.updateTreeNode(ctc);
                    return false;
                }
            }).then(function (data) {
                //如果后端测试用例修改成功，则修改前端tree节点的显示
                if (data.code == 1) {
                    //前端显示部分tree节点的修改
                    ctc.updateTreeNode(ctc);
                }
                else {
                    return deferred.promise;
                }
                //捕获reject和异常
            }).catch(function (data) {
                if (data.message) {
                    ctc.options.message = data.message;
                    if (data.message =='标题不能为空')
                        ctc.uiNotification.warning(ctc.options);
                    else
                        ctc.uiNotification.error(ctc.options);
                }
                console.error(data.message);
            });
        }
        else {
            ctc.options.message = '请选中要修改的文件';
            ctc.uiNotification.warning(ctc.options);
        }
    }
    //嵌套版本
    updateNode1(ctc) {
        if (ctc.nodeId) {
            ctc.uiAlert.prompt('请输入修改后的标题').then(function (name) {
                if (name) {
                    ctc.name = name;
                    ctc.nodeTitle = ctc.name;
                    /*后端修改treeNode，也要修改testcase
                       1.如果后台存在该id的测试用例，则修改：getTestCase(id)
                       2.不存在,则什么都不做
                     */
                    ctc.caseService.updateTreeNode(ctc.nodeId, ctc.name).then(function (data) {
                        if (data.code == 1) {
                            //根据id从后台获取测试用例
                            ctc.caseService.getTestCase(ctc.nodeId).then(function (data) {
                                //如果测试用例存在
                                if (!ctc.caseService.isEmptyObject(data)) {
                                    let res = data;
                                    res.caseTitle = ctc.name;
                                    ctc.caseService.updateTestCase(res).then(function (data) {
                                        if (data.code == 1) {
                                            //前端显示部分tree节点的修改
                                            ctc.updateTreeNode(ctc);
                                        }
                                        else {
                                            ctc.options.message = '修改失败';
                                            ctc.uiNotification.error(ctc.options);
                                            console.error(data.message);
                                        }
                                    }, function (data) {
                                        ctc.options.message = '修改失败';
                                        ctc.uiNotification.error(ctc.options);
                                        console.error(data.message);
                                    })
                                } else {
                                    //前端显示部分tree节点的修改
                                    ctc.updateTreeNode(ctc);
                                }
                            }, function (data) {
                                console.error(data.message);
                                ctc.options.message = '修改失败';
                                ctc.uiNotification.error(ctc.options);
                            });
                        } else {
                            console.error(data.message);
                            ctc.options.message = '修改失败';
                            ctc.uiNotification.error(ctc.options);

                        }
                    }, function (data) {
                        console.error(data.message);
                        ctc.options.message = '修改失败';
                        ctc.uiNotification.error(ctc.options);


                    });
                } else {
                    ctc.options.message = '标题不能为空';
                    ctc.uiNotification.warning(ctc.options);
                }

            });
        }
        else {
            ctc.options.message = '请选中要修改的文件';
            ctc.uiNotification.warning(ctc.options);
        }
    }
    //前端界面修改节点标题，被updateNode调用
    updateTreeNode(ctc) {
        if (ctc.nodeId) {

            let nodeStr = ctc.nodeId.split('-');
            let len = nodeStr.length;
            let nodes = ctc.caseService.treeNodes;
            if (len == 1) {
                nodes[Number.parseInt(nodeStr[0]) - 1].title = ctc.name;
                ctc.options.message = '修改成功';
                ctc.uiNotification.primary(ctc.options);
            }
            if (len == 2) {
                nodes[Number.parseInt(nodeStr[0]) - 1].children[Number.parseInt(nodeStr[1]) - 1].title = ctc.name;
                ctc.options.message = '修改成功';
                ctc.uiNotification.primary(ctc.options);
            }
            if (len == 3) {
                nodes[Number.parseInt(nodeStr[0]) - 1].children[Number.parseInt(nodeStr[1]) - 1].children[Number.parseInt(nodeStr[2]) - 1].title = ctc.name;
                ctc.options.message = '修改成功';
                ctc.uiNotification.primary(ctc.options);
            }

        }
        else {
            ctc.options.message = '修改失败';
            ctc.uiNotification.error(ctc.options);

        }
    }
    //前端界面删除节点，被deleteTNode调用
    deleteTreeNode(ctc) {
        let nodeStr = ctc.nodeId.split('-');
        let len = nodeStr.length;
        let nodes = ctc.caseService.treeNodes;
        if (len == 1) {
            ctc.caseService.removeByValue(nodes, ctc.nodeId);
            ctc.nodeId = "";
            ctc.nodeTitle = "";
            ctc.options.message = '删除成功';
            ctc.uiNotification.primary(ctc.options);
        }
        if (len == 2) {
            //获取parentIdStr[0]的index0;
            let index0 = ctc.caseService.getIndexOf(ctc.caseService.treeNodes, nodeStr[0]);
            //获取孩子节点
            let childNode = ctc.caseService.treeNodes[index0].children;
            ctc.caseService.removeByValue(childNode, ctc.nodeId);
            ctc.nodeId = "";
            ctc.nodeTitle = "";
            ctc.options.message = '删除成功';
            ctc.uiNotification.primary(ctc.options);

        }
        if (len == 3) {
            //获取parentIdStr[0]的index0;
            let index0 = ctc.caseService.getIndexOf(ctc.caseService.treeNodes, nodeStr[0]);
            let index1 = ctc.caseService.getIndexOf(ctc.caseService.treeNodes[index0].children, nodeStr[0] + '-' + nodeStr[1]);
            //获取孩子节点
            let childNode = ctc.caseService.treeNodes[index0].children[index1].children;
            ctc.caseService.removeByValue(childNode, ctc.nodeId);
            ctc.nodeId = "";
            ctc.nodeTitle = "";
            ctc.options.message = '删除成功';
            ctc.uiNotification.primary(ctc.options);

        }
    }
    enterKeyEvent(data){
        //根据输入的关键字进行查找
        var ctc=this;
        ctc.caseService.getSearchRoot(data).then(function(data){
            if(data.code==1) {
                if (data.nodes.length > 0) {
                    ctc.caseService.treeNodes = data.nodes;
                    let parentNode = data.nodes[0];
                    let newNode;
                    ctc.caseService.getTreeNode(parentNode.id).then(function (data) {
                        if (data.length > 0) {
                            for (let i = 0; i < data.length; i++) {
                                newNode = data[i];
                                if (parentNode.children.push(newNode)) {
                                    parentNode.expanded = true;
                                }
                            }
                        }
                    });
                }
                else {
                    ctc.uiAlert.warning("搜索项不存在");

                }
            }
            else{
                console.error(data.message)
            }
        });


    }



}
export default CaseTreeController;