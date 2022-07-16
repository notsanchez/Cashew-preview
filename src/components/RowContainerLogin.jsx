import React from 'react'
import {PromoLogin} from '../utils/data'

const RowContainerLogin = ({ flag, data }) => {

  return (
    <div
    className={`w-full flex items-center gap-6 my-12 ml-8 scroll-smooth ${
        flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'
    }`}
    >
        {PromoLogin && PromoLogin.map(item => (
            <div key={item?.id} className='w-300 h-[200px] min-w-[300px] md:min-w-[340px] bg-gray-100 rounded-lg p-2 my-12 backdrop-blur-lg flex flex-col items-center justify-between'>
                <div className='w-full flex items-center justify-center'>
                    <div className='w-80 h-40 -mt-5 drop-shadow-2xl'>
                        <img src={item?.imgURL} alt="" 
                         className='w-full h-full object-contain'/>
                    </div>
                </div>

                <div className='w-full flex flex-col items-center justify-center'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                    {item?.title}
                    </p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RowContainerLogin