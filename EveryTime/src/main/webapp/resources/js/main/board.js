////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boardList = {};
var boardContent = {};
var nowContentId = "";
var option = "write";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 함수 //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 초기화
function boardInit() {
	$("#timeTable").css("display", "none");
	$("#board").css("display", "block");
	$("#boardList").css("display", "inline-block");
	$("#boardContent").css("display", "none");
	$("#boardWrite").css("display", "none");
	
	$("#boardTitle").val("");
	$("textarea#boardContent").val("");
	
	getBoardList();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 데이터 불러오기 //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 목록 불러오기
function getBoardList() {
	var list = "";
	 
	requestData("getBoardList.do").done(function(result){
		boardList = result;
		drawBoardList();
	});
}

// 조회 수 쿠키 검사
function hitBoardContent(selectedId) {
	var deferred = $.Deferred();
	
	try{
		if(!getCookie("hitCookie" + selectedId + loginUser)) {
			setCookie("hitCookie" + selectedId + loginUser, "true", 1);
			
			var param = "selectedId=" + selectedId; 
		
			requestData("hitBoardContent.do", param).done(function(result) {
				deferred.resolve(result);
			});
		}
		else {
			deferred.resolve("success");
		}	
	} catch(e) {
		deferred.reject(e);
	}
	
	return deferred.promise();
}

// 게시판 내용 불러오기
function getBoardContent(selectedId) {
	hitBoardContent(selectedId).done(function(){
		var param = "selectedId=" + selectedId; 
				
		requestData("getBoardContent.do", param).done(function(result){
			boardContent = result;	
			
			drawBoardContent();
		});
	});
}

function setBoardContent() {
	// 저장 시 필요한 내용: 제목, 내용, 작성자, 날짜
	var title = $("#boardTitle").val();
	var content = $("textarea#boardContent").val();	
	var date = getTimeStamp(new Date());
	
	// 글 제목, 내용 검사
	if(title === "") {
		alert("제목을 작성해주세요.");
		return false;
	}
	else if(content === "") {
		alert("내용을 작성해주세요.");
		return false;
	}
	
	// 파라미터 생성
	var param = "title=" + title + "&content=" + content + "&date=" + date;
	
	// 글 작성
	if(option === "write") {
		requestData("setBoardContent.do", param).done(function(result){
			if(result == "success") {
				alert("작성 되었습니다.");
				boardInit();
			} else {
				alert("작성 실패하였습니다.");
			}
		});
	}
	
	// 글 수정
	else if(option === "modify") {
		param += "&id=" + nowContentId;
		
		requestData("modBoardContent.do", param).done(function(result){
			if(result == "success") {
				alert("수정 되었습니다.");
				boardInit();
			} else {
				alert("수정 실패하였습니다.");
			}
		});
	}
}

function delBoardContent() {
	var param = "id=" + nowContentId;
	
	requestData("delBoardContent.do", param).done(function(result){
		if(result == "success") {
			alert("삭제 되었습니다.");
			boardInit();
		} else {
			alert("삭제 실패하였습니다.");
		}
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 화면에 그리기 ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 목록 그리기
function drawBoardList() {
	var boardListHtml = "";
	var boardListSize = boardList.length;
	
	for(var i = 0; i < boardListSize; i++) {
		boardListHtml += "<tr>";
		boardListHtml += 	"<td>" + (i + 1) + "</td>";
		boardListHtml += 	"<td class='brdTitle' id="+boardList[i]["BRD_ID"]+"><a>" + boardList[i]["BRD_TITLE"]+ "</a></td>";
		boardListHtml += 	"<td>" + boardList[i]["BRD_WRITER"]+ "</td>";
		boardListHtml += 	"<td>" + getTimeStamp(boardList[i]["BRD_DATE"]) + "</td>";
		boardListHtml += 	"<td>" + boardList[i]["BRD_HIT"]+ "</td>";
		boardListHtml += "</tr>";
	}
	
	$("#boardTbody").empty().append(boardListHtml);
	
	initBrdListEvent();
}

// 게시판 내용 그리기
function drawBoardContent() {
	nowContentId = boardContent[0]["BRD_ID"];

	var boardContentHtml = "";
	
	boardContentHtml += "<p>제목: " + boardContent[0]["BRD_TITLE"] + "</p>";
	boardContentHtml += "<p>내용: " + boardContent[0]["BRD_CONTENT"] + "</p>";
	boardContentHtml += "<p>작성자: " + boardContent[0]["BRD_WRITER"] + "</p>";
	boardContentHtml += "<p>작성일: " + getTimeStamp(boardContent[0]["BRD_DATE"]) + "</p>";
	boardContentHtml += "<p>조회수: " + boardContent[0]["BRD_HIT"] + "</p>";
	boardContentHtml += "<button id='backBoardBtn'>뒤로</button>";
	
	if(boardContent[0]["BRD_WRITER"] == loginUser) {
		boardContentHtml += "<button id='modBoardBtn'>수정</button>";
		boardContentHtml += "<button id='delBoardBtn'>삭제</button>";
	}
	
	$("#boardContent").empty().append(boardContentHtml);
	
	initBrdReadEvent();
	
	$("#boardList").css("display", "none");
	$("#boardContent").css("display", "block");
	$("#boardWrite").css("display", "none");
}

// 게시판 글 작성 부분 그리기
function drawWriteBoard() {
	$("#boardList").css("display", "none");
	$("#boardContent").css("display", "none");
	$("#boardWrite").css("display", "block");
	
	initBrdWriteEvent();
}

// 게시판 글 수정 부분 그리기
function drawModBoard() {	
	drawWriteBoard();
	
	$("#boardTitle").val(boardContent[0]["BRD_TITLE"]);
	$("textarea#boardContent").val(boardContent[0]["BRD_CONTENT"]);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 게시판 이벤트 ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 이벤트 등록
function initBrdListEvent() {
	// 게시판 글 제목 클릭 시
	$(".brdTitle").off("click").on("click", function() {
		var selectedId = this.id;

		getBoardContent(selectedId);
	});
	
	// 게시판 글 작성 버튼 클릭 시
	$("#boardWriteBtn").off("click").on("click", function(){
		option = "write";
		drawWriteBoard();
	});
}

// 게시판 글 읽기 이벤트 등록
function initBrdReadEvent() {	
	// 뒤로 버튼 클릭 시
	$("#backBoardBtn").off("click").on("click", function(){
		boardInit();
	});
	
	// 수정 버튼 클릭 시
	$("#modBoardBtn").off("click").on("click", function(){
		option = "modify";
		drawModBoard();
	});
	
	// 삭제 버튼 클릭 시
	$("#delBoardBtn").off("click").on("click", function(){
		delBoardContent();
	});
}

function initBrdWriteEvent() {
	// 게시판 글 작성 후 작성하기 버튼 클릭 시
	$("#writeBtn").off("click").on("click", function(){	
		setBoardContent();
	});
	
	// 게시판 글 작성 후 뒤로 버튼 클릭 시
	$("#backBtn").off("click").on("click", function(){
		boardInit();
	});
}

/*
	TODO
	1. 게시판 글 작성 후 등록 *
	2. 게시판 글 수정 *
	3. 게시판 글 삭제 *
	4. 조회수 *
	5. 작성일 *
	6. 글 10개씩 출력 되도록
	7. 공백 입력시 저장 못하게 막기 *
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// 기타 함수 ////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
