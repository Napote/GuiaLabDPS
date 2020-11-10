import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Link} from 'react-router-dom'  

import './Navbar.css';

class Navbar extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    render() {
        return (
          <> 
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand ml-3" href="#">Tercer desafio practico</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarToggle">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown" id="navbarAccount">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                
                                <img src="https://placekitten.com/30/30" className="mr-2 img-circle" height="30px" width="30px"/>  
                                Mi cuenta 
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown"> 
                                <Link className="dropdown-item" to="/signin">
                                    Cerrar sesión
                                </Link>            
                            </div>
                        </li> 
                    </ul>                  
                </div>
            </nav>
          </>
        )
    }
};
Navbar = withRouter(Navbar);
export default Navbar;