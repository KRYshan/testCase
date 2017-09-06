import caseTreeController from './caseTree.controller';
import caseOperateController from './caseOperate.controller';
import caseShowController from './caseShow.controller';
import caseService from './case.service';
import searchTreeDirective from './serachTree.directive';
/*
显示注入，不然压缩完了之后，会出现错误
 */
caseTreeController.$inject=['$state', 'caseService', '$scope', 'uiAlert','uiNotification','$q'];
caseOperateController.$inject=['$stateParams','caseService','$state','$scope'];
caseShowController.$inject=['$stateParams','caseService','$state','$scope'];
caseService.$inject=['$q','$timeout','$http','$resource','$window'];
export default
angular.module('testCase.case', ['pasp.ui','ngResource'])
    .service('caseService',caseService)
    .controller('caseTreeController',caseTreeController)
    .controller('caseOperateController',caseOperateController)
    .controller('caseShowController', caseShowController)
    .directive('search',searchTreeDirective)
    .name;