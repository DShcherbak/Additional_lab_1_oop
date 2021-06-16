package app.servlets;

import app.JDBC.JDBC;
import app.models.RouteModel;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;


@WebServlet(name = "DeleteServlet", urlPatterns = "/delete/*")
public class DeleteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {

        var routes = new ArrayList<RouteModel>();
        var out = GeneralRouteServlet.updateResp(resp);
        out.print(GeneralRouteServlet.updateRoutes(null, routes));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String url = String.valueOf(req.getRequestURL());
        String type = getDeletionType(url);
        String num = url.substring(url.lastIndexOf("/") + 1);
        int id = Integer.parseInt(num);
        JDBC jdbc = new JDBC();
        try {
            switch (type){
                case "route":
                    jdbc.deleteElem("routes", "route_number", id);
                    break;
                case "stop":
                    jdbc.deleteElem("stops", "stop_id", id);
                    break;
                case "employee":
                    jdbc.deleteElem("employees", "id", id);
                    break;
                default:
                    break;
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    private String getDeletionType(String url){
        String temp = url.substring(0, url.lastIndexOf("/"));
        return temp.substring(temp.lastIndexOf("/") + 1);
    }



}
