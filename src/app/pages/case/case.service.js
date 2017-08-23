
class CaseService {
    constructor($q, $timeout, $http, $resource) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$resource = $resource;
        //服务是单例的，treeNodes可以用来在多个controller中共享
        this.treeNodes=[];

    }

    //通过id异步获取tree的子节点,没有id就是根节点
    getTreeNode(id){
        var deferred=this.$q.defer();
        var url;
        if(!id){
           // url="http://localhost:8080/TestCasePro2/tree/0";
            url="json/nodeTable.json";
        }
       else{
            //url="http://localhost:8080/TestCasePro2/tree/"+id;
              url="json/nodeChildren.json";
        }
        this.$http.get(url).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    //增加tree节点到后台
    addTreeNode(node){
        var deferred=this.$q.defer();
       // var url='http://localhost:8080/TestCasePro2/tree';
        var url='json/user';
        this.$http.get(url/*,node*/).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    //tree节点标题的修改
    updateTreeNode(nodeId,nodeTitle){
    var deferred=this.$q.defer();
    //var url='http://localhost:8080/TestCasePro2/tree/'+nodeId;
    var url='json/user.json';
    var data={"title":nodeTitle};
    this.$http.get(url/*,data*/).success(function (data) {
        deferred.resolve(data);

    }).error(function(data){
        deferred.reject(data);
        });
    return deferred.promise;
    }
    //用例内容的获取
    getTestCase(id) {
        var deferred=this.$q.defer();
        var url='json/cases.json';
       // var url='http://localhost:8080/TestCasePro2/case'+id;
        this.$http.get(url).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    //用例内容的增加
    addTestCase(testCase){
        var deferred=this.$q.defer();
        //var url='http://localhost:8080/TestCasePro2/case';
       var url='json/user.json';
        this.$http.get(url/*,testCase*/).success(
            function(data){
                deferred.resolve(data);
            }
        ).error(function(data){
            deferred.reject(data);
        });
        return deferred.promise;
    }
    //用例内容的修改
    updateTestCase(updateCase){
        var deferred=this.$q.defer();
      //  var url='http://localhost:8080/TestCasePro2/case'+updateCase.caseId;
        var url='json/user.json';
        this.$http.get(url/*,updateCase*/).success(
            function(data){
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);

        });
        return deferred.promise;

    }
    //获取parentId模块所有的测试用例
    queryTestCaseById(parentId){
        var deferred=this.$q.defer();
        //var url="http://localhost:8080/TestCasePro2/case"
        var url="json/casesList.json";
        this.$http.get(url).success(function (data) {
            deferred.resolve(data);

        }).error(function (data) {
            deferred.reject(data);

        });
        return deferred.promise;
    }
}

export default CaseService;