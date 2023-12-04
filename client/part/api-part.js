
import auth from '../lib/auth-helper.js'

const listParts = async (signal) => {
    try {
        let response = await fetch('/api/parts', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
    }
}


const createPart = async (part) => {
    try {
        let response = await fetch('/api/parts/by/' + auth.isAuthenticated().user._id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth.isAuthenticated().token
            },
            body: JSON.stringify(part)
        })
        return await response.json()
    }
    catch(err) {
        console.log(err)
    }
}

const listByOwner = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/parts/by/'+params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    }catch(err){
        console.log(err)
    }
}

const remove = async (params, credentials) => {
    try {
        let response = await fetch('/api/parts/' + params.partId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        if (!response.ok) {
            console.error('Error deleting part:', response.statusText);
            return null;
        }
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

const read = async (params) => {
    try {
        let response = await fetch('/api/parts/' + params.partId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return response.json()
    }catch(err) {
        console.log(err)
    }
}

const update = async (params, credentials, part) => {
    try {
        let response = await fetch('/api/parts/' + params.partId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(part)
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

export {
    createPart,
    listParts,
    listByOwner,
    remove,
    read,
    update
}

