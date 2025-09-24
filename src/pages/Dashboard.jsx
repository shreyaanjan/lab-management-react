import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useContext } from "react";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { studentContext } from "../context/StudentContextProvider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function DashboardChart() {
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { students } = useContext(studentContext);

  const navigate = useNavigate()

  const data = [
    { name: "Labs", value: labs.length },
    { name: "PCs", value: pcs.length },
    { name: "Students", value: students.length },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex gap-10 text-center">
          <div>
            <p className="text-sm text-gray-500">Labs</p>
            <p className="text-2xl font-bold text-blue-600">{labs.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">PCs</p>
            <p className="text-2xl font-bold text-green-600">{pcs.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Students</p>
            <p className="text-2xl font-bold text-purple-600">{students.length}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button onClick={() => navigate("/labs")} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            View Lab
          </button>
          <button onClick={() => navigate("/pcs")} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
            View PC
          </button>
          <button onClick={() => navigate("/students")} className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
            View Student
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="bg-yellow-100 w-full lg:w-4/12 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">System Overview</h2>
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
                  label
                >
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
        <div className="bg-yellow-100 w-full lg:w-8/12 shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Lab Details</h2>
          <div className="w-full h-64 overflow-y-auto scrollbar">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Number</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Capacity</th>
                    <th scope="col" className="px-6 py-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {labs.map((lab, idx) => (
                    <tr
                      key={lab.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                    >
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {idx + 1}
                      </th>
                      <td className="px-6 py-4">{lab.name}</td>
                      <td className="px-6 py-4">{lab.capacity}</td>
                      <td className="px-6 py-4">{lab.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
