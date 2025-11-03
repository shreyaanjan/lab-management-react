import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { studentContext } from "../../context/StudentContextProvider"
import { LabContext } from "../../context/LabContextProvider"
import { PcContext } from "../../context/PcContextProvider"

const Students = () => {
  const navigate = useNavigate()

  const { students, showPc, deleteStudent } = useContext(studentContext)
  const { showLab } = useContext(PcContext)

  return (
    <section className="bg-[#f9fafb] py-10 height box-shadow">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl text-black uppercase font-semibold">Students Details</h2>
          <button onClick={() => navigate('/add-student')} className="px-4 py-1 font-semibold main-btn">Add Student</button>
        </div>
        <div className="my-5">
          <div className="overflow-hidden rounded-lg shadow-md border border-gray-200 bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-xs uppercase bg-[#e0e7ff] text-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 tracking-wider">Number</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">GRID</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Lab Name</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">PC Name</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">Created At</th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  students.map((student, idx) => {
                    return <tr key={student.studentId} className="bg-white border-t border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {idx + 1}
                      </th>
                      <td className="px-6 py-3 tracking-wider">
                        {student.name}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {student.mail}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {student.grid}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {showLab(student.labId)}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {showPc(student.pcId)}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {student.createdAt.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 tracking-wider flex items-center gap-3">
                        <button onClick={() => navigate(`/edit-student/${student.studentId}/${student.pcId}`)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Edit</button>
                        <button onClick={() => deleteStudent(student.studentId)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                      </td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Students