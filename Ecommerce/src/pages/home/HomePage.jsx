
import { Header } from "../../components/Header"
import axios from "axios"
import { useEffect, useState } from "react"
import { ProductsGrid } from "./ProductsGrid"


export function HomePage({cart}) {

    const [producs, setProducts] = useState([])
   

    useEffect(() => {
  
    const getHomeData = async () => {
      const response = await axios.get("/api/products")
      setProducts(response.data)
    }
    getHomeData()
    },[])

    
  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <ProductsGrid products={producs} />
      </div>
    </>
  )
}