import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';
import { setTokenCookie } from './auth';
import { isAuth, attachUser, checkRole } from '../middlewares';
import UserService from '../services/UserService';
// import requestIp from 'request-ip';
// app.use(requestIp.mw())
const route = Router();

///authorization is mandatory to get users///
route.get(
  '/',
  // isAuth,
  // attachUser,
  // checkRole('admin'),
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /user endpoint');
    try {
      const userServiceInstance = Container.get(UserService);
      userServiceInstance.request = req;
      const activeUsers = (await userServiceInstance.find()).filter(
        (isActive) => isActive.active === true && isActive.role==='user'
      );
      const inActiveUsers = (await userServiceInstance.find()).filter(
        (isActive) => isActive.active === false
      );

      const allUsers = await userServiceInstance.find();

      ////Will set it for admin after redux setting/////
      // const allUsers = beforeFilteringAllUsers.filter(
      //   (item) => item.id.toString() != req.currentUser.id.toString()
      // );


      return res
        .json({
         
          users: activeUsers,
          inActiveUsers: inActiveUsers,
          allUsers: allUsers,
        })
        .status(200);
    } catch (e) {
      return next(e);
    }
  }
);

////checking current admin rol user///////
route.get(
  '/current',
  isAuth,
  attachUser,
  (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /user/current endpoint');
    try {
      return res.json({ user: req.currentUser }).status(200);
    } catch (error) {
      next(error);
    }
  }
);

////for verify email
route.post('/verify-email', async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling post /verify-email endpoint');
  try {
    const userServiceInstance = Container.get(UserService);

    const verifyEmail = await userServiceInstance.verifyEmail(req.body);

    return res
      .json({ message: 'Verification successful, you can now login' })
      .status(200);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

//////forgot password//////
route.post('/forgot-password', async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling post /forgot-password endpoint');
  try {
    const userServiceInstance = Container.get(UserService);

    const forgotPassword = await userServiceInstance.forgotPassword(
      req.body,
      req.get('origin')
    );

    return res
      .json({
        message: 'Please check your email for password reset instructions',
      })
      .status(200);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

route.post('/reset-password', async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling post /reset-password endpoint');
  try {
    const userServiceInstance = Container.get(UserService);
    const resetPassword = await userServiceInstance.resetPassword(req.body);
    return res
      .json({ message: 'Password reset successful, you can now login' })
      .status(200);
  } catch (e) {
    res.status(404).json({ messageresetpassword: e });
  }
});

//////////RefreshTOken//////

route.post('/refresh-token', async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling post /refresh-token endpoint');
  try {
    const userServiceInstance = Container.get(UserService);
    const token = req.cookies.refreshToken;
    const ipAddress = req.ip;
    console.log('token inside of cookie: ', token);

    const getRefreshToken: any = await userServiceInstance.refreshToken({
      token,
      ipAddress,
    });

    res.status(200).json({ refreshToken: getRefreshToken });
    setTokenCookie(res, getRefreshToken.refreshToken);
    res.json(getRefreshToken);
  } catch (error) {
    console.log('Refresh-token route:', error);
  }
});
/////////Find user info by giving id/////

route.get('/:id', isAuth, async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling GET /user/find/:id endpoint');

  try {
    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.findOne(req.params.id);
    if (user.active) {
      return res
        .json({ message: 'User fetched Successfully', User: user })
        .status(200);
    } else {
      return res.json({ message: 'User not found' }).status(404);
    }
  } catch (e) {
    return res.status(404).send({ message: e });
  }
});

///Deleting user with admin permission////
route.patch(
  '/:id',
  /*isAuth, attachUser, */ async (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /user/delete/:id endpoint');

    try {
      const id = req.params.id;
      const userServiceInstance = Container.get(UserService);
      const getUserWithId = await userServiceInstance.findOne(id);
      userServiceInstance.request = req;
      const user = await userServiceInstance.updateActive(id, getUserWithId);
      if (user) {
        return res
          .json({ message: 'User deleted Successfully', User: user })
          .status(200);
      } else {
        return res
          .json({
            message: 'User Record Not Found',
          })
          .status(404);
      }
    } catch (e) {
      return res.status(404).send({ message: e });
    }
  }
);

route.patch('/:id', isAuth, attachUser, async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling patch /user endpoint');
  try {
    const userServiceInstance = Container.get(UserService);
    // console.log('Inside of patch route', userServiceInstance);

    const users = await userServiceInstance.update(req.params.id, req.body);

    // console.log('Users of patch route', users);

    return res.json(users).status(200);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

// /////setting up cookie/////
//  function setTokenCookie(res:Response, token:string) {
//   // create cookie with refresh token that expires in 7 days
//   const cookieOptions = {
//       httpOnly: true,
//       expires: new Date(Date.now() + 7*24*60*60*1000)
//   };
//   res.cookie('refreshToken', token, cookieOptions);
// }
export default route;
