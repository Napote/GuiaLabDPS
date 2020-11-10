import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../Firebase";
import { auth } from "../Firebase";
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const signInWithEmailAndPasswordHandler = (event) => {

    event.preventDefault(); //DOM -> POST , GET -> PHP , JAVA , ASP , ETC
   
    console.log(" SignIn - signInWithEmailAndPasswordHandler ");
    const user= auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error, por favor revisar credenciales -> " + error);
        console.error("Error signing in with password and email ", error);
      });
      console.log(" SignIn - signInWithEmailAndPassword ");  
      console.log(" const user :  " + user);      
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };


  return (
    <>
    <div className="container"> 
      <div className="row justify-content-center">
         
        <div className="col-md-6">
          <br/>
          <h4 className="text-center my-4"> 
              INICIAR SESION
          </h4>
          <div className="border  mx-auto mt-4 rounded py-4 px-4 md:px-8 alert-light">            
          <form >
            {error && 
              <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Algo ha fallado!</strong>  {error}.
              </div>
            }
            <div className="form-group">
              <label>Correo Electronico</label>
              <input type="email" className="form-control"
                name="userEmail"
                placeholder="Ingresar correo electronico"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control"
                name="userPassword"
                placeholder="Ingresar contraseña"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              onClick={(event) => { signInWithEmailAndPasswordHandler(event) }}
            >
              Ingresar
            </button>            
            <p className="text-center my-3">- O -</p>
          </form>
          <button 
            className="btn btn-info btn-block"
            onClick={() => { signInWithGoogle(); }}
          >
             <FontAwesomeIcon className="mr-2" icon={faGoogle}/> 
              Ingresar con Google
          </button>  
         
        </div>   
          
          <p className="text-center my-3"> 
            <Link to="signUp" className="text-blue-500 hover:text-blue-600">
              ¿Aún no tienes una cuenta?
            </Link> 
          </p> 
        </div> 
      </div>       
    </div>
    <Footer/>
    
    </>
  

  );
};

export default SignIn;
