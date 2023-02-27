import styles from '../styles/game.module.css'
import Image from "next/image"
export default function Modal({ boolean, puntuacion}) {
  return (
    <>
                       
                      <div className={styles.modal}>
                         {boolean ? (
                        <div>
                          <h2>CORRECTA SIGUE ASI!!</h2>
                          <p>Puntuacion Actual: {puntuacion}</p>
                          <Image className={styles.gif} src="/img/deadpool.gif" alt="Deadpool GIF" width={400} height={300} />
                        </div>
                      ) : (
                        <div>
                          <h2>INCORRECTA VAMOS AUN QUEDA!</h2>
                          <p>Puntuacion Actual: {puntuacion}</p>
                          <Image className={styles.gif} src="/img/wolverine.gif" alt="Deadpool GIF" width={400} height={300} />
                        </div>
                      )}
                      </div> 
                       
    </>
  )
}
