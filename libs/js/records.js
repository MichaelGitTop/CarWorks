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
		var key_index = 0;	//给添加服务加上一个下标
		for( var key in data.addedSer ){
			addedSer_key.push( key );
			data.addedSer[key].index = key_index;	//给添加服务加上一个下标
			key_index++;	//给添加服务加上一个下标
		}
		$scope.addedSer_key = addedSer_key;
		
		//默认点选价格为0的添加服务
		window.onload = function(){
			for( var key in $scope.addedSers ){
				if( $scope.addedSers[key].serPrice_now <= 0 ){
					$( '.addedSer .ser_p:eq(' + $scope.addedSers[key].index + ')').trigger( 'click' )
				}
			}
		}
		
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
		
		//计算服务总耗时
		$scope.time_count = $scope.serTime;
		$scope.completionDate = completionDate( $scope.time_count );
		$scope.allTime = function(){
			$scope.time_count = $scope.serTime;
			for( var key in $scope.addedSers ){
				if( $scope.addedSers[key].addedSer_check ){
					$scope.time_count = Number( $scope.time_count ) + Number( $scope.addedSers[key].serTime );
				}
			}
			console.log( '总耗时:' + $scope.time_count );
			$scope.completionDate = completionDate( $scope.time_count );
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
	
//	console.log( completionDate( 16800 ) );	//耗时：分钟
	function completionDate( takingTime ){
		var currentDate = new Date();	//当前时间
		var addedDate = new Date( currentDate.getTime() + takingTime*60000 );	//添加时间后的日期
		if( currentDate.getDate() == addedDate.getDate() && takingTime <= 24*60 ){	//今天内完工
			console.log( addedDate.getHours() + ':' + oneToTwo( addedDate.getMinutes() ) );
			if( addedDate.getMinutes() < 30 ){
				return '今天' + addedDate.getHours() + ':30' + '前完工';
			}else if( addedDate.getMinutes() > 30 ){
				return '今天' + ( addedDate.getHours()+1 )+ ':00' + '前完工';
			}else{
				return '今天' + addedDate.getHours() + ':' + oneToTwo( addedDate.getMinutes() ) + '前完工';
			}
		}else if( addedDate.getDate()-currentDate.getDate() == 1 && takingTime <= 48*60 ){	//次日完工
			console.log( addedDate.getHours() + ':' + oneToTwo( addedDate.getMinutes() ) );
			if( addedDate.getMinutes() < 30 ){
				return '明天' + addedDate.getHours() + ':30' + '前完工';
			}else if( addedDate.getMinutes() > 30 ){
				return '明天' + ( addedDate.getHours()+1 )+ ':00' + '前完工';
			}else{
				return '明天' + addedDate.getHours() + ':' + oneToTwo( addedDate.getMinutes() ) + '前完工';
			}
		}else{
			return addedDate.getDate() + '日' + ( addedDate.getHours()+1 ) + '点前完工';
		}
	}
	
	function oneToTwo( num ){
		if( String( num ).length === 1 ){
			return( '0' + String( num ) );
		}else{
			return num;
		}
	}
	
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