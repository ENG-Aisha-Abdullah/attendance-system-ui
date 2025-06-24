import { useEffect, useState } from "react";
import {
  getAllStudents,
  addStudent,
  deleteStudent,
} from "../../services/studentService";
import Swal from "sweetalert2";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });

  useEffect(() => {
    getAllStudents().then(setStudents);
  }, []);

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "يجب تعبئة جميع الحقول.",
      });
      return;
    }

    try {
      const added = await addStudent(newStudent);
      setStudents((prev) => [...prev, added]);
      setNewStudent({ name: "", email: "" });

      Swal.fire({
        icon: "success",
        title: "تمت الإضافة",
        text: "تم إضافة الطالب بنجاح.",
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "فشل في الإضافة",
        text: "حدث خطأ أثناء إضافة الطالب.",
      });
    }
  };
  const handleDeleteStudent = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await deleteStudent(id);
        setStudents((prev) => prev.filter((s) => s.id !== id));

        Swal.fire({
          icon: "success",
          title: "تم الحذف",
          text: "تم حذف الطالب.",

          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "فشل في الحذف",
          text: "حدث خطأ أثناء حذف الطالب.",
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold text-[#5196ac] mb-4">إضافة طالب</h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="اسم الطالب"
            className="border p-2 rounded w-full"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            className="border p-2 rounded w-full"
            required
            value={newStudent.email}
            onChange={(e) =>
              setNewStudent({ ...newStudent, email: e.target.value })
            }
          
          />
          <button
            className="bg-[#5196ac] text-white px-4 py-2 rounded"
            onClick={handleAddStudent}
          >
            إضافة
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold text-[#5196ac] mb-4">قائمة الطلاب</h3>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-[#5196ac] text-white">
              <th className="py-2 px-4">الرقم</th>
              <th className="py-2 px-4">الاسم</th>
              <th className="py-2 px-4">البريد الإلكتروني</th>
              <th className="py-2 px-4">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.email}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-gray-500">
                  لا يوجد طلاب حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
