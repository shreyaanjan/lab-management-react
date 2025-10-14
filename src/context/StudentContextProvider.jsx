import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { PcContext } from "./PcContextProvider"
import { toast } from "react-toastify"

export const studentContext = createContext()

const StudentContextProvider = ({ children }) => {
    const [students, setStudents] = useState([])
    const collectionRef = (collection(db, "students"))

    const { pcs, fetchPc } = useContext(PcContext)

    useEffect(() => {
        fetchStudent()
    }, [])

    const addStudent = async (student) => {
        try {
            await addDoc(collectionRef, {
                createdAt: new Date(),
                ...student
            })
            await updateDoc(doc(db, "pcs", student.pcId), {
                status: "occupied",
            })
            fetchStudent()
            fetchPc()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const fetchStudent = async () => {
        try {
            const { docs } = await getDocs(collectionRef)
            const allStudent = docs.map((student) => {
                return {
                    studentId: student.id,
                    ...student.data()
                }
            })
            setStudents(allStudent)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const deleteStudent = async (studentId) => {
        try {
            await deleteDoc(doc(db, "students", studentId))
            fetchStudent()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const updateStudent = async (updatedVal, studentId, pcId) => {
        try {
            await updateDoc(doc(db, "students", studentId), updatedVal)
            await updateDoc(doc(db, "pcs", updatedVal.pcId), {
                status: "occupied",
            })
            if (pcId && pcId !== updatedVal.pcId) {
                await updateDoc(doc(db, "pcs", pcId), {
                    status: "available",
                })
            }
            fetchStudent()
            fetchPc()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const showPc = (pcId) => {
        if (pcs.length !== 0) {
            const pcName = pcs.find((pc) => {
                return pcId == pc.pcId
            })
            return pcName?.name ? pcName?.name : "Not Assigned";
        } else {
            return "Not Assigned"
        }
    }

    const value = { students, addStudent, showPc, deleteStudent, updateStudent }

    return (
        <studentContext.Provider value={value}>
            {children}
        </studentContext.Provider>
    )
}

export default StudentContextProvider