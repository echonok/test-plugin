import { RequestHandler } from 'fastify';
import { ContentModel } from '../models/content';
import { BadRequestError, NotFoundError } from '../../../src/exceptions/errors';
// import { BadRequestError, NotFoundError } from '@marketplace/exceptions/errors';

export const contentCreate: RequestHandler = async (request, reply) => {
  await ContentModel.create({ ...request.body });
  reply.status(200).send({});
};

export const contentGetAll: RequestHandler = async (request, reply) => {
  const vacancies = await ContentModel.find({ deletedAt: null }).sort({ priority: -1 });
  return reply.send(vacancies);
};

export const contentDeleteByIdHandler: RequestHandler = async (request, reply) => {
  const { contentId } = request.params;

  if (!contentId.match(/^[0-9a-fA-F]{24}$/)) {
    throw new BadRequestError(`Provide valid mongo object id!`);
  }

  await ContentModel.updateOne({ _id: contentId }, { deletedAt: Date.now() });

  return reply.status(204);
};

export const contentUpdateByIdHandler: RequestHandler = async (request, reply) => {
  const { contentId } = request.params;
  const content = await ContentModel.updateOne({ _id: contentId }, request.body);

  if (content === null) {
    throw new NotFoundError('Content not found');
  }

  reply.send(content);
};
