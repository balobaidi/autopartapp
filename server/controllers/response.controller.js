
import Response from "../models/response.model.js"
import errorHander from "./error.controller.js"

const createResponse = async (req, res) => {
    try{
        console.log('create response')
        const response = new Response(req.body)
        await response.save()
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getAllResponses = async (req, res) => {
    try{
        console.log('get all responses')
        const responses = await Response.find()
        res.status(200).json(responses)
    } catch(error) {
        res.status(400).json({ message: error.message})
    }
}

const getResponsesByPartId = async (req, res) => {
    try{
        console.log('get responses by partId')
        const partId = req.params.partId
        const responses = await Response.find({ part: partId })
        
        res.status(200).json(responses)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
}

export default {
    createResponse,
    getAllResponses,
    getResponsesByPartId
}