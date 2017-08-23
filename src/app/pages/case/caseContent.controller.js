class CaseContentController{
    constructor($stateParams,caseService,$state,$scope)
    {   this.$scope=$scope;
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
        caseService.queryTestCaseById(this.paramId).then(data=>this.casesList=data);
        //增加用例
        this.addCase={};
        this.addCase.caseTitle=this.paramTitle!="[object Object]"?this.paramTitle:"";

        //显示parentId模块下的所有测试用例，用例表格的列属性
        this.caseColumns=[{
            title:"编号",
            dataIndex:"caseId",
             width:"5%"
        },{
            title:"用例标题",
            dataIndex:"caseTitle",
            width:"10%"
        },{
            title:"用例优先级",
            dataIndex:"casePriority",
            width:"10%"
        },{
            title:"前置条件",
            dataIndex:"preCondition",
            width:"20%"
        },{
            title:"执行步骤",
            dataIndex:"step",
            width:"20%"
        },{
            title:"预期结果",
            dataIndex:"expected",
            width:"10%"
        },{
            title:"执行结果",
            dataIndex:"result",
            width:"10%"
        },{
            title:"是否通过",
            dataIndex:"pass",
            width:"10%"
        },{
            title:"操作",
            width:"5%",
            render: (record)=> '<button ng-click="ccc.goUpdateTestCase(record)" class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i>修改</button>'
        }];

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

    updateTestCase(ccc){
        var updateCase=ccc.updateCase;
        updateCase.caseId=ccc.paramId;
        ccc.caseService.updateTestCase(updateCase).then(function(data){
            if(data.code==1)
            {

                //更新完，如果标题名字改变了，tree节点上的名字也改变
                if(ccc.paramTitle!=updateCase.caseTitle) {
                    ccc.caseService.updateTreeNode(updateCase.caseId,updateCase.caseTitle).then(function(data){
                        if(data.code==1){
                            //页面上显示时候的tree节点也要更新
                            //更新tree节点的标题名
                            ccc.updateNodeTitle(updateCase);
                            //页面跳转
                            ccc.$state.go("homeCase.caseTree.showCase", {nodeId: updateCase.caseId});
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
    submitTestCase(ccc){
            var testCase=ccc.addCase;
            testCase.caseId=ccc.paramId;
            //向后台增加用例
            ccc.caseService.addTestCase(testCase).then(function(data){
                if(data.code==1)
                {   //在增加用例的时候，如果用例的标题改变了，相应的tree节点的标题也要改变
                    if(ccc.paramTitle!=testCase.caseTitle) {
                        ccc.caseService.updateTreeNode(testCase.caseId,testCase.caseTitle).then(function(data){
                            if(data.code==1){
                                //页面上显示时候的tree节点也要更新
                                //更新tree节点的标题名
                                ccc.updateNodeTitle(testCase);
                                //页面跳转
                               // ccc.$state.go("homeCase.caseTree.updateCase", {nodeId: ccc.paramId,nodeTitle:testCase.caseTitle});
                                ccc.$state.go("homeCase.caseTree.showCase", {nodeId: ccc.paramId});
                            }
                            else{
                                console.error(data.message);
                            }
                        },function (data) {
                            console.error("修改tree节点错误");
                        });
                    }
                   // ccc.$state.go("homeCase.caseTree.updateCase", {nodeId: ccc.paramId,nodeTitle:testCase.caseTitle});
                    ccc.$state.go("homeCase.caseTree.showCase", {nodeId: ccc.paramId});
                }
                else{
                    console.error(data.message);
                }
            },function (data) {
                console.error(data.message);
                }

            );
    }

    //显示parentId模块下的所有测试用例
    //进入用例修改页面
    goUpdateTestCase(record){
        this.$state.go("homeCase.caseTree.updateCase", {nodeId: record.caseId,nodeTitle:record.caseTitle});

    }

}
export default CaseContentController;