import { NextFunction, Request, Response, Router } from 'express';
import { Logger } from 'winston';
import { Container } from 'typedi';

import { isAuth, attachUser, checkRole } from '../middlewares';
import BookingService from '../services/BookingService';
import UserService from '../services/UserService';
import { Booking } from '../entities/Booking';

const route = Router();

///authorization is mandatory to get list of bookings///
route.get(
  '/',
  // isAuth,
  // attachUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /booking endpoint');
    try {
      const bookingServiceInstance = Container.get(BookingService);
      bookingServiceInstance.request = req;

      const availableBookings = (await bookingServiceInstance.find()).filter(
        (isActive) =>
          isActive.active === true &&
          (isActive.status === 'available' || isActive.status === 'pending')
      );
      const bookings = (await bookingServiceInstance.find()).filter(
        (isActive) => isActive.active === true && isActive.status === 'pending'
      );
      const inActiveBookings = (await bookingServiceInstance.find()).filter(
        (isActive) => isActive.active === false
      );
      const completedBookings = (await bookingServiceInstance.find()).filter(
        (item) => item.status === 'completed'
      );
      return res
        .json({
          availableBookings: availableBookings,
          bookings: bookings,
          inActiveBookings: inActiveBookings,
          completedBookings: completedBookings,
        })
        .status(200);
    } catch (e) {
      return next(e);
    }
  }
);

/////adding new booking//////
route.post(
  '/createBooking',
  isAuth,
  attachUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /booking endpoint');
    console.log('1');
    try {
      const bookingServiceInstance = Container.get(BookingService);
      bookingServiceInstance.request = req;

      // console.log('checkBookingReq: ',bookingServiceInstance.request,'checkUserReq: ',userServiceInstance.request)
      let setCreatedDate = new Date().toISOString();
      let bookingRecordFromBody = {
        ...req.body,
        modifiedBy: null,
        status:'available',
        createdDate: setCreatedDate,
      };
      const bookings = await bookingServiceInstance.createBooking(
        bookingRecordFromBody
      );

      return res.json(bookings).status(200);
    } catch (e) {
      res.json({ message: e });
      return next(e);
    }
  }
);

/////////Find booking info by giving id/////

route.get('/:id', isAuth, async (req: Request, res: Response) => {
  const logger: Logger = Container.get('logger');
  logger.debug('Calling GET /booking/find/:id endpoint');

  try {
    const bookingServiceInstance = Container.get(BookingService);
    const booking = await bookingServiceInstance.findOne(req.params.id);
    if (booking.active) {
      return res
        .json({
          message: 'Booking data fetched Successfully',
          Booking: booking,
        })
        .status(200);
    } else {
      return res.json({ message: 'Record not found' }).status(404);
    }
  } catch (e) {
    return res.status(404).send({ message: e });
  }
});

///Deleting booking with admin permission just changing active=false////
route.patch(
  '/delete/:id',
  isAuth,
  attachUser,
  async (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling GET /booking/delete/:id endpoint');

    try {
      const id = req.params.id;
      const bookingServiceInstance = Container.get(BookingService);
      const getBookingRecordWithId = await bookingServiceInstance.findOne(id);

      bookingServiceInstance.request = req;
      const setModifiedBy = bookingServiceInstance.request.currentUser.id;
      const setDateForRecordModification = new Date().toISOString();
      let bookingRecordFromBody = {
        ...getBookingRecordWithId,
        modifiedBy: setModifiedBy,
        modifiedDate: setDateForRecordModification,
      };

      const booking = await bookingServiceInstance.updateActive(
        id,
        bookingRecordFromBody
      );

      if (booking) {
        return res
          .json({
            message: 'Booking deleted Successfully',
            Booking: booking.active,
            Fancy: getBookingRecordWithId.active,
          })
          .status(200);
      } else {
        return res
          .json({
            message: 'Booking Record Not Found',
          })
          .status(404);
      }
    } catch (e) {
      return res.status(404).send({ message: e });
    }
  }
);

///// update with an admin access only/////////
route.patch(
  '/update/:id',
  isAuth,
  attachUser,
  async (req: Request, res: Response) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling patch /booking endpoint');

    ////Debugging ends here


    
    try {
      console.log('1');
      const id = req.params.id;
      const bookingServiceInstance = Container.get(BookingService);
      console.log('2');

      bookingServiceInstance.request = req;
      const setModifiedBy = bookingServiceInstance.request.currentUser.id;
      const bodyData = { ...req.body };
      const bookingRecordFromBody = {
        ...bodyData['newData'],
        modifiedBy: setModifiedBy,
        userId: setModifiedBy,
      };
      console.log('Booking record from body: ', bookingRecordFromBody);
      delete bookingRecordFromBody['id'];
      const bookings = await bookingServiceInstance.updateBooking(
        id,
        bookingRecordFromBody
      );
      console.log('4');

      if (bookings) {
        console.log('5');

        return res
          .json({
            message: 'Booking Record Updated Successfully',
            Booking: bookings,
          })
          .status(200);
      } else {
        console.log('6');

        return res
          .json({
            message: 'Booking Record Updated Failed',
            Booking: bookings,
          })
          .status(400);
      }
    } catch (e) {
      console.log('7 ', e);

      res.status(404).json({ message: e });
    }
  }
);

export default route;
