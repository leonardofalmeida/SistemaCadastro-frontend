import React, { Component } from 'react';
import api from '../../services/api';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Maps from '../map'

import './styles.css';

export default class Main extends Component {
    state = {
        users: [],
    };
    
    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = async () => {
        const response = await api.get('/users');
        console.log(response.data);
        this.setState({ users: response.data });
    }

    render() {
        const { users } = this.state;
        return (
            <div className='user-list'>
                <Link id="registrar" to="/register">Registrar novo usuario</Link>
                <table>
                    <tr className="caption">
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th> 
                        <th>Data de nascimento</th>
                        <th>Peso</th>
                        <th>UF</th>
                        <th>Ação</th>
                    </tr>
                    {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.nome}</td>
                        <td>{user.cpf}</td>
                        <td>
                            <Moment format="DD/MM/YYYY">{user.nascimento}</Moment>
                        </td>
                        <td>{user.peso}</td>
                        <td>{user.uf}</td>

                        <td><Link to={ `/users/${user.id}` }>Ver Usúario</Link></td>
                    </tr>
                    ))}
                </table>
            </div>
        );
    }
}