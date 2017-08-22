import templateUrl from './login.view.html';
import forgetUrl from './forget.view.html';
import caseTreeUrl from '../case/caseTree.view.html';
import addCaseUrl from '../case/addCase.view.html';
import homeCaseUrl from '../case/homeCase.view.html';
import updateCaseUrl from '../case/updateCase.view.html';
import topbarUrl from '../case/topbar.view.html';
import caseTreeController  from '../case/caseTree.controller';
import caseContentController  from '../case/caseContent.controller';
import controller  from './login.controller';
export default function config($urlRouterProvider, $stateProvider) {
    "ngInject";

    $urlRouterProvider.otherwise('/');
    $stateProvider.state('login', {
        url: '/',
        controller: controller,
        controllerAs: 'lg',
        templateUrl: templateUrl
    }).state('homeCase',{
        url:'/homeCase',
        views:{
            '':{
                templateUrl:homeCaseUrl
            },
            'topbar@homeCase':{
                templateUrl:topbarUrl
            }
        }

        }

    ).state('homeCase.caseTree', {
        url: '/caseTree',
        controller: caseTreeController,
        controllerAs: 'ctc',
        views:{
            'main@homeCase':{
                controller: caseTreeController,
                controllerAs: 'ctc',
                templateUrl:caseTreeUrl
            }
        }

    }).state('homeCase.caseTree.addCase',{
        controller: caseContentController,
        controllerAs: 'ccc',
        url:'/addCase',
        templateUrl:addCaseUrl,
        params:{"nodeId":{},"nodeTitle":{}}

    }).state('homeCase.caseTree.updateCase',{
        controller: caseContentController,
        controllerAs: 'ccc',
        url:'/updateCase',
        templateUrl:updateCaseUrl,
        params:{"nodeId":{},"nodeTitle":{}}
    }).state('forget',{
        url:'/forget',
        controller:controller,
        controllerAs:'lg',
        templateUrl:forgetUrl
    });

}