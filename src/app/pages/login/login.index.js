import router from './login.router';
import controller from './login.controller';
import topbarController from './topbar.controller';
/*
显示注入，不然压缩完了之后，会出现错误
 */
controller.$inject=['$state','$http','$window'];
topbarController.$inject=['$window'];
export default
angular.module('testCase.login', ['pasp.ui'])
       .controller('controller',controller)
       .controller('topbarController',topbarController)
       .config(router)
       .name;