
import express from 'express'
import { getMemberByUserNameController } from '../../../application/members/getMemberByUserName';
import { getCurrentMemberController } from '../../../application/members/getCurrentMember';

const memberRouter = express.Router();

memberRouter.get('/me',
  (req, res) => getCurrentMemberController.execute(req, res)
)

memberRouter.get('/:username',
  (req, res) => getMemberByUserNameController.execute(req, res)
)

export {
  memberRouter
}