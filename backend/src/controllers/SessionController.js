const User = require('../models/User');
const mongoose = require('mongoose');

// São os métodos possíveis dentro de um controller
// index, show, store, update, destroy

// index - Retorna "todas as coisas" daquele controler. Por exemplo, estamos num controller de Session, ele retorna então todas as sessions
// show - Retorna um registro específico. Neste caso, uma session específica
// store - Armazena um registro. Neste caso uma session
// update - Atualiza um registro. Neste caso uma session
// destroy - Deleta um registro. Neste caso uma session

module.exports = {
    async store(req, res){
        // const email = req.body.email; //Essa linha seria a forma "normal" de receber a variável, mas você pode usar a chamada "desconstrução" abaixo, para procurar a variavel "email" dentro do body
        const { email } = req.body;

        // Agora uma regra de negócio. Não quero deixar um email que foi cadastrado, se cadastrar novamente.
        let user = await User.findOne({
            email: email
        });

        if (!user){
            // o await é utilizado para aguardar a resposta do comando executado, nesse caso o .create. Mas pra usar await, precisamos que a função seja assincrona, utilizando o async antes do nome dela.
            // Utilizando o await, a execução do programa só passa pra próxima linha, depois que ele executar o cadastro no banco.
            user = await User.create({ email });
        }

        return res.json(user);

        // Nesse retorno ele retorna o usuário criado no banco com id, email e a variavel __v.
        // Esse __v significa quantas vezes aquele registro foi atualizado no banco de dados
    },

    async update(req, res){
        const { id }  = req.body;
        _id = new mongoose.Types.ObjectId(id)

        let user = await User.findById({ _id });

        if (user){
            user.email = 'eita@gmail.com';
            user.save();
        }

        return res.json(user);
    }
};