const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        // Regra de Negocio para mostrar a reserva em tempo real.
        // A ideia é buscar o dono do "spot" e ver se ele está logado no momento.
        const ownerSocket = req.connectedUsers[booking.spot.user];

        // Se o dono do Spot estiver conectado, vou enviar uma mensagem pra ele
        if (ownerSocket){
            // Pega o req com o io e envia uma mensagem com o objeto booking ao Dono do Spot
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};