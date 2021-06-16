package app.servlets;

import app.JDBC.JDBC;
import app.models.RouteModel;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;


@WebServlet(name = "AllRoutesServlet", urlPatterns = "/routes")
public class AllRoutesServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        JDBC jdbc = new JDBC();
        var routes = jdbc.getRoutes();
        var out = GeneralRouteServlet.updateResp(resp);
        out.print(GeneralRouteServlet.updateRoutes(jdbc, routes));
        out.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        StringBuffer jb = new StringBuffer();
        String line = null;
        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null)
                jb.append(line);
        } catch (Exception e) {
            System.out.println("Couldn't parse post request: " + e.getMessage());
        }

        Gson gson = new Gson();
        RouteModel routeModel = gson.fromJson(jb.toString(), RouteModel.class);
        System.out.println(routeModel);
    }
}
