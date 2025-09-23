import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";
import { Settings, ToggleLeft, ToggleRight } from "lucide-react";

const Pcs = () => {

  const navigate = useNavigate();
  const { pcs, deletePc, handleStatus, handleAvail, showLab, flag } = useContext(PcContext);
  const { labs } = useContext(LabContext);

  return (
    <div className="bg-[#0F172A] min-h-screen p-8 text-slate-100">

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-purple-400">PC Details</h2>
        <button
          onClick={() => navigate("/add-pc")}
          className="px-7 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
        >
          Add A PC
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {pcs.map((pc, idx) => (
          <div
            key={pc.pcId}
            className="bg-[#1E293B] rounded-xl shadow p-6 flex flex-col justify-between"
          >
            <h3 className="text-xl font-semibold text-purple-400">{pc.name}</h3>
            <p className="text-slate-300 mt-2">
              Lab: {showLab(pc.labId) || "Unassigned"}
            </p>
            <p className="text-slate-300">Status: {pc.status}</p>
            <p className="text-slate-400 text-sm mt-1">
              Created: {pc.createdAt.toDate().toLocaleDateString()}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/edit-pc/${pc.pcId}/${pc.labId}`)}
                className="flex-1 px-2 py-1 bg-sky-500 text-white rounded-md text-sm font-medium hover:bg-sky-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deletePc(pc.pcId, pc.labId)}
                className="flex-1 px-2 py-1 bg-rose-500 text-white rounded-md text-sm font-medium hover:bg-rose-600 transition"
              >
                Delete
              </button>
              {flag ? <ToggleLeft onClick={() => handleAvail(pc.pcId)} /> :
                <ToggleRight onClick={() => handleStatus(pc.pcId)} />
              }
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Pcs;
