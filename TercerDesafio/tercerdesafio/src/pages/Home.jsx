import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Empleado from '../components/Empleado';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


//TODO: Desinstalar react-router-dom



import "./Home.css"; 

export default () => (

    <div id="main">
        <Navbar/>        
        <Empleado/>         
        <ToastContainer />
        <Footer/>
    </div>
);