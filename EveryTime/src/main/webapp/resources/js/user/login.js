initialize();

// 초기화 함수
function initialize() {
	sessionChk();
	initBtnEvent();
}

// 버튼 이벤트
function initBtnEvent() {
	// 로그인 버튼 클릭시
	$("#loginBtn").off("click").on("click", function(){
		loginChk();
	});
	
	// 회원가입 버튼 클릭시
	$("#signUpBtn").off("click").on("click", function(){
		
	});
}

// 세션 체크 함수
function sessionChk() {
	$.ajax({
		url : "sessionChk.do",
		success : function(result) {
			if(result) {
				alert("이미 로그인 되어 있습니다.")
				window.location.replace("main");			
			}
		}
	});
}

// 로그인 함수
function loginChk() {
	var param = $("#loginForm").serialize();
	
	$.ajax({
		url : "login.do",
		type : "post",
		data : param,
		success : function(responseData) {
			if(responseData === "success") {
				alert("로그인 되었습니다.");
				window.location.replace("main");
			} else {
				alert("아이디 혹은 비밀번호를 다시 확인해주세요.");
			}
		}
	});
}