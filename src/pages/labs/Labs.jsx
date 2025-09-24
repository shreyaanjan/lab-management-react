import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { LabContext } from "../../context/LabContextProvider"

const Labs = () => {
  const navigate = useNavigate()

  const { labs, deleteLab } = useContext(LabContext)

  return (
    <div className="container mx-auto my-5">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">Lab Details</h2>
        <button onClick={() => navigate('/add-lab')} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add A Lab</button>
      </div>
      <div className="my-5">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-3">
                  Remaining Space
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                labs.map((lab, idx) => {
                  return <tr key={lab.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">
                      {lab.name}
                    </td>
                    <td className="px-6 py-4">
                      {lab.capacity}
                    </td>
                    <td className="px-6 py-4">
                      {lab.spaceLeft}
                    </td>
                    <td className="px-6 py-4">
                      {lab.location}
                    </td>
                    <td className="px-6 py-4">
                      {lab.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button onClick={() => navigate(`/edit-lab/${lab.id}`)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Edit</button>
                      <button onClick={() => deleteLab(lab.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Labs