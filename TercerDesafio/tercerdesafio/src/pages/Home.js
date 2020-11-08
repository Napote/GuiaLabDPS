import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Empleado from '../components/Empleado';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => (
    <>
        <Navbar/>        
        <Empleado/>         
        <ToastContainer />
        <Footer/>
    </>
);