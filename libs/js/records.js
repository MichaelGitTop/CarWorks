var myApp = angular.module( "myApp", [] );
//加载头部；
myApp.controller( "headerCtrl", function( $scope, $http, $compile ) {
	$http.get( "header.html?_" + Math.random() ).success( function( data ){
		$( "header" ).html( data );
		$( "header span" ).removeClass( 'active' );
		$( "header span:eq(1)" ).addClass( 'active' );
	});
	
})

myApp.controller( "containerCtrl", function( $scope, $http, $compile ) {
	
	$http.get( 'libs/data/service_detail.json' ).success( function( data ){
		var serviceInfo = window.eval( window.localStorage.getItem( 'serviceInfo' ) );
		console.log( serviceInfo );
		var serviceId = serviceInfo[0];
		$scope.serName = data[serviceId];
		$scope.serTime = serviceInfo[1];
		$scope.serPrice = serviceInfo[2];
		
		console.log( data );
		$scope.addedSers = data.addedSer;
		var addedSer_key = [];
		for( var key in data.addedSer ){
			addedSer_key.push( key );
		}
		$scope.addedSer_key = addedSer_key;
		
		//计算总金额
		$scope.price_count = $scope.serPrice;
		$scope.allPrice = function(){
			$scope.price_count = $scope.serPrice;
			for( var key in $scope.addedSers ){
				if( $scope.addedSers[key].addedSer_check ){
					$scope.price_count = Number( $scope.price_count ) + Number( $scope.addedSers[key].serPrice_now );
				}
			}
			console.log( '总价:' + $scope.price_count );
		}
	});
	
	$scope.choose_addedSer = function( obj, index ){
		obj.addedSer_check = !obj.addedSer_check;
		if( obj.addedSer_check ){
			$( '.addedSer .ser_p:eq(' + index + ') i:first' ).css( 'color', '#cc3333' );
		}else{
			$( '.addedSer .ser_p:eq(' + index + ') i:first' ).css( 'color', '' );
		}
	};
	
	
	//计算总金额
//	function count_pay(){
//		var pay_count = 0;
//		console.log( '选中的数量：' + $( '.good_option i[choose=1]' ).length )
//		$.each( $( '.good_option i[choose=1]' ), function( index, obj ){
//			good_price = parseInt( $( this ).closest( '.cart_good' ).find( '.good_price span' ).html() );
//			goods_count = parseInt( $( this ).closest( '.cart_good' ).find( '.goods_count' ).html() );
//			pay_count += good_price * goods_count;
//			console.log( '商品信息：' + good_price  + '*' + goods_count );
//		})
//		console.log( '总金额：' + pay_count );
//		$( 'footer .row li:last span' ).html( pay_count );
//	}
})