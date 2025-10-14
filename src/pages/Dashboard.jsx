import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { studentContext } from "../context/StudentContextProvider";

export default function DashboardChart() {
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { students } = useContext(studentContext);

  const data = [
    { name: "Labs", value: labs.length },
    { name: "PCs", value: pcs.length },
    { name: "Students", value: students.length },
  ];

  const COLORS = ["#715A5A", "#37353E", "#44444E"];

  return (
    <section className="bg-[#f5f5f5] py-10 heigth-cus">
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="bg-[#fefefe] w-full lg:w-4/12 shadow-xl rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 uppercase mb-4">System Overview</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    fill="#8884d8"
                    dataKey="value"
                    label >
                    {data.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>  
          </div>
          <div className="bg-[#fefefe] w-full lg:w-8/12 shadow-lg rounded-lg p-6">
            <h2 className="text-lg font-semibold uppercase text-gray-800 mb-4">Lab Details</h2>
            <div className="w-full h-64 overflow-y-auto scrollbar">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-md text-gray-600 uppercase bg-[#f5f5f5]">
                    <tr>
                      <th scope="col" className="px-6 py-3 tracking-wider">Number</th>
                      <th scope="col" className="px-6 py-3 tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 tracking-wider">Capacity</th>
                      <th scope="col" className="px-6 py-3 tracking-wider">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labs.map((lab, idx) => (
                      <tr
                        key={lab.id}
                        className="odd:bg-white odd:dark:bg-gray-900 border-gray-200">
                        <th scope="row" className="px-7 py-4 text-gray-600 whitespace-nowrap dark:text-white">
                          {idx + 1}
                        </th>
                        <td className="px-7 py-4 font-medium">{lab.name}</td>
                        <td className="px-7 py-4 font-medium">{lab.capacity}</td>
                        <td className="px-7 py-4 font-medium">{lab.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}