import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <Link to={'/'}>
                <img src="../logo.png" alt="logo"/>
            </Link>       
        </header>
    );
};

export default Header;