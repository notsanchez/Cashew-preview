import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'

const RowContainer = ({ flag, data }) => {

    const [items, setItems] = useState([]);

    const [{cartItems}, dispatch] = useStateValue();

    const addtocart = () => {
        dispatch({
          type: actionType.SET_CARTITEMS,
          cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
      };

    useEffect(() => {
        addtocart();
    }, [items]);

  return (
    <div
    className={`w-full flex items-center gap-3 my-12 scroll-smooth ${
        flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
    }`}
    >
        {data && data.map(item => (
            <div key={item?.id} className='w-300 h-[200px] min-w-[300px] md:min-w-[340px] bg-gray-100 rounded-lg p-2 my-12 backdrop-blur-lg flex flex-col items-center justify-between'>
                <div className='w-full flex items-center justify-between'>
                    <div className='w-40 h-40 -mt-8 drop-shadow-2xl'>
                        <img src={item?.imageURL} alt="" 
                         className='w-full h-full object-contain'/>
                    </div>
                    <motion.div 
                    whileTap={{scale: 0.8}} 
                    onClick={() => setItems([...cartItems, item])}
                    className='w-20 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
                        <h1 className='text-semibold text-white text-sm'>Adicionar</h1>
                    </motion.div>
                </div>

                <div className='w-full flex flex-col items-end justify-end'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                    {item?.title}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
                    <div className='flex items-center gap08'>
                        <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-red-500'>
                            R$
                            </span>
                            {item?.price}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RowContainer