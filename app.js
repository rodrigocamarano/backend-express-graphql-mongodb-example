const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const graphqlHttp = require('express-graphql');
const bodyParser = require('body-parser');

const schema = require('./graphql/schema');
const resolver = require('./graphql/resolvers');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(cors());

app.use(
    '/graphql',
    graphqlHttp({
        schema,
        rootValue: resolver,
        graphiql: process.env.PORT ? false : true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err;
            }
            const data = err.originalError.data;
            const message = err.message || 'An error occurred.';
            const code = err.originalError.code || 500;
            return { message: message, status: code, data: data };
        }
    })
);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_SERVER}/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then(result => {
        app.listen(process.env.PORT || 8080);
    })
    .catch(err => console.log(err));