class controller {
    constructor($state, $http, $window) {
        this.$window = $window;
        this.$http = $http;
        this.$state = $state;
        //必须用大写字母
        this.user = this.loadLocalStorage();
        this.userCheck = true;
        this.userRemeber = true;

    }

    //记住密码
    loginRemeber(lg) {
        let userName = lg.user.userName;
        let userPassword = lg.user.userPassword;
        if (lg.userRemeber) {
            this.$window.localStorage.REMEBER = angular.toJson({
                "userName": userName,
                "userPassword": userPassword,
                //设置15天过期
                "newDate": lg.dateExpire("d", 15, new Date())

            });
        }
        else {
            this.$window.localStorage.clear();

        }
    }

    //初始化user
    loadLocalStorage() {
        let user = angular.fromJson(this.$window.localStorage.REMEBER);
        if (user != null) {
            if (new Date() > new Date(user.newDate)) {
                this.$window.localStorage.clear();
            }
            else {
                return user;
            }
        }

    }

    /*
     * 功能：设置记住密码的过期时间
     * 参数:interval:字符串表达式，表示时间间隔单位
     *       number:数值表达式，表示时间的间隔数量
     *       date:时间对象，表示当前时间
     *
     */
    dateExpire(interval, number, date) {
        switch (interval) {
            case "y": {
                date.setFullYear(date.getFullYear() + number);
                return date;
                break;
            }
            case "m": {
                date.setMonth(date.getMonth() + number);
                return date;
                break;
            }
            case "d": {
                date.setDate(date.getDate() + number);
                return date;
                break;
            }
            case "h": {
                date.setHours(date.getHours() + number);
                return date;
                break;
            }
            case "m": {
                date.setMinutes(date.getMinutes() + number);
                return date;
                break;
            }
            case "s": {
                date.setSeconds(date.getSeconds() + number);
                return date;
                break;
            }
            default  : {
                date.setDate(d.getDate() + number);
                return date;
                break;
            }
        }
    }

    //远程和本地测试情况，出现了跨域问题[已解决] [已跑通]
    /*
        login(lg){
            let user={
                userName:this.user.userName,
                userPassword:this.user.userPassword
            };
            this.$http({
                method: 'post',
                 //本地
                url:'http://localhost:8080/testcasepro2/login',
                //远程调用api
                  // url: 'http://192.168.1.9:8080/testcasepro2/login',
                data:user
                })
                .success(function(data) {
                        let usermess=data;
                        if(usermess.code==1) {
                             //记住密码
                            lg.loginRemeber(lg);
                            //获取userid，跳转到相应的页面
                             lg.$window.sessionStorage.USER=angular.toJson({
                                "userName":user.userName
                            });
                            lg.$state.go("home");
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

    login(lg) {
        let user = {
            "userName": lg.user.userName,
            "userPassword": lg.user.userPassword
        };
        this.$http.get('json/user.json', user)
            .success((data) => {
                    let usermess = data;
                    if (usermess.code == 1) {
                        //记住密码
                        lg.loginRemeber(lg);
                        //获取userId，并保存userId
                        let userId=usermess.message.userId;
                        lg.$window.sessionStorage.USER = angular.toJson({
                            "userName": user.userName,
                            "userId":userId
                        });
                        //页面跳转
                        lg.$state.go("home");
                    }
                    else {
                        lg.userCheck = false;
                    }
                }
            ).error(() => {
            lg.userCheck = false;
        });
    }

}

export default controller;