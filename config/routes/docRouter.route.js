import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerSpecs from '../../public/api-docs/swagger.json';

const docRouter = Router();

docRouter.use('/api-docs', serve, setup(swaggerSpecs));

export default docRouter;
