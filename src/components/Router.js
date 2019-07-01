import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Nosotros from './Nosotros';
import Error from './Error';
import infoProductos from '../datos/datos.json';
import Productos from './Productos';
import Header from './Header';
import SingleProducto from './SingleProducto';
import Navegacion from './Navegacion';
import Contacto from './Contacto';

class Router extends Component {
    
    state = {
        productos: [],
        terminoBusqueda: ''
    }
    
    componentWillMount(){
        this.setState({
            productos: infoProductos
        })
    }

    busquedaProductos = busqueda =>{
        if(busqueda.length > 3) // si el tamaño de la busqueda no supera a 3, no busca
            this.setState({
                terminoBusqueda: busqueda
            })
        else{ 
             this.setState({
                terminoBusqueda: '' // esto es importante para que no quede en cache la busqueda si se elimina
                })

            }
     
    }
    
    render() {

        let productos = [...this.state.productos]; //toma copia del estado de productos

        let busqueda = this.state.terminoBusqueda; //tambiendel termino de busqueda

        let resultado;

        if(busqueda !== ''){
            resultado = productos.filter(producto => (
                producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1
            )) //resultado es igual a filtrado de productos en el cual el nombre sea igual a busqueda con lowercase
        }// el -1 es porque indexOf retorna -1 cuando no hay resultado
        else{
            resultado = productos;
        }

        return (
            <BrowserRouter>
                <Header />
                <Navegacion />
                <Switch>
                    <Route exact path="/" render={() => (<Productos 
                                                            productos={this.state.productos}
                                                            busquedaProductos={this.busquedaProductos}
                    />)} />
                    <Route exact path="/nosotros" component={Nosotros} />
                    <Route exact path="/productos" render={() => (
                            <Productos 
                            productos={resultado}
                            busquedaProductos={this.busquedaProductos}
                            />
                    )}/>
                    <Route exact path="/producto/:productoId" render={(props) =>{
                        let idProducto = props.location.pathname.replace('/producto/','');
                        return (
                            <SingleProducto 
                                producto={this.state.productos[idProducto]}
                            />
                        )
                    } } />
                    <Route exact path="/contacto" component={Contacto} />
                    <Route component={Error} />

                </Switch>
            
            </BrowserRouter>
        );
    }
}

export default Router;