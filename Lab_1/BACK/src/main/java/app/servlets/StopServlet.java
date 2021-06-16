package app.servlets;

import app.JDBC.JDBC;
import app.models.StopModel;
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


@WebServlet(name = "StopServlet", urlPatterns = "/stop/*")
public class StopServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        JDBC jdbc = new JDBC();
        var stops = jdbc.getStop(1);
        var out = GeneralRouteServlet.updateResp(resp);
        out.print(new Gson().toJson(stops));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        StringBuffer jb = new StringBuffer();
        req.setCharacterEncoding("UTF-8");
        String line = null;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
        } catch (Exception e) {
            System.out.println("Couldn't parse post request: " + e.getMessage());
        }
        Gson gson = new Gson();
        StopModel stopModel = gson.fromJson(jb.toString(), StopModel.class);
        String url = String.valueOf(req.getRequestURL());
        String num = url.substring(url.lastIndexOf("/") + 1);
        int id = Integer.parseInt(num);
        JDBC jdbc = new JDBC();
        try {
            if(id == 0){
                jdbc.insertStop(stopModel);
            } else {
                jdbc.updateStop(id, stopModel);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        var stops = jdbc.getStop(stopModel.stop_id);
        var out = GeneralRouteServlet.updateResp(resp);
        out.print(new Gson().toJson(stops));
        out.flush();
    }

}
