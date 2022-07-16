import React, { useEffect, useState } from 'react'
import {IoFastFood} from 'react-icons/io5'
import {categories} from '../utils/data'
import { motion } from 'framer-motion'
import RowContainer from './RowContainer'
import { useStateValue } from '../context/StateProvider'

const MenuContainer = () => {

    const [filter, setFilter] = useState('salgados')

    const [{foodItems}, dispatch] = useStateValue();

  return (
    <section className='w-full my-6' id='menu'>
        <div className='w-full flex flex-col items-center justify-center'>
        <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute 
          before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-10 
          before:bg-orange-500 transition-all ease-in-out duration-100'
          >Menu de Produtos
          </p>

          <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll
          scrollbar-none'>
            {categories && categories.map(category => (
                <motion.div whileTap={{ scale: 0.8 }} key={category.id} className={`group ${filter === category.urlParamName ? 'bg-red-500' : 'bg-white'} w-24 min-w-[94px] h-28 cursor-pointer
            rounded-lg drop-shadow-xl flex flex-col gap-3 hover:bg-red-500 items-center justify-center`}
            onClick={() => setFilter(category.urlParamName)}
            >
                <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-card' : 'bg-red-500'} group-hover:bg-card flex items-center justify-center`}>
                    <IoFastFood
                        className={`${filter === category.urlParamName ? 'text-textColor' : 'text-white'} group-hover:text-textColor text-lg`}
                     />
                </div>
                <p className={`text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor'} group-hover:text-card`}>{category.name}</p>
            </motion.div>
            ))}
          </div>


          <div className='w-full'>
            <RowContainer flag={false} data={foodItems?.filter(item => item.category == filter)}/>
          </div>
        </div>
    </section>
  )
}

export default MenuContainer