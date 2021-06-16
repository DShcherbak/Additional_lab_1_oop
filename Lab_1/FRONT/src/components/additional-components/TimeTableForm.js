import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.
import styles from "../../styles/General.module.css"

class TimeTableForm extends Component {

    constructor(props) {
        super(props);
        if(props.currentId === undefined)
            props.currentId = 1
        this.state = {
            newRouteId: props.currentId
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({newRouteId: event.target.value});
    }

    render() {
        return (
            <div>
                <form>
                    <label>Номер маршруту: </label> <input type = "number" value = {this.state.newRouteId} onChange={this.handleChange} name="newRouteId"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default withRouter(TimeTableForm); // <--- make sure to wrap your component with `withRouter()`