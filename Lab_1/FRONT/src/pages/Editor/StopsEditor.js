import React from "react";
import * as API from "../../API.js"
import {RouteObject} from "../../models/RouteObject"
import Checkbox from "../../components/additional-components/Checkbox";
import { Link } from 'react-router-dom'
import NavBar from "../../components/nav-bar";
import Loading from "../../components/loading";
import Redirect from "react-router-dom/es/Redirect";
import styles from "../../styles/General.module.css"

const routeTypes = [
    'Тролейбус',
    'Автобус',
    'Трамвай',
];

class StopsEditor extends React.Component {

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
        this.GetStops().then((stops) => {
            let newStops = []
            stops.forEach((stop) => {
                newStops.push(<Link to={"/edit/stop?stopId=" + stop.stop_id}>
                    <li key={stop.stop_id}>Станція {stop.stop_name}</li>
                </Link>)
            })


            this.setState({
                stops : newStops,
                counted : true,
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    async GetStops() {
        return await API.getStops()
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


    makeStopList(stops){
        return (<ul>{stops.map((stop) => stop)}</ul>)
    }


    render() {
        if(this.state === null || !this.state.adminChecked){
            return (
                <Loading/>
            );
        } else if(!this.state.isAdmin){
            return (<Redirect to={'/'}/>)
        } else {
            let list = this.makeStopList(this.state.stops)
            if (this.state.counted) {
                return (
                    <div>
                        <NavBar fatherlink={'/editor'}/>
                        <Link to={"/add/stop"}>
                            <button>Додати нову зупинку</button>
                        </Link>
                        <div className={styles.container}>
                            {list}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <NavBar fatherlink={'/editor'}/>
                        <Link to={"/add/stop"}>
                            <button>Додати нову зупинку</button>
                        </Link>
                        <div className={styles.container}/>
                    </div>
                );
            }
        }
    }
}

export default StopsEditor;