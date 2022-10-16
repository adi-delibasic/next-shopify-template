import React, { createContext, useEffect, useState } from 'react';
import Client from "shopify-buy";

// Shopify Buy SDK
const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API
});

// Context
const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [checkout, setCheckout] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false)



  /**
   * Creates checkout - stores it in local storage
   * */
  const createCheckout = async () => {
    try {
      const checkout = await client.checkout.create();
      localStorage.setItem("checkout_id", checkout.id)
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCheckout = async (checkoutId) => {
    try {
      const checkout = await client.checkout.fetch(checkoutId)
      setCheckout(checkout)
    } catch (error) {
      console.error(error)
    }

  }

  const fetchAllProducts = async () => {
    setLoading(true)
    const prods = await client.product.fetchAll();
    setProducts(prods)
    setLoading(false)
  }

  const fetchProdWithHandle = async (handle) => {
    setLoading(true)
    const prod = await client.product.fetchByHandle(handle);
    setProduct(prod)
    setLoading(false)
  }

  const openCart = () => {
    setIsCartOpen(true)
  }
  const closeCart = () => {
    setIsCartOpen(false)
  }


  const addItemToCheckout = async (id, qty) => {
    const lineItemsToAdd = [
      {
        variantId: id,
        quantity: parseInt(qty, 10)
      }
    ]
    const fetchedCheckout = await client.checkout.addLineItems(checkout.id, lineItemsToAdd);
    //   Update state
    setCheckout(fetchedCheckout)
    // Open cart on added item
    openCart();
  }

  const removeLineItem = async (lineItemIdsToRemove) => {
    const checkoutAfter = await client.checkout.removeLineItems(checkout.id, lineItemIdsToRemove);
    setCheckout(checkoutAfter);
    console.log(checkout)
  }


  useEffect(() => {
    if (localStorage.checkout_id) {
      fetchCheckout(localStorage.checkout_id)
    } else {
      createCheckout();
    }
  }, [])


  return (
    <ShopContext.Provider
      value={{
        checkout: checkout,
        setCheckout: setCheckout,
        products: products,
        loading: loading,
        setLoading: setLoading,
        product: product,
        fetchAllProducts: fetchAllProducts,
        fetchProdWithHandle: fetchProdWithHandle,
        isCartOpen: isCartOpen,
        closeCart: closeCart,
        openCart: openCart,
        addItemToCheckout: addItemToCheckout,
        removeLineItem: removeLineItem,
        setMenuOpen: setMenuOpen,
        menuOpen: menuOpen
      }}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContext;