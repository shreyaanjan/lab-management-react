import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { studentContext } from "../../context/StudentContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { Settings } from "lucide-react"

const ManageStudents = () => {
    const [input, setInput] = useState({ name: '', mail: '', grid: '', labId: '', pcId: '' })
    const [isEdit, setIsEdit] = useState()
    const [filteredPc, setIsFilteredPc] = useState([])

    const { studentId } = useParams()

    const { labs } = useContext(LabContext)
    const { pcs } = useContext(PcContext)
    const { addStudent, updateStudent } = useContext(studentContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (input.labId) {
            const filterPc = pcs.filter((pc) => {
                return input.labId === pc.labId && pc.status == "available"
            })
            setIsFilteredPc(filterPc)
        }
    }, [input.labId])

    useEffect(() => {
        if (studentId) {
            getStudent()
        }
    }, [studentId])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEdit) {
            await addStudent(input)
            navigate("/students")
        } else {
            await updateStudent(input, studentId)
            navigate("/students")
        }
    }

    const getStudent = async () => {
        const studentData = await getDoc(doc(db, "students", studentId))
        if (studentData.exists()) {
            setIsEdit(true)
            setInput(studentData.data())
        }
    }

    return (
        <div className="bg-[#0f172a] min-h-screen py-10">
            <div className="container mx-auto my-10">
                <div className="max-w-md mx-auto bg-[#2E3A59] rounded-xl shadow p-6">
                    <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
                        {!isEdit ? "Add" : "Edit"} Student
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-200">
                                Student Name
                            </label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={input.name}
                                id="name"
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="mail" className="block mb-2 text-sm font-medium text-slate-200">
                                Email
                            </label>
                            <input
                                type="email"
                                onChange={handleChange}
                                value={input.mail}
                                id="mail"
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="grid" className="block mb-2 text-sm font-medium text-slate-200">
                                GRID
                            </label>
                            <input
                                type="number"
                                onChange={handleChange}
                                value={input.grid}
                                id="grid"
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="labId" className="block mb-2 text-sm font-medium text-slate-200">
                                Lab Name
                            </label>
                            <select
                                id="labId"
                                onChange={handleChange}
                                value={input.labId}
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            >
                                <option value="">Select Lab</option>
                                {labs.map((lab) => (
                                    <option key={lab.id} value={lab.id}>{lab.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="pcId" className="block mb-2 text-sm font-medium text-slate-200">
                                PC Name
                            </label>
                            <select
                                id="pcId"
                                onChange={handleChange}
                                value={input.pcId}
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            >
                                <option value="">Select PC</option>
                                {filteredPc.map((pc) => (
                                    <option key={pc.pcId} value={pc.pcId}>{pc.name}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-3 py-2 bg-teal-500 text-white rounded-md text-sm font-medium hover:bg-teal-600 transition"
                        >
                            {!isEdit ? "Add" : "Update"} Student
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManageStudents