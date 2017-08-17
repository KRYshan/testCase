//初始时候和后台交互
/*
暂时caseService没用了，可以尝试一下resource
 */
class caseService {
    constructor($q, $timeout, $http, $resource) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$resource = $resource;


    }
     //获取tree的根节点
    requestTreeRoot() {
        /*
           this.$resource('/tree/root')
         */
        return this.$resource('nodeTable.json');
    }
    //通过id异步获取tree的子节点
    getTreeNode(id){
        var deferred=this.$q.defer();
        var url;
        url="nodeChildren.json"
        /*
             url='/tree/'+id;
         */
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
        var url='/tree';
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
    requestCase() {
        return this.$resource('cases.json', {caseId: '@id'}, {});
    }
}

export default caseService;