import React from "react";
import Checkbox from '../components/additional-components/Checkbox';



export class RouteObject extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            routeNumber : props.routeProps["routeId"],
            routeMap : props.routeProps["stops"],
            type : this.getType(props.routeProps["type"]),
            visible : true
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



    render(){
        let list = []
        let id = 0;
        this.state.routeMap.forEach(key => {
            list.push(<li key = {++id}>{key}</li>);
        });
        return(
                <div>Я {this.state.type} номер {this.state.routeNumber} і маю наступний маршрут:
                    {<ul>{list}</ul>}
                </div>
        );
    }

}