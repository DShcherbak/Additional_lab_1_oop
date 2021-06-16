import React from "react";
//import * as API from  "API.js"
/* We simply can use an array and loop and print each user */
import styles from "../../styles/General.module.css"
import {Link} from 'react-router-dom';
import NavBar from "../../components/nav-bar";
import * as API from "../../API";
import Loading from "../../components/loading";
import Redirect from "react-router-dom/es/Redirect";


export class Editor extends React.Component{

    constructor() {
        super();
        this.setState({
            adminChecked : false,
            isAdmin: false
        })
    }
    async isAdmin(){
         return await API.checkAdmin()
    }
    componentDidMount() {
        this.isAdmin().then(result => {
            this.setState({
                adminChecked : true,
                isAdmin: result["isAdmin"]
            })
        })
    }

    render(){
         if(this.state === null || !this.state.adminChecked){
             return (
                 <Loading/>
             );
         } else if(!this.state.isAdmin){
             return (<Redirect to={'/'}/>)
         } else {
            return(
                <div>
                    <NavBar fatherlink = {'/'}/>
                    <div className={styles.BigButtonContainer}>
                        <Link to={'/edit/routes'}><button className={styles.BigButton} >Редагувати <br/> маршрути</button></Link>
                        <Link to={'/edit/stops'}><button className={styles.BigButton} >Редагувати <br/> зупинки</button></Link>
                        <Link to={'/edit/employees'}><button className={styles.BigButton} >Редагувати <br/> працівників</button></Link>
                    </div>
                </div>);
         }



    }
}
/*
export function Editor(){
    const history = useHistory();

    const goToRoutes = () =>{
        let path = '/edit/routes';
        history.push(path);
    }

    const goToTimeTables = () =>{
        let path = '/edit/stops';
        history.push(path);
    }



}*/