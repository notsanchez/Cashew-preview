import React, { useState } from 'react'
import { MdShoppingBasket, MdAdd, MdLogout, MdPerson } from 'react-icons/md'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'

import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {

    const [{user, cartShow, cartItems, adminemail}, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)

    const openMenu = () => {
        if(user){
            setIsMenu(!isMenu)
        }
    };

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow : !cartShow,
        });
    }

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary'>
        
        <div className='flex items-center justify-between md:hidden w-full h-full'>

            <div className='relative flex items-center justify-center' onClick={showCart}>
                    {user && (<MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/>)}
                    {cartItems && cartItems.length > 0 && (
                        <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
                    </div>
                    )}
            </div>

            <Link to={"/"} className='flex items-center gap-2'>
                <img src={Logo} className='w-8 object-cover' alt="" />
                <p className='text-headingColor text-xl font-bold'>Cashew</p>
            </Link>

            <div className='relative'>
                    <motion.img 
                        whileTap={{ scale: 0.8 }} 
                        src={Avatar} 
                        className="w-10 h-10 drop-shadow-xl cursor-pointer rounded-full" 
                        alt=""
                        onClick={openMenu}
                    />
                    {isMenu && (
                        <motion.div 
                        initial={{opacity: 0, scale : 0.8}}
                        animate={{opacity: 1, scale : 1}}
                        exit={{opacity: 0, scale : 0.8}}
                        className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                        {
                            user && user === adminemail && (
                                <>
                                    <Link to={"/createItem"}>
                                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setIsMenu(false)}>Novo produto<MdAdd /></p>
                                    </Link>
                                    <Link to={"/pedidos"}>
                                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setIsMenu(false)}>Procurar pedidos</p>
                                    </Link>
                                </>
                            )
                        }
                        <ul
                        className='flex flex-col'>
                            <Link to="/">
                                <li className='text-base text-textColor hover:text-headingColor duration-100 hover:bg-slate-100 transition-all ease-in-out cursor-pointer px-4 py-2' onClick={() => setIsMenu(false)}>Inicio</li>
                            </Link>
                            <li className='text-base text-textColor hover:text-headingColor duration-100 hover:bg-slate-100 transition-all ease-in-out cursor-pointer px-4 py-2' onClick={() => setIsMenu(false)}>Minhas compras</li>
                        </ul>
                        
                        <Link to="/profile">
                            <p className='m-2 p-2 rounded-md shadow-md flex 
                            items-center justify-center bg-gray-200 gap-3 cursor-pointer 
                            hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base'
                            onClick={() => setIsMenu(false)}>Meu perfil<MdPerson /></p>
                        </Link>
                        </motion.div>
                    )}
                </div>
        </div>
    </header>
  )
}

export default Header