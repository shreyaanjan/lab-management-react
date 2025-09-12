import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { toast } from "react-toastify"

export const LabContext = createContext()

const LabContextProvider = ({ children }) => {
    const [labs, setLabs] = useState([])

    const collectionRef = collection(db, "labs")

    useEffect(() => {
        fetchLab()
    }, [])

    const addLab = async (input) => {
        try {
            const obj = {
                ...input,
                createdAt: new Date()
            }
            await addDoc(collectionRef, obj)
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const fetchLab = async () => {
        try {
            const { docs } = await getDocs(collectionRef)
            const allLabs = docs.map((lab) => {
                return {
                    id: lab.id,
                    ...lab.data()
                }
            })
            setLabs(allLabs)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const deleteLab = async (labId) => {
        try {
            await deleteDoc(doc(db, "labs", labId))
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const updateLab = async (labId, updatedVal) => {
        try {
            await updateDoc(doc(db, "labs", labId), updatedVal)
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const value = { addLab, labs, deleteLab, updateLab }
    return (
        <LabContext.Provider value={value}>
            {children}
        </LabContext.Provider>
    )
}

export default LabContextProvider