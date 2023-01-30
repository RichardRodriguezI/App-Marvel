import '../styles/globals.css'
import { Context } from '../context/finished'

export default function App({ Component, pageProps }) {
  return (
    <>
    <Context>
    <Component {...pageProps} />
    </Context>
    </>
  ) 
}
