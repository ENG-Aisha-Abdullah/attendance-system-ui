import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllExcuses } from "../../services/excuseService";
import { getAllStudents } from "../../services/studentService";

export default function Reports() {
  const [excuses, setExcuses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [excusesData, studentsData] = await Promise.all([
          getAllExcuses(),
          getAllStudents(),
        ]);
        setExcuses(excusesData);
        setStudents(studentsData);
      } catch (error) {
        Swal.fire("خطأ", "فشل تحميل البيانات", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const counts = {
    total: excuses.length,
    accepted: excuses.filter((e) => e.status === "accepted").length,
    rejected: excuses.filter((e) => e.status === "rejected").length,
    pending: excuses.filter((e) => e.status === "pending").length,
  };

  const getStudentName = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    return student ? student.name : "غير معروف";
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-600">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-[#5196ac]">
        تقرير الأعذار - الأدمن
      </h2>

      {/* TODO: تغيير الالوان */}
      <div className="grid grid-cols-4 gap-6 text-center">
        <div className="bg-blue-100 p-4 rounded">
          <p className="text-lg font-semibold text-blue-800">إجمالي الأعذار</p>
          <p className="text-3xl">{counts.total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <p className="text-lg font-semibold text-green-800">مقبولة</p>
          <p className="text-3xl">{counts.accepted}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <p className="text-lg font-semibold text-red-800">مرفوضة</p>
          <p className="text-3xl">{counts.rejected}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <p className="text-lg font-semibold text-yellow-800">معلقة</p>
          <p className="text-3xl">{counts.pending}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#5196ac] text-white">
              <th className="border border-gray-300 py-2 px-4">رقم العذر</th>
              <th className="border border-gray-300 py-2 px-4">اسم الطالب</th>
              <th className="border border-gray-300 py-2 px-4">التاريخ</th>
              <th className="border border-gray-300 py-2 px-4">سبب العذر</th>
              <th className="border border-gray-300 py-2 px-4">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {excuses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  لا توجد أعذار حالياً
                </td>
              </tr>
            ) : (
              excuses.map((excuse, index) => (
                <tr
                  key={excuse.id}
                  className={`border border-gray-300 ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {excuse.id}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {getStudentName(excuse.studentId)}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {excuse.date}
                  </td>
                  <td className="border border-gray-300 py-2 px-4 text-center">
                    {excuse.reason}
                  </td>
                  <td
                    className={`border border-gray-300 py-2 px-4 text-center font-semibold ${
                      excuse.status === "accepted"
                        ? "text-green-600"
                        : excuse.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {excuse.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
