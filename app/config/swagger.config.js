const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Boilerplate",
      version: "1.0.0",
      description:
        "Nodejs Express MongoDB JWT Auth Boilerplate",
    },
    components: {
      securitySchemes: {
        /* Authorization: {
             type: "http",
             scheme: "bearer",
             bearerFormat: "JWT",
             value: "Bearer <JWT token here>"
           }*/
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-access-token"
        },
      },
    },
  },
  apis: ["./app/routes/*.js"], // Path to the API docs
};

module.exports = options;
