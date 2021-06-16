<%@ page import="java.util.List" %><%--
  Created by IntelliJ IDEA.
  User: sadoffnick
  Date: 08.03.21
  Time: 01:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Add user</title>
</head>
<body>
<form method="post">
    <label>Name:
        <input type="text" name="name"><br />
    </label>

    <label>Password:
        <input type="password" name="pass"><br />
    </label>
    <button type="submit">Submit</button>
</form>
<div id = "response">
    <%
        String name = (String) request.getAttribute("name");
        String pass = (String) request.getAttribute("pass");

        out.println("Posted: " + name + ", " + pass);
    %>

</div>
</body>
</html>
