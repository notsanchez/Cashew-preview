import React, { useState, useEffect } from 'react'
import axios from 'axios';

const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [passwd, setPasswd] = useState('')

    const uscsmail = "@uscsonline.com.br"

    const handleSubmit = () => {
        if(email && name && passwd !== ''){
            axios.post('http://localhost:3001/usuarios', {
            id: email + uscsmail,
            password: passwd,
            fullName: name
        })
        .then(function(res) {
            window.location.replace("/");
        })
        .catch(function(err){
            console.log(err)
        })
        } else{
            console.log("Faltam campos!")
        }
    }

  return (
    <div className='mt-16'>
        <h1 className='text-center font-bold text-orange-500 text-3xl'>Crie Sua Conta</h1>
        <h1 className='text-center font-semibold text-textColor text-xl mt-12'>Seu E-mail:</h1>
        <div className='flex items-center text-center justify-center'>
            <input type="text" className='w-40 h-10 text-center rounded-lg bg-slate-200 drop-shadow-md border-none' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" value={uscsmail} disabled className='ml-2 w-26 h-10 bg-gray-200 text-textColor rounded-md drop-shadow-md' />
        </div>  
        <div className='flex flex-col items-center justify-center p-6'>
            <h1 className='text-center font-semibold text-textColor text-xl'>Seu Nome:</h1>
            <input type="text" className='h-10 text-center rounded-lg bg-slate-200 drop-shadow-md border-none' value={name} onChange={(e) => setName(e.target.value)} />
            <div className='mt-5 text-center'>
                <h1 className='text-center font-semibold text-textColor text-xl'>Sua senha:</h1>
                <input type="password" className='h-10 text-center rounded-lg bg-slate-200 drop-shadow-md border-none' value={passwd} onChange={(e) => setPasswd(e.target.value)} />
            </div>
                <button 
                onClick={handleSubmit}
                className='mt-20 bg-orange-500 text-white font-semibold px-12 py-3 rounded-lg'>Criar Conta</button>
        </div>
    </div>
  )
}

export default RegisterPage