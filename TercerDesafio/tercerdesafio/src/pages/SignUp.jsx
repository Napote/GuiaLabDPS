import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../Firebase";


import Footer from '../components/Footer';

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event) => {

    event.preventDefault(); // POST , GET , PHP, JAVA , ASP, ETC

    setError("");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, { displayName });
    }
    catch (error) {
      setError('Error , Por favor intentar de nuevo : ' + error);
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <>
    <div className="container"> 
      <div className="row justify-content-center">
        <div className="col-md-6">
          <br/>
          <h4 className="text-center my-4"> 
              CREAR UNA CUENTA
          </h4>

          {error && 
            <div class="alert alert-dismissible alert-danger">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Algo ha fallado!</strong>  {error}.
            </div>
          }
          <div className="border  mx-auto mt-4 rounded py-4 px-4 md:px-8 alert-light"> 
            <form>
            <label htmlFor="displayName" className="block">
              Nombre de perfil
          </label>
          <div className="form-group">            
              <input type="text" className="form-control"
                name="displayName"
                placeholder="Ingresar Nombre"
                onChange={(event) => onChangeHandler(event)} />
            </div>         

            <label htmlFor="userEmail" className="block">
              Correo electronico
          </label>
          <div className="form-group">            
              <input type="email" className="form-control"
                name="userEmail"
                id="userEmail"
                value={email}
                placeholder="Ingresar Correo"
                onChange={(event) => onChangeHandler(event)} />
            </div>      

            <label htmlFor="userPassword" className="block">
              Contraseña 
          </label>
          <div className="form-group">            
              <input type="password" className="form-control"
                name="userPassword"
                id="userEmail"
                value={password}
                placeholder="Ingresar Contraseña"
                onChange={(event) => onChangeHandler(event)} />
            </div>  
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              onClick={event => {
                createUserWithEmailAndPasswordHandler(event);
              }}
            >
              Crear cuenta
            </button>    
            </form>
          </div> 
        
          <p className="text-center my-3"> 
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              ¿Ya tienes una cuenta?
            </Link> 
          </p> 


        </div>
      </div>
    </div>   
    <Footer/>
    </>
    );
};

export default SignUp;
