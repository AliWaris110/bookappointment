import { NextFunction, Request, Response, Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import UserService from '../services/UserService';
import { Logger } from 'winston';

const route = Router();

route.post(
  '/register',
  celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string(),
    }),
  }),
  async (req, res, next) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /register endpoint with body: %o', req.body);
    try {
      const userServiceInstance = Container.get(UserService);
      const { user, jwtToken,isUserExists } = await userServiceInstance.register(
        req.body,
        req.get('origin')
      );
      return res.status(201).json({ message:"Successful"});
    } catch (e) {
   
      return next(e);
    }
  }
);

route.post(
  '/login',
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /login endpoint with email: %s', req.body.email);
    try {
      const userServiceInstance = Container.get(UserService);
      const ipAddress = req.ip;
      const { jwtToken, refreshToken,user } = await userServiceInstance.login(
        req.body.email,
        req.body.password,
        ipAddress
      );
      setTokenCookie(res, <string>refreshToken);
      return res.json({ user:user,jwtToken:jwtToken }).status(200);
    } catch (e) {
      return next(e);
    }
  }
);
/////setting up cookie/////
export function setTokenCookie(res: Response, token: string) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie('refreshToken', token, cookieOptions);
}
export default route;
