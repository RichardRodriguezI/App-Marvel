import Link from "next/link"
import { useRouter } from 'next/router';
import Image from "next/image"
import styles from '../styles/terminado.module.css'
import Header from '../components/header'

export default function Terminado({puntuacion,boolean, setCorrecto,setFinished,value,objetoActual, correcto}) {
  const router = useRouter()

  const boton = () => {
    setFinished(true)
    router.push({
     pathname: '/game',
     query: { value }
  })
 }
//  let objetoFiltrado = ""
//  if (Array.isArray(objetoActual)) {
//   objetoFiltrado = objeto.filter(objeto => objeto === true)
//   // const respuestasCorrectas = objetoFiltrado?.map( (respuesta, index) => (
//   //   <li key={index}>{respuesta }</li>
//   //  ))
//    console.log(objetoFiltrado)
//  }
  // const respuestasCorrectas = Preguntas?.filter(pregunta =>  pregunta === true)
  return (
    <>
        <Header 
        value={value}
        />   
    <div className={styles.terminado}>
    <div className={styles.ph}>
    <h1>Juego terminado</h1>
    <p > Puntuacion: {puntuacion}</p>
    </div>
    <Image className={styles.gif} src="/img/iron.gif" alt="Deadpool GIF" width={400} height={300} />
   <nav>
   <button onClick={() => boton()}>Volver a jugar</button>
    <Link href="/" onClick={setFinished(true)}>Ir al Menú</Link>
     {/* <button onClick={() => setCorrecto(true)}>Ver Respuestas</button> */}
     {/* {correcto ? 
       <Respuestas
       boolean={boolean}
      //  respuestasCorrectas={respuestasCorrectas}
       />
     : null} */}
   </nav>

   {/* <div className="user">
   <h2>Usuario:</h2>
       <p>{value}</p>
   </div>            */}
    </div>             
   </>
  )
}
