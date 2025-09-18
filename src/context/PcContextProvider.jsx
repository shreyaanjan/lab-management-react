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
    console.log(labs);

    useEffect(() => {
        fetchPc()
    }, [])

    const addPc = async (pc) => {
        try {
            await addDoc(collectionRef, {
                createdAt: new Date(),
                ...pc
            })
            await updateDoc(doc(db, "labs", pc.labId), {
                capacity: increment(-1)
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

    const deletePc = async (pcId) => {
        try {
            const qry = query(collection(db, "students"), where("pcId", "==", pcId))
            const toUpdateSnapShot = await getDocs(qry)

            const batch = writeBatch(db)
            toUpdateSnapShot.forEach((studentDoc) => {
                batch.update(studentDoc.ref, { pcId: null })
            })
            batch.commit()

            await deleteDoc(doc(db, "pcs", pcId))
            fetchPc()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const updatePc = async (pcId, updatedVal) => {
        try {

            await updateDoc(doc(db, "pcs", pcId), updatedVal)
            await updateDoc(doc(db, "labs", updatedVal.labId), {
                capacity: increment(-1)
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

    const value = { addPc, pcs, deletePc, updatePc, showLab, fetchPc }
    return (
        <PcContext.Provider value={value}>
            {children}
        </PcContext.Provider>
    )
}

export default PcContextProvider