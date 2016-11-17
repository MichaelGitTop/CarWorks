
var myApp = angular.module( "myApp", ["ngSanitize"] );
//加载头部；
myApp.controller("headerCtrl", function( $scope, $http, $compile ) {
	$http.get( "header.html?_" + Math.random() ).success( function( data ){
		$compile( $("header").html(data) )($scope);
	});
//	$scope.fa = function(){
//		console.log("a")
//	}
})
//加载服务选项
myApp.controller( "containerCtrl", function( $scope, $http,$compile ){
	//请求页面数据
	$http.get("libs/data/service.json").success( function( data ){
		$scope.data = data.service;
	} );
	//点击问号查看服务详情
	$scope.details = function( key,$event ){
		//传一个$event,阻止事件冒泡
		$event.stopPropagation()
		//把被点击的服务的对象传过来
		$scope.detailPage = key;
		//服务详情项前面的点
		$scope.circle = "<span>.</span>";
		//加载服务详情介绍页面
		$http.get("workDetail.html?_" + Math.random()).success( function( data ){
			$compile( $(".z_details").html(data) )($scope)
		} )
		
	}
	//点击黑色遮罩层关闭服务详情介绍页面
	$scope.close = function(){
		$(".work_details").remove();
	}
	//选择服务
	$scope.chooseService = function( key ){
		console.log(key);
		//点击该项服务后，取出该服务的id，存入本地存储；
		var serviceId = key.serviceID;
		var serviceLength = key.serviceLength;
		var servicePrice = key.servicePrice;
		var serviceInfo = [serviceId,serviceLength,servicePrice];
		var serviceInfoStr = JSON.stringify( serviceInfo );
		window.localStorage.setItem( "serviceInfo",serviceInfoStr );
		var id = window.localStorage.getItem("serviceInfo");
		window.location.href = "records.html?_"+Math.random();
	}
})

			
//myApp.directive('imgHeight', function() {
//	return {
//		restrict: 'AE',
//		link: function(scope, element, attr) {
//				$(".imgBox img").height( $(".imgBox").height() );
//				console.log("a")
//			}
//	}
//})
		
