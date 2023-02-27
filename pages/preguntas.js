// import { useGetCharactersQuery } from './api/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Finished } from "../context/finished";
import { useContext } from "react";
import {preguntas} from '../preguntas'
import Terminado from "../components/terminado";
import Modal from '../components/modal';
import Header from "../components/header";
import Pregunta from '../components/pregunta';
import axios from "axios";

const hash = "ec4422d50ee040bd47f23f7344073f23"
const url = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7fead384f47c49c922b9b22230925b2d&hash=ec4422d50ee040bd47f23f7344073f23';

async function getCharacters() {
  try {
    const response = await axios.get(url)
    return response.data.data.results
  } catch (error) {
    console.log(error)
  }
}

export default function Preguntas({ value}) {
  const router = useRouter()
    const [characters, setCharacters] = useState([])
    const { finished, setFinished} = useContext(Finished)
    const [objetoActual, setObjetoActual] = useState(0)
    const [puntuacion, setPuntuacion] = useState(0)
    const [modal, setModal] = useState(false)
    const [boolean, setBolean] = useState("")
    const [time, setTime] = useState(10)
    const [ disabled, setDisabled] = useState(false)
    const [correcto, setCorrecto] = useState(false)
    const [runInterval, setRunInterval] = useState(true);

    useEffect(() =>  {
      async function fetchCharacters() {
        const data = await getCharacters()
        setCharacters(data)
      }
      fetchCharacters()
    }, [])

    // let iteracion = data.results.data.results

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
        setModal(true)
        setTimeout(() => {
          setModal(false)
          setObjetoActual(0)
          setFinished(false) 
        }, 1000);
      }  else {
        setObjetoActual(objetoActual + 1)
      }
    }, 1500);
    }

  useEffect( () => {
    let interval = null;
    if(runInterval && objetoActual !== preguntas.length - 1) {
      const start = () => {
        interval = setInterval( () => {
           if(time > 0) {
             setTime( time - 1)
         } else {
             clearInterval(interval)
             setObjetoActual( objetoActual + 1 )
             setPuntuacion(puntuacion > 0 ? puntuacion - 1 : 0)
             setModal(true)
             setBolean(false)
             setTimeout(() => {
              setModal(false)
             }, 1000);
           } 
         }, 1000)
          setDisabled(false) 
          setPuntuacion(puntuacion)
          // return () => clearInterval(interval);
        }
        start()
      } else {
        // setModal(true)
        // setTimeout(() => {
          setModal(false)
          setRunInterval(false);
          setObjetoActual(0)
          setFinished(false)
        // }, 1000);
  }
  
    return() => {
        clearInterval(interval)
    }
  }, [objetoActual, time, disabled, puntuacion, modal, boolean, setFinished, runInterval ])
    
  useEffect(() => {
    setTime(10);
  }, [objetoActual]);
  const clickRespuesta = () => {
      
  }
  function checkImage(objeto, index) {
    if ( !index > 14 || objeto.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
      setObjetoActual(objetoActual + 1)
      return false;
    } 
      return true;
  }
  return (
                 <>            
                    { modal ? (
                        <Modal 
                        boolean={boolean}
                        puntuacion={puntuacion}
                        />
                    ) : finished ? (
                          <>
                         <Header value={value} />        
                         <Pregunta time={time} puntuacion={puntuacion} objetoActual={objetoActual} value={value}
                         handleClick={handleClick} disabled={disabled} checkImage={checkImage} characters={characters}  />                   
                          {/* iteracion={iteracion}                   */}
                        </>
                    ) : (
                        <Terminado objetoActual={objetoActual}setFinished={setFinished}boolean={boolean}
                        setCorrecto={setCorrecto}correcto={correcto}value={value} puntuacion={puntuacion}/>
                        )
                    }
    </>
  )
}
export async function getServerSideProps(context) {
    // Recuperamos el state de la query
    const { value  } = context.query;
  
    // let data = {};
    // try {
    //   const respuesta = await fetch("https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=7fead384f47c49c922b9b22230925b2d&hash=ec4422d50ee040bd47f23f7344073f23")
    //   data.results = await respuesta.json()
    // } catch (error) {
    //   console.error(error);
    // }

    return {
      props: {
        // data,
        value
      }
    }
  }
  