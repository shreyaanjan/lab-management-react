import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { PcContext } from "./PcContextProvider"

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

    const updateStudent = async (studentId, updatedVal) => {
        try {
            await updateDoc(doc(db, "students", studentId), updatedVal)
            fetchStudent()
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong !")
        }
    }

    const showPc = (pcId) => {
        const pcName = pcs.find((pc) => {
            return pcId == pc.pcId
        })
        return pcName?.name ? pcName?.name : "Not Assigned";
    }

    const value = { students, addStudent, showPc, deleteStudent, updateStudent }

    return (
        <studentContext.Provider value={value}>
            {children}
        </studentContext.Provider>
    )
}

export default StudentContextProvider