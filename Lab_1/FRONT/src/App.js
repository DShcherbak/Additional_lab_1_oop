import React, { Component } from "react";
//Import all needed Component for this tutorial
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
} from "react-router-dom";

//Pages
import {MainPage} from "./pages/Main/MainPage.js";
import Routes from "./pages/Routes/Routes.js";
import {GeneralTimeTables} from "./pages/TimeTables/TimeTables";
import {GeneralEmployees} from "./pages/Employees/Employees";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBar, Footer, Loading } from "./components";
import RoutesEditor from "./pages/Editor/RoutesEditor";
import StopsEditor from "./pages/Editor/StopsEditor";
import EmployeesEditor from "./pages/Editor/EmployeesEditor";
import {EditRoute} from "./pages/EditElement/EditRoute"
import {EditStop} from "./pages/EditElement/EditStop"
import {Editor} from "./pages/Editor/Editor"
import {AddRoute} from "./pages/AddElement/AddRoute";
import {AddStop} from "./pages/AddElement/AddStop";
import {AddEmployee} from "./pages/AddElement/AddEmployee";
import {EmployeeObject} from "./models/EmployeeObject";
import {EditEmployee} from "./pages/EditElement/EditEmployee";

import styles from "./styles/General.module.css";

const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div id="app" className={styles.MainApp}>
                <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/routes" component={Routes} />
                    <Route path="/timetables" component={GeneralTimeTables} />
                    <Route path="/employees" component={GeneralEmployees} />
                    <Route path="/employee" component={EmployeeObject} />
                    <Route exact path="/editor" component={Editor} />
                    <Route exact path="/edit/routes" component={RoutesEditor} />
                    <Route exact path="/edit/stops" component={StopsEditor} />
                    <Route exact path="/edit/employees" component={EmployeesEditor} />
                    <Route path="/edit/route" component={EditRoute}/>
                    <Route path="/edit/stop" component={EditStop}/>
                    <Route path="/edit/employee" component={EditEmployee}/>
                    <Route path="/add/route" component={AddRoute}/>
                    <Route path="/add/stop" component={AddStop}/>
                    <Route path="/add/employee" component={AddEmployee}/>
                </Switch>
        </div>
    );
};

export default App;

///< index.jsx will be automatically imported
//And render that route with the MainPage component for the root path /
/*
class App extends Component {
    render() {
        return (
            <Router>

            </Router>
        );
    }
}

export default App;*/