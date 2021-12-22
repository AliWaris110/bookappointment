import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Logger from './logger';

const server = async () => {
  const app = express();
  app.use(cors({ credentials: true }));
  try {
    const loaders = await import('./loaders');
    await loaders.default(app);
  } catch (err) {
    Logger.error(err);
    Logger.error('Loader failed. Server shutting down...');
    return;
  }
  return app;
};

export default server;
