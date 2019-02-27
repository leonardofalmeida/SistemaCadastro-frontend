import React from 'react';

import './styles.css';

const Header = () => (
    <div>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href='/register'>Registrar</a>
            </li>
            <li>
                <a href="/maps">Mapa</a>
            </li>
        </ul>
    </div>
);

export default Header;