

import Part from '../models/part.model.js'
import errorHandler from './error.controller.js'

const createPart = async (req, res) => {
	try {
		console.log('create part')
		const part = new Part(req.body)
		part.owner = req.profile
		await part.save()
		res.status(200).json(part)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

const getAllParts = async (req, res) => {
	try {
		console.log('get all parts')
		const parts = await Part.find()
		res.status(200).json(parts)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

const partById = async (req, res, next, id) => {
	try {
		console.log('get part by id: ' + id)
		let part = await Part.findById(id).populate('owner', '_id name').exec()
		if (!part) {
			return res.status(404).json({
				error: 'Part not found'
			})
		}
		req.part = part
		next()
	} catch (error) {
		return res.status(400).json({
			error: 'Could not retrieve part'
		})
	}
}

const listByOwner = async (req, res) => {
	console.log('list by owner ' + req.profile._id)
	try {
		let parts = await Part.find({ owner: req.profile._id }).populate('owner', '_id name')
		res.json(parts)
	} catch (error) {
		console.log(error)
		return res.status(400).json({
			error: 'Could not retrieve part'
		})
	}
}

const readPart = (req, res) => {
	console.log('read part')
	return res.json(req.part)
}


const updatePart = async (req, res) => {
	try {
		console.log('update part')
		let part = req.part
		part = Object.assign(part, req.body)
		part.updated = Date.now()
		await part.save()
		res.status(200).json(part)
	} catch (error) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error)
		})
	}
}

const deletePart = async (req, res) => {
	try {
		let part = req.part
		console.log('delete part by id: ' + part._id)
		let deletedpart = await part.deleteOne()
		res.status(200).json(deletedPart)
	} catch (error) {
		return res.status(400).json({
			error: "Delete part failed"
		})
	}
}

const isOwner = (req, res, next) => {
	const isOwner = req.part && req.auth && req.part.owner._id == req.auth._id
	if (!isOwner) {
		return res.status(403).json({
			error: "User is not authorized"
		})
	}
	next()
}

export default {
	createPart,
	getAllParts,
	updatePart,
	deletePart,
	isOwner,
	listByOwner,
	partById,
	readPart
}

