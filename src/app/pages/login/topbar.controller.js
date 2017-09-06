class TopbarController {
    constructor($window) {
        this.$window=$window;
        this.user=angular.fromJson(this.$window.sessionStorage.USER);

    }


}
export default TopbarController;