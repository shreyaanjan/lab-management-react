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

    const { studentId, pcId } = useParams()

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
            await updateStudent(input, studentId, pcId)
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
        <div className="bg-[#f9fafb] min-h-screen flex items-center justify-center py-14">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-xl p-8 box-shadow">
                <h2 className="text-3xl font-bold text-center text-[#111827] mb-5 tracking-wide">
                    {!isEdit ? "Add" : "Edit"} Student
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Student Name
                        </label>
                        <input type="text" onChange={handleChange} value={input.name} id="name"
                            className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]" />
                    </div>
                    <div>
                        <label htmlFor="mail" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Email
                        </label>
                        <input type="email" onChange={handleChange} value={input.mail} id="mail"
                            className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]" />
                    </div>
                    <div>
                        <label htmlFor="grid" className="block mb-2 text-sm font-semibold text-[#374151]">
                            GRID
                        </label>
                        <input type="number" onChange={handleChange} value={input.grid} id="grid"
                            className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]" />
                    </div>
                    <div>
                        <label htmlFor="labId" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Lab Name
                        </label>
                        <select id="labId" onChange={handleChange} value={input.labId}
                            className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]">
                            <option value="">Select Lab</option>
                            {labs.map((lab) => (
                                <option key={lab.id} value={lab.id}>{lab.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pcId" className="block mb-2 text-sm font-semibold text-[#374151]">
                            PC Name
                        </label>
                        <select id="pcId" onChange={handleChange} value={input.pcId} className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]">
                            <option value="">Select PC</option>
                            {filteredPc.map((pc) => (
                                <option key={pc.pcId} value={pc.pcId}>{pc.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full mt-4 px-4 py-2 font-semibold main-btn">
                        {!isEdit ? "Add" : "Update"} Student
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ManageStudents