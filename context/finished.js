import {  createContext, useState  } from "react";

export const Finished = createContext(null)

export function Context({children}) {
    const [finished,setFinished] = useState(true)
  return (
    <Finished.Provider value={{finished,setFinished  }}>{children}</Finished.Provider>
  )
}       
