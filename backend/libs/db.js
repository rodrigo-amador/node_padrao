import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";

const config = require("./config.js");

//Importa os parâmetros de conexão com o banco de dados
//Efetua a conexão com o banco de dados
const sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db.params
);

//Verifica se a autenticação com o banco de dados foi realizada
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Houve com problema ao tentar se conectar com o banco de dados:', err);
    });

let db = {
    sequelize,
    Sequelize,
    models: {}
};

const dir = path.join(__dirname, "../models");
// //Retornar um array de strings referente aos nomes de arquivos existentes no diretório models
fs.readdirSync(dir).forEach(file => {
    const model = require(path.join(dir, file))(sequelize, DataTypes);
    db.models[model.name] = model;
});

//Garante o relacionamento correto entre as tabelas definida nos models
/*Object.keys(db.models).forEach(key => {
    db.models[key].associate(db.models);
});*/

module.exports = db;