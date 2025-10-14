import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const ManagePcs = () => {
    const [input, setInput] = useState({ name: '', labId: '', status: '' })
    const [isEdit, setIsEdit] = useState(false)

    const { pcId, labId } = useParams()

    const { labs } = useContext(LabContext)
    const { addPc, updatePc } = useContext(PcContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (pcId) {
            getPc()
        }
    }, [pcId])

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isEdit) {
            await updatePc(pcId, input, labId)
            navigate("/pcs")
        } else {
            await addPc(input)
            navigate("/pcs")
        }
    }

    const getPc = async () => {
        const pcData = await getDoc(doc(db, "pcs", pcId))
        if (pcData.exists()) {
            setIsEdit(true)
            setInput(pcData.data())
        }
    }

    return (
        <div className="bg-[#f9fafb] height flex items-center justify-center py-14">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-xl p-8 box-shadow">
                <h2 className="text-3xl font-bold text-center text-[#111827] mb-5 tracking-wide">
                    {!isEdit ? "Add" : "Edit"} PC
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#374151]">PC Name</label>
                        <input type="text" onChange={handleChange} value={input.name} id="name" className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="labId" className="block mb-2 text-sm font-semibold text-[#374151]">Lab Name</label>
                        <select id="labId" onChange={handleChange} value={input.labId ? input.labId : ""} className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]">
                            <option value="">Select Lab</option>
                            {
                                labs.map((lab) => {
                                    return lab.spaceLeft <= 0 ? "" : <option key={lab.id} value={lab.id}>{lab.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <button type="submit" className="w-full mt-4 px-4 py-2 font-semibold main-btn">{!isEdit ? "Add" : "Update"} PC</button>
                </form>
            </div>
        </div>
    )
}

export default ManagePcs