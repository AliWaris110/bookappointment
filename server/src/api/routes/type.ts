import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';

import { isAuth, attachUser, checkRole } from '../middlewares';
import TypeService from '../services/TypeService';



const route = Router();

///authorization is mandatory to get list of types///
route.get(
  '/',
  
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /type endpoint');
    try {
      const typeServiceInstance = Container.get(TypeService);
      typeServiceInstance.request = req;
      const types = await typeServiceInstance.find();

      return res.json({types:types,message:'successfully fetched all types'}).status(200);
    } catch (e) {
      return next(e);
    }
  }
);

/////adding new type//////
route.post(
  '/createType',
  isAuth,
  attachUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /type endpoint');
    try {
      const typeServiceInstance = Container.get(TypeService);
      typeServiceInstance.request = req;

      const types = await typeServiceInstance.createType(req.body);

      return res.json(types).status(200);
    } catch (e) {
      res.json({ message: e });
      return next(e);
    }
  }
);

/////////Find type info by giving id/////

route.get('/getType/:id', isAuth, async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling GET /type/find/:id endpoint');

  try {
    const typeServiceInstance = Container.get(TypeService);
    const type = await typeServiceInstance.findOne(req.params.id);
    if (type) {
      return res
        .json({
          message: 'Type data fetched Successfully',
          Type: type,
        })
        .status(200);
    } else {
      return res.json({ message: 'Record not found' }).status(404);
    }
  } catch (e) {
    return res.status(404).send({ message: e });
  }
});

///Deleting type with admin permission just changing active=false////
// route.patch(
//   '/delete/:id',
//   isAuth,
//   attachUser,
//   async (req: Request, res: Response) => {
//     const logger: Logger = Container.get('logger');
//     logger.debug('Calling GET /type/delete/:id endpoint');

//     try {
//       const id = req.params.id;
//       const typeServiceInstance = Container.get(TypeService);
//       const getTypeRecordWithId = await typeServiceInstance.findOne(id);

//       typeServiceInstance.request = req;
//       const setModifiedBy = typeServiceInstance.request.currentUser.id;
//       const setDateForRecordModification=new Date().toISOString()
//       let typeRecordFromBody = {
//         ...getTypeRecordWithId,
//         modifiedBy: setModifiedBy,
//         modifiedDate:setDateForRecordModification

//       };

//       const type = await typeServiceInstance.updateActive(
//         id,
//         typeRecordFromBody
//       );

//       if (type) {
//         return res
//           .json({
//             message: 'Booking deleted Successfully',
//             // Booking: type.active,
//             // Fancy: getTypeRecordWithId.active,
//           })
//           .status(200);
//       } else {
//         return res
//           .json({
//             message: 'Booking Record Not Found',
//           })
//           .status(404);
//       }
//     } catch (e) {
//       return res.status(404).send({ message: e });
//     }
//   }
// );

///// update  Type with an admin access only/////////
route.patch(
  '/update/:id',
  isAuth,
  attachUser,
  async (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling patch /type endpoint');

    try {
      const id = req.params.id;
      const typeServiceInstance = Container.get(TypeService);
      typeServiceInstance.request = req;
      const setModifiedBy = typeServiceInstance.request.currentUser.id;
      let typeRecordFromBody = { ...req.body, modifiedBy: setModifiedBy };

      const types = await typeServiceInstance.update(id, req.body);

      if (types) {
        return res
          .json({
            message: 'Type(service) Record Updated Successfully',
            Type: types,
          })
          .status(200);
      } else {
        return res
          .json({
            message: 'Type Record Updated Failed',
            Type: types,
          })
          .status(400);
      }
    } catch (e) {
      res.status(404).json({ message: e });
    }
  }
);

///Deleting type with admin permission////
route.delete(
  '/delete/:id',
  isAuth,

  async (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /type/delete/:id endpoint');

    try {
      const typeServiceInstance = Container.get(TypeService);
      const type = await typeServiceInstance.delete(req.params.id);
      return res
        .json({ message: 'Type deleted Successfully', Type: type })
        .status(200);
    } catch (e) {
      return res.status(404).send({ message: e });
    }
  }
);



////getting type id with providing name in params///
route.get(
  '/getIdWithName',
  
  async (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /type/getIdWithName/ endpoint');
    try {
      const typeServiceInstance = Container.get(TypeService);
      const typename:any=req.query.typeName;
      const findIdWithName = await typeServiceInstance.findTypeIdWithName(
        typename
      );
     
      return res
        .json({
          message: 'Type Id by Given Name ',TypeId:findIdWithName.id
        //   TypeId: findIdWithName.id,
        })
        .status(200);
    } catch (error) {
      return res.status(404).send({ message: error });
    }
  }
);

export default route;
