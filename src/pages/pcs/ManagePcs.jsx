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
        <div className="bg-[#37353E] min-h-screen py-10">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto bg-[#44444E] rounded-xl shadow p-6">
                    <h2 className="text-3xl font-bold text-center text-[#D3DAD9] mb-6">
                        {!isEdit ? "Add" : "Edit"} PC
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-200">PC Name</label>
                            <input type="text" onChange={handleChange} value={input.name} id="name" className="bg-[#37353E] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="labId" className="block mb-2 text-sm font-medium text-slate-200">Lab Name</label>
                            <select id="labId" onChange={handleChange} value={input.labId ? input.labId : ""} className="bg-[#37353E] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5">
                                <option value="">Select Lab</option>
                                {
                                    labs.map((lab) => {
                                        return lab.spaceLeft <= 0 ? "" : <option key={lab.id} value={lab.id}>{lab.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button type="submit" className="w-full px-3 py-2 bg-[#DED0B6] text-[#0C0C0C] rounded-md text-sm font-semibold hover:bg-[#FAEED1] transition">{!isEdit ? "Add" : "Update"} PC</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ManagePcs