// services/adminService.js
export const getStudents = async () => {
    return [
      { id: 1, name: "طالب 1", class: "1A", status: "Present" },
      { id: 2, name: "طالب 2", class: "1B", status: "Absent" },
    ];
  };
  
  export const getTeachers = async () => {
    return [
      { id: 1, name: "أ. محمد", subject: "رياضيات" },
      { id: 2, name: "أ. علي", subject: "فيزياء" },
    ];
  };
  
  export const createStudent = async (student) => {
    console.log("طالب جديد:", student);
    return { success: true };
  };