package app.models;

public class UserModel {
    public boolean isAdmin = false;
    public String name = "";

    public UserModel(boolean a, String n){
        isAdmin = a;
        name = n;
    }
}
