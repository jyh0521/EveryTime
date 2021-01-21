<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>메인</title>
</head>
<body>
	<p>로그인</p>
	
	<form id="loginForm">
		<label for="usrId">ID</label>
		<input type="text" name="usrId" id="usrId" />
		
		<label for="usrPw">PW</label>
		<input type="password" name="usrPw" id="usrPw" />
	</form>
	
	<button id="loginBtn">로그인</button>
	<button id="signUpBtn">회원가입</button>
</body>

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="resources/js/user/login.js"></script>
</html>