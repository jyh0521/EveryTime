// 데이터 요청
function requestData(url, param) {
	var deferred = $.Deferred();
	
	try{
		$.ajax({
			url : url,
			type : "post",
			data : param,
		}).done(function(result){
			deferred.resolve(result);
		});
		
	} catch(e) {
		deferred.reject(e);
	}
	
	return deferred.promise();
}

// 현재 시간을 구하는 함수 yyyy-mm-dd hh:mm:ss 형태로
function getTimeStamp(date) {
	var d = new Date(date);
	var s =
    leadingZeros(d.getFullYear(), 4) + '-' +
    leadingZeros(d.getMonth() + 1, 2) + '-' +
    leadingZeros(d.getDate(), 2) + ' ' +

    leadingZeros(d.getHours(), 2) + ':' +
    leadingZeros(d.getMinutes(), 2) + ':' +
    leadingZeros(d.getSeconds(), 2);

	return s;
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	
	if (n.length < digits) {
		for (i = 0; i < digits - n.length; i++)
	    	zero += '0';
	}
	
	return zero + n;
}

// 쿠키 등록, 검색, 삭제
function setCookie(name, value, exp) {
	var date = new Date();
	
	date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

function getCookie(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
	
	return value? value[2] : null;
};

function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
