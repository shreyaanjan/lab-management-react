import { useContext, useEffect, useState } from "react"
import { LabContext } from "../../context/LabContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import { toast } from "react-toastify"

const ManageLab = () => {
    const [input, setInput] = useState({ name: '', capacity: '', location: '' })
    const [isEdit, setIsEdit] = useState(false)
    const { labId } = useParams()
    const { addLab, updateLab } = useContext(LabContext)

    useEffect(() => {
        if (labId) {
            getLab()
        }
    }, [labId])

    const getLab = async () => {
        let labSnap = await getDoc(doc(db, "labs", labId))
        if (labSnap.exists()) {
            setIsEdit(true)
            setInput(labSnap.data())
        }
    }

    const navigate = useNavigate()

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEdit) {
            if (input.name.trim() === '' || input.capacity.trim() === '' || input.location.trim() === '') {
                toast.error("Enter All Lab Details Correctly !")
                return
            }
            await addLab(input)
            navigate("/labs")
            toast.success("Lab Added Successfully !")
        } else {
            if (input.name.trim() === '' || input.capacity.trim() === '' || input.location.trim() === '') {
                toast.error("Enter All Lab Details To Update It !")
                return
            }
            await updateLab(labId, input)
            navigate("/labs")
            toast.success("Lab Updated Successfully !")
        }
    }

    return (
        <div className="bg-[#0f172a] min-h-screen py-10">
            <div className="container mx-auto">
                <div className="max-w-md mx-auto bg-[#1e293b] rounded-xl shadow p-6">
                    <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
                        {!isEdit ? "Add" : "Edit"} Lab
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-slate-200">
                                Lab Name
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
                            <label
                                htmlFor="capacity"
                                className="block mb-2 text-sm font-medium text-slate-200">
                                Capacity
                            </label>
                            <input
                                type="number"
                                onChange={handleChange}
                                value={input.capacity}
                                id="capacity"
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="location"
                                className="block mb-2 text-sm font-medium text-slate-200">
                                Location
                            </label>
                            <input
                                type="text"
                                onChange={handleChange}
                                value={input.location}
                                id="location"
                                className="bg-[#2E3A59] border border-gray-600 text-slate-200 text-sm rounded-md focus:ring-sky-500 focus:border-sky-500 block w-full p-2.5"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-3 py-2 bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition"
                        >
                            {!isEdit ? "Add" : "Update"} Lab
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ManageLab