import React, { Component } from 'react';
import api from '../../services/api';
import axios from 'axios';

import './styles.css';

export default class Register extends Component {
    state = {
        user: {
            id: '',
            nome: '',
            cpf: '',
            nascimento: '',
            peso: '',
            uf: '',
        },
        ufs: [],
    }

    componentDidMount() {
        this.loadUfs();
    }

    loadUfs = async () => {
        const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        console.log(response.data);
        this.setState({ ufs: response.data })
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;

        this.setState({ 
            [name]: target.value,
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
        
        this.formEl = document.getElementById('forms')
        let loadEl = document.createElement('span');
        loadEl.appendChild(document.createTextNode('Processando...'));
        this.formEl.appendChild(loadEl);

        const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

        try {
            await waitFor(3000);
            const response = await api.post(`/users`, { 
                id: '',
                nome: this.state.nome,
                cpf: this.state.cpf,
                nascimento: this.state.nascimento,
                peso: this.state.peso,
                uf: this.state.uf
             });
            console.log(response.status);
            this.props.history.push('/');
        } catch(err) {
            console.warn(err);
        }
    }
        
    
    
    render() {
        const { ufs } = this.state;
        return (
          <div className="user-register">
            <form id="forms" onSubmit={this.handleSubmit}>
                <label>Nome completo:</label><br />
                <input placeholder="José Alves" type="text"  name="nome" onChange={this.handleChange} title="O nome não pode conter números" required pattern="^[A-Za-zÀ-ÿ ,.'-]+$"/>
                <br />
                <label>CPF:</label><br />
                <input type="text"  name="cpf" onChange={this.handleChange} maxLength="11" title="Apenas números, sem pontos '.' ou traços '-'" required pattern="[0-9]{11}"/>
                <br />
                <label>Data de nascimento:</label><br />
                <input type="date"  name="nascimento" onChange={this.handleChange} />
                <br />
                <label>Peso(kg):</label><br />
                <input type="text"  name="peso" onChange={this.handleChange} title="Apenas números, sem pontos '.' ou vírgulas ','" pattern="[0-9].{1,}" />
                <br />
                <select name="uf" onChange={this.handleChange}>
                    {ufs.map(uf => (
                        <option type="text" value={ufs.sigla}>{uf.nome}</option>
                    ))};
                </select>
                <br /><br />
              <button type="submit">Registrar</button>
            </form>
          </div>
        )
    }
}