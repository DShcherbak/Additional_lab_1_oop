let backUrl = 'http://localhost:8080/'


//USER

export async function checkAdmin(){
    return await sendGetRequest(backUrl + 'admin')
}

export function setUser(email){
    sendPostRequest(backUrl + 'admin', JSON.stringify("email:" + email))
}


//ROUTES

export async function getRoutes() {
    return await sendGetRequest(backUrl + 'routes');
}

export async function getRouteById(id){
    return await sendGetRequest(backUrl + 'route/' + id);
}

export async function updateRoute(state){
    return await sendPostRequest(backUrl + 'route/' + state.oldId, routeToJson(state))
}

export async function checkAvailableRoute(id) {
    let c = await sendGetRequest(backUrl + 'route/' + id);
    return (!c) || (Object.keys(c).length === 0)
}

export async function deleteRoute(id, state){
    return await sendPostRequest(backUrl + 'delete/route/' + id,  routeToJson(state))
}

function convertStopsToInt(stops, allStops) {
    let result = []
    for(let i = 0; i < stops.length; i++){
        for(let j = 0; j < allStops.length; j++){
            if(stops[i] === allStops[j]["stop_name"]){
                result.push(allStops[j]["stop_id"])
            }
        }
    }
    return result
}


//STOPS

export async function getStops() {
    return await sendGetRequest(backUrl + 'stops')
}


export async function updateStop(state){
    return await sendPostRequest(backUrl + 'stop/' + state.oldId, stopToJson(state))
}

export async function deleteStop(id, state){
    return await sendPostRequest(backUrl + 'delete/stop/' + id, stopToJson(state))
}

function stopToJson(state) {
    let json = JSON.stringify({
        "stop_id": state.id,
        "stop_name": state.name
    })
    console.log("SEND POST: " + json)
    return json
}


//EMPLOYEES

export async function getEmployees() {
    return await sendGetRequest(backUrl + 'employee/all')
}

export async function getEmployee(id) {
    console.log("req is coming")
    return await sendGetRequest(backUrl + 'employee/' + id)
}

export async function updateEmployee(state){
    return await sendPostRequest(backUrl + 'employee/' + state.oldId, employeeToJson(state))
}

export async function deleteEmployee(id, state){
    return await sendPostRequest(backUrl + 'delete/employee/' + id, employeeToJson(state))
}

function employeeToJson(state) {
    let json = JSON.stringify({
        "id": state.id,
        "name": state.name,
        "surname": state.surname,
        "route_number": state.route_number
    })
    console.log("SEND POST: " + json)
    return json
}


//REQUESTS


function sendGetRequest(requestUrl){
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
        method: 'Get',
        headers: {},
        // body: JSON.stringify({ title: 'React Get Request Example' })
    };
    return fetch(requestUrl, requestOptions).then(response => response.json())
        .then((responseData) => {
            return responseData;
        })
}



function convertTimeTable(timeTable){
    let result = []
    for(let i = 0; i < timeTable.length; i++){
        result.push(parseInt(timeTable[i]))
    }
    return result
}

function routeToJson(state) {
    let intStops = convertStopsToInt(state.stops, state.allStops)
    let intTimeTable = convertTimeTable(state.timeTable.slice(1))
    return JSON.stringify({
        "routeId": state.number,
        "stops": intStops,
        "startTime": state.startTime,
        "endTime": state.endTime,
        "interval": state.interval,
        "type": typeToInt(state.type),
        "timetable": intTimeTable})
}



function sendPostRequest(url, body){
    // Simple POST request with a JSON body using fetch

    const requestOptions = {
        method: 'Post',
        headers: { 'Content-Type': 'application/json' },
        body: body
    };
    return fetch(url, requestOptions).then(response => response.json())
        .then((responseData) => {
            return responseData;
        })
}

function typeToInt(type){
    switch (type) {
        case "Тролейбус":
            return 1;
        case "Автобус":
            return 2;
        case "Трамвай":
            return 3;
        default:
            return 1;

    }
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return await response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
    .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
    });