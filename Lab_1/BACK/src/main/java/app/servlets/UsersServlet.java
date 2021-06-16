package app.servlets;

import app.JDBC.JDBC;
import app.models.StopModel;
import app.models.UserModel;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;


@WebServlet(name = "UsersServlet", urlPatterns = "/admin")
public class UsersServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        JDBC jdbc = new JDBC();
        var out = GeneralRouteServlet.updateResp(resp);
        UserModel userModel = new UserModel(false, "");
        if(jdbc.checkAdmin()){
            userModel.isAdmin = true;
        }
        out.print(new Gson().toJson(userModel));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        JDBC jdbc = new JDBC();
        StringBuffer jb = new StringBuffer();
        req.setCharacterEncoding("UTF-8");
        String line = null;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
                jdbc.setCurrentUser(jb.substring(7, jb.length()-1));
        } catch (Exception e) {
            System.out.println("Couldn't parse post request: " + e.getMessage());
        }
    }

}
