import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PcContext } from "../../context/PcContextProvider"
import { LabContext } from "../../context/LabContextProvider"
import { useId } from "react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

const Pcs = () => {
  const navigate = useNavigate()
  const id = useId()
  const { pcs, deletePc, showLab, handleRepair } = useContext(PcContext)
  const { labs } = useContext(LabContext)

  return (
    <section className="bg-[#f9fafb] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-8 height box-shadow">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="md:text-2xl sm:text-base text-black uppercase font-semibold">PC Details</h2>
          <button onClick={() => navigate('/add-pc')} className="main-btn font-semibold px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg">Add A PC</button>
        </div>
        <div className="my-5">
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 bg-white">
            <table className="w-full text-sm text-left rtl:text-right text-gray-600">
              <thead className="text-xs uppercase bg-[#e0e7ff] text-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Lab Name
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 tracking-wider">
                    Check In-Repair
                  </th>
                </tr>
              </thead>
              <tbody>
                {pcs.map((pc, idx) => {
                    return <tr key={pc.pcId} className="bg-white border-t border-gray-200">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {idx + 1}
                      </th>
                      <td className="px-6 py-3 tracking-wider">
                        {pc.name}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {showLab(pc.labId)}
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        <Badge className={`${pc.status == 'in-repair' ? "bg-[red] hover:bg-none": pc.status == 'occupied' ? "bg-orange-600" : "bg-green-600"} hover:!bg-none`}>{pc.status}</Badge>
                      </td>
                      <td className="px-6 py-3 tracking-wider">
                        {pc.createdAt.toDate().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 tracking-wider ">
                        <div className="flex items-center gap-3">
                          <button onClick={() => navigate(`/edit-pc/${pc.pcId}`)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Edit</button>
                          <button onClick={() => deletePc(pc.pcId, pc.labId)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                        </div>
                      </td>
                      <td className="px-6 py-4 tracking-wider flex items-center gap-3">
                        <div className="inline-flex items-center gap-2">
                          <Switch
                            id={id}
                            checked={pc.status == "in-repair"}
                            onClick={() => handleRepair(pc.pcId, pc.status)}
                            className="data-[state=unchecked]:border-[#37353e] data-[state=unchecked]:[&_span]:bg-[#37353e] data-[state=unchecked]:bg-transparent data-[state=checked]:bg-[#37353e] [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5"
                          />
                          <Label htmlFor={id} className="sr-only">
                            M3-style switch
                          </Label>
                        </div>
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

export default Pcs