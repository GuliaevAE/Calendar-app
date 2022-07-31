import React, {useContext} from 'react';
import styled, { css, keyframes } from 'styled-components'
import { Context } from '..';
import firebase from 'firebase/compat/app'
import Logo1 from '../components/images/Logo1.svg'
import { fadeIn, fadeInLeft, fadeInRight } from 'react-animations';
const fader = keyframes(fadeIn);
const faderLeft = keyframes(fadeInLeft);
const faderRight = keyframes(fadeInRight);


const LoginScreen = styled.div`
height:100vh ;
width:100vw ;
display:flex ;
flex-direction:column ;
justify-content:center ;
align-items: center;
background:grey ;
box-sizing:border-box ;



button{
    border:3px solid rgba(7, 195, 255, 1);
    border-radius:10px ;
    background: transparent ;
    color: rgba(7, 195, 255, 1);
    min-height:40px ;
    width:280px ;
    
    margin-left:2vw;
    font-size:20px ;
    animation: 1s ${faderRight} alternate;
}
`

const Logo = styled.img`
margin: 4vh;
width:100% ;
animation: 1s ${faderLeft} alternate;
`



const Login = () => {
    const {auth} = useContext(Context)

    const login = async () =>{
        const provider = new firebase.auth.GoogleAuthProvider()
        const {user} = await auth.signInWithPopup(provider)
        console.log(user)
    }

    return (
        <LoginScreen>
            <Logo src={Logo1}/>
            {/* login <input type="email"></input>
            login <input type="password"></input> */}
            <button onClick={login}>Войти с помощью Google</button>
        </LoginScreen>
    );
};

export default Login;