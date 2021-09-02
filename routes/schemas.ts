import { RouteSchema } from 'fastify';
// import { ErrorSchema } from '@dist/models/schemas/error';
// import { IRouteSchema } from '../../../src/models/interfaces';
import { ErrorSchema } from '../../../src/models/schemas';
import { IRouteSchema } from '@marketplace/models/interfaces';

const contentSchema: object = {
  isEnabled: { type: 'boolean' },
  uri: { type: 'string' },
  priority: { type: 'number' },
  title: { type: 'string' },
  location: { type: 'string' },
  conditions: {
    type: 'array',
    items: {
      type: 'string',
    },
  },
  blocks: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        descriptions: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

export const contentCreateSchema: IRouteSchema = {
  description: 'Receive and create new content',
  body: {
    properties: contentSchema,
    type: 'object',
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {},
    },
  },
  summary: 'Create new contact',
  tags: ['plugin-vacancies'],
};

export const contentEditSchema: IRouteSchema = {
  description: 'Receive and create new content',
  body: {
    properties: contentSchema,
    type: 'object',
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {},
    },
  },
  summary: 'Create new contact',
  tags: ['plugin-vacancies'],
};

export const contentGetAllSchema: IRouteSchema = {
  description: 'Get vacancies',
  response: {
    200: {
      description: 'Successful response',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          ...contentSchema,
        },
      },
      type: 'array',
    },
    400: {
      ...ErrorSchema,
      description: 'Authorization failed',
    },
    403: {
      ...ErrorSchema,
      description: 'Not enough permissions',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Get content list',
  tags: ['plugin-vacancies'],
};

export const contentDeleteSchema: IRouteSchema = {
  description: 'Delete content',
  params: {
    type: 'object',
    required: ['contentId'],
    properties: {
      contentId: {
        type: 'string',
      },
    },
  },
  response: {
    204: {
      description: 'Vacancy have been deleted',
      type: 'string',
    },
    400: {
      ...ErrorSchema,
      description: 'Authorization failed',
    },
    403: {
      ...ErrorSchema,
      description: 'Not enough permissions',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Delete content',
  tags: ['plugin-vacancies'],
};

export const contentUpdateSchema: IRouteSchema = {
  description: 'Update content information',
  body: {
    properties: contentSchema,
    type: 'object',
  },
  response: {
    200: {
      description: 'Vacancy have been updated',
      properties: contentSchema,
      type: 'object',
    },
    400: {
      ...ErrorSchema,
      description: 'Authorization failed',
    },
  },
  security: [
    {
      jwt: [],
    },
  ],
  summary: 'Update content',
  tags: ['plugin-vacancies'],
};
