import { createContext, useContext, useEffect, useState } from 'react'
import { contentService } from '../services/contentService'
const Ctx = createContext(null)
export function ContentProvider({ children }) {
  const [data, setData] = useState(null)
  useEffect(() => { contentService.load().then(setData) }, [])
  return <Ctx.Provider value={data}>{children}</Ctx.Provider>
}
export const useContent = () => useContext(Ctx)
