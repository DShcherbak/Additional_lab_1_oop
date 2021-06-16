package app.models;

public class EmployeeModel {
    public int id;
    public String name;
    public String surname;
    public int route_number;

    public EmployeeModel(int _id, String _name, String _surname, int _route_id){
        id = _id;
        name = _name;
        surname = _surname;
        route_number = _route_id;
    }
}
