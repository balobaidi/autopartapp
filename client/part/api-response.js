
const createResponse = async(responses) => {
    try {
        let response = await fetch('/api/responses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responses)
        })
        return await response.json()
    } 
    catch (error) {
        console.log(error)
    }
}

const getResponsesByPartId = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/responses/' + params.partId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return response.json()
    }
    catch(err){
        console.log(err)
    }
}

export {
    createResponse,
    getResponsesByPartId}