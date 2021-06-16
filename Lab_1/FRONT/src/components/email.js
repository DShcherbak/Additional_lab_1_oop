import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as API from "../API"

export function Email(){
    const {user} = useAuth0();
    if(user===undefined){
        API.setUser('')
    } else {
        API.setUser(user.email);
    }

}

//export default Email;