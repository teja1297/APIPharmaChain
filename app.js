const express = require("express");
const app = express();
const port = 3000;
const indexRouter = require('./routes/index');
const SWAGGER = require("./config/swagger.js");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: SWAGGER.open_api_version,
        info: {
            title: SWAGGER.title,
            version: SWAGGER.version,
            description: SWAGGER.description,
        },
        servers: [
            {
                url: SWAGGER.url,
            },
        ]
    },
    apis: SWAGGER.apis,
};

const specs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use('/', indexRouter);

app.listen(port, () => {
	console.log("Server is running on port:" + port);
});
