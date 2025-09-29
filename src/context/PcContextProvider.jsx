import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, updateDoc, where, writeBatch } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { LabContext } from "./LabContextProvider"
import { toast } from "react-toastify"

export const PcContext = createContext()

const PcContextProvider = ({ children }) => {
    const [pcs, setPcs] = useState([])
    const collectionRef = (collection(db, "pcs"))
    const { labs, fetchLab } = useContext(LabContext)

    useEffect(() => {
        fetchPc()
    }, [])

    const addPc = async (pc) => {
        try {
            await addDoc(collectionRef, {
                createdAt: new Date(),
                ...pc,
                status: "available"
            })
            await updateDoc(doc(db, "labs", pc.labId), {
                spaceLeft: increment(-1)
            })
            fetchPc()
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const fetchPc = async () => {
        try {
            const { docs } = await getDocs(collectionRef)
            const allPc = docs.map((pc) => {
                return {
                    pcId: pc.id,
                    ...pc.data()
                }
            })
            setPcs(allPc)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const deletePc = async (pcId, labId) => {
        try {
            await deleteDoc(doc(db, "pcs", pcId))
            if (labId) {
                await updateDoc(doc(db, "labs", labId), {
                    spaceLeft: increment(1)
                })
            }
            fetchPc()
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const updatePc = async (pcId, updatedVal, labId) => {
        try {

            await updateDoc(doc(db, "pcs", pcId), updatedVal)
            await updateDoc(doc(db, "labs", updatedVal.labId), {
                spaceLeft: increment(-1)
            })
            await updateDoc(doc(db, "labs", labId), {
                spaceLeft: increment(1)
            })
            fetchPc()
            fetchLab()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const showLab = (labId) => {
        if (labs.length !== 0) {
            const labName = labs.find((lab) => {
                return labId == lab.id
            })
            return labName?.name ? labName?.name : "Not Assigned"
        } else {
            return "Not Assigned"
        }
    }

    const handleRepair = async (pcId, status) => {
        console.log("hello");
        
        if (status == "available" || status == "occupied") {
            await updateDoc(doc(db, "pcs", pcId), {
                status: "in-repair"
            })
        } else if (status == "in-repair") {
            await updateDoc(doc(db, "pcs", pcId), {
                status: "available"
            })
        }
        fetchPc()
    }

    const value = { addPc, pcs, deletePc, updatePc, showLab, fetchPc, handleRepair }
    return (
        <PcContext.Provider value={value}>
            {children}
        </PcContext.Provider>
    )
}

export default PcContextProvider