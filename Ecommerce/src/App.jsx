
import './App.css'
import { Routes, Route } from "react-router"
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  
 const [cart, setCart] = useState([])

 useEffect(() => {

  const fetchUpData = async () => {
    const response = await axios.get("/api/cart-items?expand=product")
    setCart(response.data)
  }
  fetchUpData()
  
 },[])
  
  return (
    <Routes>
        <Route index element = {<HomePage cart={cart} />} />
        <Route path='checkout' element = {<CheckoutPage cart={cart}/>} />
        <Route path='orders' element = {<OrdersPage cart={cart} />} />
    </Routes>
  
  )
}

export default App
