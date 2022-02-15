import bcrypt from "bcrypt";

module.exports = (sequelize, DataType) => {
    const Usuario = sequelize.define("usuario", {
        cod_usuario: {
            type: DataType.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataType.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataType.STRING(255),
            allowNull: false,
        },
        senha: {
            type: DataType.STRING(100),
            allowNull: false
        },
        ativo: {
            type: DataType.TINYINT,
            defaultValue: 0
        },
    },
        {
            updatedAt: 'dat_atualizacao',
            createdAt: 'dat_cadastro',
            freezeTableName: true,
            tableName: 'usuario',
            timestamps: true,
            scopes: {
                withoutPassword: {
                    attributes: { exclude: ['senha'] },
                }
            },
            hooks: {
                beforeBulkCreate: (datas) => {
                    for (let data of datas) {
                        if (data.senha) {
                            data.senha = Usuario.criptografarSenha(data.senha);
                        }
                    }
                },
                beforeCreate: async (data) => {
                    if (data.senha) {
                        data.senha = Usuario.criptografarSenha(data.senha);
                    }
                },
                beforeUpdate: async (data) => {
                    if (data.senha) {
                        data.senha = Usuario.criptografarSenha(data.senha);
                    }
                },
                beforeBulkUpdate: async (data) => {
                    if (data.attributes.senha) {
                        data.attributes.senha = Usuario.criptografarSenha(data.attributes.senha);
                    }
                },
            },
        });

    // Criptografa a senha 
    Usuario.criptografarSenha = (senha) => {
        const salt = bcrypt.genSaltSync();
        return bcrypt.hashSync(senha, salt);
    }

    Usuario.sync().then(() => {
        Usuario.bulkCreate([
            {
                cod_usuario: 1,
                nome: 'Rodrigo Magalhães',
                email: 'rodrigo.magalhaes@seven7th.com',
                senha: '2082535',
                ativo: 1,
            },
        ], { ignoreDuplicates: true })
            .then(data => {
                console.log('Usuario: se quiser ver data, inserir no console log')
            })
            .catch(error => {
                //console.log('Usuario: se quiser ver o erro, inserir no console log')
            })
    });

    return Usuario;
}; 