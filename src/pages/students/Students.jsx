import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { studentContext } from "../../context/StudentContextProvider";
import { PcContext } from "../../context/PcContextProvider";

const Students = () => {
  const navigate = useNavigate();
  const { students, showPc, deleteStudent } = useContext(studentContext);
  const { showLab } = useContext(PcContext);

  return (
    <div className="bg-[#0F172A] min-h-screen p-8 text-slate-100">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-purple-400">Students Details</h2>
        <button
          onClick={() => navigate("/add-student")}
          className="px-7 py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-cyan-600 transition">
          Add Student
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {students.map((student, idx) => (
          <div
            key={student.studentId}
            className="bg-[#1E293B] rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold text-purple-400">{student.name}</h3>
            <p className="text-slate-300 mt-2">Email: {student.mail}</p>
            <p className="text-slate-300">GRID: {student.grid}</p>
            <p className="text-slate-300">Lab: {showLab(student.labId) || "Unassigned"}</p>
            <p className="text-slate-300">PC: {showPc(student.pcId) || "Unassigned"}</p>
            <p className="text-slate-400 text-sm mt-1">
              Created: {student.createdAt.toDate().toLocaleDateString()}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/edit-student/${student.studentId}`)}
                className="flex-1 px-2 py-1 bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteStudent(student.studentId)}
                className="flex-1 px-2 py-1 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
