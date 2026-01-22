
import { z } from 'zod';
import { insertRecipeSchema, insertShoppingItemSchema, recipes, shoppingItems } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  recipes: {
    parse: {
      method: 'POST' as const,
      path: '/api/recipes/parse',
      input: z.object({ url: z.string().url() }),
      responses: {
        200: insertRecipeSchema,
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/recipes',
      responses: {
        200: z.array(z.custom<typeof recipes.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/recipes/:id',
      responses: {
        200: z.custom<typeof recipes.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/recipes',
      input: insertRecipeSchema,
      responses: {
        201: z.custom<typeof recipes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  shoppingList: {
    list: {
      method: 'GET' as const,
      path: '/api/shopping-list',
      responses: {
        200: z.array(z.custom<typeof shoppingItems.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/shopping-list',
      input: insertShoppingItemSchema,
      responses: {
        201: z.custom<typeof shoppingItems.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/shopping-list/:id',
      input: z.object({ isChecked: z.boolean() }),
      responses: {
        200: z.custom<typeof shoppingItems.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/shopping-list/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
    clearChecked: {
      method: 'POST' as const,
      path: '/api/shopping-list/clear',
      responses: {
        204: z.void(),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
