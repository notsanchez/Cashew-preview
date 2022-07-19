import React, { useEffect, useState } from 'react'
import axios from 'axios';

const RequestPage = () => {

    const [numPedido, setNumPedido] = useState('')
    const [data, setData] = useState('');
    const [pedidosFeitos, setPedidosFeitos] = useState(0);
    const [resData, setResData] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3001/pedidos/').then(function(res){
            setPedidosFeitos(res.data)
        })
    },[])

    const makeRequest = () => {
        if(numPedido === ''){

        } else{
            axios.get('http://localhost:3001/pedidos/' + numPedido).then(function(res){
                setData(res.data)
                setResData(res)
            }).catch(function(err){

                setResData(err)
            })
            axios.delete('http://localhost:3001/pedidos/' + numPedido).then(function(res){

            })
        }
    }

    const Pedidos = () => {

        if(resData.status === 200){
            return(
                <>
                    {data && data.pedido.map(item => (
                        <div className='flex' key={item.id}>
                            <h1 className='font-semibold text-lg text-center'>{item.qty}x</h1>
                            <h1 className='font-semibold text-lg'> - {item.title}</h1>
                            <hr/>
                        </div>
                    ))}
                </>
            )
        }
        if(resData.name === "AxiosError"){
            return(
                <h1>Código não encontrado</h1>
            )
        }
    }

  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <h1>Pedidos aguardando confirmação: {pedidosFeitos.length}</h1>
        <h1 className='text-lg font-semibold mt-16'>Digite o numero do pedido</h1>
        <input 
            className='text-center border-none rounded-lg px-12 py-3 text-lg' 
            type="text" 
            onChange={(e) => setNumPedido(e.target.value)}
        />
        <button onClick={makeRequest} className="m-12 bg-orange-500 rounded-md text-white text-lg font-semibold py-1 px-7">PROCURAR PEDIDO</button>

        <div></div>
        
        <Pedidos />
    </div>
  )
}

export default RequestPage