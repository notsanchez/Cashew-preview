import React, { useEffect } from 'react'
import { CreateContainer, Header, MainContainer } from './components'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { actionType } from './context/reducer'
import { Profile } from './pages'
import { InitialPage } from './pages'

const App = () => {

  const [{foodItems, user, adminemail}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems : data
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
                      <Route path="/" element={<MainContainer />}/>
                    ) : (
                      <Route path="/" element={<InitialPage />}/>
                    )}
                    {user && user.email === adminemail && (
                      <Route path="/createItem" element={<CreateContainer />}/>
                    )}
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            </main>
        </div>
    </AnimatePresence>
  )
}

export default App