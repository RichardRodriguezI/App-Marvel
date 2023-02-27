import Link from "next/link"
import Image from "next/image"
import styles from '../styles/game.module.css'

export default function Header({value}) {

  return (
    <div className={styles.header}>
    <Link href="/"> <Image src='/img/logo.png' alt='logo' width={400} height={300}  /></Link>
    <div className={styles.user}>
    <h1>Usuario:</h1>
        <p>{value}</p>
    </div>           
     </div> 
  )
}
