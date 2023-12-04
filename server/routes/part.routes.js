
import express from 'express'
import partController from '../controllers/part.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

router.get('/api/parts', partController.getAllParts);

router.route('/api/parts/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, partController.createPart)
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, partController.listByOwner);

router.route('/api/parts/:partId')
    .get(partController.readPart)
    .put(authCtrl.requireSignin, partController.isOwner, partController.updatePart)
    .delete(authCtrl.requireSignin, partController.isOwner, partController.deletePart);


router.param('userId', userCtrl.userById)
router.param('partId', partController.partById)

export default router
