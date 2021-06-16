import React from "react";
import {Link, Redirect} from "react-router-dom";
import * as API from "../../API";
import { confirmAlert } from 'react-confirm-alert'; // Import
import TimeTableForm from "../../components/additional-components/TimeTableForm";
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";
import {EditRouteInternal} from "./EditRoute";

export class EditStop extends React.Component{
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
            return <EditStopInternal/>
        }
    }
}

export class EditStopInternal extends React.Component{
    constructor(props) {
        super(props);
        let id = this.getStopId(window.location.href)
        this.state = {
            id: id,
            name: "",
            adminProved: true
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.confirmedDelete = this.confirmedDelete.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.saveAndExit = this.saveAndExit.bind(this);
        this.handleInputChangeArray = this.handleInputChangeArray.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleInputChangeArray(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name[0] === 's'){
            let stops = this.state.stops
            let id = parseInt(name.substring(1))
            stops[id] = value
            this.setState({
                stops: stops
            });
        }else{
            let timeTable = this.state.timeTable
            let id = parseInt(name.substring(1))
            timeTable[id] = value
            this.setState({
                timeTable: timeTable
            });
        }

    }

    getStopId(url){
        let id = url.lastIndexOf('=')
        let numberStr = url.substring(id + 1)
        return parseInt(numberStr)
    }

    resetValues(stop){
        this.setState({
            id : stop.stop_id,
            name: stop.stop_name,
            incorrectRoute : false,
            returnToEditor: false,
            confirmDelete : false,
        }, function () {
            console.log("ST: " + this.state.startTime)
        })
    }

    componentDidMount = () => {
        this.GetStop().then((stop) => {
            if(stop.length === 0){
                this.setState({
                    incorrectRoute: true
                })
            } else {
                this.resetValues(stop)
            }

        }).catch((error) => {
            console.log(error);
        });

        this.GetStops().then((stops) => {
            this.setState({
                stops: stops
            })

        }).catch((error) => {
            console.log(error);
        });
    }

    async GetStop() {
        let stops = await API.getStops()
        let myStop = null
        stops.forEach((stop) => {if(stop.stop_id === this.state.id) myStop = stop})
        return myStop
    }

    async GetStops() {
        return await API.getStops()
    }

    resetForm(){
        console.log("Reset...")
        this.GetStop().then((stop) => {
            if(stop.length === 0){
                this.setState({
                    incorrectRoute: true
                })
            } else {
                this.resetValues(stop)
            }

        }).catch((error) => {
            console.log(error);
        });

        this.GetStops().then((stops) => {
            this.setState({
                stops: stops
            })

        }).catch((error) => {
            console.log(error);
        });

    }

    deleteElement(){
        this.setState({
            confirmDelete : true
        })
    };

    async confirmedDelete(){
        await API.deleteStop(this.state.id, this.state)
        this.setState({
            returnToEditor : true
        })
    };

    isNameAvailable(name){
        let result = true
        this.state.stops.forEach((stop) => {
            if(stop.stop_name === name)
                result = false
        })
        return result

    }

    async saveChanges() {
        this.setState({
            oldId : this.state.id
        })
        let isAvailable = this.isNameAvailable(this.state.name)
        if (isAvailable) {
            let newStop = await API.updateStop(this.state)
            this.resetForm()
        } else {
            alert("Зупинка з назвою " + this.state.name + " вже існує!")
        }

    }

    async saveAndContinue(){
        await this.saveChanges()
    }

    async saveAndExit(){
        await this.saveChanges()
        this.setState(
            {returnToEditor : true}
        )

    }

    render(){
        if(!this.state.adminProved){
            alert("You have no admin rights!")
            return (<Redirect to={'/'}/>)
        }
        if(this.state.returnToEditor){
            return (
                <Redirect to={'/edit/stops'}/>
            )
        }
        if(this.state.confirmDelete){
            return (
                <div>
                    <NavBar fatherlink={'/edit/stops'}/>
                    <form>
                        <label>{"Підтвердження видалення зупинки \"Станція " + this.state.name + "\""}</label><br/>
                        <input type="button" onClick={this.resetForm} value="Скасувати видалення"/>
                        <input type="button" onClick={this.confirmedDelete} value="Видалити елемент"/>
                    </form>
                </div>
            )
        }
        if(this.state.incorrectRoute){
            return (
                <div>
                    <NavBar fatherlink={'/edit/stops'}/>
                    <h1>Зупинки не знайдено.</h1>
                </div>
            )
        }

        return (
            <div>
                <NavBar fatherlink={'/edit/stops'}/>
                <form>
                    <label>{"Редагування зупинки"}</label><br/>
                    <label>Назва зупинки: </label><input type="text" value={this.state.name} name="name" onChange={this.handleInputChange}/><br/>

                    <input type="button" onClick={this.resetForm} value="Скасувати зміни"/>
                    <input type="button" onClick={this.deleteElement} value="Видалити елемент"/>
                    <input type="button" onClick={this.saveAndContinue} value="Зберегти та продовжити"/>
                    <input type="button" onClick={this.saveAndExit} value="Зберегти та вийти"/>
                </form>
            </div>

        )


    }


}