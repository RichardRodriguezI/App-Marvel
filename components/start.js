import styles from '../styles/start.module.css'
import Image from "next/image"
export default function Start({boton, start, tiempo}) {
  return (
    <>
    <div className={styles.contenido}>         
          <>
            {start ? (
              <>
                 <div className={styles.start}>
                <h1>El juego inicia en: {tiempo}</h1>
                 <button onClick={() => boton()}>Comenzar Ya!</button>
                 </div>
                 <Image className={styles.gif} src="/img/iron.gif" alt="Deadpool GIF" width={400} height={300} />
                 </>
               ) : null} 
          </>
     </div> 
    </>
  )
}
