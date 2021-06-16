package app.JDBC;

import javax.sql.rowset.CachedRowSet;
import javax.sql.rowset.RowSetFactory;
import javax.sql.rowset.RowSetProvider;
import java.sql.*;

public class GeneralJDBC {

    public static void updateQuery(String query) throws SQLException {
        System.out.println("JDBC: " + query);
        Connection conn = null;
        RowSetFactory factory = RowSetProvider.newFactory();
        CachedRowSet rowset = factory.createCachedRowSet();
        try {
            Statement stmt = setConnection(conn);
            try {
                stmt.executeUpdate(query);
            } catch (SQLException e ) {
                throw new Error("Problem", e);
            } finally {
                if (stmt != null) { stmt.close(); }
            }
        } catch (SQLException | ClassNotFoundException e) {
            throw new Error("Problem", e);
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }

    public static CachedRowSet getQuery(String query) throws SQLException {
        Connection conn = null;
        RowSetFactory factory = RowSetProvider.newFactory();
        CachedRowSet rowset = factory.createCachedRowSet();
        try {
            Statement stmt = setConnection(conn);
            try {
                ResultSet rs = stmt.executeQuery(query);
                rowset.populate(rs);
            } catch (SQLException e ) {
                throw new Error("Problem", e);
            } finally {
                if (stmt != null) { stmt.close(); }
            }
        } catch (SQLException | ClassNotFoundException e) {
            throw new Error("Problem", e);
        } finally {
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return rowset;
    }

    private static Statement setConnection(Connection conn) throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        String url = "jdbc:postgresql:dbprod?user=myuser&password=topsecret";
        conn = DriverManager.getConnection(url);
        return conn.createStatement();
    }
}
