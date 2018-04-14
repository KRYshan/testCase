import templateUrl from './login.view.html';
import forgetUrl from './forget.view.html';
import caseUrl from '../case/case.view.html';
import addCaseUrl from '../case/addCase.view.html';
import homeUrl from './home.view.html';
import updateCaseUrl from '../case/updateCase.view.html';
import showCaseUrl from '../case/showCase.view.html';
import topbarUrl from './topbar.view.html';
import caseTreeController  from '../case/caseTree.controller';
import caseOperateController  from '../case/caseOperate.controller';
import caseShowController  from '../case/caseShow.controller';
import topbarController  from './topbar.controller';
import controller  from './login.controller';
export default function config($urlRouterProvider, $stateProvider) {
    "ngInject";

    $urlRouterProvider.otherwise('/');
    $stateProvider.state('login', {
        url: '/',
        name:'login',
        controller: controller,
        controllerAs: 'lg',
        templateUrl: templateUrl
    }).state('home',{
        url:'/home',
        name:'home',
        views:{
            '':{
                templateUrl:homeUrl
            },
            'topbar@home':{
                templateUrl:topbarUrl,
                controller:topbarController,
                controllerAs:'tc'
            }
        }

        }

    )
        .state('home.case', {
        name:'home.case',
        url: '/case',
        controller: caseTreeController,
        controllerAs: 'ctc',
        views:{
            'main@home':{
                controller: caseTreeController,
                controllerAs: 'ctc',
                templateUrl:caseUrl
            }
        }

    }).state('home.case.addCase',{
        name:'home.case.addCase',
        controller: caseOperateController,
        controllerAs: 'coc',
        url:'/addCase',
        templateUrl:addCaseUrl,
        params:{"nodeId":{},"nodeTitle":{}}

    }).state('home.case.updateCase',{
        name:'home.case.updateCase',
        controller: caseOperateController,
        controllerAs: 'coc',
        url:'/updateCase',
        templateUrl:updateCaseUrl,
        params:{"nodeId":{},"nodeTitle":{}}
    }).state('home.case.showCase',{
        name:'home.case.showCase',
        controller: caseShowController,
        controllerAs: 'csc',
        url:'/showCase',
        templateUrl:showCaseUrl,
        params:{"nodeId":{},"nodeTitle":{}}
    }).state('forget',{
        name:'forget',
        url:'/forget',
        controller:controller,
        controllerAs:'lg',
        templateUrl:forgetUrl
    });

}