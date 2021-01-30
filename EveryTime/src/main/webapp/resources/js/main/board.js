////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 변수 //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var boardMenuList = {};
var boardContentList = {};
var boardContent = {};
var boardContComment = {};

var selectedMenuId = "";
var selectedMenuVal = "";
var selectedId = "";
var selectedCommentId = "";

var option = "write";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// 함수 //////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 초기화
function boardInit() {
	$("#timeTable").css("display", "none");
	$("#board").css("display", "block");
	$("#boardContentList").css("display", "none");
	$("#boardMenuList").css("display", "block");
	$("#boardContent").css("display", "none");
	$("#boardWrite").css("display", "none");
	
	$("#boardTitle").val("");
	$("textarea#boardContent").val("");
	
	selectedId = "";
	
	getBoardMenuList();
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 데이터 불러오기 //////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 메뉴 목록 불러오기
function getBoardMenuList() {
	requestData("getBoardMenuList.do").done(function(result){
		boardMenuList = result;
		
		drawBoardMenuList();
		initBrdMenuListEvent();
	});
}

// 내가 쓴 글 목록 불러오기
function getMyContentList() {
	var param = "loginUser=" + loginUser;
	 
	requestData("getMyContentList.do", param).done(function(result){
		boardContentList = result;
		totalData = result.length;
		
		drawBoardContentList();
	});
}

// 내가 쓴 댓글 목록 불러오기
function getMyCommentList() {
	
}

// 게시판 목록 불러오기
function getBoardContentList() {
	var param = "selectedMenuId=" + selectedMenuId;
	 
	requestData("getBoardContentList.do", param).done(function(result){
		boardContentList = result;
		totalData = result.length;
		
		drawBoardContentList();
	});
}

// 조회 수 쿠키 검사
function hitBoardContent() {
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
function getBoardContent() {
	hitBoardContent().done(function(){
		var param = "selectedId=" + selectedId; 
				
		requestData("getBoardContent.do", param).done(function(result){
			boardContent = result["CONTENT"];
			boardContComment = result["COMMENT"];	
			
			// 게시판 내용, 댓글 그리기
			drawBoardContent();	
			drawBoardComment();
			
			// 게시판 글 읽기 이벤트
			initBrdReadEvent();
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
	var param = "title=" + title + "&content=" + content +"&date=" + date + "&selectedMenuId=" + selectedMenuId;
	
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
		param += "&id=" + selectedId;
		
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
	var param = "id=" + selectedId;
	
	requestData("delBoardContent.do", param).done(function(result){
		if(result == "success") {
			alert("삭제 되었습니다.");
			boardInit();
		} else {
			alert("삭제 실패하였습니다.");
		}
	});
}

// 댓글 작성
function writeBoardComment() {
	var comment = $("textarea#boardContComment").val();
	
	if(comment == null) {
		alert("댓글을 작성해주세요.");
		
		return false;
	} 
	else {
		var param = "comment=" + comment + "&usrId=" + loginUser + "&date=" + getTimeStamp(new Date()) + "&id=" + selectedId;

		requestData("writeBoardComment.do", param).done(function(result) {
			alert("댓글이 작성되었습니다.");
			
			getBoardContent();
		});	
	}
}

// 댓글 삭제
function delBoardComment() {
	var param = "id=" + selectedCommentId.substring(9);
	
	requestData("delBoardComment.do", param).done(function(result){
		alert("댓글이 삭제되었습니다.");
		
		getBoardContent();
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// 화면에 그리기 ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 게시판 메뉴 목록 그리기
function drawBoardMenuList() {
	var boardMenuListHtml = "";
	var boardMenuListSize = boardMenuList.length;
	
	boardMenuListHtml += "<ul>";
	
	for(var i = 0; i < boardMenuListSize; i++) {
		boardMenuListHtml += 	"<li><a class='brdMenuList' id='" + boardMenuList[i]["MENU_CDE"] + "'>"+ boardMenuList[i]["MENU_VAL"] + "</a></li>";
	}
	
	boardMenuListHtml += "</ul>";
	
	$("#boardMenuList").empty().append(boardMenuListHtml);
}

// 게시판 목록 그리기
function drawBoardContentList() {
	$("#boardMenuList").css("display", "none");
	$("#boardContentList").css("display", "inline-block");
	
	var boardContentListHtml = "";
	var boardContentMenuHtml = "";
	var boardContentListSize = boardContentList.length;
	
	boardContentMenuHtml = "<h3>" + selectedMenuVal + "</h3>";
	$("#boardContentMenu").empty().append(boardContentMenuHtml);
	
	//for(var i = nowPage; i < nowPage + dataPerPage; i++) {
	for(var i = 0; i < boardContentListSize; i++) {
		boardContentListHtml += "<tr>";
		boardContentListHtml += 	"<td>" + (i + 1) + "</td>";
		boardContentListHtml += 	"<td class='brdTitle' id=" + boardContentList[i]["BRD_ID"]+"><a>" + boardContentList[i]["BRD_TITLE"]+ "</a></td>";
		boardContentListHtml += 	"<td>" + boardContentList[i]["BRD_WRITER"] + "</td>";
		boardContentListHtml += 	"<td>" + getTimeStamp(boardContentList[i]["BRD_DATE"]) + "</td>";
		boardContentListHtml += 	"<td>" + boardContentList[i]["BRD_HIT"] + "</td>";
		boardContentListHtml += "</tr>";
	}
	
	$("#boardTbody").empty().append(boardContentListHtml);
	
	//paging(totalData, dataPerPage, pageCount, 1);
	
	initBrdListEvent();
}

// 게시판 내용 그리기
function drawBoardContent() {
	var boardContentHtml = "";
	
	boardContentHtml += "<p>제목: " + boardContent[0]["BRD_TITLE"] + "</p>";
	boardContentHtml += "<p>내용: " + boardContent[0]["BRD_CONTENT"] + "</p>";
	boardContentHtml += "<p>작성자: " + boardContent[0]["BRD_WRITER"] + "</p>";
	boardContentHtml += "<p>작성일: " + getTimeStamp(boardContent[0]["BRD_DATE"]) + "</p>";
	boardContentHtml += "<p>조회수: " + boardContent[0]["BRD_HIT"] + "</p>";
	boardContentHtml += "<p>게시판: " + boardContent[0]["MENU_VAL"] + "</p>"; 
	boardContentHtml += "<button id='backBoardBtn'>뒤로</button>";
	
	if(boardContent[0]["BRD_WRITER"] == loginUser) {
		boardContentHtml += "<button id='modBoardBtn'>수정</button>";
		boardContentHtml += "<button id='delBoardBtn'>삭제</button>";
	}
	
	$("#Content").empty().append(boardContentHtml);
}

// 게시판 댓글 그리기
function drawBoardComment() {
	var boardCommentHtml = "";
	var boardCommentSize = boardContComment.length;
	
	for(var i = 0; i < boardCommentSize; i++) {
		boardCommentHtml += "<h5>작성자: " + boardContComment[i]["COM_WRITER"] + " 작성일: " +  getTimeStamp(boardContComment[i]["COM_DATE"]) + "</h5>";
		boardCommentHtml += "<h5 style='display: inline;' id='commentId" + boardContComment[i]["COM_ID"] + "'>내용: " + boardContComment[i]["COM_CONTENT"] + "</h5>";
	
		if(boardContComment[i]["COM_WRITER"] == loginUser) {
			boardCommentHtml += "<button class='delCommentBtn'>삭제</button>";
		}
	}
	
	boardCommentHtml += "<h5>댓글 작성하기</h5>";
	boardCommentHtml += "<textarea name='boardContComment' id='boardContComment' cols='40' rows='3'></textarea>";
	boardCommentHtml += "<button id='writeCommentBtn'>작성</button>";
	
	$("#Comment").empty().append(boardCommentHtml);
}

// 게시판 글 작성 부분 그리기
function drawWriteBoard() {
	$("#boardContentList").css("display", "none");
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

// 게시판 메뉴 이벤트 등록
function initBrdMenuListEvent() {
	$(".brdMenuList").off("click").on("click", function(){
		selectedMenuId = this.id;
		selectedMenuVal = this.innerText;
		
		if(selectedMenuId.substr(-3) === "BRD") {
			getBoardContentList();	
		}
		else if(selectedMenuId === "MY_CONTENT") {
			getMyContentList();	
		}
		else if(selectedMenuId === "MY_COMMENT") {
			getMyCommentList();
		}
		
	});
}

// 게시판 이벤트 등록
function initBrdListEvent() {
	// 게시판 글 제목 클릭 시
	$(".brdTitle").off("click").on("click", function() {
		selectedId = this.id;

		getBoardContent();
		
		$("#boardContentList").css("display", "none");
		$("#boardContent").css("display", "block");
		$("#boardWrite").css("display", "none");
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
	
	// 글 수정 버튼 클릭 시
	$("#modBoardBtn").off("click").on("click", function(){
		option = "modify";
		drawModBoard();
	});
	
	// 글 삭제 버튼 클릭 시
	$("#delBoardBtn").off("click").on("click", function(){
		delBoardContent();
	});
	
	// 댓글 작성 버튼 클릭 시
	$("#writeCommentBtn").off("click").on("click", function(){
		writeBoardComment();
	});
	
	// 댓글 삭제 버튼 클릭 시
	$(".delCommentBtn").off("click").on("click", function(){
		selectedCommentId = this.previousElementSibling.id;
		
		delBoardComment();
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
	1. 글 10개씩 출력 되도록
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////// 기타 함수 ////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////