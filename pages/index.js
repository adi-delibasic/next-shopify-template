import { useContext, useEffect } from "react";
import ShopContext from "../context/shopContext";

export default function Home() {
  const {fetchAllProducts, products} = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts()
  }, []);


  return (
    <div>
      {
        products.map((product) => (
          <h1 key={product.id}>{product.title}</h1>
        ))
      }
    </div>
  )
}
