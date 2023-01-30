import styles from '../styles/game.module.css'

export default function Modal({ boolean, puntuacion}) {
  return (
    <>
                       
                      <div className={styles.modal}>
                         {boolean ? (
                        <div>
                          <h2>CORRECTA SIGUE ASI!!</h2>
                          <p>Puntuacion Actual: {puntuacion}</p>
                        </div>
                      ) : (
                        <div>
                          <h2>INCORRECTA VAMOS AUN QUEDA!</h2>
                          <p>Puntuacion Actual: {puntuacion}</p>
                        </div>
                      )}
                      </div> 
                       
    </>
  )
}
