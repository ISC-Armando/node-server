import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      }
    ],
    info: {
      title: "RES API Node.js / Express / Sequelize / TypeScript",
      version: "1.0.0",
      description: "A simple REST API to manage products"
    }
  },
  apis: ["./src/router.ts"]
}

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;