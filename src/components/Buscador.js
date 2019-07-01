import React, { Component } from 'react';
import './Buscador.css';
class Buscador extends Component {

    leerDatos = (e) =>{

        const termino = e.target.value;
        
        this.props.busqueda(termino);
    }

    render() {
        return (
            <form className="buscador" onChange={this.leerDatos}>
                <input type="text" placeholder="Búsqueda"/>
            </form>
        );
    }
}

export default Buscador;