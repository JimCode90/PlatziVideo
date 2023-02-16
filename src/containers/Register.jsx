import React, {useState} from 'react';
import {connect} from "react-redux";
import {registerRequest} from "../actions";
import '../assets/styles/components/Register.scss'
import {Link, useNavigate} from "react-router-dom";
import Header from "../components/Header";


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        const navigate = useNavigate();
        return (
            <Component
                {...props}
                navigate={navigate}
            />
        );
    }

    return ComponentWithRouterProp;
}

function Register(props) {

    const [values, setValues] = useState({
        email: '',
        name: '',
        password: ''
    });

    const handleInput = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        props.registerRequest(values)
        props.navigate('/')
    }

    return (
        <>
            <Header isRegister />
            <section className='register' onSubmit={handleSubmit}>
                <section className='register__container'>
                    <h2>Regístrate</h2>
                    <form className='register__container--form'>
                        <input
                            className='input'
                            type='text'
                            placeholder='Nombre'
                            name='name'
                            onChange={handleInput}
                        />
                        <input
                            className='input'
                            type='text'
                            placeholder='Correo'
                            name='email'
                            onChange={handleInput}
                        />
                        <input
                            className='input'
                            type='password'
                            placeholder='Contraseña'
                            name='password'
                            onChange={handleInput}
                        />
                        <button type='submit' className='button'>Registrarme</button>
                    </form>
                    <Link to='/login'>Iniciar sesión</Link>
                </section>
            </section>
        </>

    );
}

const mapDispatchToProps = {
    registerRequest,
};
export default (withRouter(connect(null, mapDispatchToProps)(Register)));