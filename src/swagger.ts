import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ms-ue-restaurantes',
      version: '1.0.0',
      description: 'Microservicio para obtener restaurantes cercanos según coordenadas',
    },
    servers: [{ url: 'http://localhost:3000', description: 'Local' }],
    components: {
      schemas: {
        Location: {
          type: 'object',
          properties: {
            lat: { type: 'number', example: -12.0464 },
            lng: { type: 'number', example: -77.0428 },
            address: { type: 'string', example: 'Av. Larco 123, Miraflores' },
            distance: { type: 'number', example: 0.85, description: 'Distancia en km' },
          },
        },
        Restaurant: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            name: { type: 'string', example: 'Burger Palace' },
            category: { type: 'string', example: 'Hamburguesas' },
            rating: { type: 'number', example: 4.8 },
            deliveryTime: { type: 'string', example: '20-30 min' },
            deliveryFee: { type: 'number', example: 2.5 },
            imageUrl: { type: 'string', example: 'https://...' },
            tags: { type: 'array', items: { type: 'string' }, example: ['Hamburguesas', 'Papas'] },
            isOpen: { type: 'boolean', example: true },
            location: { $ref: '#/components/schemas/Location' },
          },
        },
        FetchRestaurantsResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            total: { type: 'integer', example: 5 },
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Restaurant' },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Se requieren los parámetros lat y lng' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
