class caseShowController{
    constructor($stateParams,caseService,$state,$scope)
    {
        this.$scope=$scope;
        this.caseService=caseService;
        this.$stateParams=$stateParams;
        this.$state=$state;
        this.paramId=this.$stateParams.nodeId;
        this.paramTitle=caseService.isEmptyObject(this.$stateParams.nodeTitle)? '':this.$stateParams.nodeTitle;
        //显示parentId模块下的所有测试用例
        //表格样式
        this.tableStyleCases={
            bordered:true,
            hover:true
        }
        //分页属性
        this.casesList;
        this.paginationCases={
            currentPage:1,
            perPage:5
        };
        // 用例表格的列属性
        this.casesColumns=[{
            title:'编号',
            dataIndex:'caseId',
            width:'5%'
        },{
            title:'用例标题',
            dataIndex:'caseTitle',
            width:'10%'
        },{
            title:'用例优先级',
            dataIndex:'casePriority',
            width:'10%'
        },{
            title:'前置条件',
            dataIndex:'preCondition',
            width:'20%'
        },{
            title:'执行步骤',
            dataIndex:'step',
            width:'20%'
        },{
            title:'预期结果',
            dataIndex:'expected',
            width:'10%'
        },{
            title:'执行结果',
            dataIndex:'result',
            width:'10%'
        },{
            title:'是否通过',
            dataIndex:'pass',
            width:'10%',
        },{
            title:'操作',
            width:'5%',
            render: (record)=> "<button ng-click='csc.goUpdateTestCase(record)' class='btn btn-primary btn-xs'><i class='fa fa-pencil'></i>修改</button>"
        }];
        //获取parentId下的所有测试用例
        this.getListCases();
    }
    //显示parentId模块下的所有测试用例
    //获取casesList
    getListCases(){
        let This=this;
        This.tableCasesLoading=true;
        //传入的参数1.nodeId;2.页面信息：当前要获取第几页，一页共有几项
        //返回的数据1.records：json对象数组，数据  2.totalItems，数据库中一共有多少数据
        This.caseService.queryTestCasesById(This.paramId,This.paginationCases).then(
            function (data) {
                This.casesList=data.records;
                This.paginationCases.totalItems=data.totalItems;
            }
        ).finally(function () {
            This.tableCasesLoading=false;
        });
    }
    //修改页码
    changeCases(pagination){
        //console.log('当前页码：'+pagination.currentPage);
        this.getListCases();
    }
    //进入用例修改页面
    goUpdateTestCase(record){
        this.$state.go('home.case.updateCase', {nodeId: record.caseId,nodeTitle:record.caseTitle});

    }
}
export default  caseShowController;