import { createContext, useState } from "react"

const LabContext = createContext()

const LabContextProvider = ({ children }) => {
    const [labs, setLabs] = useState([])
    
    const value = {}
    return (
        <LabContext.Provider value={value}>
            {children}
        </LabContext.Provider>
    )
}

export default LabContextProvider