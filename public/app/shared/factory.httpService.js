var httpService = angular.module('myapp.factories.httpService', []);
httpService.factory('myapp.factories.httpService',['$http','myapp.factories.routesService', 'myapp.factories.flightService',function(http,routesService,flightService) {
    var urls;
    var info;
    var callBack;
    var obj = {
        post : function(url,data,callBackFunction) {
          if(url) {
            urls = url;
          }
          if(data) {
            info = data;
          }
          if(typeof callBackFunction == 'function') {
            callBack = callBackFunction;
          }else {
            callBack = function(response, status) {}
          }
          var oRefreshParam = {};
              oRefreshParam.urls = urls;
              oRefreshParam.info = info;
              oRefreshParam.callBack = callBack;
              oRefreshParam.method = "post";
          http.post(urls, info).success(callBack).error((function(oCallBaCKParam){
            return function(err,status) {
              if(status === 401) {
                flightService.setAccessToken('');
                return obj.refreshToken(oCallBaCKParam);
              }
            }
          })(oRefreshParam));
        }, 
        get : function(url,callBackFunction,data) {
          if(url) {
            urls = url;
          }
          if(data) {
            info = data;
          }
          if(typeof callBackFunction == 'function') {
            callBack = callBackFunction;
          } else {
            callBack = function(response, status) {}
          }

           var oRefreshParam = {};
              oRefreshParam.urls = urls;
              oRefreshParam.info = info;
              oRefreshParam.callBack = callBack;
              oRefreshParam.method = "get";

          http.get(urls, {"params":info}).success(callBack).error((function(oCallBaCKParam){
            return function(err,status) {
              if(status === 401) {
                flightService.setAccessToken('');
                return obj.refreshToken(oCallBaCKParam);
              }
            }
          })(oRefreshParam));
        },
        refreshToken : function(oCallBack) {
          http.post(routesService.getaccessToken, {"clientId":"5","uID":"NEW"}).success((function(oCallBack){ 
            return function(data, status) {
              http.defaults.headers.common['access-token'] = data['access-token'];
              flightService.setAccessToken(data['access-token']);
              if(oCallBack.method == 'get') {
                return obj[oCallBack.method](oCallBack.urls,oCallBack.callBack,oCallBack.info);   
              } else{
                return obj[oCallBack.method](oCallBack.urls,oCallBack.info,oCallBack.callBack);   
              }
            }
          })(oCallBack));
        }
    }
    return obj;
}]);

//have to think about call methods and refresh token response to service
