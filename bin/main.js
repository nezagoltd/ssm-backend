import express from 'express';
import dotenv from 'dotenv';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpecs from '../public/api-docs/swagger.json';

dotenv.config();

const app = express();
const port = process.env.PORT;
const docRouter = express.Router();

docRouter.use('/public/api-docs', serve, setup(swaggerSpecs));

app.use(docRouter);

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome' });
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default app;
