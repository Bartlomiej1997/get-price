import express from 'express';
import { numberPlatesRouter } from './components/numberPlates';
import { redisService } from './components/redis';
const { log } = console;

const start = async (): Promise<void> => {
  const app = express();
  await redisService
    .connect(process.env.REDIS_URL || 'redis://localhost:6379')
    .catch((err) => log('Error connecting to redis', err));

  app.use('/numberPlates', numberPlatesRouter);

  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    log(`Server listening on port ${port}`);
  });
};

start();
