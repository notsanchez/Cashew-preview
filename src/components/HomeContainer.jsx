import React from 'react'
import { useStateValue } from '../context/StateProvider'
import { Link } from 'react-router-dom';

const HomeContainer = () => {

    const [{user}] = useStateValue();

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full' id="home">
          <div className='py-2 flex-1 flex flex-col items-start justify-start gap-6'>
            <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
              <p className='text-base text-orange-500 font-semibold'>
                USCS
              </p>
            </div>
            
    
            <p className='text-[2.5rem] md:text-[6] font-bold tracking-wide text-headingColor'>
              Compre rapido, fácil e <span className='text-orange-500 text-[2.5rem]'>sem filas!</span>
            </p>
    
            <p className='text-base md:text-[6] text-textColor text-center md:text-left md:w-[80%]'>
             {user && ('Seja bem-vindo(a) ' + user)}
            </p>
    
              <button type='button' 
              className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg 
              hover:shadow-lg transition-all duration-100 ease-in-out text-white font-bold text-2xl drop-shadow-md'>
              Fazer pedido
              </button>
          </div>
        </section>
    )
}

export default HomeContainer