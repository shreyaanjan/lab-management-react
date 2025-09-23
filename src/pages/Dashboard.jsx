import { useContext } from "react";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { studentContext } from "../context/StudentContextProvider";

export default function Dashboard() {
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { students } = useContext(studentContext);

  const recentActivity = [
    "Student A assigned to PC-12 in Lab 1",
    "Student B released PC-7 from Lab 2",
    "New Lab 'AI Research' created",
  ];

  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-100">
      <div className="container mx-auto">
        <div className="p-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-[#1E293B] shadow rounded-xl p-6">
              <p className="text-slate-400">Total Labs</p>
              <h2 className="text-4xl font-bold text-purple-400">
                {labs.length}
              </h2>
            </div>
            <div className="bg-[#1E293B] shadow rounded-xl p-6">
              <p className="text-slate-400">Total PCs</p>
              <h2 className="text-4xl font-bold text-cyan-400">
                {pcs.length}
              </h2>
            </div>
            <div className="bg-[#1E293B] shadow rounded-xl p-6">
              <p className="text-slate-400">Total Students</p>
              <h2 className="text-4xl font-bold text-pink-400">
                {students.length}
              </h2>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#1E293B] shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">PC Usage</h3>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-cyan-400 h-3 rounded-full"
                  style={{ width: `${(pcs.length / 100) * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-400 mt-2">
                {pcs.length}/100 PCs assigned
              </p>
            </div>

            <div className="bg-[#1E293B] shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                Student Registration
              </h3>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-pink-400 h-3 rounded-full"
                  style={{ width: `${(students.length / 200) * 100}%` }}
                />
              </div>
              <p className="text-sm text-slate-400 mt-2">
                {students.length}/200 students
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#1E293B] shadow rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <ul className="space-y-3 text-sm text-slate-200">
                {recentActivity.map((item, idx) => (
                  <li
                    key={idx}
                    className="border-l-4 border-purple-400 pl-3 bg-purple-900/30 rounded-r"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#1E293B] shadow rounded-xl p-6 overflow-x-auto">
              <h3 className="text-lg font-semibold mb-4">Lab Details</h3>
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-800 text-slate-200">
                    <th className="py-2 px-3">Lab Name</th>
                    <th className="py-2 px-3">Capacity</th>
                    <th className="py-2 px-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {labs.map((lab, idx) => (
                    <tr key={idx} className="border-t border-slate-700">
                      <td className="py-2 px-3">{lab.name}</td>
                      <td className="py-2 px-3">{lab.capacity}</td>
                      <td className="py-2 px-3">{lab.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-[#1E293B] shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600">
                Add Lab
              </button>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg shadow hover:bg-cyan-600">
                Assign PC
              </button>
              <button className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600">
                Register Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
