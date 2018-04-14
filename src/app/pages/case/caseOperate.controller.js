class caseOperateController{
    constructor($stateParams,caseService,$state,$scope)
    {   this.$scope=$scope;
        this.caseService=caseService;
        this.$stateParams=$stateParams;
        this.$state=$state;
        this.paramId=this.$stateParams.nodeId;
        this.paramTitle=this.$stateParams.nodeTitle;
        this.prioritys=['p1','p2','p3','p4'];
        this.passes=['通过','未通过'];
        this.updateCase={};
        //修改用例页面获取点中的节点用例
        caseService.getTestCase(this.paramId).then(data=>this.updateCase=data);
       // caseService.queryTestCaseById(this.paramId).then(data=>this.casesList=data);
        //增加用例
        this.addCase={};
        this.addCase.caseTitle=caseService.isEmptyObject(this.paramTitle)?"":this.paramTitle;

    }

    //修改页面显示的treeNodeTitle
    updateNodeTitle(updateCase){
        let idStr=updateCase.caseId.split('-');
        if(idStr.length==3){
            let index1=Number.parseInt(idStr[0])-1;
            let index2=Number.parseInt(idStr[1])-1;
            let index3=Number.parseInt(idStr[2])-1;
             //如果左侧没有三级目录，则不改变
            if(this.caseService.treeNodes[index1].children[index2].children[index3])
             this.caseService.treeNodes[index1].children[index2].children[index3].title=updateCase.caseTitle;
        }
    }
    //修改测试用例
    updateTestCase(coc){
        let updateCase=coc.updateCase;
        updateCase.caseId=coc.paramId;
        coc.caseService.updateTestCase(updateCase).then(function(data){
            if(data.code==1)
            {

                //更新完，如果标题名字改变了，tree节点上的名字也改变
                if(coc.paramTitle!=updateCase.caseTitle) {
                    coc.caseService.updateTreeNode(updateCase.caseId,updateCase.caseTitle).then(function(data){
                        if(data.code==1){
                            //页面上显示时候的tree节点也要更新
                            //更新tree节点的标题名
                            coc.updateNodeTitle(updateCase);
                            //从后台获取该节点的父节点id，并跳转到showcase页面
                            coc.caseService.getParent(updateCase.caseId).then(
                                function (data) {
                                    if(data.code==1)
                                    {
                                        //页面跳转
                                        coc.$state.go('home.case.showCase', {nodeId: data.parentId,nodeTitle:data.parentTitle});
                                    }
                                    else{
                                        console.error(data.message);
                                    }
                                }
                            );
                        }
                        else{
                            console.error(data.message);
                        }
                    },function (data) {
                        console.error('修改tree节点错误');
                    });
                }
                else{
                    //从后台获取该节点的父节点id，并跳转到showcase页面
                    coc.caseService.getParent(updateCase.caseId).then(
                        function (data) {
                            if(data.code==1)
                            {
                                //页面跳转
                                coc.$state.go('home.case.showCase', {nodeId: data.parentId,nodeTitle:data.parentTitle});
                            }
                            else{
                                console.error(data.message);
                            }
                        }
                    );

                }
            }
            else{
                console.error(data.message);
            }
        },function(data){
            console.error('修改用例错误');
        });
    }
    //增加测试用例
    submitTestCase(coc){
            let testCase=coc.addCase;
            testCase.caseId=coc.paramId;
            //向后台增加用例
            coc.caseService.addTestCase(testCase).then(function(data){
                if(data.code==1)
                {   //在增加用例的时候，如果用例的标题改变了，相应的tree节点的标题也要改变
                    if(coc.paramTitle!=testCase.caseTitle) {
                        coc.caseService.updateTreeNode(testCase.caseId,testCase.caseTitle).then(function(data){
                            if(data.code==1){
                                //页面上显示时候的tree节点也要更新
                                //更新tree节点的标题名
                                coc.updateNodeTitle(testCase);
                                //从后台获取该节点的父节点id，并跳转到showcase页面
                                coc.caseService.getParent(testCase.caseId).then(
                                    function (data) {
                                        if(data.code==1)
                                        {
                                            //页面跳转
                                            coc.$state.go('home.case.showCase', {nodeId: data.parentId,nodeTitle:data.parentTitle});
                                        }
                                        else{
                                            console.error(data.message);
                                        }
                                    }
                                );

                            }
                            else{
                                console.error(data.message);
                            }

                        },function (data) {
                            console.error('修改tree节点错误');
                        });
                    }
                    else {

                            //从后台获取该节点的父节点id，并跳转到showcase页面
                            coc.caseService.getParent(testCase.caseId).then(
                                function (data) {
                                    if(data.code==1)
                                    {
                                        //页面跳转
                                        coc.$state.go('home.case.showCase', {nodeId: data.parentId,nodeTitle:data.parentTitle});
                                    }
                                    else{
                                        console.error(data.message);
                                    }
                                }
                            );
                        }

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
export default caseOperateController;