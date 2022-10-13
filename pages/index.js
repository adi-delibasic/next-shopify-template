import { useContext, useEffect } from "react";
import ShopContext from "../context/shopContext";

export default function Home() {
  const {fetchAllProducts, products} = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts()
  }, []);


  return (
    <div className={`text-center`}>
      <h1 className={`text-4xl p-4 uppercase`}>Shopify storefront</h1>
    </div>
  )
}
