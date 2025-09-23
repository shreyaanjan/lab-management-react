import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";

const Labs = () => {
  const navigate = useNavigate();
  const { labs, deleteLab } = useContext(LabContext);

  return (
    <div className="bg-[#0F172A] min-h-screen p-8 text-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-purple-400">Lab Details</h2>
        <button
          onClick={() => navigate("/add-lab")}
          className="px-7 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">
          Add A Lab
        </button>
      </div>
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {labs.map((lab, idx) => (
          <div
            key={lab.id}
            className="bg-[#1E293B] rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold text-purple-400">{lab.name}</h3>
            <p className="text-slate-300 mt-2">Capacity: {lab.capacity}</p>
            <p className="text-slate-300">
              Remaining:{" "}
              {lab.spaceLeft <= 0 ? (
                <span className="text-red-400 font-semibold">Full</span>
              ) : (
                lab.spaceLeft
              )}
            </p>
            <p className="text-slate-300 mt-1">Location: {lab.location}</p>
            <p className="text-slate-400 text-sm mt-1">
              Created: {lab.createdAt.toDate().toLocaleDateString()}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/edit-lab/${lab.id}`)}
                className="flex-1 px-2 py-1 bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteLab(lab.id)}
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

export default Labs;    