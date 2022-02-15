import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

module.exports = app => {
    const Model = app.db.models.usuario;
    const config = app.libs.config;
    const params = {
        secretOrKey: config.jwtSecret, //importa a chave secreta da aplicação 
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //Captura o token de requisição
    };

    const strategy = new Strategy(params, async (payload, done) => {
        try {
            if (!payload.cod_usuario) {
                return done(null, false);
            }

            const user = await Model.findOne({
                where: {
                    cod_usuario: payload.cod_usuario,
                    ativo: 1
                }
            });

            return user ?
                done(null, { // sucesso
                    ativo: user.ativo
                })
                :
                done(null, false); //falha

        } catch (error) {
            done(error, null);
        }
    });

    passport.use('login', strategy);

    return {
        initialize: () => {
            return passport.initialize();
        },
        authenticate: () => {
            let token = passport.authenticate('login', config.jwtSession);
            return token;
        }
    };
}