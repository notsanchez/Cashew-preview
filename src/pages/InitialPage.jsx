import React from 'react'
import { RowContainerLogin } from '../components'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config"

const InitialPage = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const login = async () => {
        if(!user){
            const {
                user : {refreshToken, providerData
            }} = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user : providerData[0],
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]))
            window.location.replace("/");
        }
    };

    const [{user}, dispatch] = useStateValue()

  return (
    <div className='flex flex-col items-center justify-center'>
        <RowContainerLogin flag={true} />
        <button type='button' className='rounded-lg bg-orange-500 px-12 py-3 text-text-Color drop-shadow-md' onClick={login}>Fazer Login</button>
    </div>
  )
}

export default InitialPage