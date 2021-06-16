package app.JDBC;

import app.models.RouteModel;
import app.servlets.GeneralRouteServlet;

import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetFactory;
import javax.sql.rowset.RowSetProvider;
import java.sql.*;
import java.util.ArrayList;

import static app.JDBC.GeneralJDBC.updateQuery;
import static app.JDBC.GeneralJDBC.getQuery;

public class RoutesJDBC {
    public static ArrayList<RouteModel> getRoutesInternal(String query){
        ArrayList<RouteModel> routes = new ArrayList<>();
        try{
            CachedRowSet rs = getQuery(query);
            try{
                while (rs.next()) {
                    RouteModel route = parseRoute(rs);
                    routes.add(route);
                }
            } catch (SQLException e ) {
                throw new Error("Couldn't parse route: ", e);
            }
        }catch (Exception ex){
            System.out.println("Couldn't access routes table.");
        }
        return routes;
    }

    public static void updateRoute(int id, RouteModel route) throws SQLException {
        String query = "update routes set # where route_number = " + id;
        String updates = "route_number = " + route.routeId + ", stops = Array [";
        for (var stop: route.stops) {
            int t = (int)Math.round((Double) stop);
            updates += t + ", ";
        }
        updates = updates.substring(0, updates.length() - 2);
        updates += "], starttime='" + route.startTime + "', ";
        updates += "endtime='" + route.endTime + "', ";
        updates += "interval=" + route.interval + ", ";
        updates += "routetype=" + route.type + ", ";
        updates += "timetable= Array[";
        for (var tt: route.timetable) {
            int t = (int)Math.round((Double) tt);
            updates += t + ", ";
        }
        updates = updates.substring(0, updates.length() - 2);
        updates += "]";
        query = query.replaceFirst("#", updates);
        System.out.println(query);
        updateQuery(query);

        if(id != route.routeId){
            query = "update employees set route_id = " + route.routeId + " where route_id = " + id;
            updateQuery(query);
        }
    }

    public static void insertRoute(RouteModel route) throws SQLException {
        String updates = "insert into routes (route_number, stops, " +
                "starttime, endtime, interval, routetype, timetable) values (";

        updates += route.routeId + ", Array [";
        for (var stop: route.stops) {
            int t = (int)Math.round((Double) stop);
            updates += t + ", ";
        }
        updates = updates.substring(0, updates.length() - 2);
        updates += "], '" + route.startTime + "', '";
        updates +=  route.endTime + "', ";
        updates +=  route.interval + ", ";
        updates +=  route.type + ", ";
        updates += " Array [";
        try {
            for (var tt : route.timetable) {
                int t = (int) Math.round((Double) tt);
                updates += t + ", ";
            }
        }catch(Exception ex){
            System.out.println(ex.getMessage());
        }
        updates = updates.substring(0, updates.length() - 2);
        updates += "])";
        System.out.println(updates);
        updateQuery(updates);
    }

    private static RouteModel parseRoute(ResultSet rs) throws SQLException {
        int routeNumber = rs.getInt(2);
        Object[] stops = (Object[]) rs.getArray(3).getArray();
        String startTime = rs.getString(4);
        String endTime = rs.getString(5);
        int interval = rs.getInt(6);
        int type = rs.getInt(7);
        Object[] timetable = (Object[]) rs.getArray(8).getArray();
        return new RouteModel(routeNumber, stops, startTime, endTime, interval, type, timetable);
    }
}
