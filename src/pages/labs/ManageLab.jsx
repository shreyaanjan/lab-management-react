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
        <div className="container mx-auto my-5">
            <h2 className="text-3xl text-center">{!isEdit ? "Add" : "Edit"} Lab</h2>
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Lab Name</label>
                    <input type="text" onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900">Capacity</label>
                    <input type="number" onChange={handleChange} value={input.capacity} id="capacity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="mb-5">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                    <input type="text" onChange={handleChange} value={input.location} id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">{!isEdit ? "Add" : "Update"} Lab</button>
            </form>
        </div>
    )
}

export default ManageLab