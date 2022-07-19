import React from 'react'
import { useStateValue } from '../context/StateProvider'
import Avatar from '../img/avatar.png'
import { actionType } from '../context/reducer';

const Profile = () => {

    const logout = () => {
        localStorage.clear()
        window.location.replace("/");

        dispatch({
            type : actionType.SET_USER,
            user : null
        })
    }

    const [{user}, dispatch] = useStateValue()

  return (
    <div className='w-full flex flex-col items-center justify-center'>
        <img src={Avatar} className="w-40 h-40 drop-shadow-xl cursor-pointer rounded-full" alt="" />
        <h4 className='py-4 text-lg text-textColor font-semibold'>{user}</h4>

        <button type='button' className='rounded-lg bg-orange-300 px-12 py-3 text-text-Color drop-shadow-md my-6'>Minhas compras</button>
        <button type='button' className='rounded-lg bg-orange-300 px-12 py-3 text-text-Color drop-shadow-md' onClick={logout}>Sair</button>
    </div>    
  )
}

export default Profile