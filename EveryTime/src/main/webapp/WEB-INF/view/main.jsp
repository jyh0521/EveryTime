<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>메인</title>
</head>
<body>
	<c:if test="${! empty userInfo}">
	<button id="logoutBtn">로그아웃</button>
	<button id="homeBtn">홈</button>
	<button id="timeTableBtn">시간표</button>
	<button id="boardBtn">게시판</button>
	</c:if>
</body>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="resources/js/main.js"></script>
</html>