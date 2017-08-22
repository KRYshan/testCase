class CaseContentController{
    constructor($stateParams,caseService,$state)
    {
        this.caseService=caseService;
        this.$stateParams=$stateParams;
        this.$state=$state;
        this.paramId=this.$stateParams.nodeId;
        this.paramTitle=this.$stateParams.nodeTitle;
        this.prioritys=["p1","p2","p3","p4"];
        this.passes=["通过","未通过"];
        this.updateCase={};
        //修改用例页面获取点中的节点用例
        caseService.getTestCase(this.paramId).then(data=>this.updateCase=data);
        //增加用例
        this.addCase={};
        this.addCase.caseTitle=this.paramTitle;

    }

    //修改页面显示的treeNodeTitle
    updateNodeTitle(updateCase){
        var idStr=updateCase.caseId.split('-');
        if(idStr.length==3){
            var index1=Number.parseInt(idStr[0])-1;
            var index2=Number.parseInt(idStr[1])-1;
            var index3=Number.parseInt(idStr[2])-1;
            this.caseService.treeNodes[index1].children[index2].children[index3].title=updateCase.caseTitle;
        }
    }
    //修改测试用例
    updateTestCase(acc){
        var updateCase=acc.updateCase;
        updateCase.caseId=acc.paramId;
        acc.caseService.updateTestCase(updateCase).then(function(data){
            if(data.code==1)
            {
                //更新完，如果标题名字改变了，tree节点上的名字也改变
                if(acc.paramTitle!=updateCase.caseTitle) {
                    acc.caseService.updateTreeNode(updateCase.caseId,updateCase.caseTitle).then(function(data){
                        if(data.code==1){
                            //页面上显示时候的tree节点也要更新
                            //更新tree节点的标题名
                            acc.updateNodeTitle(updateCase);
                            //页面跳转
                            //acc.$state.go("homeCase.caseTree.updateCase", {nodeId: caseId,nodeTitle:updateCase.caseTitle});
                        }
                        else{
                            console.error(data.message);
                        }
                    },function (data) {
                        console.error("修改tree节点错误");
                    });
                }
            }
            else{
                console.error(data.message);
            }
        },function(data){
            console.error("修改用例错误");
        });
    }
    //增加测试用例
    submitTestCase(acc){
            var testCase=acc.addCase;
            testCase.caseId=acc.paramId;
            //向后台增加用例
            acc.caseService.addTestCase(testCase).then(function(data){
                if(data.code==1)
                {   //在增加用例的时候，如果用例的标题改变了，相应的tree节点的标题也要改变
                    if(acc.paramTitle!=testCase.caseTitle) {
                        acc.caseService.updateTreeNode(testCase.caseId,testCase.caseTitle).then(function(data){
                            if(data.code==1){
                                //页面上显示时候的tree节点也要更新
                                //更新tree节点的标题名
                                acc.updateNodeTitle(testCase);
                                //页面跳转
                                acc.$state.go("homeCase.caseTree.updateCase", {nodeId: acc.paramId,nodeTitle:testCase.caseTitle});
                            }
                            else{
                                console.error(data.message);
                            }
                        },function (data) {
                            console.error("修改tree节点错误");
                        });
                    }
                    acc.$state.go("homeCase.caseTree.updateCase", {nodeId: acc.paramId,nodeTitle:testCase.caseTitle});
                }
                else{
                    console.error(data.message);
                }
            },function (data) {
                console.error(data.message);
                }

            );
    }

}
export default CaseContentController;