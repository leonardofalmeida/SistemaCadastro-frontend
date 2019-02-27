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
                <p>Nome:{user.nome}</p>
                <p>CPF:{user.cpf}</p>
                <p>Data de nascimento:  
                    <Moment format="DD/MM/YYYY">{user.nascimento}</Moment>
                </p>
                <p>Peso:{user.peso}</p>
                <p>UF:{user.uf}</p>
                <p>ID:{user.id}</p>
            </div>
        )
    }
}