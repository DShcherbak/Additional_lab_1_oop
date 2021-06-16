import React from "react";
import {Redirect} from "react-router-dom";
import * as API from "../API";
import { withRouter } from 'react-router-dom';
import TimeTableForm from "../components/additional-components/TimeTableForm";
import NavBar from "../components/nav-bar";
import Loading from "../components/loading";
import styles from "../styles/General.module.css"



export class EmployeeObject extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            counted: false
        }
    }


    getRouteId(url){
        let id = url.lastIndexOf('=')
        let numberStr = url.substring(id + 1)
        return parseInt(numberStr)
    }

    componentDidMount = () => {
        let number = this.getRouteId(window.location.href)
        console.log("Employee number " + number)
        this.GetEmployee(number).then((employees) => {
            if(employees.length === 0){
                this.setState({
                    incorrectRoute: true,
                    counted: true
                })
            } else {
                let routeId = employees[0]["route_number"]
                console.log("Route number " + routeId)
                this.GetRoute(routeId).then((route) => {
                    console.log(route)
                    if(route === undefined){
                        this.setState({
                            incorrectRoute: true,
                            counted: true
                        })
                    } else {
                        this.setState({
                            id: employees[0]["id"],
                            name: employees[0]["name"],
                            surname: employees[0]["surname"],
                            routeId: employees[0]["route_id"],
                            routeType : this.GetType(route["type"]),
                            routeNumber : route["routeId"],
                            counted : true
                        }, function () {
                            console.log("ST: " + this.state.startTime)
                        })
                    }
                })

            }

        }).catch((error) => {
            console.log(error);
        });

    }

    GetType(number){
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

    async GetEmployee(number) {
        return await API.getEmployee(number)
    }

    async GetRoute(id){

        let routes = await API.getRoutes()
        console.log("All the routes: " + routes)
        let n = routes.length
        for(let i = 0; i < n; i++){
            console.log("X: " + routes[i]["routeId"])
            if(routes[i]["routeId"] === id){
                return routes[i]
            }
        }
        return undefined
    }

    render(){

        if(this.state === undefined || this.state.counted === false){
            return <Loading/>
        }

        if(this.state.incorrectRoute){
            return (
                <div>
                    <h1>Працівника не знайдено.</h1>
                </div>
            )
        }


        return (
            <div>
                <NavBar fatherlink={'/employees'}/>
                <div className={styles.MainBodyContainer}>
                    <p>Ім'я:  {this.state.name}</p>
                    <p>Прізвище:  {this.state.surname}</p>
                    <p>Транспорт: {this.state.routeType} номер {this.state.routeNumber}</p>
                </div>

            </div>
        )


    }


}