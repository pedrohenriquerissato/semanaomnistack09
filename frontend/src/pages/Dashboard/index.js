import React, {useEffect, useState, useMemo} from 'react';
//serve para criar Links que o usuário clica e vai pra outra rota, sem termos que criar o history.push
import { Link } from 'react-router-dom'; 
import api from '../../services/api';
import socketio from 'socket.io-client';

import './styles.css';

//o useEffect é basicamente uma função que recebe 2 parâmetros.
// o 1 parametro é uma função
// o 2 parâmetro é um array com variáveis que quando sofrerem alterações, a 1a função (1o parametro é executado)

export default function Dashboard() {
    const [spots, setSpots] = useState([]); //[] é por que ele recebe uma lista do backend. Logo, aqui a variavel eh uma lista vazia
    const [requests, setRequests] = useState([]);
    
    const user_id = localStorage.getItem('user'); //É aquele salvo no localStorage
    
    // o useMemo é utilizado para "lembrar" o valor de uma variável. Serve para não ficar executando essa chamada de conexão diversas vezes
    // Todar vez que o user_id mudar, ele executa
    const socket = useMemo(() => socketio('http://192.168.100.114:3333', {
        query: { user_id},
    }), [user_id]);

    useEffect(() => {
        socket.on('booking_request', data => {
            setRequests([...requests, data]);
        })
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user'); //É aquele salvo no localStorage
            const response = await api.get('/dashboard', {
                headers: { user_id },
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approvals`);

        // Remove a requisição de reserva. Pega todas as outras que tenham o ID diferente dessa
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);

        // Remove a requisição de reserva. Pega todas as outras que tenham o ID diferente dessa
        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
                    </p>
                    <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
            ))}
        </ul>

        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }}>

                    </header>
                    <strong>
                        {spot.company}
                    </strong>
                    <span>
                        {spot.price ? `R$${spot.price}/dia` : `Gratuito`}
                    </span>
                </li>
            ))}
        </ul>
        <Link to="/new"><button className="btn">Cadastrar novo Spot</button></Link>
        </>
    )
}