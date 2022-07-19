import React, { useEffect, useState } from 'react'
import { CreateContainer, Header, MainContainer } from './components'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import { InitialPage, Profile, RequestPage, ConfirmPage, RegisterPage, LoginPage } from './pages'
import axios from 'axios'

const App = () => {

  const [{user, adminemail}, dispatch] = useStateValue();

  const fetchData = async () => {
    axios.get('http://localhost:3001/data')
    .then(function(data){
      console.log(data)
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data.data
      })
    })
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
        <div className='w-screen h-screen flex flex-col bg-primary'>
            <Header />

            <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full'>
                <Routes>
                    {user && user ? (
                      <>
                        <Route path="/" element={<MainContainer />}/>
                        <Route path="/confirm" element={<ConfirmPage />}/>
                      </>
                    ) : (
                      <>
                        <Route path="/" element={<InitialPage />}/>
                        <Route path="/register" element={<RegisterPage />}/>
                        <Route path="/login" element={<LoginPage />}/>
                      </>
                    )}
                    {user && user === adminemail && (
                      <>
                        <Route path="/createItem" element={<CreateContainer />}/>
                        <Route path="/pedidos" element={<RequestPage/>}/>
                      </>
                    )}
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            </main>
        </div>
    </AnimatePresence>
  )
}

export default App