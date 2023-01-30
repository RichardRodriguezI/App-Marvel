// import Preguntas from '../componets/preguntas';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '../styles/game.module.css'
// import Header from '../components/Header';
import Link from 'next/link';
import { Finished } from "../context/finished";
import { useContext } from "react";


function Game() {
  const { finished, setFinished} = useContext(Finished)
  const [start, setStart] = useState(true)
  const [tiempo, setTiempo] = useState(5)
  const router = useRouter()
  useEffect(() => {
    let interval = null;
    const startTimer = () => {
           if(start === true) {
        interval = setInterval(() => {
              if(tiempo > 0) {
                setTiempo(tiempo - 1)
              } else {
                setStart(false)
                clearInterval(interval)
                router.push({
                  pathname: '/preguntas',
               })
              }
        }, 500);
      }      
    };
    startTimer();
    return () => {
      clearInterval(interval);
    }
  }, [start, tiempo, router]);

const boton = () => {
   setStart(false)
   router.push({
    pathname: '/preguntas',
 })
}

  return (
    <>
        <main>
           <div className={`contenedor ${styles.game}`}>
           {finished ? (
             <>
             <div className={styles.contenido}>         
                   <>
                     {start ? (
                          <div className={styles.start}>
                         <h1>Game Starts in: {tiempo}</h1>
                          <button onClick={() => boton()}>Comenzar Ya!</button>
                          </div>
                        ) : null} 
                   </>
              </div> 
             </>
                    ): (
                      <div>
                        <h2>Puntuacion Final: {puntuacion}</h2>
                       <button>Ver Tu Puntuacion</button>
                       <button onClick={() => btn()}>Volver a jugar!</button>
                       <Link href="/">Ir al Menu</Link>
                      </div>
                    )}         
              
           </div>
        </main>
    </>
  );
}
export default Game;
