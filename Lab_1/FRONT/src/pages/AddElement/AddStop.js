import React from "react";
import {Link, Redirect} from "react-router-dom";
import * as API from "../../API";
import { confirmAlert } from 'react-confirm-alert'; // Import
import TimeTableForm from "../../components/additional-components/TimeTableForm";
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";
import styles from "../../styles/General.module.css";

export class AddStop extends React.Component{
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
            return <AddStopInternal/>
        }
    }
}

export class AddStopInternal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "Безіменна",
            oldId : 0,
            number: 0,
            startTime: "06:00",
            endTime: "23:30",
            interval: 10,
            type: 'Тролейбус',
            timeTable : [],
            stops: [],
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

    resetForm(){

        this.GetStops().then((stops) => {
            this.setState({
                stops: stops,
                name: ""
            })

        }).catch((error) => {
            console.log(error);
        });

    }



    componentDidMount = () => {

        this.GetStops().then((stops) => {
            this.setState({
                stops: stops
            }, function () {
                console.log("ST: " + this.state.startTime)
            })

        }).catch((error) => {
            console.log(error);
        });
    }


    async GetStops() {
        return await API.getStops()
    }

    isNameAvailable(name){
        let result = true
        this.state.stops.forEach((stop) => {
            if(stop.stop_name === name)
                result = false
        })
        return result

    }

    mex(){
        let result = 1
        this.state.stops.forEach((stop) => {
            if(result <= stop.stop_id)
                result = stop.stop_id + 1
        })
        return result
    }

    async saveChanges() {
        let newNumber = await this.mex()
        this.setState({
            oldId : 0,
            id : newNumber
        })
        let isAvailable = this.isNameAvailable(this.state.name)
        if (isAvailable) {
            let newStop = await API.updateStop(this.state)
            this.resetForm()
        } else {
            alert("Зупинка з назвою " + this.state.name + " вже існує!")
        }
    }

    async saveAndContinue() {
        await this.saveChanges()
    }

    async saveAndExit(){
        await this.saveChanges()
        this.setState(
            {returnToEditor : true}
        )

    }

    render(){
        if(this.state.returnToEditor){
            return (
                <Redirect to={'/edit/stops'}/>
            )
        }
        return (
            <div>
                <NavBar fatherlink={'/edit/stops'}/>
                <div className={styles.MainFormContainer}>
                    <form className={styles.editForm}>
                        <label><b>{"Реєстрація нової зупинки"}</b></label><br/>
                    <label>Вигадайте унікальне ім'я для нової зупинки: </label><input type="text" className={styles.wideFromInput} value={this.state.name} name="name" onChange={this.handleInputChange}/><br/>

                    <input type="button" onClick={this.saveAndContinue} value="Зберегти та додати наступний"/>
                    <input type="button" onClick={this.saveAndExit} value="Зберегти та вийти"/>
                </form>
                </div>
            </div>

        )


    }


}