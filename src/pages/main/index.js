import React, { Component, Fragment } from 'react';
import api from '../../services/api';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        users: [],
    };
    
    componentDidMount() {
        this.loadUsers();
    }

    setLoading(loading = true) { 
        if(loading === true) {
            this.formEl = document.getElementById('user-form')
            let loadEl = document.createElement('h1');
            loadEl.setAttribute('id', 'loading');
            this.formEl.appendChild(loadEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    loadUsers = async () => {
        this.setLoading();
        try {
            const response = await api.get('/users');
            this.setState({ users: response.data });
            this.setLoading(false);
        } catch (err) {
            alert('Algo deu errado, recarregue a página.')
            this.setLoading(false);
        }
    }

    render() {
        const { users } = this.state;
        return (
            <Fragment>
                <div className="register-button">
                    <Link id="register" to="/register">Registrar novo usuario</Link>
                </div>
                <div className='user-list'>
                    <table id="user-form">
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
            </Fragment>
        );
    }
}