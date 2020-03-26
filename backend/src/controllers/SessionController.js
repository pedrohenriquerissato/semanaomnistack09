const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = {
    async store(req, res){
        const { email } = req.body;

        let user = await User.findOne({
            email: email
        });

        if (!user){
            user = await User.create({ email });
        }

        return res.json(user);
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
