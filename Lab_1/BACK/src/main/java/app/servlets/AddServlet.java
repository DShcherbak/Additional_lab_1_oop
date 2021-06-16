package app.servlets;

import com.google.gson.Gson;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


@WebServlet(name = "AddServlet", urlPatterns = "/add")
public class AddServlet extends HttpServlet {

    public class User{
        String Name;

        public User(){
            Name = "Den";
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        PrintWriter out = resp.getWriter();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        var user = new User();
        String employeeJsonString = new Gson().toJson(user);
        out.print(employeeJsonString);
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        RequestDispatcher requestDispatcher = req.getRequestDispatcher("views/add.jsp");
        PrintWriter writer = resp.getWriter();
        String name = req.getParameter("name");
        String password = req.getParameter("pass");
        req.setAttribute("name", name);
        req.setAttribute("pass", password);
        writer.println("You have posted: " + name + ", " + password);
        requestDispatcher.forward(req, resp);
    }
}