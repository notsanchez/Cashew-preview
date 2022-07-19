import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [requestPassword, setRequestPassword] = useState('')
    const [dataaxios, setDataaxios] = useState('')
    const [{user}, dispatch] = useStateValue()

    const handleSubmit = () => {
        if(email && passwd !== '') {
            axios.get('http://localhost:3001/usuarios/' + email + uscsmail).then(function(data){
                setDataaxios(data.data.fullName)
                setRequestPassword(data.data.password)
            }).catch(function(err){
                console.log(err)
            })
        } else {
            console.log("faltam campos")
        }

        if(passwd === requestPassword){
            dispatch({
                type: actionType.SET_USER,
                user : dataaxios,
            });
            localStorage.setItem('user', dataaxios)
            window.location.replace("/");
        } else {
            console.log("ERRO")
        }
    }

    const uscsmail = "@uscsonline.com.br"



  return (
    <div className='mt-16'>
        <h1 className='text-center font-bold text-orange-500 text-3xl'>Entre na sua conta</h1>
        <div className='flex flex-col items-center justify-center p-6'>

            <h1 className='text-center font-semibold text-textColor text-xl mt-12'>Seu E-mail:</h1>
            <div className='flex items-center text-center justify-center'>
                <input type="text" className='w-40 h-10 text-center rounded-lg bg-slate-100 drop-shadow-md border-none' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" value={uscsmail} disabled className='w-44 h-10 bg-gray-400 text-textColor rounded-md drop-shadow-sm text-center' />
            </div> 

            <div className='mt-5 text-center'>
                <h1 className='text-center font-semibold text-textColor text-xl'>Sua senha:</h1>
                <input type="password" className='h-10 text-center rounded-lg bg-slate-100 drop-shadow-md border-none' value={passwd} onChange={(e) => setPasswd(e.target.value)} />
            </div>
                <button
                onClick={handleSubmit && handleSubmit}
                className='mt-20 bg-orange-500 text-white font-semibold px-12 py-3 rounded-lg'>Entrar</button>
        </div>
    </div>
  )
}

export default LoginPage