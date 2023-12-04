
import express from 'express'
import responseController from '../controllers/response.controller.js'
import partController from '../controllers/part.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router();

router.route('/api/responses')
    .post(responseController.createResponse)
    .get(responseController.getAllResponses);

router.route('/api/responses/:partId')
    .get(authCtrl.requireSignin, partController.isOwner, responseController.getResponsesByPartId);

router.param('partId', partController.partById)

export default router