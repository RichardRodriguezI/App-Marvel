import styles from '../styles/game.module.css'

export default function Respuestas({objetoFiltrado, boolean}) {
    // console.log(objetoFiltrado)
  return (
    <div className={boolean ? "correct" : ""}>Respuestas: {objetoFiltrado}
    </div>
  )
}
