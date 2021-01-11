<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>메인</title>
</head>
<body>
	<p>하이</p>
	<c:forEach items="${list }" var="row">
		 
			<p>${row.ID }</p>
			<p>${row.EMAIL }</p>
			<p>${row.NAME }</p>
			<p>${row.REGDATE }</p>
		
	</c:forEach>

</body>
</html>