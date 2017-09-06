
class CaseService {
    constructor($q, $timeout, $http, $resource,$window) {
        this.$q = $q;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$resource = $resource;
        this.$window=$window;
        //服务是单例的，treeNodes可以用来在多个controller中共享
        this.treeNodes=[];
        this.user=angular.fromJson(this.$window.sessionStorage.USER);

    }

    //通过id异步获取tree的子节点,没有id就是根节点
    getTreeNode(id){
        let deferred=this.$q.defer();
        let url;
        if(!id){
           // url='http://localhost:8080/TestCasePro2/tree/0';
            url='json/nodeTable.json';
        }
       else{
            //url='http://localhost:8080/TestCasePro2/tree/'+id;
              url='json/nodeChildren.json';
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
    //通过id异步获取tree节点，父节点id
    getParent(id){
        let deferred=this.$q.defer();
        //  let url='http://localhost:8080/TestCasePro2/tree/parent/'+id;
        /*
        返回:code:1
             parentId:parentId,
             parentTitle:parentTitle
             code:0
             message:
         */
        let url='json/user.json';
        this.$http.get(url).success(
            function (data) {
                deferred.resolve(data);

            }
        ).error(function (data) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    //增加tree节点到后台
    addTreeNode(node){
        let deferred=this.$q.defer();
       // let url='http://localhost:8080/TestCasePro2/tree';
        let url='json/user';
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
    let deferred=this.$q.defer();
    //let url='http://localhost:8080/TestCasePro2/tree/'+nodeId;
    let url='json/user.json';
    let data={'title':nodeTitle};
    //put
    this.$http.get(url/*,data*/).success(function (data) {
        deferred.resolve(data);

    }).error(function(data){
        deferred.reject(data);
        });
    return deferred.promise;
    }
    //删除TreeNode
    deleteTreeNode(nodeId){
        let deferred=this.$q.defer();
        /*
        let url='http://localhost:8080/TestCasePro2/tree/'+nodeId;
        //delete()
        */
        this.$http.get('json/user.json').success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    //用例内容的获取
    getTestCase(id) {
        let deferred=this.$q.defer();
        let url='json/cases.json';
       // let url='http://localhost:8080/TestCasePro2/case/'+id;
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
        let deferred=this.$q.defer();
        //let url='http://localhost:8080/TestCasePro2/case';
       let url='json/user.json';
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
        let deferred=this.$q.defer();
       //  let url='http://localhost:8080/TestCasePro2/case/'+updateCase.caseId;
        //变为put
        let url='json/user.json';
        this.$http.get(url/*,updateCase*/).success(
            function(data){
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);

        });
        return deferred.promise;

    }
    //获取nodeId模块所有的测试用例
    /*
       传入的参数1.nodeId;2.页面信息paginationCases：当前要获取第几页，一页共有几项
       返回的数据1.records：json对象数组，数据  2.totalItems，数据库中一共有多少数据
     */
    queryTestCasesById(nodeId,paginationCases){
        let deferred=this.$q.defer();
        //let url='http://localhost:8080/TestCasePro2/cases/+nodeId;
        /*
        let data={
                   'currentPage':paginationCases.currentPage,
                   'perPage':paginationCases.perPage
             }
         //post(url,data);
         */
        let url='json/casesList.json';

        this.$http.get(url).success(function (data) {
            deferred.resolve(data);

        }).error(function (data) {
            deferred.reject(data);

        });
        return deferred.promise;
    }
    //删除TestCase
    deleteTestCase(nodeId){
        let deferred=this.$q.defer();
        /*
        let url='http://localhost:8080/TestCasePro2/case/'+nodeId;
        //delete()
        */
        this.$http.get('json/user.json').success(function (data) {
            deferred.resolve(data);
        }).error(function (data) {
            deferred.reject(data);
        })
        return deferred.promise;
    }
    //获取和搜索框输入内容相关联的关键字
    getSearchWords(inputWord){
        let deferred=this.$q.defer();
        //let url='/TestCasePro2/tree/keywords';
        let url='json/keyWord.json';
        this.$http.get(url,inputWord).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;

    }
    //根据关键字搜索出的root节点
    getSearchRoot(keyWord){
        let deferred=this.$q.defer();
        //let url='/TestCasePro2/tree/root';
        let url='json/searchRoot.json';
        this.$http.get(url,keyWord).success(
            function (data) {
                deferred.resolve(data);
            }
        ).error(function (data) {
            deferred.reject(data);
        });
        return deferred.promise;

    }
    //工具函数
    //从数组中删除某个元素节点
    removeByValue(arr,val){
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==val){
                arr.splice(i,1);
                break;
            }
        }
        return arr;
    }
 //根据id找到该节点的index
    getIndexOf(arr,val){
        for(let i=0;i<arr.length;i++){
            if(arr[i].id==val)
            {
                return i;
            }
        }
        return -1;
    }
    //获取最后一个节点的id
    getLastId(arr){
        let lastId=0;
        for(let i=0;i<arr.length;i++){
            let str=arr[i].id.split('-');
            lastId=Number.parseInt(str[str.length-1]);
        }
        return lastId;
    }
    //判断对象是否为空,JSON自带的.stringify方法
    isEmptyObject(obj){
        if(JSON.stringify(obj)=='{}')
            return true;
        else
            return false;
    }

}

export default CaseService;