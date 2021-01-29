<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>메인</title>
	<link rel="stylesheet" type="text/css" href="resources/css/style.css">
</head>
<body>
	<c:if test="${! empty usrId}">
	<div id="loginUser">
	</div>
	
	<button id="logoutBtn">로그아웃</button>
	<button id="homeBtn">홈</button>
	<button id="timeTableBtn">시간표</button>
	<button id="boardBtn">게시판</button>
	<div id="main">
		<!-- 시간표 -->
		<div id="timeTable" style="display: none;">
			<p>시간표</p>
		</div>

		<!-- 게시판 -->
		<div id="board" style="display: none;">
			<!-- 게시판 메뉴 목록 -->
			<div id="boardMenuList"></div>
			<!-- 게시판 글 목록 -->
			<div id="boardContentList" style="display: none;">
				<div id="boardContentMenu"></div>
				<table border='1'>
					<thead id="boardThead">
						<tr>
							<td>순서</td>
							<td>제목</td>
							<td>작성자</td>
							<td>작성일</td>
							<td>조회수</td>
						</tr>
					</thead>
					<tbody id="boardTbody">
					</tbody>
				</table>
				<button id="boardWriteBtn">글 작성</button>
			</div>
			
			<!-- 게시판 글 내용 -->
			<div id="boardContent" style="display: none;">
				<div id="Content"></div>
				<div id="Comment"></div>
			</div>
			
			<!-- 게시판 글 작성 -->
			<div id="boardWrite" style="display: none;">
				<form id="boardWriteForm">
					<label for="boardTitle">제목</label>
					<input type="text" name="boardTitle" id="boardTitle" />
					
					<label for="boardContent">내용</label>
					<textarea name="boardContent" id="boardContent" cols="40" rows="8"></textarea>
				</form>
				<button id="writeBtn">작성하기</button>
				<button id="backBtn">뒤로</button>
			</div>
		</div>
	</div>
	</c:if>
</body>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script type="text/javascript" src="resources/js/lib/lib.js"></script>
<script type="text/javascript" src="resources/js/main/main.js"></script>
<script type="text/javascript" src="resources/js/main/board.js"></script>
<script type="text/javascript" src="resources/js/main/home.js"></script>
<script type="text/javascript" src="resources/js/main/timeTable.js"></script>
</html>