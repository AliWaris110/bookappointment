import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


let databaseUrl = process.env.MONGODB_URI;
if (process.env.NODE_ENV === 'test') {
  databaseUrl = process.env.MONGODB_TEST_URI;
}

export default {
  port: process.env.PORT || 8000,
  databaseURL: databaseUrl,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL,
  },
  endpointPrefix: process.env.ENDPOINT_PREFIX || 'api',
};
