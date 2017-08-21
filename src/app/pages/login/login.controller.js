class Controller {
    constructor($state, $http) {
        //  this.$scope = $scope;
        this.$http = $http;
        this.$state = $state;
        this.user = {};
        this.userCheck = true;
        this.userRemeber=false;

    }


  //远程和本地测试情况，出现了跨域问题[已解决] [已跑通]
/*
    login(lg){
        var user={
            userName:this.user.userName,
            userPassword:this.user.userPassword
        };
        this.$http({
            method: 'post',
             //本地
            //url:http://localhost:8080/TestCasePro2/login
            //远程调用API
            url: 'http://192.168.1.9:8080/TestCasePro2/login',
            data:user
            })
            .success(function(data) {
                    var userMess=data;
                    if(userMess.code==1) {
                        //获取userId，跳转到相应的页面
                        lg.$state.go("homeCase");
                    }
                    else{
                        lg.userCheck = false;
                    }
                }
            ).error(function () {
            lg.userCheck = false;
        });
    }

*/
  //本地测试情况
    login(lg){
        var user={
            userName:this.user.userName,
            userPassword:this.user.userPassword,
            userRemeber:this.userRemeber
        };
        this.$http.get('json/user.json',user)
            .success((data) =>{
                    var userMess=data;
                    if(userMess.code==1) {
                        //获取userId，跳转到相应的页面
                      lg.$state.go("homeCase");
                    }
                    else{
                        lg.userCheck = false;
                    }
                }
            ).error(()=> {
            lg.userCheck = false;
        });
    }
}
export default Controller;