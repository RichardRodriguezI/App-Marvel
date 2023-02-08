import { LazyLoadImage } from "react-lazy-load-image-component";
import styles from '../styles/game.module.css'
import {preguntas} from '../preguntas'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Modal from '../components/modal';
import Image from "next/image";
import { Finished } from "../context/finished";
import { useContext } from "react";

export default function Preguntas({ value, data}) {
    const { finished, setFinished} = useContext(Finished)
    const [objetoActual, setObjetoActual] = useState(0)
    const [puntuacion, setPuntuacion] = useState(0)
    const [modal, setModal] = useState(false)
    const [boolean, setBolean] = useState("")
    const [className, setclassName] = useState("")
    const [time, setTime] = useState(10)
    const [ disabled, setDisabled] = useState(false)

    let iteracion = data.results.data.results
    const router = useRouter()

    const handleClick = opcion => {
        if(opcion.isCorrect === true) {
          setPuntuacion(puntuacion + 1)
       } else {
          if(puntuacion > 0) {
            setPuntuacion(puntuacion - 1)
          }
    
       } 
    setBolean(opcion.isCorrect)
      setModal(true)

    setTimeout(() => {
      setModal(false)
      if(objetoActual === preguntas.length - 1) {
        setObjetoActual(0)
        setFinished(false) 
        setPuntuacion(puntuacion)
        setModal(false)
      }  else {
        setObjetoActual(objetoActual + 1)
      }
    }, 1000);
    }

  useEffect( () => {
    let interval = null;
    const start = () => {
     interval = setInterval( () => {
        if(time > 0) {
          setTime( time - 1)
      } else {
          clearInterval(interval)
          setDisabled(true)
          setObjetoActual( objetoActual + 1)
          setPuntuacion(puntuacion > 0 ? puntuacion - 1 : 0)
          setModal(true)
          setBolean(false)
          setModal(false)
        if(objetoActual === preguntas.length - 1) {
        setObjetoActual(0)
        setFinished(false)
      }  else {
        setObjetoActual(objetoActual + 1)
      }

        } 
      }, 1000)
       setDisabled(false) 
       setPuntuacion(puntuacion)
    }
    start()
    return() => {
        clearInterval(interval)
    }
  }, [objetoActual, time, disabled, puntuacion, modal, boolean, setFinished])
    
  useEffect(() => {
    setTime(10);
  }, [objetoActual]);
  
  return (
                 <>            
                    { modal ? (
                        <Modal 
                        boolean={boolean}
                        puntuacion={puntuacion}
                        />
                    ) : finished ? (
                                               <>
                        <div className={styles.header}>
                        <Link href="/"> <Image src='/img/logo.png' alt='logo' width={400} height={300}  /></Link>
                        <div className={styles.user}>
                        <h1>Usuario:</h1>
                            <p>{value}</p>
                        </div>           
                         </div> 
                        
                        <p>Puntuacion: {puntuacion}</p>  
                        <h2>Pregunta: ¿What character is it?</h2>
                        <span>{time}</span>

                      
                          {
                        iteracion.slice(objetoActual, objetoActual + 1).map((objeto, index) => {
                      if(index > 10 && objeto.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ) {
                          objetoActual + 1 
                          // return showImages(iteracion, objetoActual);
                           } else {    
                            return (
                                <div key={index} className={styles.img}>
                                <LazyLoadImage src={`${objeto.thumbnail.path}.${objeto.thumbnail.extension}`} alt={objeto.name} width={400} height={400}/>
                                </div>
                              )
                           }          
                        })}
                          {preguntas.slice(objetoActual, objetoActual + 1).map((pregunta, index) => (
                            <div className={styles.preguntas} key={index}>
                                {pregunta.opciones.map(opcion => (  
                                  <button key={opcion.respuesta} onClick={() => handleClick(opcion)} disabled={disabled} className={className}>
                                    {opcion.respuesta}
                                  </button>   
                                ))}
                            </div>
                          ))}    
                        </>
                    ) : (
                      <h2>Juego terminado</h2>
                    )
                    }
    </>
  )
}
export async function getServerSideProps(context) {
    // Recuperamos el state de la query
    const { value  } = context.query;
  
    let data = {};
    try {
      const respuesta = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7fead384f47c49c922b9b22230925b2d&hash=ec4422d50ee040bd47f23f7344073f23")
      data.results = await respuesta.json()
    } catch (error) {
      console.error(error);
    }

    return {
      props: {
        data,
        value
      }
    }
  }
  