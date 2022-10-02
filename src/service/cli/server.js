'use strict';

// const chalk = require(`chalk`);
const {HttpCode, API_PREFIX} = require(`../../constants`);
const {getLogger} = require(`../lib/logger`);
const routes = require(`../api`);

const logger = getLogger({name: `api`});

const DEFAULT_PORT = 3000;

const express = require(`express`);

const app = express();
const expressSession = require(`express-session`);
app.use(express.json());

app.use(expressSession({
  secret: `mother`,
  resave: false,
  saveUninitialized: false,
  name: `session_id`
}));

app.use(API_PREFIX, routes);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occurred on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port)
      .on(`listening`, () => {
        return logger.info(`Listening to connections on ${port}`);
      })
      .on(`error`, ({message}) => {
        return logger.error(`An error occurred on server creation: ${message}`);
      });
  }
};
