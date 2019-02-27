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
        this.setState({ ufs: response.data })
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;

        this.setState({ 
            [name]: target.value,
        });
    }

    setLoading(loading = true) { 
        if(loading === true) {
            this.formEl = document.getElementById('forms')
            let loadEl = document.createElement('span');
            loadEl.appendChild(document.createTextNode('Processando...'));
            loadEl.setAttribute('id', 'loading');
            this.formEl.appendChild(loadEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
        this.setLoading();
        try {
            await waitFor(1000);
            await api.post(`/users`, { 
                id: '',
                nome: this.state.nome,
                cpf: this.state.cpf,
                nascimento: this.state.nascimento,
                peso: this.state.peso,
                uf: this.state.uf
             });
            this.props.history.push('/');
            alert('Usuario cadastrado com sucesso!')
        } catch(err) {
            this.setLoading(false);
            alert('Erro ao cadastrar usuario.');
        }
    }
        
    
    
    render() {
        const { ufs } = this.state;
        return (
          <div className="user-register">
            <form id="forms" onSubmit={this.handleSubmit}>
                <label>Nome completo:</label><br />
                <input type="text"  name="nome" onChange={this.handleChange} title="O nome não pode conter números" required pattern="^[A-Za-zÀ-ÿ ,.'-]+$"/>
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