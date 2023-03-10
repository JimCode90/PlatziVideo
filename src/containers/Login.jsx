import React, {useState} from 'react';
import { connect } from "react-redux";
import { Link, useNavigate  } from "react-router-dom";
import { loginRequest } from "../actions";
import '../assets/styles/components/Login.scss';
import googleIcon from '../assets/static/google-icon.png';
import twitterIcon from '../assets/static/twitter-icon.png';
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
function Login(props) {

    const [values, setValues] = useState({
        'email': '',
    });

    const handleInput = (event) => {
       setValues({
           ...values,
           [event.target.name] : event.target.value
       })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log({values})
        props.loginRequest(values);
        props.navigate('/')
    }

    return (
        <>
            <Header isLogin />
            <section className='login'>
                <section className='login__container'>
                    <h2>Inicia sesión</h2>
                    <form className='login__container--form' onSubmit={handleSubmit}>
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
                        <button type='submit' className='button'>Iniciar sesión</button>
                        <div className='login__container--remember-me'>
                            <label>
                                <input type='checkbox' id='cbox1' value='first_checkbox' />
                                Recuérdame
                            </label>
                            <a href='/'>Olvidé mi contraseña</a>
                        </div>
                    </form>
                    <section className='login__container--social-media'>
                        <div>
                            <img src={googleIcon} /> Inicia sesión con Google
                        </div>
                        <div>
                            <img src={twitterIcon} /> Inicia sesión con Twitter
                        </div>
                    </section>
                    <p className='login__container--register'>
                        No tienes ninguna cuenta <Link to='/register'>Regístrate</Link>
                    </p>
                </section>
            </section>
        </>

    );
}
const mapDispatchToProps = {
    loginRequest,
}
export default (withRouter(connect(null, mapDispatchToProps)(Login)));