
import { useState, useEffect } from "react"
import { useRouter } from 'next/router';
import styles from '../styles/inicio.module.css'
import Image from "next/image"

export default function Home() {

  const router = useRouter()
  const [value, setValue] = useState("")


  const handleSubmit = e => {
    e.preventDefault()
    if(value.length < 1) {
       alert('required value')
    } else {
      router.push({
        pathname: '/game',
        query: { value}
      });
    }
  }
  return (
    <>
     
      <main>
          <div className={`contenedor ${styles.inicio}`}>
          <Image src='/img/logo.png' width={500} height={400} alt="logo" />
              <h1>Enter your Name to Play!</h1>

              <form onSubmit={handleSubmit}>
                  <input type="text" id="name" placeholder='ex: Paul' 
                  onChange={e => setValue(e.target.value)}/>
                      <input type="submit" value="PLAY" />
              </form>
          </div>
      </main>
      
    </>
  )
}
