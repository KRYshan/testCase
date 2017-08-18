class caseController {
    constructor($state, caseService, $scope, uiAlert) {
        this.$state = $state;
        this.title = "";
        //当前tree节点Id
        this.nodeId = "";
        //当前tree节点
        this.node = "";
        this.$scope = $scope;
        this.caseService = caseService;
        this.params = "123";
        this.name = "";
        //后台拥有的所有tree节点
        this.treeNodes = "";
        this.uiAlert = uiAlert;
        //在页面加载的时候，获取内容,只获取根节点，通过异步加载
        this.caseService.getTreeNode().then(data => this.treeNodes = data);
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
        //选中节点
        /*
       只有第三层，才增加用例或者修改用例
       */
        var s = this.$state;
        this.caseService.getTestCase(node.id).then(
            function (data) {
                if (data.caseId == node.id) {
                    s.go("homeCase.catalogue.updateCase", {nodeId: node.id});
                }
                else {
                    if (node.id.split('-').length == 3) {
                        s.go("homeCase.catalogue.addCase", {nodeId: node.id});
                    }
                    else {
                        s.go("homeCase.catalogue", {nodeId: node.id});
                    }
                }
            },function (data) {
                console.error(data.message);
            }
        );
    }

    //增加节点
    addCatalogue(cs) {
        this.uiAlert.prompt('请输入标题').then(function (name) {
            cs.name = name;
            if (cs.name) {
                var parentId = cs.nodeId;
                //默认增加的是项目
                if (parentId == "") {
                    var lastId = cs.treeNodes.length ? cs.treeNodes[cs.treeNodes.length - 1].id : 0;
                    var newId = Number.parseInt(lastId) + 1 + "";
                    var newTreeNode = {
                        "id": newId,
                        "title": cs.name,
                        "children": [],
                    }
                    //将node节点，加入到后台
                    /*
                    var newNode = {
                        "id": newId,
                        "title": cs.name,
                        "pid": "0"
                    }
                    cs.caseService.addTreeNode(newNode).then(
                         function(data){
                             if(data.code=="1")
                               {
                               cs.treeNodes.push(newTreeNode);
                               cs.nodeId="";
                               }
                     },function(data){
                       console.error("加载节点错误");
                     }
                    );
                  */
                    cs.treeNodes.push(newTreeNode);
                    cs.nodeId = "";
                }
                else {
                    var parentIdStr = parentId.split('-');
                    var newId, childNode;
                    if (parentIdStr.length == 1) {
                        //模块
                        childNode = cs.treeNodes[Number.parseInt(parentIdStr[0]) - 1].children;
                        newId = parentIdStr[0] + '-' + (childNode.length + 1);
                        var newTreeNode = {
                            "id": newId,
                            "title": cs.name,
                            "children": []

                        }
                        //将node节点，加入到后台
                        /*
                           var newNode = {
                               "id": newId,
                               "title": cs.name,
                               "pid": parentId,
                          }
                    cs.caseService.addTreeNode(newNode).then(
                    function(data){
                     if(data.code=="1")
                          if (childNode.push(newTreeNode)) {
                               cs.node.expanded = true;
                            }
                         cs.nodeId="";
                     },function(data){
                       console.error("加载子节点错误");
                     }
                    );
                      */
                        if (childNode.push(newTreeNode)) {
                            cs.node.expanded = true;
                        }
                        cs.nodeId = "";
                    }
                    //用例
                    if (parentIdStr.length == 2) {
                        childNode = cs.treeNodes[Number.parseInt(parentIdStr[0] - 1)].children[Number.parseInt(parentIdStr[1] - 1)].children;
                        newId = parentIdStr[0] + '-' + parentIdStr[1] + '-' + (childNode.length + 1);
                        var newTreeNode = {
                            "id": newId,
                            "title": cs.name
                        }
                        //将node节点，加入到后台
                        /*
                        var newNode = {
                                "id": newId,
                                "title": cs.name,
                                 "pid": parentId
                                 }
                    cs.caseService.addTreeNode(newNode).then(
                    function(data){
                     if(data.code=="1")
                         cs.treeNodes.push(newTreeNode);
                         cs.nodeId="";
                     },function(data){
                       console.error("加载子节点错误");
                     }
                    );
                      */
                        if (childNode.push(newTreeNode)) {
                            cs.node.expanded = true;

                        }
                        cs.parentId = cs.node.nodeId;
                    }
                }

            }
        });
    }

}

export default caseController;