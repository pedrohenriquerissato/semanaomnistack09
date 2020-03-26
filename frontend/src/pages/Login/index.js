import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({history}) {

    //Toda vez que email mudar de valor, a variável email recebe um novo valor. e o setEmail é uma função que faz essa análise
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post('/sessions', { email });
    const { _id } = response.data;

    //Salva isso num "local" onde o browser entende
    localStorage.setItem('user', _id);

    history.push('/dashboard');
    }

    return (
        <>
        <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          < input 
          type = "email"
          id = "email"
          placeholder = "Seu melhor e-mail" 
          value={email}
          //Uma função que recebe um evento e seta uma outra função pra pegar o valor
          onChange={event => setEmail(event.target.value)}
          / >

            <button className="btn" type="submit">Entrar</button>
        </form>
        </>
    )
}