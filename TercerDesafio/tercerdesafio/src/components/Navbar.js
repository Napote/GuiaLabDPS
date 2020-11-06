import React from 'react';
import {NavLink, withRouter}  from 'react-router-dom'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    
    getNavLinkClass = (path) => {
        return this.props.location.pathname === path ? 'active' : '';
    }
    render() {
        return (
          <> 
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <a class="navbar-brand" href="#">Tercer desafio practico</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarToggle">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item"> 
                            <Link className="nav-link" to="/signin">Cerrar sesión</Link> 
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