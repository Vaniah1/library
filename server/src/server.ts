import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config';
import mongoose from 'mongoose';
import { registerRoutes } from './routes';

const app: Express = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

(async function startUp() {
  try {
    await mongoose.connect(config.mongo.url, {
      w: 'majority',
      retryWrites: true,
      authMechanism: 'DEFAULT',
    });

    console.log('MONGODB connected!');

    registerRoutes(app);

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
})();
