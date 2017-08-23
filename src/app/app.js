import 'jquery_js';
import 'framework_js';
import 'pasp_js';
import 'pasp_css';
import 'testCase_css';
;
/**
 * 自动页面加载
 */
let dependencies = [];
let pageModules = require.context('./pages/', true, /\.index.js$/);
pageModules.keys().forEach((key) => {
    dependencies.push(pageModules(key).default);
});


/**
 * 创建应用
 */
let app = angular.module('testCase', dependencies);

//跨域

//let app = angular.module('testCase', dependencies).config(["$httpProvider", function ($httpProvider) {
    //更改 Content-Type
    //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8";
   // $httpProvider.defaults.headers.post["Accept"] = "*/*";
   // $httpProvider.defaults.transformRequest = function (data) {
        //把JSON数据转换成字符串形式
   //   if (data !== undefined) {
    //       return $.param(data);
    //   }
     //  return data;
   // };
//}]);

/**
 * 注册应用
 */
angular.bootstrap(document.body, [app.name]);
