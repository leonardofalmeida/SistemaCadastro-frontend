import React, { Component } from 'react';
import api from '../../services/api';
import Moment from 'react-moment';

import './styles.css';

export default class User extends Component {
    state = {
        user: {},
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const response = await api.get(`/users/${id}`)

        this.setState({ user: response.data});
    }

    render() {
        const { user } = this.state;
        return (
            <div className="user-info">
                <h3>Informações</h3>
                <p><span>Nome:</span> <br/>
                {user.nome}</p>
                <p><span>CPF:</span> <br/>
                {user.cpf}</p>
                <p><span>Data de nascimento:</span> <br/>  
                    <Moment format="DD/MM/YYYY">{user.nascimento}</Moment>
                </p>
                <p><span>Peso:</span> <br/>
                {user.peso} kg</p>
                <p><span>UF:</span> <br/>
                {user.uf}</p>
                <p><span>ID:</span> <br/>
                {user.id}</p>
            </div>
        )
    }
}