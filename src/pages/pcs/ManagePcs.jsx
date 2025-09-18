import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const ManagePcs = () => {
    const [input, setInput] = useState({ name: '', labId: '', })
    const [isEdit, setIsEdit] = useState(false)

    const { pcId } = useParams()

    const { labs } = useContext(LabContext)
    const { addPc, updatePc } = useContext(PcContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (pcId) {
            getPc()
        }
    }, [pcId])

    const getPc = async () => {
        const pcData = await getDoc(doc(db, "pcs", pcId))
        if (pcData.exists()) {
            setIsEdit(true)
            setInput(pcData.data())
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isEdit) {
            await updatePc(pcId, input)
            navigate("/pcs")
        } else {
            await addPc(input)
            navigate("/pcs")
        }
    }

    return (
        <div className="container mx-auto my-5">
            <h2 className="text-3xl text-center">{!isEdit ? "Add" : "Edit"} PC</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">PC Name</label>
                    <input type="text" onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900">Lab Name</label>
                    <select id="labId" onChange={handleChange} value={input.labId ? input.labId : ""} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Select Lab</option>
                        {
                            labs.map((lab) => {
                                return <option key={lab.id} value={lab.id}>{lab.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="mb-5">
                    <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status</label>
                    <select id="status" onChange={handleChange} value={input.status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option>Select Status</option>
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintainance">Maintainance</option>
                    </select>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{!isEdit ? "Add" : "Update"} PC</button>
            </form>
        </div>
    )
}

export default ManagePcs