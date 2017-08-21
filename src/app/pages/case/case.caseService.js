//初始时候和后台交互
/*
暂时caseService没用了，可以尝试一下resource
 */
class CaseService {
    constructor($q, $timeout, $http, $resource) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$resource = $resource;


    }

    //通过id异步获取tree的子节点,没有id就是根节点
    getTreeNode(id){
        var deferred=this.$q.defer();
        var url;
        if(!id){
            //url="/TestCasePro2/tree/0"
            url="json/nodeTable.json";
        }
       else{
            // url="/TestCasePro2/tree/"+id
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
        var url='http://192.168.1.9:8080/TestCasePro2/tree';
        this.$http.post(url,node).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
    //用例内容的增删改查
     getTestCase(id) {
        var deferred=this.$q.defer();
        var url='json/cases.json';
        //var url='/TestCasePro2/case'+id
        this.$http.get(url).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }
}

export default CaseService;