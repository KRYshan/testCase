class AddCaseController{
    constructor($stateParams,caseService,$state)
    {
        this.caseService=caseService;
        this.$stateParams=$stateParams;
        this.$state=$state;
        this.paramId=this.$stateParams.nodeId;
        this.prioritys=["p1","p2","p3","p4"];
        this.passes=["通过","未通过"];
        //修改的
        caseService.getTestCase(this.paramId).then(data=>this.upCase=data);
        //增加的
        this.addCase={};

    }
    //修改
    updateCase(){
        var upCase=this.upCase;
        var s=this.$state;
        var caseId=this.paramId;
        upCase.caseId=caseId;
        //向后台请求保存的代码
        //更新完，如果标题名字改变了，tree节点上的名字也改变
        /*
        this.caseService.requestCase().save({caseId:caseId},upCase,function (resp) {
            if(resp.code==1)   {
                //把相应的更新，更改到tree节点中，更新到后台，并且界面上的tree也要更新
                //更新完就跳转到更新界面
                s.go("homeCase.catalogue.updateCase", {nodeId: caseId});
            }

        });

*/
    }
   //增加

    submitCase(){
        var addCase=this.addCase;
        var s=this.$state;
        var caseId=this.paramId;
        addCase.caseId=caseId;
            //向后台增加用例
            this.caseService.requestCase().save({},addCase,function (resp) {
                if(resp.code==1)   {
                    //节点增加完就跳转到更新界面
                    s.go("homeCase.catalogue.updateCase", {nodeId: caseId});
                }

            });

    }

}
export default AddCaseController;