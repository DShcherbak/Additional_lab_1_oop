import React from "react";
//import * as API from  "API.js"
/* We simply can use an array and loop and print each user */
import generalStyles from "../../styles/General.module.css"
import {Link} from 'react-router-dom';
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";
import * as API from "../../API";

export class MainPage extends React.Component{

    constructor(props) {
        super(props);
        this.setState({
            adminChecked: false,
            isAdmin: false,
        }, function () {
            console.log("LOG0" + this.state.adminChecked + this.state.isAdmin)
        })
    }

    async isAdmin(){
        return await API.checkAdmin()
    }

    componentDidMount = () => {
        console.log("LOG4")
        this.isAdmin().then(result => {
            console.log(result, result["isAdmin"])
            this.setState({
                adminChecked: true,
                isAdmin: result["isAdmin"]
            }, function () {
                console.log("LOG5" + this.state.adminChecked + this.state.isAdmin)
            })
            console.log("LOG6" + this.state.adminChecked + this.state.isAdmin)
        })
        //console.log("LOG7" + this.state.adminChecked + this.state.isAdmin)

    }

    render() {
        if (this.state === null || !this.state.adminChecked) {
            console.log("LOG")
            return (
                <Loading/>
            );
        } else if (!this.state.isAdmin) {
            console.log("LOG2")
            return (<div>
                        <NavBar fatherlink={''}/>
                        <div className={generalStyles.BigButtonContainer}>
                            <Link to={'/routes'}><button className={generalStyles.BigButton}> Маршрути</button></Link>
                            <Link to={'/timetables'}><button className={generalStyles.BigButton} > Розклади</button></Link>
                            <Link to={'/employees'}><button className={generalStyles.BigButton} > Працівники</button></Link>
                        </div>
                    </div>)
        } else {
            console.log("LOG3")
            return (
                <div>
                    <NavBar fatherlink={''}/>
                    <div className={generalStyles.BigButtonContainer}>
                        <Link to={'/routes'}><button className={generalStyles.BigButton}> Маршрути</button></Link>
                        <Link to={'/timetables'}><button className={generalStyles.BigButton} > Розклади</button></Link>
                        <Link to={'/employees'}><button className={generalStyles.BigButton} > Працівники</button></Link>
                        <Link to={'/editor'}><button className={generalStyles.BigButton} > Сторінка<br/> адміністратора</button></Link>
                    </div>
                </div>
            );
        }
    }
}