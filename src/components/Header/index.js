import React from 'react';
import { NavLink } from 'react-router-dom';


import './styles.css';

const Header = () => (
    <div>
        <ul>
            <li>
                <a class="active" href="/">Home</a>
            </li>
            <li>
                <a href='/register'>Registrar</a>
            </li>
            <li>
                <a href="/maps">Mapa</a>
            </li>
            <li>
                <a href="#contact">Documentação</a>
            </li>
            <li>
                <a href="#about">Sobre</a>
            </li>
        </ul>
    </div>
);

export default Header;