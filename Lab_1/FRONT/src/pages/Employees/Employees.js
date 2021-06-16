import React from "react";
//import * as API from  "API.js"
/* We simply can use an array and loop and print each user */
import {TimeTableObject} from "../../models/TimeTableObject";
import {Link, Redirect} from 'react-router-dom'
import NavBar from "../../components/nav-bar";
import * as API from "../../API";
import general from "../../styles/General.module.css"
import styles from "../../styles/Routes.module.css"
import smallList from "../../styles/SmallList.module.css"

export class GeneralEmployees extends React.Component{

    constructor(props) {
        super(props);
        let id = this.getEmployeeId(window.location.href)
        this.state = {
            employeeId : id
        }
    }

    componentDidMount = () => {
        this.GetEmployees().then((employees) => {
            this.setState({
                employees : employees,
                counted: true
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    async GetEmployees() {
        return await API.getEmployees()
    }

    getEmployeeId(url){
        let id = url.lastIndexOf('=')
        let numberStr = url.substring(id + 1)
        return parseInt(numberStr)
    }

    makeEmployeesList(){
        return (<ul className={general.listOfCards}>
            {
                this.state.employees.map((employee) => <Link to={"/employee?id=" + employee["id"]}><li key={employee["id"]} className={general.listElement}>
            <div className={general.listCard}><div className={smallList.smallP}>{employee["name"]} {employee["surname"]}</div></div></li></Link>)}</ul>);
    }

    render() {
        if(this.state !== undefined && this.state.counted){
            let list = this.makeEmployeesList()
            return (
                <div>
                    <NavBar fatherlink={'/'}/>
                    <div className={general.MainBodyContainer}>
                        {list}
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <NavBar fatherlink={'/'}/>
                    <div className={general.MainBodyContainer}>
                        <div>No employees here</div>
                    </div>
                </div>
            );
        }

    }
}
