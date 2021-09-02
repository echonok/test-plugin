import { Plugin, FastifyInstance } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { IPluginOptions } from '@marketplace/interfaces';
import { contentCreate, contentGetAll, contentDeleteByIdHandler, contentUpdateByIdHandler } from './handlers';
import { contentCreateSchema, contentGetAllSchema, contentDeleteSchema, contentUpdateSchema } from './schemas';

const router: Plugin<Server, IncomingMessage, ServerResponse, IPluginOptions> = (
  app: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  options,
  next,
) => {
  app.get('/', {}, contentGetAll);

  // @ts-ignore
  app.delete('/:contentId',{ preValidation: [app.authenticate], schema: contentDeleteSchema }, contentDeleteByIdHandler);

  // @ts-ignore
  app.post('/', { preValidation: [app.authenticate] }, contentCreate);

  // @ts-ignore
  app.put('/:contentId', { preValidation: [app.authenticate], schema: contentUpdateSchema }, contentUpdateByIdHandler);

  next();
};

export default router;
