import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const LogInHandle = async () => {
    if (!email.trim()) {
      Swal.fire({ icon: "error", text: "الرجاء كتابة البريد الاكتروني" });
      return;
    }
    if (!password.trim()) {
      Swal.fire({ icon: "error", text: "الرجاء كتابة الرقم السري" });
      return;
    }

    try {
      const res = await axios.post("", {
        name,
        email,
        password,
      });
// باث التوكن من الداتا
    //   const token = res.data.data.accessToken;
    //   const role = res.data.data.role; 

      if (token && role) {
        localStorage.setItem("Token", token);
        localStorage.setItem("role", role); 

        Swal.fire({
          icon: "success",
          title: "تم بنجاح",
          text: "تم تسجيل الدخول بنجاح ",
        }).then(() => {
// بيانات الداتا وتحديد الحساب حسب الرول
          if (role === "admin") navigate("admin");
          else if (role === "teacher") navigate("teacher");
          else if (role === "student") navigate("student");
          else if (role === "principle") navigate("principle");
        });
      }
    } catch {
      Swal.fire({
        icon: "error",
        title: "فشل تسجيل الدخول",
        text: "البريد أو كلمة المرور غير صحيحة",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white bg-indigo-200">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden flex mx-5">
        <div className="w-1/2 hidden md:flex items-center justify-center bg-white">
          <img
            src="/Attendance-Login.png"
            alt="login"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">
            Access to your Attendance System
          </p>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-800"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-800"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-800"
          />

          <button
            onClick={LogInHandle}
            className="w-full font-bold bg-indigo-800 text-white py-2 rounded-lg hover:bg-indigo-900 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
