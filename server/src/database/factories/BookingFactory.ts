import { Booking } from '../../api/entities/Booking';

import * as faker from 'faker';

export default async (data?: Booking): Promise<Booking> => {
  const booking = new Booking({
    title: (data && data.title) || faker.name.title(),
    venue:
      (data && data.venue) ||
      faker.address.cityName() + faker.address.streetAddress(),
    location:
      (data && data.location) ||
      faker.address.streetAddress() +
        faker.address.latitude() +
        faker.address.longitude(),

    date: (data && data.date) || faker.datatype.datetime(),
    time: (data && data.time) || faker.datatype.string(),
    status: (data && data.status) || faker.datatype.string(),
    typeId: (data && data.typeId) || faker.datatype.number(),
    userId: (data && data.userId) || faker.datatype.number(),
    createdBy: (data && data.createdBy) || faker.datatype.number(),
    createdDate: (data && data.createdDate) || faker.datatype.datetime(),
    modifiedBy: (data && data.modifiedBy) || faker.datatype.number(),
    modifiedDate: (data && data.modifiedDate) || faker.datatype.datetime(),
    active: (data && data.active) || faker.datatype.boolean(),
  });

  return booking;
};
