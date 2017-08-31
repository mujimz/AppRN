/**
 * Created by uxin on 2017/8/27.
 */
//同步
export async function getSync(url) {
    try{
        const uri = encodeURI(url);
        return await fetch(uri, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(filterStatus).then(filterJSON)
    }catch (error){
        console.log(error);
    }
}

export async function postSync(url, body) {
    try{
        const uri = encodeURI(url);
        return await fetch(uri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(filterStatus).then(filterJSON)
    }catch (error){
        console.log(error);
    }
}
//异步
export async function get(url) {
    try{
        const uri = encodeURI(url);
        return fetch(uri, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(filterStatus);
    }catch (error){
        console.log(error);
    }
}

export async function post(url, body) {
    try{
        const uri = encodeURI(url);
        return fetch(uri, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }).then(filterStatus);
    }catch (error){
        console.log(error);
    }
}
function filterStatus(res) {
    if (res.status / 100 === 2) {
        return res
    }
    const error = new Error()
    error.res = res
    throw error
}

function filterJSON(res) {
    return res.json()
}
