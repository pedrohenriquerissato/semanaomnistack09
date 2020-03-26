const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;

        // O 'populate' serve para adicionar os dados do modelo "spot" no modelo que vc ta criando
        const booking = await Booking.findById(booking_id).populate('spot');

        booking.approved = true;

        await booking.save();

                // Regra de Negocio para mostrar a reserva em tempo real.
        // A ideia é buscar o dono do "spot" e ver se ele está logado no momento.
        const bookingUserSocket = req.connectedUsers[booking.user];

        // Se o dono do Spot estiver conectado, vou enviar uma mensagem pra ele
        if (bookingUserSocket){
            // Pega o req com o io e envia uma mensagem com o objeto booking ao Dono do Spot
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
};