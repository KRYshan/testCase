import searchTreeUrl from './serachTree.view.html';
export default function SearchTreeDirective(caseService,$timeout) {
    "ngInject";

    return {
        restrict: 'E',
        scope: {
            searchModel: '=',
            enterKeyEvent: '&'
        },
        templateUrl: searchTreeUrl,
        link: function ($scope,$element) {
            let timer;
            let selectListIndex;
            $scope.vm = {};
            $scope.method = {};

            function initParams() {
                $scope.vm = {
                    selectedData: {},
                    dataList: [],
                    searchShow: false
                };
            }

            function init() {
                initParams();
            }

            $scope.method.searchData = function () {
                if ($scope.searchModel === undefined) {
                    return;
                }
                //非空的时候，异步请求联想词
                if ($scope.searchModel.length > 0) {
                    let keyWord = $scope.searchModel;
                    caseService.getSearchWords(keyWord).then(function (data) {
                        if (data && (data.code == 1)&&(data.keywords)&&data.keywords.length>0) {
                            $scope.vm.dataList = data.keywords;
                            selectListIndex = -1;
                            $scope.vm.searchShow = true;
                        }
                    });

                }
            };
            $scope.method.closeSearch = function () {
                $scope.vm.searchShow = false;
            }
            $scope.method.keyDownEvent = function ($event) {
                $event.stopPropagation();
                let listArray = $scope.vm.dataList;
                switch ($event.keyCode) {
                    case 38:
                        selectListIndex--;
                        if (selectListIndex >= 0 && selectListIndex < listArray.length) {
                            for (let i = 0; i < listArray.length; i++) {
                                let targetA = document.getElementById('searchList').getElementsByTagName('a')[i];
                                targetA.className = targetA.className.replace('selected', '');
                                if (i === selectListIndex) {
                                    targetA.className = targetA.className + ' ' + 'selected';
                                    $scope.searchModel = targetA.innerHTML;
                                }
                            }
                        } else if (selectListIndex < 0) {
                            selectListIndex = listArray.length - 1;
                            let targetA = document.getElementById('searchList').getElementsByTagName('a')[selectListIndex];
                            let targetB = document.getElementById('searchList').getElementsByTagName('a')[0]
                            targetB.className = targetB.className.replace('selected', '');
                            targetA.className = targetA.className + ' ' + 'selected';
                            $scope.searchModel = targetA.innerHTML;
                        }
                        break;
                    case 40:
                        selectListIndex++;
                        if (selectListIndex >= 0 && selectListIndex < listArray.length) {
                            for (let i = 0; i < listArray.length; i++) {
                                let targetA = document.getElementById('searchList').getElementsByTagName('a')[i];
                                targetA.className = targetA.className.replace('selected', '');
                                if (i === selectListIndex) {
                                    targetA.className = targetA.className + ' ' + 'selected';
                                    $scope.searchModel = targetA.innerHTML;
                                }
                            }
                        } else if (selectListIndex >= listArray.length) {
                            selectListIndex = 0;
                            let targetA = document.getElementById('searchList').getElementsByTagName('a')[selectListIndex];
                            let targetB = document.getElementById('searchList').getElementsByTagName('a')[listArray.length];
                            targetB.className = targetB.className.replace('selected', '');
                            targetA.className = targetA.className + ' ' + 'selected';
                            $scope.searchModel = targetA.innerHTML;
                        }
                        break;
                    case 13:
                       $scope.enterKeyEvent({inputSearch:$scope.searchModel});
                       $scope.method.closeSearch();
                        break;
                }

            }
            $scope.method.mouseOverEvent = function (index) {
                selectListIndex = index;
                let listArray = $scope.vm.dataList;
                for (let i = 0; i < listArray.length; i++) {
                    let targetA = document.getElementById('searchList').getElementsByTagName('a')[i];
                    targetA.className = targetA.className.replace('selected', '');
                    if (i === selectListIndex) {
                        targetA.className = targetA.className + ' ' + 'selected';
                        $scope.searchModel = targetA.innerHTML;
                    }
                }

            }

            $scope.method.timeFlash = function () {
                $timeout.cancel(timer);
                if ($scope.searchModel == '') {
                    $scope.method.closeSearch();
                    return;
                }
                else {
                    timer = $timeout(function () {
                        $scope.method.searchData();
                    }, 400)
                }
            }
            $scope.method.mouseClickEvent=function (data) {
                $scope.enterKeyEvent({inputSearch:data});
                $scope.method.closeSearch();

            }
            /*
            $scope.method.enterKeyEvent=function(data){
                   //根据输入的关键字进行查找
                    caseService.getSearchRoot(data).then(function(data){
                        if(data.length>0){
                            caseService.treeNodes=data;
                            let parentNode= data[0];
                            let newNode;
                            caseService.getTreeNode(parentNode.id).then(function (data) {
                                if(data.length>0){
                                    for(let i=0;i<data.length;i++){
                                        newNode=data[i];
                                        if (parentNode.children.push(newNode)) {
                                            parentNode.expanded = true;
                                            $scope.method.closeSearch();
                                        }
                                    }
                                }
                            });
                        }
                        else{
                            uiAlert.warning("搜索项不存在");
                            $scope.method.closeSearch();

                        }
                    });


                }
            }
            */


            /*
            return {
                "restrict":'E',
                "$scope":{
                    enterKeyEvent:'&'
                },
                replace:false,
                templateUrl:searchTreeUrl,
            }
            */
        }
    }
}
