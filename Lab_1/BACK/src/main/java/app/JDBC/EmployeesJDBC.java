package app.JDBC;

import app.models.EmployeeModel;
import app.models.RouteModel;
import app.servlets.GeneralRouteServlet;

import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetFactory;
import javax.sql.rowset.RowSetProvider;
import java.sql.*;
import java.util.ArrayList;

import static app.JDBC.GeneralJDBC.updateQuery;
import static app.JDBC.GeneralJDBC.getQuery;

public class EmployeesJDBC {
    public static ArrayList<EmployeeModel> getEmployeesInternal(String query){
        ArrayList<EmployeeModel> employees = new ArrayList<>();
        try{
            CachedRowSet rs = getQuery(query);
            try{
                while (rs.next()) {
                    EmployeeModel employee = parseEmployee(rs);
                    employees.add(employee);
                }
            } catch (SQLException e ) {
                throw new Error("Couldn't parse route: ", e);
            }
        }catch (Exception ex){
            System.out.println("Couldn't access routes table.");
        }
        return employees;
    }

    public static void updateEmployee(int id, EmployeeModel employee) throws SQLException {
        String query = "update employees set ";

        query += "name = '" + employee.name + "', ";
        query += "surname = '" + employee.surname + "', ";
        query += "route_id = " + employee.route_number + " where id = " + id;
        System.out.println(query);
        updateQuery(query);
    }

    public static void insertEmployee(EmployeeModel employee) throws SQLException {
        String updates = "insert into employees (id, name, surname, route_id) values (";
        updates += employee.id +  ", '" + employee.name + "', '" + employee.surname + "', ";
        updates += employee.route_number + ")";
        System.out.println(updates);
        updateQuery(updates);
    }

    private static EmployeeModel parseEmployee(ResultSet rs) throws SQLException {
        int id = rs.getInt(1);
        String name = rs.getString(2);
        String surname = rs.getString(3);
        int routeNumber = rs.getInt(4);
        return new EmployeeModel(id, name, surname, routeNumber);
    }
}


