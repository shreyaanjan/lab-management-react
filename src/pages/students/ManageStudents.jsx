import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { studentContext } from "../../context/StudentContextProvider"
import { useNavigate } from "react-router-dom"

const ManageStudents = () => {
    const [input, setInput] = useState({ name: '', mail: '', grid: '', labId: '', pcId: '' })
    const [isEdit, setIsEdit] = useState()
    const [filteredPc, setIsFilteredPc] = useState([])

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

    return (
        <div className="container mx-auto my-5">
            <h2 className="text-3xl text-center">{!isEdit ? "Add" : "Edit"} PC</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Student Name</label>
                    <input type="text" onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="mail" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input type="email" onChange={handleChange} value={input.mail} id="mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="grid" className="block mb-2 text-sm font-medium text-gray-900">GRID</label>
                    <input type="number" onChange={handleChange} value={input.grid} id="grid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900">Lab Name</label>
                    <select id="labId" onChange={handleChange} value={input.labId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Select Lab</option>
                        {
                            labs.map((lab) => {
                                return <option key={lab.id} value={lab.id}>{lab.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="pcId" className="block mb-2 text-sm font-medium text-gray-900">Pc Name</label>
                    <select id="pcId" onChange={handleChange} value={input.pcId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Select PC</option>
                        {
                            filteredPc.map((pc) => {
                                return <option key={pc.pcId} value={pc.pcId}>{pc.name}</option>
                            })
                        }
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{!isEdit ? "Add" : "Update"} Students</button>
            </form>
        </div>
    )
}

export default ManageStudents