import { Router } from 'express';
import auth from './auth';
import user from './user';
import booking from './booking';
import type from './type';
const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/booking', booking);
routes.use('/type', type);

export default routes;
