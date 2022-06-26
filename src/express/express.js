'use strict';

const express = require(`express`);
const path = require(`path`);

const PUBLIC_DIR = `public`;

const mainRoutes = require(`./routes/main-routes`);
const registerRoutes = require(`./routes/register-routes`);
const loginRoutes = require(`./routes/login-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const searchRoutes = require(`./routes/search-routes`);

const DEFAULT_PORT = 8080;

const app = express();

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.use(`/`, mainRoutes);
app.use(`/register`, registerRoutes);
app.use(`/login`, loginRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/search`, searchRoutes);

app.listen(DEFAULT_PORT);
