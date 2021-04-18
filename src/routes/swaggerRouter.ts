import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    explorer: true,
    swagger: '2.0',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Users and Birds docs',
        version: '1.0.0',
      },
    },
    apis: [__dirname + '/*.ts'], // files containing annotations as above
  };

const swaggerRouter = Router();

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerJsdoc(options)));

export { swaggerRouter };