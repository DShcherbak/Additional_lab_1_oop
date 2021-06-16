package app.JDBC;

import app.models.RouteModel;
import app.models.StopModel;

import javax.sql.rowset.CachedRowSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import static app.JDBC.GeneralJDBC.getQuery;
import static app.JDBC.GeneralJDBC.updateQuery;

public class StopsJDBC {
    public static HashMap<Integer, String> getStopsInternalMap(String query)  {
        HashMap<Integer, String> stops = new HashMap<>();
        try{
            CachedRowSet rs = getQuery(query);
            try{
                while (rs.next()) {
                    int stop_id = rs.getInt(2);
                    String name = rs.getString(3);
                    stops.put(stop_id, name);
                }
            } catch (SQLException e ) {
                throw new Error("Couldn't parse route: ", e);
            }
        } catch (Exception ex){
            System.out.println("Couldn't access stops table.");
        }
        return stops;
    }

    public static ArrayList<StopModel> getStopsInternal(String query)  {
        ArrayList<StopModel> stops = new ArrayList<StopModel>();
        try{
            CachedRowSet rs = getQuery(query);
            try{
                while (rs.next()) {
                    StopModel stop = new StopModel(rs.getInt(2), rs.getString(3));
                    stops.add(stop);
                }
            } catch (SQLException e ) {
                throw new Error("Couldn't parse route: ", e);
            }
        } catch (Exception ex){
            System.out.println("Couldn't access stops table.");
        }
        return stops;
    }

    public static void updateStop(int id, StopModel stop) throws SQLException {
        String query = "update stops set stop_name = '" + stop.stop_name + "' where stop_id = " + id;
        updateQuery(query);
    }

    public static void insertStop(StopModel stop) throws SQLException {
        String updates = "insert into stops (stop_id, stop_name) values (" + stop.stop_id + ", '" + stop.stop_name + "')";
        updateQuery(updates);
    }
}
