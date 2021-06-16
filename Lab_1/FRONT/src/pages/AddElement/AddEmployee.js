import React from "react";
import {Redirect} from "react-router-dom";
import * as API from "../../API";
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";
import styles from "../../styles/General.module.css";

export class AddEmployee extends React.Component{
    async isAdmin(){
        return await API.checkAdmin()
    }

    componentDidMount = () => {
        this.isAdmin().then(result => {
            this.setState({
                adminChecked: true,
                isAdmin: result["isAdmin"]
            })
        })
    }

    render() {
        if (this.state === null || !this.state.adminChecked) {
            return (
                <Loading/>
            );
        } else if (!this.state.isAdmin) {
            return (<Redirect to={'/'}/>)
        } else {
            return <AddEmployeeInternal/>
        }
    }
}

export class AddEmployeeInternal extends React.Component{
    constructor(props) {
        super(props);
        let id = 0
        this.state = {
            id: id,
            name: "Ім'я",
            surname: "Прізвище",
            adminProved: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.saveAndExit = this.saveAndExit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }


    resetValues(){
        this.setState({
            id: 0,
            name: "Ім'я",
            surname: "Прізвище",
            returnToEditor: false,
        }, function () {
            console.log("ST: " + this.state.startTime)
        })
    }

    componentDidMount = () => {
        this.GetEmployees().then((employees) => {
            this.setState({
                employees: employees
            }, function () {
                console.log("ST: " + this.state.startTime)
            })

        }).catch((error) => {
            console.log(error);
        });
    }

    async GetEmployees() {
        return await API.getEmployees()
    }


    mex(){
        let result = 1
        this.state.employees.forEach((employee) => {
            if(result <= employee.id)
                result = employee.id + 1
        })
        return result
    }

    async saveChanges() {
        if(await API.checkAvailableRoute(this.state.route_number)){
            alert('Недійсний маршрут!')
        } else {
            let newNumber = await this.mex()
            this.setState({
                oldId : 0,
                id : newNumber
            })
            await API.updateEmployee(this.state)
            this.resetValues()
        }
    }

    async saveAndContinue(){
        await this.saveChanges()
    }

    async saveAndExit(){
        await this.saveChanges()
        this.setState(
            {returnToEditor : true}
        , function () {
            console.log("ST: " + this.state.returnToEditor)
        })

    }

    render(){
        if(this.state.returnToEditor){
            return (
                <Redirect to={'/edit/employees'}/>
            )
        }
        return (
            <div>
                <NavBar fatherlink={'/edit/employees'}/>
                <div className={styles.MainFormContainer}>
                    <form className={styles.editForm}>
                        <label><b>{"Реєстрація нового працівника"}</b></label><br/>
                        <label>Ім'я: </label><input type="text" className={styles.wideFromInput} value={this.state.name} name="name" onChange={this.handleInputChange}/><br/>
                        <label>Прізвище: </label><input type="text" className={styles.wideFromInput} value={this.state.surname} name="surname" onChange={this.handleInputChange}/><br/>
                        <label>Номер маршруту: </label><input type="number" className={styles.wideFromInput} value={this.state.route_number} name="route_number" onChange={this.handleInputChange}/><br/>

                        <input type="button" onClick={this.saveAndContinue} value="Зберегти та продовжити"/>
                        <input type="button" onClick={this.saveAndExit} value="Зберегти та вийти"/>
                    </form>
                </div>
            </div>

        )


    }


}