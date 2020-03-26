const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app); //Como se eu separasse meu server http do APP
const io = socketio(server); // Agora adiciono protocolo websocket

require('dotenv').config()

/**
 * DATABASE_CONNECTION in this case it's a MongDB online database
 */
mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectedUsers = {};
// Server para verificar cada conexão de usuário
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

/**
 * .use allows add a rule to all routes
 * next() allows to continue app run
 */
app.use((req, res, next) => {

    /**
     * Forwards io and connectedUsers to all routes requests
     */
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(cors());
/**
 * Allows app to receive a json body request
 */
app.use(express.json());

/**
 * Creates an alias for uploads as a "/files" route (virtual)
 */
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);