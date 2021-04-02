import express from 'express';
import dotenv from 'dotenv';
import routes from '../config/routes';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
app.use(routes);

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
