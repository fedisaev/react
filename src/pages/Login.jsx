import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import {Link} from "react-router-dom";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = e => {
        e.preventDefault();
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Page for login</h1>
            <form onSubmit={login}>
                <MyInput type={'text'} placeholder={'Enter login'}/>
                <MyInput type={'password'} placeholder={'Enter password'}/>
                <Link to={'/posts'}><MyButton>Login</MyButton></Link>
            </form>
        </div>
    );
};

export default Login;