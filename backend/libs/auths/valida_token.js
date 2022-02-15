module.exports = app => {
    const Token = app.db.models.token;
    const Usuario = app.db.models.usuario;
    return {
        valida: async (req, res, next) => {
            if (!req.headers.authorization) {
                return res.status(401).json({ message: 'Token não enviado' });
            }

            let token = req.headers.authorization.replace('Bearer ', '');

            let data = await Token.findOne({
                include: Usuario,
                where: { token }
            });

            if (!data) {
                return res.status(401).json({ message: 'Token inválido' });
            } 
            let dataHj = new Date();

            if (data.expirado || dataHj > data.validade) {
                return res.status(401).json({ message: 'Token expirado' });
            }

            validaRota(req, res, data.usuario);

            next();
        }
    }
}


function validaRota(req, res, user) {

    let url = req.originalUrl.split('/');
    url = url[1];

    if(!user.cod_guep) {
        if(url == 'guep') {
            return res.status(401).json('Você não tem permissão para acessar esta rota');
        }
    }

    if(user.cod_cliente) {
        if(url == 'parceiro') {
            return res.status(401).json('Você não tem permissão para acessar esta rota');
        }
    }


}