// pages/admin/StudentsPage.jsx
import { useEffect, useState } from "react";
import { getStudents } from "../../services/adminService";

const StudentsPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getStudents();
      setStudents(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">قائمة الطلاب</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="border p-2 rounded my-2">
            {student.name} - الصف: {student.class} - الحالة: {student.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;