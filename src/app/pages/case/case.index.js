import caseTreeController from './caseTree.controller';
import caseContentController from './caseContent.controller';
import caseService from './case.service';
/*
显示注入，不然压缩完了之后，会出现错误
 */
caseTreeController.$inject=['$state', 'caseService', '$scope', 'uiAlert'];
caseContentController.$inject=['$stateParams','caseService','$state'];
caseService.$inject=['$q','$timeout','$http','$resource'];
export default
angular.module('testCase.case', ['pasp.ui','ngResource'])
    .service('caseService',caseService)
    .controller('caseTreeController',caseTreeController)
    .controller('caseContentController',caseContentController)
    .name;