var loginUser = "";

mainInitialize();

function mainInitialize() {
	sessionChk();
	mainInitBtnEvent();
}

// 버튼 이벤트
function mainInitBtnEvent() {
	// 로그아웃 버튼 클릭시
	$("#logoutBtn").off("click").on("click", function(){
		logout();
	});
	
	// 홈 버튼 클릭시
	$("#homeBtn").off("click").on("click", function(){
		// home.js
		homeInit();
	});
	
	// 시간표 버튼 클릭시
	$("#timeTableBtn").off("click").on("click", function(){
		// timeTable.js
		timeTableInit();
	});		
	
	// 게시판 버튼 클릭시
	$("#boardBtn").off("click").on("click", function(){
		// board.js
		boardInit();
	});	
}

// 세션 체크 함수
function sessionChk() {
	$.ajax({
		url : "sessionChk.do",
		success : function(result) {
			if(!result) {
				alert("로그인 해주세요.");
				window.location.replace("login");
			} 
		}
	})
	.done(function(result){
		$("#loginUser").empty().append(result + "님, 환영합니다!");
		loginUser = result;
	});
}

function logout() {
	$.ajax({
		url : "logout.do",
		type : "post",
		success: function(responseData) {
			alert("로그아웃 되었습니다.")
			window.location.replace("login");
		}
	});	
}