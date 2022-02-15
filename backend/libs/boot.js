

//Módulo de inicialização da aplicação
module.exports = app => {
    app.libs.db.sequelize.sync().then(() => {
        app.listen(app.get("port"), () => {
            console.log(`API - porta ${app.get("port")} - Enviroment ${process.env.NODE_ENV}`);
        });
    });
}
