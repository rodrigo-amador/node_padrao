import jwt from "jwt-simple";
import bcrypt from "bcrypt";

module.exports = (app) => {
    const LoginService = {};
    const Config = app.libs.config;
    const Model = app.libs.db.models.usuario;

    LoginService.login = async (req, res) => {
        try {
            let data = await Model.findOne({ where: { email: req.body.email } });

            if (!data) {
                throw new Error('Acesso não encontrado');
            }

            if (!data.ativo) {
                throw new Error('Acesso inativo');
            }
            let login = await bcrypt.compare(req.body.senha, data.senha);

            if (!login) {
                throw new Error('Não autorizado');
            }

            let payload = {
                cod_usuario: data.cod_usuario,
                ativo: data.ativo,
            };

            let token = jwt.encode(payload, Config.jwt.jwtSecret);

            let retorno = {
                token: token,
                cod_tipo_perfil: payload.cod_tipo_perfil,
            };

            res.json(retorno);
        } catch (error) {
            res.status(412).json({ message: error.message });
        }
    }

    return LoginService;
}