import express from "express";
import consign from "consign";

const app = express();

consign({ verbose: false })
    .include("libs/config.js")
    .then("libs/db.js")
    .then("libs/middlewares.js")
    .then("autenticacao-jwt.js")
    .then("services")
    .then("routes")
    .then("crons")
    .then("libs/boot.js")
    .into(app);

module.exports = app;
