import styles from '../styles/game.module.css'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Finished } from "../context/finished";
import { useContext } from "react";
import Start from '../components/start';
import Terminado from '../components/terminado';

function Game({value}) {
  const { finished, setFinished} = useContext(Finished)
  const [start, setStart] = useState(true)
  const [tiempo, setTiempo] = useState(10)
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
                  query: { value }
               })
              }
        }, 1000);
      }      
    };
    startTimer();
    return () => {
      clearInterval(interval);
    }
  }, [start, tiempo, router, value]);

const boton = () => {
   setStart(false)
   router.push({
    pathname: '/preguntas',
    query: { value }
 })
}

  return (
    <>
        <main>
           <div className={`contenedor ${styles.game}`}>
           {finished ? (
             <Start boton={boton} start={start} tiempo={tiempo}/>
                    ): (
                      <Terminado />
                      // <div>
                      //   <h2>Puntuacion Final: {puntuacion}</h2>
                      //  <button>Ver Tu Puntuacion</button>
                      //  <button onClick={() => btn()}>Volver a jugar!</button>
                      //  <Link href="/">Ir al Menu</Link>
                      // </div>
                    )}         
              
           </div>
        </main>
    </>
  );
}
export default Game;

export async function getServerSideProps(context) {
  // Recuperamos el state de la query
  const { value } = context.query;

  return {
    props: {
      value
    }
  }
}