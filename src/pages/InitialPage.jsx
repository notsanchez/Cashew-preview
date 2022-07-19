import React from 'react'
import { RowContainerLogin } from '../components'

const InitialPage = () => {

    const login = () => {
        window.location.replace("/login");
    }

    const register = () => {
        window.location.replace("/register");
    }


  return (
    <div className='flex flex-col items-center justify-center'>
        <RowContainerLogin flag={true} />
        <button type='button' className='rounded-lg bg-orange-400 px-12 py-3 text-white font-bold drop-shadow-md' onClick={login}>Entrar com minha conta</button>
        <button type='button' className='rounded-lg bg-orange-400 px-12 py-3 text-white font-bold drop-shadow-md mt-5' onClick={register}>Criar Conta</button>
    </div>
  )
}

export default InitialPage