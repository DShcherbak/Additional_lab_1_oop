import React from "react";
import * as API from "../../API.js"
import styles from "./Editor.module.css"
import {RouteObject} from "../../models/RouteObject"
import Checkbox from "../../components/additional-components/Checkbox";
import { Link } from 'react-router-dom'
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";
import Redirect from "react-router-dom/es/Redirect";
import general from "../../styles/General.module.css";
import smallList from "../../styles/SmallList.module.css";


const routeTypes = [
    'Тролейбус',
    'Автобус',
    'Трамвай',
];

class EmployeesEditor extends React.Component {

    async isAdmin(){
        return await API.checkAdmin()
    }

    componentDidMount = () => {
        this.isAdmin().then(result => {
            this.setState({
                adminChecked : true,
                isAdmin: result["isAdmin"]
            })
        })
        this.GetEmployees().then((employees) => {
            let newEmployees = []
            employees.forEach((employee) => {
                newEmployees.push(<Link to={"/edit/employee?id=" + employee.id}>
                    <li key={employee.id} className={general.listElement}><div className={general.listCard}><div className={smallList.smallP}>Працівник(ця)  {employee.name}</div></div></li>
                </Link>)
            })


            this.setState({
                employees : newEmployees,
                counted : true,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    async GetEmployees() {
        return await API.getEmployees()
    }

    constructor(props) {
        super(props);
        this.state ={
            stops: [],
            routes: []
        }
    }

    getType(number){
        switch (number) {
            case 1:
                return "Тролейбус";
            case 2:
                return "Автобус";
            case 3:
                return "Трамвай";
            default:
                return "Тролейбус";
        }
    }
        //     console.log(this.state.optionalRoutes)
        //     console.log(this.selectedCheckboxes)
        //      console.log("I choose this one: ")
        //      console.log(this.state.optionalRoutes.get(this.getSubsetNumber(this.selectedCheckboxes)))
        //      let newDisplay = this.state.optionalRoutes.get(this.getSubsetNumber(this.selectedCheckboxes))
        //     console.log(newDisplay)


    makeEmployeesList(newEmployees){
        return (<ul className={general.listOfCards}>{newEmployees.map((employees) => employees)}</ul>)
    }

/*    return (<ul className={general.listOfCards}>
{
    this.state.employees.map((employee) => <Link to={"/employee?id=" + employee["id"]}><li key={employee["id"]} >
        <div className={general.listCard}><div className={smallList.smallP}>{employee["name"]} {employee["surname"]}</div></div></li></Link>)}</ul>);
*/

    render() {
        if(this.state === null || !this.state.adminChecked || this.state.employees === undefined){
            return (
                <Loading/>
            );
        } else if(!this.state.isAdmin){
            return (<Redirect to={'/'}/>)
        } else {
            let list = this.makeEmployeesList(this.state.employees)
            if (this.state.counted) {
                return (
                    <div>
                        <NavBar fatherlink={'/editor'}/>
                        <div className={general.MainBodyContainer}>
                            <Link to={"/add/employee"}>
                                <button>Додати нового працівника</button>
                            </Link>
                            <div className={styles.container}>
                                {list}
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <NavBar fatherlink={'/editor'}/>
                        <div className={general.MainBodyContainer}>
                            <Link to={"/add/employee"}>
                                <button>Додати нового працівника</button>
                            </Link>
                            <div className={styles.container}/>
                        </div>
                    </div>
                );
            }
        }
    }
}

export default EmployeesEditor;