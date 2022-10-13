import { ShopContextProvider } from '../context/shopContext'
function MyApp({ Component, pageProps }) {
  return (
    <ShopContextProvider>
      <Component {...pageProps} />
    </ShopContextProvider>
  )
}

export default MyApp
