package app.servlets;

import app.JDBC.JDBC;
import app.models.RouteModel;
import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;

public class GeneralRouteServlet {

    public static String updateRoutes(JDBC jdbc, ArrayList<RouteModel> routes){
        var stops = jdbc.getStopsMap();
        updateStops(routes, stops);
        return new Gson().toJson(routes);
    }

    public static PrintWriter updateResp(HttpServletResponse resp) throws IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        return resp.getWriter();
    }

    private static void updateStops(ArrayList<RouteModel> routes, HashMap<Integer, String> stops){
        for (RouteModel route: routes) {
            for(int i = 0; i < route.stops.length; i++){
                route.stops[i] = stops.get((Integer) route.stops[i]);
            }
        }
    }

}
