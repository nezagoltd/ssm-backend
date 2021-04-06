import { Router } from 'express';

const welcomeRouter = Router();
welcomeRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to SSM!' });
});

export default welcomeRouter;
