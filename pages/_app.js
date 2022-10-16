import { ShopContextProvider } from '../context/shopContext'
import Navbar from "../components/Navigation/Navbar";
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  return (
    <ShopContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </ShopContextProvider>
  )
}

export default MyApp
