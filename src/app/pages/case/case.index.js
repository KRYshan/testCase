import controller from './case.controller';
import addCaseController from './addCase.controller';
import caseService from './case.caseService';
/*
显示注入，不然压缩完了之后，会出现错误
 */
addCaseController.$inject=['$stateParams','caseService'];
caseService.$inject=['$q','$timeout','$http','$resource'];
export default
angular.module('testCase.case', ['pasp.ui','ngResource'])
    .service('caseService',caseService)
    .controller('controller',controller)
    .controller('addCaseController',addCaseController)
    .name;