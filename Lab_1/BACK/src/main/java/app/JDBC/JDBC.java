package app.JDBC;

import app.models.EmployeeModel;
import app.models.RouteModel;
import app.models.StopModel;

import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetFactory;
import javax.sql.rowset.RowSetProvider;
import java.sql.*;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.HashMap;

public class JDBC {

    private Statement setConnection(Connection conn) throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        String url = "jdbc:postgresql:dbprod?user=myuser&password=topsecret";
        conn = DriverManager.getConnection(url);
        return conn.createStatement();
    }

    /*
    *
    Routes
     *
     */


    public ArrayList<RouteModel> getRoute(int id) {
        return RoutesJDBC.getRoutesInternal("select * from routes where route_number = " + id);
    }

    public ArrayList<RouteModel> getRoutes() {
        return RoutesJDBC.getRoutesInternal("select * from routes order by route_number");
    }

    public void updateRoute(int id, RouteModel route) throws SQLException {
        RoutesJDBC.updateRoute(id, route);
    }

    public void insertRoute(RouteModel route) throws SQLException {
        RoutesJDBC.insertRoute(route);
    }

    /*
    *
    Stops
     *
     */

    public ArrayList<StopModel> getStop(int id) {
        return StopsJDBC.getStopsInternal("select * from stops where stop_id = " + id);
    }

    public ArrayList<StopModel> getStops() {
        return StopsJDBC.getStopsInternal("select * from stops order by stop_id");
    }

    public HashMap<Integer, String> getStopsMap() {
        return StopsJDBC.getStopsInternalMap("select * from stops");
    }

    public void updateStop(int id, StopModel stop) throws SQLException {
        StopsJDBC.updateStop(id, stop);
    }

    public void insertStop(StopModel stop) throws SQLException {
        StopsJDBC.insertStop(stop);
    }


    /*
    *
    Employees
    *
     */

    public ArrayList<EmployeeModel> getEmployee(int id) {
        return EmployeesJDBC.getEmployeesInternal("select * from employees where id = " + id);
    }

    public ArrayList<EmployeeModel> getEmployees() {
        return EmployeesJDBC.getEmployeesInternal("select * from employees order by id");
    }

    public void updateEmployee(int id, EmployeeModel employee) throws SQLException {
        EmployeesJDBC.updateEmployee(id, employee);
    }

    public void insertEmployee(EmployeeModel employee) throws SQLException {
        EmployeesJDBC.insertEmployee(employee);
    }

    /*
    *
    General
     *
     */

    public void deleteElem(String table_name, String id_name, int id) throws SQLException {
        String query = "delete from "+ table_name + " where " + id_name + " = " + id;
        GeneralJDBC.updateQuery(query);
        if(table_name == "routes"){
            query = "delete from employees where route_id = " + id;
            GeneralJDBC.updateQuery(query);
        }

    }

    public boolean checkAdmin() {
        boolean res = false;
        try {
            var result = GeneralJDBC.getQuery("select users.isAdmin from users inner join temp on temp.name = users.name");

            if (result.next()) {
                try {
                    res = result.getBoolean(1);
                } catch (Exception ex) {
                    System.out.println(ex.getMessage());
                }
            }
        } catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        return res;
    }

    public void setCurrentUser(String email){
        try{
            GeneralJDBC.updateQuery("update temp set name = '" + email + "' where id = 1;");
        }catch (Exception ex){
            System.out.println(ex.getMessage());
        }
    }
}
