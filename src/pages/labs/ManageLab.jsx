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
        <div className="bg-[#f9fafb] height flex items-center justify-center py-14">
            <div className="w-full max-w-md bg-[#ffffff] rounded-2xl shadow-xl p-8 box-shadow">
                <h2 className="text-3xl font-bold text-center text-[#111827] mb-5 tracking-wide">
                    {!isEdit ? "Add" : "Edit"} Lab
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Lab Name
                        </label>
                        <input type="text" onChange={handleChange} value={input.name}
                            id="name" className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]" />
                    </div>
                    <div>
                        <label htmlFor="capacity" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Capacity
                        </label>
                        <input type="number" onChange={handleChange} value={input.capacity} id="capacity" className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]" />
                    </div>
                    <div>
                        <label htmlFor="location" className="block mb-2 text-sm font-semibold text-[#374151]">
                            Location
                        </label>
                        <input type="text" onChange={handleChange} value={input.location}
                            id="location" className="bg-[#f9fafb] border border-gray-400 text-[#111827] text-sm rounded-md block w-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500 placeholder:text-[#9ca3af]"
                        />
                    </div>
                    <button type="submit" className="w-full mt-4 px-4 py-2 font-semibold main-btn">
                        {!isEdit ? "Add" : "Update"} Lab
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ManageLab