import { Type } from '../../api/entities/Type';

import * as faker from 'faker';

export default async (data?: Type): Promise<Type> => {
  const type = new Type({
   
    typeName: (data && data.typeName) || faker.datatype.string(),
   
  });

  return type;
};
