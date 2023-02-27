import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from '../styles/game.module.css'
import {preguntas} from '../preguntas'

export default function Pregunta({characters, time, puntuacion, objetoActual, checkImage,handleClick, disabled}) {
  return (
    <div className={styles.preguntas}>
    <h2>Pregunta: ¿What character is it?</h2>
    <span>{time}</span>
    <p>Puntuacion: {puntuacion}</p>  
        {
   characters.slice(objetoActual, objetoActual + 1).map((objeto, index) => {
    if (checkImage(objeto, index)) {
      return (
        <div key={index} className={styles.img}>
          <LazyLoadImage src={`${objeto.thumbnail.path}.${objeto.thumbnail.extension}`} alt={objeto.name}
            width={400}
            height={400}
          />
        </div>
      );
  }
  })
  }   
      {preguntas.slice(objetoActual, objetoActual + 1).map((pregunta, index) => {
          return (
            <div className={styles.pregunta} key={index}>
            {pregunta.opciones.map(opcion => (  
              <button key={opcion.respuesta} onClick={() => handleClick(opcion)} disabled={disabled}>
                {opcion.respuesta}
              </button>   
            ))}
        </div>
          )
        }
      )}    
    </div>
  )
}
