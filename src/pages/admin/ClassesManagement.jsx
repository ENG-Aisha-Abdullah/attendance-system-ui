import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllClasses,
  addClass,
  deleteClass,
} from "../../services/classService";

export default function ClassesManagement() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: "" });

  useEffect(() => {
    getAllClasses().then(setClasses);
  }, []);

  const handleAdd = async () => {
    if (!newClass.name.trim()) {
      Swal.fire({
        icon: "error",
        title: "خطأ",
        text: "اسم الصف مطلوب",
      });
      return;
    }

    try {
      const added = await addClass(newClass);
      setClasses((prev) => [...prev, added]);
      setNewClass({ name: "" });

      Swal.fire({
        icon: "success",
        title: "تمت الإضافة",
        text: "تم إضافة الصف بنجاح",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "فشل",
        text: "حدث خطأ أثناء إضافة الصف",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await deleteClass(id);
        setClasses((prev) => prev.filter((c) => c.id !== id));

        Swal.fire("تم الحذف!", "تم حذف الصف", "success");
      } catch {
        Swal.fire("خطأ", "فشل الحذف", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold text-[#5196ac] mb-4">إضافة صف</h3>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="اسم الصف"
            className="border p-2 rounded w-full"
            value={newClass.name}
            onChange={(e) =>
              setNewClass({ ...newClass, name: e.target.value })
            }
          />
          <button
            className="bg-[#5196ac] text-white px-4 py-2 rounded"
            onClick={handleAdd}
          >
            إضافة
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-bold text-[#5196ac] mb-4">قائمة الصفوف</h3>
        <table className="w-full text-center">
          <thead>
            <tr className="bg-[#5196ac] text-white">
              <th className="py-2 px-4">الرقم</th>
              <th className="py-2 px-4">اسم الصف</th>
              <th className="py-2 px-4">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((c, index) => (
              <tr key={c.id} className="border-t hover:bg-gray-50 transition">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{c.name}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(c.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
            {classes.length === 0 && (
              <tr>
                <td colSpan="3" className="py-4 text-gray-500">
                  لا توجد صفوف حالياً
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}