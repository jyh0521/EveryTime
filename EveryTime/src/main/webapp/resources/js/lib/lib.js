////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 페이징 변수
var totalData;
var dataPerPage = 10;
var pageCount = 10;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 함수 //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

// 페이징 함수
function paging(totalData, dataPerPage, pageCount, currentPage) {
	var totalPage = Math.ceil(totalData / dataPerPage);
	var pageGroup = Math.ceil(currentPage / pageCount);
	
	var last = pageGroup * pageCount;
	
	if(last > totalPage) {
		last = totalPage;
	}
	
	var first = last - (pageCount - 1);
	var next = last + 1;
	var prev = first - 1;
	
	var $pagingView = $("#paging");
	var pagingHtml = "";
	
	if(prev > 0) {
		pagingHtml += "<a href='#' id='prev'><</a>";
	}
	
	for(var i = first; i <= last; i++) {
		pagingHtml += "<a href='#' id="+ i + ">" + i + "</a>";
	}
	
	if(last < totalPage) {
		pagingHtml += "<a href='#'>></a>";
	}
	
	$("#paging").html(pagingHtml);
	$("#paging a").css("color", "black");
	/*$("#paginf a#" + currentPage).css({ "text-decoration":"none",
									    "color":"red",
									    "font-weight":"bold" });*/
	
	$("#paging a").click(function(){
		var $item = $(this);
		var $id = $item.attr("id");
		var selectedPage = $item.text();
		
		if($id === "next") {
			selectedPage = next;
		}
		else if($id === "prev") {
			selectedPage = prev;
		}
		
		paging(totalData, dataPerPage, pageCount, selectedPage);		
	});
}
