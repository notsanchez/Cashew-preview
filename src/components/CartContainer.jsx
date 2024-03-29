import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios'
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";
import ConfirmPage from "../pages/ConfirmPage";

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);
  const [valueTest, setValueTest] = useState('')

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    setValueTest(cartItems)
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  const totalCart = tot + 1.5

  const currency = "BRL";

  function FazerPedido(){
      const rndInt = Math.floor(Math.random() * 2000) + 100
      axios.post('http://localhost:3001/pedidos', {
      pedido: valueTest,
      preco: totalCart,
      id: rndInt
    }).then(function(res){
      console.log(res)
    }).catch(function(err){
      console.log(err)
    })
    localStorage.setItem("request", rndInt);
  }


  const PaypalPayment = () => {
    return(
      <PayPalScriptProvider options={{"client-id": "AX5Wj4fXshdyvPdcvjFqryLzXUizmjg1fMEpg_p6B0DKCDCkxEDSm7m9kUcfpGdAInZNnBj_Csb6bDAc"}}>
          <PayPalButtons
              fundingSource="card"
              style={{"layout":"vertical"}}
              createOrder={(data, actions) => {
              return actions.order
                  .create({
                    purchase_units: [
                        {
                            amount: {
                                  value: totalCart,
                            },
                        },
                      ],
                  })
              }}
              onApprove={(_, actions) => {
                    return actions.order.capture().then(function (details) {
                        alert("Transição completa");
                    });
              }}
          />
      </PayPalScriptProvider>
    )
  }

  useEffect(() => {
    <PaypalPayment/>
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Carrinho</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
          onClick={clearCart}
        >
          Limpar <RiRefreshFill />
        </motion.p>
      </div>


      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Itens do carrinho */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Item do carrinho */}
            {cartItems &&
              cartItems.length > 0 &&
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          {/* Total do carrinho */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Total dos pedidos</p>
              <p className="text-gray-400 text-lg">R$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Taxa de serviço</p>
              <p className="text-gray-400 text-lg">R$ 1.50</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total:</p>
              <p className="text-gray-200 text-xl font-semibold">
                R${tot + 1.5}
              </p>
            </div>

            {user ? (
              <>
                <Link to="/confirm">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    onClick={FazerPedido}
                    className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
                  >
                    Finalizar compra
                  </motion.button>
                </Link>
                {/*<PaypalPayment/>*/}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">
            Seu carrinho esta vazio :/
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;