
import express from 'express'
import { createUserController } from '../../../application/createUser';
import { deleteUserController } from '../../../application/deleteUser';
import { getUserByUserNameController } from '../../../application/getUserByUserName';
import { loginController } from '../../../application/login';
import { middleware } from '../../../../../shared/infrastructure/http';
import { getCurrentUserController } from '../../../application/getCurrentUser';
import { refreshAccessTokenController } from '../../../application/refreshAccessToken';
import { logoutController } from '../../../application/logout';

const userRouter = express.Router();

userRouter.post('/',
  (req, res) => createUserController.execute(req, res)
);

userRouter.get('/me',
  middleware.ensureAuthenticated(),
  (req, res) => getCurrentUserController.execute(req, res)
)

userRouter.post('/login',
  (req, res) => loginController.execute(req, res)
)

userRouter.post('/logout',
  middleware.ensureAuthenticated(),
  (req, res) => logoutController.execute(req, res)
)

userRouter.post('/token/refresh',
  (req, res) => refreshAccessTokenController.execute(req, res)
)

userRouter.delete('/:userId',
  middleware.ensureAuthenticated(),
  (req, res) => deleteUserController.execute(req, res)
)

userRouter.get('/:username',
  middleware.ensureAuthenticated(),
  (req, res) => getUserByUserNameController.execute(req, res)
)



export { userRouter };