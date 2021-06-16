package app.models;

import app.entities.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class UserListModel {
    private static UserListModel instance = new UserListModel();

    private List<User> model;

    public static UserListModel getInstance() {
        return instance;
    }

    private UserListModel() {
        model = new ArrayList<>();
    }

    public void add(User user) {
        model.add(user);
    }

    public List<String> list() {
        return model.stream().map(User::getUsername).collect(Collectors.toList());
    }

}
