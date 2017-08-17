class caseController {
    constructor($state, caseService, $scope, $http, uiAlert) {
        this.$state = $state;
        this.title = "";
        this.nodeId = "";
        this.$scope = $scope;
        this.$http = $http;
        this.caseService = caseService;
        this.params = "123";
        this.name = "";
        this.node = "";
        this.uiAlert = uiAlert;
        //在页面加载的时候，获取内容,只获取根节点，通过异步加载
        this.content = this.caseService.requestTreeRoot().query();

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
       */
        var s = this.$state;
        this.caseService.requestCase().get({caseId: node.id}, function (result) {
            if (result.caseId == node.id) {
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
        });
    }

    //增加节点
    addCatalogue(cs) {
        this.uiAlert.prompt('请输入标题').then(function (name) {
            cs.name = name;
            if (cs.name) {
                var oldId = cs.nodeId;
                //默认增加的是项目
                if (oldId == "") {
                    var lastId = cs.content.length ? cs.content[cs.content.length - 1].id : 0;
                    var newId = Number.parseInt(lastId) + 1 + "";
                    var newContentNode = {
                        "id": newId,
                        "title": cs.name,
                        "children": [],
                    }
                    //将node节点，加入到后台
                    /*
                    var newTreeNode = {
                        "id": newId,
                        "title": cs.name,
                        "pid": "0"
                    }
                    cs.caseService.addTreeNode(newTreeNode).then(
                    function(data){
                     if(data.code=="1")
                         cs.content.push(newTreeNode);
                         cs.nodeId="";
                     },function(data){
                       console.error("加载子节点错误");
                     }
                    );
                  */
                    cs.content.push(newContentNode);
                    cs.nodeId = "";
                }
                else {
                    var oldIdStr = oldId.split('-');
                    var newId, childNode;
                    if (oldIdStr.length == 1) {
                        //模块
                        childNode = cs.content[Number.parseInt(oldIdStr[0]) - 1].children;

                        newId = oldIdStr[0] + '-' + (childNode.length + 1);

                        var newContentNode = {
                            "id": newId,
                            "title": cs.name,
                            "children": []

                        }
                        //将node节点，加入到后台
                        /*
                          var newTreeNode = {
                             "id": newId,
                             "title": cs.name,
                              "pid": oldId,
                          }
                    cs.caseService.addTreeNode(newTreeNode).then(
                    function(data){
                     if(data.code=="1")
                          if (childNode.push(newContentNode)) {
                               cs.node.expanded = true;
                            }
                         cs.nodeId="";
                     },function(data){
                       console.error("加载子节点错误");
                     }
                    );
                      */
                        if (childNode.push(newContentNode)) {
                               cs.node.expanded = true;
                        }
                        cs.nodeId = "";
                    }
                    //用例
                    if (oldIdStr.length == 2) {
                        childNode = cs.content[Number.parseInt(oldIdStr[0] - 1)].children[Number.parseInt(oldIdStr[1] - 1)].children;
                        newId = oldIdStr[0] + '-' + oldIdStr[1] + '-' + (childNode.length + 1);
                        var newContentNode = {
                            "id": newId,
                            "title": cs.name
                        }
                        //将node节点，加入到后台
                        /*
                        var newTreeNode = {
                             "id": newId,
                             "title": cs.name,
                              "pid": oldId
                                 }
                    cs.caseService.addTreeNode(newTreeNode).then(
                    function(data){
                     if(data.code=="1")
                         cs.content.push(newContentNode);
                         cs.nodeId="";
                     },function(data){
                       console.error("加载子节点错误");
                     }
                    );
                      */
                        if (childNode.push(newContentNode)) {
                            cs.node.expanded = true;

                        }
                        cs.oldId = cs.node.nodeId;
                    }
                }

            }

        });
    }

}
export default caseController;