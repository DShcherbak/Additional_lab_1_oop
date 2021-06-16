package app.servlets;

import app.JDBC.JDBC;
import app.models.EmployeeModel;
import app.models.RouteModel;
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


@WebServlet(name = "EmployeesServlet", urlPatterns = "/employee/*")
public class EmployeesServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        JDBC jdbc = new JDBC();
        int id = -1;
        try{
            String url = String.valueOf(req.getRequestURL());
            String num = url.substring(url.lastIndexOf("/") + 1);
            id = Integer.parseInt(num);
        } catch (Exception ex){
            System.out.println(ex.getMessage());
        }
        ArrayList<EmployeeModel> employees;
        if(id < 1){
            employees = jdbc.getEmployees();
        } else {
            employees = jdbc.getEmployee(id);
        }
        var out = GeneralRouteServlet.updateResp(resp);
        out.print(new Gson().toJson(employees));
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
        EmployeeModel employeeModel = gson.fromJson(jb.toString(), EmployeeModel.class);
        System.out.println(employeeModel);
        String url = String.valueOf(req.getRequestURL());
        String num = url.substring(url.lastIndexOf("/") + 1);
        int id = Integer.parseInt(num);
        JDBC jdbc = new JDBC();
        try {
            if(id == 0){
                jdbc.insertEmployee(employeeModel);
            } else {
                jdbc.updateEmployee(id, employeeModel);
            }

        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        var routes = new ArrayList<EmployeeModel>();
        var out = GeneralRouteServlet.updateResp(resp);
        out.print(new Gson().toJson(routes));
        out.flush();
    }

}
