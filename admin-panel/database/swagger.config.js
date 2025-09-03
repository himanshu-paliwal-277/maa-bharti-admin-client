var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');

var swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Expense apis',
    version: '1.0.0',
    description: 'Documentation for your API',
  },
  servers: [
    {
      url: "http://localhost:3002"
    }
  ],
};

var options = {
  swaggerDefinition: swaggerDefinition,
  apis: ['./routes/*.js']
};

// Initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi: swaggerUi,
  swaggerSpec: swaggerSpec
};
