import { useEffect, useState } from "react";
import { getAllExcuses } from "../../services/excuseService";

export default function StudentDashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });

  const studentId = 1; 

  useEffect(() => {
    async function fetchExcuses() {
      const all = await getAllExcuses();
      const studentExcuses = all.filter((e) => +e.studentId === studentId);

      setCounts({
        total: studentExcuses.length,
        accepted: studentExcuses.filter((e) => e.status === "accepted").length,
        rejected: studentExcuses.filter((e) => e.status === "rejected").length,
        pending: studentExcuses.filter((e) => e.status === "pending").length,
      });
    }
    fetchExcuses();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold text-[#5196ac] mb-4">
        مرحبًا بك في لوحة تحكم الطالب
      </h2>

      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-lg font-bold text-blue-800">إجمالي الأعذار</p>
          <p className="text-2xl">{counts.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-lg font-bold text-green-800">مقبولة</p>
          <p className="text-2xl">{counts.accepted}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <p className="text-lg font-bold text-red-800">مرفوضة</p>
          <p className="text-2xl">{counts.rejected}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-lg font-bold text-yellow-800">معلقة</p>
          <p className="text-2xl">{counts.pending}</p>
        </div>
      </div>
    </div>
  );
}