import { Express, Request, Response } from 'express';
import AuthRoutes from './AuthRoutes';
import UserRoutes from "./UserRoutes"

export const registerRoutes = (app: Express) => {
  app.use('/auth', AuthRoutes);
  app.use("/users", UserRoutes)
};
