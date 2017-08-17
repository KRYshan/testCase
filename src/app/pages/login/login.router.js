import templateUrl from './login.view.html';
import forgetUrl from './forget.view.html';
import catalogueUrl from '../case/catalogue.view.html';
import addCaseUrl from '../case/addCase.view.html';
import homeCaseUrl from '../case/homeCase.view.html';
import updateCaseUrl from '../case/updateCase.view.html';
import showCaseUrl  from '../case/showCase.view.html';
import topbarUrl from '../case/topbar.view.html';
import caseController  from '../case/case.controller';
import addCaseController  from '../case/addCase.controller';
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

    ).state('homeCase.catalogue', {
        url: '/catalogue',
        controller: caseController,
        controllerAs: 'cs',
        views:{
            'main@homeCase':{
                controller: caseController,
                controllerAs: 'cs',
                templateUrl:catalogueUrl
            }
        }

    }).state('homeCase.catalogue.addCase',{
        controller: addCaseController,
        controllerAs: 'acc',
        url:'/addCase',
        templateUrl:addCaseUrl,
        params:{"nodeId":{}}

    }).state('homeCase.catalogue.updateCase',{
        controller: addCaseController,
        controllerAs: 'acc',
        url:'/updateCase',
        templateUrl:updateCaseUrl,
        params:{"nodeId":{}}
    }).state('forget',{
        url:'/forget',
        controller:controller,
        controllerAs:'lg',
        templateUrl:forgetUrl
    });
}