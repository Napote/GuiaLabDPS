import React, { useContext } from "react";

//TODO: Desinstalar react-router-dom

import { UserContext } from "../providers/UserProvider"; 
import { auth } from "../Firebase";
import { Router, Link } from "@reach/router";

import './Navbar.css';

const Navbar = () =>  { 

    const user = useContext(UserContext); 
    const { photoURL, displayName, email } = user;

    const signOut = () => {
        auth.signOut();  
    };
 
    return (
        <> 
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a className="navbar-brand ml-3" href="#">Tercer desafio practico</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="navbar-collapse collapse " id="navbarToggle"> 
                    <ul className="nav navbar-nav ml-auto">
                            <li class="nav-item dropdown ">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                                    <img 
                                        src={photoURL? photoURL : "https://placekitten.com/30/30"}
                                        className="mr-2 img-circle" 
                                        height="30px" 
                                        width="30px"
                                    />  
                                    Mi cuenta  
                                    <b class="caret"></b>
                                </a>
                                        <ul class="dropdown-menu dropdown-menu-right">
                                            <li>
                                                <div class="navbar-content">
                                                    <div class="row pb-3">
                                                        <div class="col-md-5">
                                                            <img  
                                                                src={photoURL? photoURL : "https://placekitten.com/120/120"}
                                                                alt="Alternate Text" class="img-responsive img-circle"  
                                                            /> 
                                                        </div>
                                                        <div class="col-md-7">
                                                            <span>{displayName}</span>
                                                            <p class="text-muted small">
                                                                {email}
                                                            </p>
                                                            <div class="divider">
                                                            </div>
                                                            <a href="#" class="btn btn-danger btn-sm active" 
                                                                onClick={() => { signOut() }}>
                                                                Cerrar sesión
                                                            </a>
                                                        </div> 
                                                    </div>
                                                </div> 
                                            </li>
                                        </ul>
                                    </li>
                    </ul>               
                </div>
            </nav>
        </>
    )
    
}; 
export default Navbar;