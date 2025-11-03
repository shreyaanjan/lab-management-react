import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LabContext } from "../../context/LabContextProvider"

const Labs = () => {
  const navigate = useNavigate()

  const { labs, deleteLab } = useContext(LabContext)

  return (
    <section className="bg-[#f9fafb] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 height box-shadow">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="md:text-2xl sm:text-base text-black uppercase font-semibold">Lab Details</h2>
          <button onClick={() => navigate('/add-lab')} className="main-btn font-semibold px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg">Add A Lab</button>
        </div>
        <div className="my-5">
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-xs uppercase bg-[#e0e7ff] text-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 tracking-wider">Number</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Capacity</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Remaining Space</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Created At</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {labs.map((lab, idx) => (
                  <tr key={lab.id} className="bg-white border-t border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {idx + 1}
                    </th>
                    <td className="px-6 py-3 tracking-wider">{lab.name}</td>
                    <td className="px-6 py-3 tracking-wider">{lab.capacity}</td>
                    <td className="px-6 py-3 tracking-wider">{lab.spaceLeft}</td>
                    <td className="px-6 py-3 tracking-wider">{lab.location}</td>
                    <td className="px-6 py-3 tracking-wider">
                      {lab.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 tracking-wider flex items-center gap-3">
                      <button onClick={() => navigate(`/edit-lab/${lab.id}`)}
                        className="font-medium text-green-600 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => deleteLab(lab.id)}
                        className="font-medium text-red-600 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Labs