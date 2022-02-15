import bodyParser from "body-parser";
import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

//Módulo de configuração da aplicação
module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(helmet());
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }));
    app.use(compression());
    app.use(bodyParser.json({ limit: '500mb', extended: true }));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    app.use(fileUpload());
    app.use(express.static("public"));
    app.use(express.static("private"));
    /*app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE, OPTIONS");

        next();
    });*/
};