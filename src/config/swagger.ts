import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  //todas las caraterisitcas que se le van a dar
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "Operaciones de API PERN con productos",
      },
      {
        name: "Users",
        description: "Operaciones de API PERN con usuarios",
      },
    ],

    info: {
      title: "REST API Node.js / Express / Typescript",
      version: "1.0.0",
      description: "API Documentacion para productos",
    },
  },
  apis: ["./src/router.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
        .topbar-wrapper .link {
            content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
  customSiteTitle: "Documentación REST API Express / TypeScript",
};

export default swaggerSpec;

export { swaggerUiOptions };
